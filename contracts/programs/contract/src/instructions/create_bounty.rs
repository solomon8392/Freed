use anchor_lang::prelude::*;
use anchor_spl::token::spl_token::instruction::AuthorityType;
use anchor_spl::token::{self, TokenAccount, Mint, Token, Transfer, SetAuthority};

use crate::constants::{CREATE_BOUNTY_REP, BOUNTY_ESCROW_PDA_SEEDS};
use crate::state::*;
use crate::errors::ErrorCodes;

#[derive(Accounts)]
pub struct CreateBounty<'info> {
    #[account(
        init,
        seeds=[
            b"bounty",
            bounty_platform.key().as_ref(), 
            bounty_hunter.key().as_ref(), 
            bounty_hunter.total_bounties.to_string().as_bytes(),
        ],
        bump,
        payer = authority,
        space = Bounty::LEN
    )]
    pub bounty: Box<Account<'info, Bounty>>,

    #[account(mut)]
    pub bounty_platform: Box<Account<'info, BountyPlatform>>,

    #[account(mut, has_one=authority)]
    pub bounty_creator: Box<Account<'info, BountyCreator>>,
    
    #[account(
        init,
        seeds = [
            b"bounty-vault",
            bounty_platform.key().as_ref(), 
            bounty_creator.key().as_ref(), 
            bounty_creator.total_bounties.to_string().as_bytes(),
        ],
        bump,
        payer = authority,
        token::mint = bounty_vault_mint,
        token::authority = authority,
    )]
    pub bounty_vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub bounty_vault_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = authority_token_account.mint == bounty_vault_mint.key(),
        constraint = authority_token_account.owner == *authority.key,
    )]
    pub authority_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    // #[account(mut, has_one=bounty_creator, has_one=bounty_platform)]
    // pub bounty_creator_whitelist: Box<Account<'info, bounty_creatorWhitelist>>,

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>,

    pub token_program: Program<'info, Token>,

    pub rent: Sysvar<'info, Rent>,
}

impl<'info> CreateBounty<'info> {
    fn transfer_to_vault_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.authority_token_account.to_account_info().clone(),
            to: self.bounty_vault_token_account.to_account_info().clone(),
            authority: self.authority.to_account_info().clone(),
        };

        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }

    fn set_authority_context(&self) -> CpiContext<'_, '_, '_, 'info, SetAuthority<'info>> {
        let cpi_accounts = SetAuthority {
            account_or_mint: self.bounty_vault_token_account.to_account_info().clone(),
            current_authority: self.authority.to_account_info().clone(),
        };

        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }
}

pub fn handler(ctx: Context<CreateBounty>, amount: u64, description: String, deadline: i64) -> Result<()> {
    if *ctx.accounts.authority.to_account_info().key != ctx.accounts.bounty_creator.authority.key() {
        return Err(ErrorCodes::Unauthorized.into());
    }

    // if ctx.accounts.bounty_creator_whitelist.is_whitelisted == false {
    //     return Err(ErrorCodes::Unauthorized.into());
    // }

    let bounty = &mut ctx.accounts.bounty;
    let bounty_creator = &mut ctx.accounts.bounty_creator;
    let bounty_platform = &mut ctx.accounts.bounty_platform;

    bounty.creator = bounty_creator.key();
    bounty.platform = bounty_platform.key();
    bounty.id = bounty_creator.total_bounties;
    bounty.bounty_vault_mint = ctx.accounts.bounty_vault_mint.key();
    bounty.bounty_vault_account = ctx.accounts.bounty_vault_token_account.key();
    bounty.amount = amount;
    bounty.bounty_start_time = ctx.accounts.clock.unix_timestamp;
    bounty.bounty_end_time = deadline;
    bounty.bounty_description = description;
    bounty.is_completed = false;
    bounty.bump = *ctx.bumps.get("bounty").unwrap();

    bounty_creator.reputation += CREATE_BOUNTY_REP;
    bounty_creator.total_bounties += 1;
    bounty_creator.available_bounties += 1;
    
    bounty_platform.available_bounties += 1;

    let (vault_authority, _vault_authority_bump) = Pubkey::find_program_address(&[BOUNTY_ESCROW_PDA_SEEDS], ctx.program_id);

    token::set_authority(
        ctx.accounts.set_authority_context(), 
        AuthorityType::AccountOwner, 
        Some(vault_authority)
    )?;

    token::transfer(
        ctx.accounts.transfer_to_vault_context(), 
        amount
    )?;

    Ok(())
}