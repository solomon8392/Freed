use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

use crate::{
    constants::{ACCEPT_BOUNTY_REP, BOUNTY_ACCEPTED_REP, BOUNTY_ESCROW_PDA_SEEDS},
    errors::ErrorCodes,
    state::*,
};

#[derive(Accounts)]
pub struct AcceptBountySubmission<'info> {
    #[account(
        mut,
        seeds=[b"bounty-application", bounty.key().as_ref(), bounty_hunter.key().as_ref(),],
        bump=bounty_application.bump
    )]
    pub bounty_application: Box<Account<'info, BountyApplication>>,

    #[account(mut, has_one=bounty_creator, has_one=bounty_platform)]
    pub bounty: Box<Account<'info, Bounty>>,

    #[account(
        mut,
        seeds=[b"bounty-creator", authority.key().as_ref()],
        bump=bounty_creator.bump
    )]
    pub bounty_creator: Box<Account<'info, BountyCreator>>,

    #[account(mut)]
    pub bounty_platform: Box<Account<'info, BountyPlatform>>,

    #[account(mut)]
    pub bounty_hunter: Box<Account<'info, BountyHunter>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        constraint = token_mint.key() == bounty.bounty_vault_mint
    )]
    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = bounty_vault_token_account.key() == bounty.bounty_vault_account
    )]
    pub bounty_vault_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = bounty_hunter_token_account.key() == bounty_application.bounty_hunter_token_account
    )]
    pub bounty_hunter_token_account: Account<'info, TokenAccount>,

    /// CHECK: This is not dangerous
    pub vault_authority: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}

impl<'info> AcceptBountySubmission<'info> {
    fn transfer_winnings_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.bounty_vault_token_account.to_account_info().clone(),
            to: self.bounty_hunter_token_account.to_account_info().clone(),
            authority: self.vault_authority.clone(),
        };

        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }
}

pub fn handler(ctx: Context<AcceptBountySubmission>) -> Result<()> {
    let bounty_creator = &mut ctx.accounts.bounty_creator;
    let bounty_platform = &mut ctx.accounts.bounty_platform;
    let bounty_hunter = &mut ctx.accounts.bounty_hunter;
    let bounty_application = &mut ctx.accounts.bounty_application;
    let bounty = &mut ctx.accounts.bounty;

    if *ctx.accounts.authority.key != bounty_creator.authority {
        return Err(ErrorCodes::Unauthorized.into());
    }

    bounty_creator.available_bounties -= 1;
    bounty_creator.completed_bounties += 1;
    bounty_creator.reputation += ACCEPT_BOUNTY_REP;

    bounty_platform.available_bounties -= 1;
    bounty_platform.completed_bounties += 1;

    bounty_hunter.completed_bounties += 1;
    bounty_hunter.reputation += BOUNTY_ACCEPTED_REP;

    bounty_application.bounty_application_status = BountyStatus::Accepted;

    bounty.is_completed = true;
    bounty.bounty_winner = bounty_hunter.key();

    let (_vault_authority, _vault_authority_bump) =
        Pubkey::find_program_address(&[&BOUNTY_ESCROW_PDA_SEEDS], ctx.program_id);

    let authority_seeds = &[&BOUNTY_ESCROW_PDA_SEEDS[..], &[_vault_authority_bump]];

    token::transfer(
        ctx.accounts
            .transfer_winnings_context()
            .with_signer(&[&authority_seeds[..]]),
        ctx.accounts.bounty.total_amount,
    )?;

    Ok(())
}
