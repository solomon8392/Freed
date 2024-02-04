use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct BountyPlatform {
    /// Name of the Platform
    pub name: String,

    /// Authority of the platform
    pub authority: Pubkey,

    /// Vault Token Account of Bounty-pal
    pub bounty_platform_vault: Pubkey,

    /// Mint of the Vault Token
    pub vault_mint: Pubkey,

    /// Number of created bounties
    pub created_bounties: u64,

    /// Number of bounties available on the platform
    pub available_bounties: u64,

    /// Number of completed bounties
    pub completed_bounties: u64,

    /// Number of total bounties on the platform
    pub total_bounties: u64,

    /// Bump
    pub bump: u8,
}

impl BountyPlatform {
    pub const LEN: usize = DISCRIMINATOR_LENGTH      // 8-byte discriminator
        + NAME_LENGTH                                // name
        + PUBKEY_LENGTH                              // Authority of BountyPal Platform
        + PUBKEY_LENGTH                              // Bounty_platform Vault Token Account
        + PUBKEY_LENGTH                              // Mint of Bounty-platform Token
        + DATA_LENGTH                                // created Bounties
        + DATA_LENGTH                                // Available Bounties
        + DATA_LENGTH                                // Completed Bounties
        + DATA_LENGTH                                // Total Bounties
        + BOOL_LENGTH; // Bump
}
