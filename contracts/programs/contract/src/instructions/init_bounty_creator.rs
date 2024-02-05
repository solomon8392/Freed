use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

use crate::errors::ErrorCodes;
use crate::state::*;

#[derive(Accounts)]
pub struct InitBountyCreator<'info> {
    #[account(
        init,
        seeds=[b"bounty-creator", authority.key().as_ref()],
        bump,
        payer=authority,
        space=BountyCreator::LEN
    )]
    pub bounty_creator: Box<Account<'info, BountyCreator>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub bounty_creator_vault_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = bounty_creator_vault_token_account.mint == bounty_creator_vault_mint.key()
    )]
    pub bounty_creator_vault_token_account: Account<'info, TokenAccount>,

    pub bounty_platform: Box<Account<'info, BountyPlatform>>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitBountyCreator>, name: String, platform_id: String) -> Result<()> {
    let bounty_creator = &mut ctx.accounts.bounty_creator;

    let bounty_platform = &mut ctx.accounts.bounty_platform;

    if name.chars().count() > 30 {
        return Err(ErrorCodes::NameTooLong.into());
    }

    bounty_creator.name = name;
    bounty_creator.authority = *ctx.accounts.authority.key;
    bounty_creator.bounty_creator_vault = ctx.accounts.bounty_creator_vault_token_account.key();
    bounty_creator.vault_mint = ctx.accounts.bounty_creator_vault_mint.key();
    bounty_creator.reputation = 0;
    bounty_creator.id = bounty_platform.bounty_hunter_count + 1;
    bounty_creator.total_bounties = 0;
    bounty_creator.available_bounties = 0;
    bounty_creator.completed_bounties = 0;
    bounty_creator.bump = *ctx.bumps.get("bounty_creator").unwrap();
    bounty_creator.platform_id = platform_id;

    bounty_platform.bounty_creator_count += 1;

    Ok(())
}