// use anchor_lang::prelude::*;
// // use anchor_spl::token::spl_token::instruction::AuthorityType;
// use anchor_spl::token::{self, TokenAccount, Mint, Token, Transfer};

// // use crate::constants::BOUNTY_ESCROW_PDA_SEEDS;
// use crate::state::*;
// use crate::errors::ErrorCodes;

// #[derive(Accounts)]
// #[instruction(bounty_id: u64)]
// // #[instruction(bounty_id: u64)]
// pub struct AddFunds<'info> {
    
//     #[account(
//         mut,
//         constraint = authority_token_account.mint == bounty_vault_mint.key(),
//         constraint = authority_token_account.owner == *authority.key,
//     )]
//     pub authority_token_account: Account<'info, TokenAccount>,

//     #[account(
//         mut,
//         seeds=[
//             b"bounty",
//             bounty_platform.key().as_ref(), 
//             bounty_creator.key().as_ref(), 
//             authority.key().as_ref(),
//         ],
//         bump=bounty.bump,
//         close=authority,
//         has_one=bounty_platform,
//         has_one=bounty_creator,
//     )]
  
//     pub bounty: Box<Account<'info, Bounty>>,

//     #[account(mut)]
//     pub bounty_platform: Box<Account<'info, BountyPlatform>>,

//     #[account(mut, has_one=authority)]
//     pub bounty_creator: Box<Account<'info, BountyCreator>>,
    
//     #[account(
//         init,
//         seeds = [
//             b"bounty-vault",
//             bounty_platform.key().as_ref(), 
//             bounty_creator.key().as_ref(), 
//             bounty_creator.total_bounties.to_string().as_bytes(),
//         ],
//         bump,
//         payer = authority,
//         token::mint = bounty_vault_mint,
//         token::authority = authority,
//     )]
//     pub bounty_vault_token_account: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub bounty_vault_mint: Account<'info, Mint>,

//     #[account(mut)]
//     pub authority: Signer<'info>,

//     pub system_program: Program<'info, System>,

//     pub clock: Sysvar<'info, Clock>,

//     pub token_program: Program<'info, Token>,

// }

// impl<'info> AddFunds<'info> {
//     fn transfer_to_vault_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
//         let cpi_accounts = Transfer {
//             from: self.authority_token_account.to_account_info().clone(),
//             to: self.bounty_vault_token_account.to_account_info().clone(),
//             authority: self.authority.to_account_info().clone(),
//         };

//         CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
//     }

// }

// pub fn handler(ctx: Context<AddFunds>, amount: u64) -> Result<()> {

//     token::transfer(
//         ctx.accounts.transfer_to_vault_context(), 
//         amount
//     )?;

//     Ok(())
// }