use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct BountyPlatform {
    /// Name of the Platform
    pub name: String,

    /// Authority of the platform
    pub authority: Pubkey,

    /// Vault Account of the Bounty-pal
    pub vault: Pubkey,

    /// Number of created bounties
    pub created_bounties: u64,

    /// Number of bounties available on the platform
    pub available_bounties: u64,

    /// Number of completed bounties
    pub completed_bounties: u64,

    /// Bump
    pub bump: u8,
}

impl BountyPlatform {
    pub const LEN: usize = DISCRIMINATOR_LENGTH      // 8-byte discriminator
        + NAME_LENGTH                                // name
        + PUBKEY_LENGTH                              // Authority of BountyPal Platform
        + PUBKEY_LENGTH                              // BountyPal Vault Account
        + DATA_LENGTH                                // created Bounties
        + DATA_LENGTH                                // Available Bounties
        + DATA_LENGTH                                // Completed Bounties
        + BOOL_LENGTH; // Bump
}