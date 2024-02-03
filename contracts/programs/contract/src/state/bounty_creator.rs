use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct BountyCreator {
    /// Name of the Creator
    pub name: String,

    /// Authority of the Creator
    pub authority: Pubkey,

    /// Reputation of the Creator
    pub reputation: i64,

    /// Total Number of Bounties posted
    pub total_bounties: u64,

    /// Number of available bounties
    pub available_bounties: u64,

    /// Number of completed bounties
    pub completed_bounties: u64,

    /// Bump
    pub bump: u8,
}

impl BountyCreator {
    pub const LEN: usize = DISCRIMINATOR_LENGTH  // 8-byte discriminator
        + NAME_LENGTH                            // Name of the Bounty Creator
        + PUBKEY_LENGTH                          // Creator authority
        + DATA_LENGTH                            // Reputation
        + DATA_LENGTH                            // Total bounties
        + DATA_LENGTH                            // Available bounties
        + DATA_LENGTH                            // Completed bounties
        + BOOL_LENGTH; // Bump
}