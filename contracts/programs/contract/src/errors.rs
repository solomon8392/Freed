use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCodes {
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Not approved to claim")]
    NotApproved,
}