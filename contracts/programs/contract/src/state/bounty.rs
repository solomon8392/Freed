use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct Bounty {
    /// The creator initializing the bounty
    pub creator: Pubkey,

    /// The platfrom where the bounty is shown
    pub platform: Pubkey,

    /// Id of bounty
    pub id: u64,

    /// Bounty Token Account
    pub bounty_vault_account: Pubkey,

    /// Bounty Amount
    pub amount: u64,

    /// Timestamp when bounty was posted
    pub bounty_start_time: i64,

    ///Timestamp when bounty is supposed to end
    pub bounty_end_time: i64,

    /// Number of active bounty applications
    pub applications: u64,

    /// Description of the bounty
    pub bounty_description: String,

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
        + PUBKEY_LENGTH                         // bounty-pal Pubkey
        + DATA_LENGTH                           // Bounty Id
        + PUBKEY_LENGTH                         // Vault Account for Bounty
        + DATA_LENGTH                           // Amount For Bounty
        + DATA_LENGTH                           // Timestamp for when Bounty started
        + DATA_LENGTH                           // Timestamp for when Bounty ends
        + DATA_LENGTH                           // Number of applicants
        + DATA_LENGTH                           // Number of approved users
        + LINK_LENGTH                           // Description of Bounty
        + BOOL_LENGTH                           // Bounty Completion Status
        + PUBKEY_LENGTH                         // Bounty Winner
        + BOOL_LENGTH; // Bump
}
