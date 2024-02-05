use anchor_lang::prelude::*;

use crate::{state::*, errors::ErrorCodes};

#[derive(Accounts)]
pub struct InitBountyHunter<'info> {
    #[account(
        init,
        seeds = [b"bounty-hunter", authority.key().as_ref()],
        bump,
        payer = authority,
        space = BountyHunter::LEN
    )]
    pub bounty_hunter: Box<Account<'info, BountyHunter>>,

    // #[account(
    //     mut,
    //     constraint = bounty_hunter_token_account.owner == *authority.to_account_info().key
    // )]
    // pub bounty_hunter_token_account: Account<'info, TokenAccount>,
    pub bounty_platform: Box<Account<'info, BountyPlatform>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitBountyHunter>, name: String, bio: String, platform_id: String) -> Result<()> {
    let bounty_hunter = &mut ctx.accounts.bounty_hunter;

    let bounty_platform = &mut ctx.accounts.bounty_platform;

    if name.chars().count() > 30 {
        return Err(ErrorCodes::NameTooLong.into());
    }

    if bio.chars().count() > 50 {
        return Err(ErrorCodes::BioTooLong.into());
    }

    bounty_hunter.display_name = name;
    bounty_hunter.authority = *ctx.accounts.authority.key;
    // bounty_hunter.bounty_hunter_token_account = ctx.accounts.bounty_hunter_token_account.key();
    bounty_hunter.bio = bio;
    bounty_hunter.id = bounty_platform.bounty_hunter_count + 1;
    bounty_hunter.reputation = 0;
    bounty_hunter.completed_bounties = 0;
    bounty_hunter.platform_id = platform_id;

    bounty_platform.bounty_hunter_count += 1;

    bounty_hunter.bump = *ctx.bumps.get("bounty_hunter").unwrap();

    Ok(())
}
