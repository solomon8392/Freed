// use anchor_lang::prelude::*;
// use crate::state::*;

// #[derive(Accounts)]
// pub struct GetBountyDetails<'info> {
//     #[account(
//         init,
//         seeds=[
//             b"bounty",
//             bounty_platform.key().as_ref(), 
//             bounty_creator.key().as_ref(), 
//             bounty_creator.total_bounties.to_string().as_bytes(),
//         ],
//         bump,
//         payer = authority,
//         space = Bounty::LEN
//     )]
//     pub bounty: Box<Account<'info, Bounty>>,

//     #[account(mut)]
//     pub bounty_platform: Box<Account<'info, BountyPlatform>>,

//     pub authority: Signer<'info>,
// }

// impl<'info> GetBountyDetails<'info> {
//     pub fn handler(ctx: Context<GetBountyDetails>, id: u64) -> Result<Bounty> {
//         // Read data from the bounty account
//         let bounty_data = &ctx.accounts.bounty;

//         // Extract relevant details
//         let details = Bounty {
//             creator: bounty_data.creator.clone(),
//             platform: bounty_data.platform.clone(),
//             id: bounty_data.id.clone(),
//             bounty_vault_mint: bounty_data.bounty_vault_mint.clone(),
//             bounty_vault_account: bounty_data.bounty_vault_account.clone(),
//             amount: bounty_data.amount.clone(),
//             bounty_start_time: bounty_data.bounty_start_time.clone(),
//             bounty_end_time: bounty_data.bounty_end_time.clone(),
//             bounty_description: bounty_data.bounty_description.clone(),
//             is_completed: bounty_data.is_completed.clone(),
//             bounty_winner: bounty_data.bounty_winner.clone(),
//             bump: bounty_data.bump.clone(),
//             // Add other details as needed
//         };

//         Ok(details)
//     }
// }