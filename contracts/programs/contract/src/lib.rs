use anchor_lang::prelude::*;

mod constants;
mod errors;
mod instructions;
mod state;

use instructions::*;

declare_id!("Ab2ScbQzLejfeGDkTeqcGd5LG2jfqbMqnE8Jdyni3Bot");

#[program]
pub mod contract {
    use super::*;

    pub fn init_bounty_platform(ctx: Context<InitBountyPlatform>, name: String) -> Result<()> {
        instructions::init_bounty_platform::handler(ctx, name)
    }

    pub fn init_bounty_creator(ctx: Context<InitBountyCreator>, name: String,  platform_id: String) -> Result<()> {
        instructions::init_bounty_creator::handler(ctx, name, platform_id)
    }

    pub fn init_bounty_hunter(
        ctx: Context<InitBountyHunter>,
        name: String,
        bio: String,
        platform_id: String
    ) -> Result<()> {
        instructions::init_bounty_hunter::handler(ctx, name, bio, platform_id)
    }

    pub fn create_bounty(
        ctx: Context<CreateBounty>,
        amount: u64,
        description: String,
        deadline: i64,
        context_id: String
    ) -> Result<()> {
        instructions::create_bounty::handler(ctx, amount, description, deadline, context_id)
    }

    pub fn accept_bounty_submission(ctx: Context<AcceptBountySubmission>) -> Result<()> {
        instructions::accept_bounty_submission::handler(ctx)
    }

    pub fn cancel_bounty(ctx: Context<CancelBounty>) -> Result<()> {
        instructions::cancel_bounty::handler(ctx)
    }

    pub fn apply_for_bounty(ctx: Context<ApplyForBounty>) -> Result<()> {
        instructions::apply_for_bounty::handler(ctx)
    }
}
