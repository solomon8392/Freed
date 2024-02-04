use crate::{errors::ErrorCodes, state::*};
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

#[derive(Accounts)]
pub struct InitBountyPlatform<'info> {
    #[account(
        init,
        seeds = [b"bounty-platform", authority.key().as_ref()],
        bump,
        payer = authority, 
        space = BountyPlatform::LEN
    )]

    pub bounty_platform: Box<Account<'info, BountyPlatform>>,

    #[account(mut)]
    pub bounty_platform_vault_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = bounty_platform_vault_token_account.mint == bounty_platform_vault_mint.key()
    )]
    pub bounty_platform_vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitBountyPlatform>, name: String) -> Result<()> {
    let bounty_platform = &mut ctx.accounts.bounty_platform;

    if name.chars().count() > 30 {
        return Err(ErrorCodes::NameTooLong.into());
    }

    bounty_platform.name = name;
    bounty_platform.authority = *ctx.accounts.authority.key;
    bounty_platform.bounty_platform_vault = ctx.accounts.bounty_platform_vault_token_account.key();
    bounty_platform.vault_mint = ctx.accounts.bounty_platform_vault_mint.key();
    bounty_platform.created_bounties = 0;
    bounty_platform.available_bounties = 0;
    bounty_platform.completed_bounties = 0;
    bounty_platform.bump = *ctx.bumps.get("bounty_platform").unwrap();

    Ok(())
}