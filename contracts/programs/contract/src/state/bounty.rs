use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct Bounty {
    /// The creator initializing the bounty
    pub bounty_creator: Pubkey,

    /// The platfrom where the bounty is shown
    pub bounty_platform: Pubkey,

    /// Id of bounty
    pub id: u64,

    /// Bounty Vault Mint
    pub bounty_vault_mint: Pubkey,

    /// Bounty Token Account
    pub bounty_vault_account: Pubkey,

    /// Bounty Total Amount
    pub total_amount: u64,

    /// Bounty Amount staked
    pub amount_staked: u64,

    /// Timestamp when bounty was posted
    pub bounty_start_time: i64,

    ///Timestamp when bounty is supposed to end
    pub bounty_end_time: i64,

    /// Number of active bounty hunter applications
    pub bounty_hunter_applications: u64,

    /// Description of the bounty
    pub bounty_description: String,

    //Bounty context id (github issue)
    pub context_id: String,

    /// Bounty Completed
    pub is_completed: bool,

    /// Bounty Winner
    pub bounty_winner: Pubkey,

    /// Bump
    pub bump: u8,
}

impl Bounty {
    pub const LEN: usize = DISCRIMINATOR_LENGTH // 8-byte discriminator
        + PUBKEY_LENGTH                         // creator Pubkey
        + PUBKEY_LENGTH                         // bounty-platform Pubkey
        + DATA_LENGTH                           // Bounty Id
        + PUBKEY_LENGTH                         // Mint of Bounty Vault Token
        + PUBKEY_LENGTH                         // Vault Account for Bounty
        + DATA_LENGTH                           // Total Amount For Bounty
        + DATA_LENGTH                           // Amount staked For Bounty
        + DATA_LENGTH                           // Timestamp for when Bounty started
        + DATA_LENGTH                           // Timestamp for when Bounty ends
        + DATA_LENGTH                           // Number of bounty hunter applications
        + LINK_LENGTH                           // Description of Bounty
        + LINK_LENGTH                           // Bounty context id (github issue)
        + BOOL_LENGTH                           // Bounty Completion Status
        + PUBKEY_LENGTH                         // Bounty Winner
        + BOOL_LENGTH; // Bump
}
