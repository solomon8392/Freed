use anchor_lang::prelude::*;

declare_id!("GGqt2oJWPH1oXoxXndNEVaWxKv5nTNZtUDosK1pFVXTm");

#[program]
pub mod contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
