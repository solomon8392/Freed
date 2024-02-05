use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct BountyApplication {
    /// Bounty being applied to
    pub bounty: Pubkey,

    /// Bounty creator this bounty belongs to
    pub bounty_creator: Pubkey,

    /// Bonuty hunter applying for this bounty
    pub bounty_hunter: Pubkey,

    /// User Token Account
    pub bounty_hunter_token_account: Pubkey,

    /// Bounty application status
    pub bounty_application_status: BountyStatus,

    /// Bump
    pub bump: u8,
}

#[derive(Debug, AnchorSerialize, AnchorDeserialize, Eq, PartialEq, Clone, Copy)]
pub enum BountyStatus {
    NoUpdate,
    Submitted,
    Accepted,
}

impl BountyApplication {
    pub const LEN: usize = DISCRIMINATOR_LENGTH // 8-byte discriminator
        + PUBKEY_LENGTH                         // Bounty
        + PUBKEY_LENGTH                         // Bounty creator
        + PUBKEY_LENGTH                         // Bounty hunter
        + PUBKEY_LENGTH                         // Bounty hunter Token Account
        + ENUM_LENGTH                           // Bounty application Status
        + BOOL_LENGTH; // Bump
}