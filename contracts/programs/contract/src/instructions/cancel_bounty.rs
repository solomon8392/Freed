use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Token, Transfer, CloseAccount};

use crate::constants::{BOUNTY_ESCROW_PDA_SEEDS, CLOSE_BOUNTY_REP};
use crate::state::*;
use crate::errors::ErrorCodes;

#[derive(Accounts)]
#[instruction(bounty_id: u64)]
pub struct CancelBounty<'info> {
    #[account(
        mut,
        seeds=[
            b"bounty",
            bounty_platform.key().as_ref(), 
            bounty_creator.key().as_ref(), 
            bounty_id.to_string().as_bytes(),
        ],
        bump=bounty.bump,
        close=authority,
        has_one=bounty_platform,
        has_one=bounty_creator,
    )]
    pub bounty: Box<Account<'info, Bounty>>,

    #[account(
        mut,
        constraint = bounty_vault_account.owner == *vault_authority.key,
    )]
    pub bounty_vault_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub bounty_platform: Box<Account<'info, BountyPlatform>>,

    #[account(mut, has_one=authority)]
    pub bounty_creator: Box<Account<'info, BountyCreator>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        constraint = bounty_creator_token_account.owner == *authority.key,
        constraint = bounty_creator_token_account.mint == bounty.bounty_vault_mint
    )]
    pub bounty_creator_token_account: Account<'info, TokenAccount>,
    
    /// CHECK: This is not dangerous
    pub vault_authority: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}

impl<'info> CancelBounty<'info> {
    fn transfer_to_bounty_creator_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.bounty_vault_account.to_account_info().clone(),
            to: self.bounty_creator_token_account.to_account_info().clone(),
            authority: self.vault_authority.clone(),
        };

        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }

    fn close_account_context(&self) -> CpiContext<'_, '_, '_, 'info, CloseAccount<'info>> {
        let cpi_accounts = CloseAccount {
            account: self.bounty_vault_account.to_account_info().clone(),
            destination: self.authority.to_account_info().clone(),
            authority: self.vault_authority.clone(),
        };

        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }
}

pub fn handler(ctx: Context<CancelBounty>) -> Result<()> {
    if *ctx.accounts.authority.to_account_info().key != ctx.accounts.bounty_creator.authority {
        return Err(ErrorCodes::Unauthorized.into());
    }

    let bounty_creator = &mut ctx.accounts.bounty_creator;

    bounty_creator.total_bounties -= 1;
    bounty_creator.available_bounties -= 1;
    bounty_creator.reputation += CLOSE_BOUNTY_REP;

    ctx.accounts.bounty_platform.available_bounties -= 1;

    let (_vault_authority, vault_authority_bump) = Pubkey::find_program_address(&[BOUNTY_ESCROW_PDA_SEEDS], ctx.program_id);

    let authority_seeds = &[&BOUNTY_ESCROW_PDA_SEEDS[..], &[vault_authority_bump]];

    token::transfer(
        ctx.accounts
            .transfer_to_bounty_creator_context()
            .with_signer(&[&authority_seeds[..]]), 
        ctx.accounts.bounty.amount_staked
    )?;

    token::close_account(
        ctx.accounts
            .close_account_context()
            .with_signer(&[&authority_seeds[..]])
    )?;

    Ok(())
}