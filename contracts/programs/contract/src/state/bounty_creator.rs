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

    /// id of platform (github/gitlab)
    pub platform_id: String,

    /// id of the bounty creator
    pub id: u64,

    /// Vault Token Account of the Bounty Creator
    pub bounty_creator_vault: Pubkey,

    /// Mint of the vault token
    pub vault_mint: Pubkey,

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
        + NAME_LENGTH                            // platform id
        + DATA_LENGTH                            // ID of the bounty creator
        + PUBKEY_LENGTH                          // Bounty Creator vault
        + PUBKEY_LENGTH                          // Vault mint
        + DATA_LENGTH                            // Total bounties
        + DATA_LENGTH                            // Available bounties
        + DATA_LENGTH                            // Completed bounties
        + BOOL_LENGTH; // Bump
}
