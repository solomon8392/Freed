use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;

use crate::state::*;

#[derive(Accounts)]
pub struct ApplyForBounty<'info> {
    #[account(
        init,
        seeds=[
            b"bounty-application",
            bounty.key().as_ref(),
            bounty_hunter.key().as_ref(),
        ],
        bump,
        payer=authority,
        space=BountyApplication::LEN
    )]
    pub bounty_application: Box<Account<'info, BountyApplication>>,

    #[account(mut, has_one=bounty_creator)]
    pub bounty: Box<Account<'info, Bounty>>,

    #[account(
        mut,
        seeds=[b"bounty-hunter", authority.key().as_ref()],
        bump=bounty_hunter.bump
    )]
    pub bounty_hunter: Box<Account<'info, BountyHunter>>,

    #[account(mut)]
    pub bounty_creator: Box<Account<'info, BountyCreator>>,

    #[account(
        mut,
        constraint = bounty_hunter_token_account.owner == *authority.to_account_info().key
    )]
    pub bounty_hunter_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub clock: Sysvar<'info, Clock>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ApplyForBounty>) -> Result<()> {
    let bounty_application = &mut ctx.accounts.bounty_application;
    let bounty = &mut ctx.accounts.bounty;

    bounty_application.bounty = bounty.key();
    bounty_application.bounty_creator = ctx.accounts.bounty_creator.key();
    bounty_application.bounty_hunter = ctx.accounts.bounty_hunter.key();
    bounty_application.bounty_hunter_token_account = ctx.accounts.bounty_hunter_token_account.key();
    bounty_application.bounty_application_status = BountyStatus::NoUpdate;
    bounty_application.bump = *ctx.bumps.get("bounty_application").unwrap();

    bounty.bounty_hunter_applications += 1;

    Ok(())
}