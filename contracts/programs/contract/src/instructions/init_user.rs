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

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitBountyHunter>, name: String, bio: String) -> Result<()> {
    let bounty_hunter = &mut ctx.accounts.bounty_hunter;

    if name.chars().count() > 30 {
        return Err(ErrorCodes::NameTooLong.into());
    }

    if bio.chars().count() > 50 {
        return Err(ErrorCodes::BioTooLong.into());
    }

    bounty_hunter.display_name = name;
    bounty_hunter.authority = *ctx.accounts.authority.key;
    bounty_hunter.bio = bio;
    bounty_hunter.reputation = 0;
    bounty_hunter.completed_bounties = 0;
    bounty_hunter.bump = *ctx.bumps.get("bounty_hunter").unwrap();

    Ok(())
}