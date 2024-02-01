use anchor_lang::prelude::*;

declare_id!("GGqt2oJWPH1oXoxXndNEVaWxKv5nTNZtUDosK1pFVXTm");

#[program]
pub mod contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        ctx.accounts.new_account.data = data;
        msg!("Changed data to: {}!", data); // Message will show up in the tx logs
        Ok(())
    }
}

#[derive(Accounts)]
pub struct  Initialize<'info> {
      // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 8 bytes come from NewAccount.data being type u64.
    // (u64 = 64 bits unsigned integer = 8 bytes)
    #[account(init, payer = signer, space = 8 + 8)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NewAccount {
    data: u64
}

//A bot to help facilitate bounty agreements on chain

// tag the bot on a github comment tell it how much you want to stake
// if the bot doesn't see the stake amount then it tags the og that called it to list the stake
// it creates a link to a dapp that the bounty person can pay into
// anyone can ask the bot the status of the bounty and the bot can tell who is working on it

// you can paste the text into chat gpt to expand on the idea and also fill in the full details it should help
// the discord is a nice to have not the main thing

// the idea is that it should be a general pupose bot that can be used by eth guys, solana or even pay by pay pal anyone
// for now the focus will def just be solana

// alright so here's the breakdown
// Starting a Bounty:

// function start_bounty() ---> Legit `createBounty`
// function get_bounty_details() ---> Legit view function 
// function create_payment_link() ---> not needed done offchain
// function assign_task() ---> not needed in github use `register`
// function get_task_assignees() ---> not needed no onchain task
// function claim_bounty() ---> Legit `withdrawWins`
// function refund_bounty_creator() ---> not needed future task
// function minimum_withdrawal_time ---> not needed since its a const
// function fund_transfer() ---> Legit `depositFunds`
// function fund_withdraw() ---> Legit `withdrawFunds`

// Developers can mention the bot in a GitHub comment to kick off a bounty for a specific task. Include details like the stake amount, a brief task description, and any requirements.

// Handling Missing Stake Info:

// If the bot spots a missing stake amount, it can tag the commenter, asking for the needed info. The commenter replies to the bot with the missing details.

// Creating a Payment Link:

// Once the stake is confirmed, the bot generates a link to a DApp or blockchain smart contract. This link lets users securely contribute to the bounty pool, ensuring safe storage.

// Bounty Status Check:

// Users, including the task initiator, can ask the bot about the bounty's current status. The bot provides info on the stake, contributors, and task progress.

// Task Assignment and Tracking:

// The bot helps assign the task to a developer or keeps a list of interested developers. Developers update progress in GitHub comments, and the bot tracks and reports progress.

// Claiming the Bounty:

// After completing the task, the developer submits proof or a code link. The bot verifies and, if successful, releases funds to the developer.

// Refunding or Reallocating Funds:

// If the task isn't done or there's a dispute, stakeholders can set rules for refunding or reallocating the funds. 
// ***
// ***
// So right now I'm looking to see how to create a new bot


// Yeah so the main stuff you'll just do on the smart contract is
// create a bounty
// implement the deposit when a bounty is made, transfer when a bounty is done and lastly, a withdrawal to the bounty manager or admin if the bounty was not fulfilled
// record task assignment
// the reason for the record assignment is to know who is working on a project and who is not working on the project
// Magical_vybez — Yesterday at 8:32 PM
// Alright
// Magical_vybez — Yesterday at 8:33 PM
// It will save this on the db/server?
// kelvinpraises — Yesterday at 8:33 PM
// you'll have a status for the user

// enum Status {
//   None,
//   Pending,
//   Accepted,
//   Rejected,
//   Appealed,
//   InReview,
//   Canceled
// }

//state of bounties on frontend
// open - not having assignees yet
// closed - when the bounty has closed
// active - having assignees yet 

// Okay so looking at it the taks are already written on github so we don't really need to store that
// what we need to record onchain is who is the manager and who the recipients are 

//THE FLOW FROM KELVIN

// see if you can come up with a usecase for using with superteam.earn, check their sites later to see if you can improve
// something there with your bot 

//bounty creation process from the call
// collecting it and from github and pushing it to the contract
// use an existing issue or a new issue, as far as it's in github
// tag bounty-pal
// read and unread
// when a persoon tags the bot, the bot is expcting a specific info, the amount needed to stake, the details of the bounty
// it will be in the comments
// for the link we can use tiplink for the payment stuff
// the purpose of the ui is to facilitate a nice interface for the users to interact with the sc
// when the person is putting the money
// 


// +-------------------------+
// |     Bounty Creation     |
// |                         |
// |  +-------------------+  |
// |  | GitHub Issue ID   |  |
// |  | Stake Amount      |  |
// |  | Task Description  |  |
// |  +-------------------+  |
// |            |            |
// |            v            |
// |  +-------------------+  |
// |  | Unique Bounty     |  |
// |  | Identifier        |  |
// |  +-------------------+  |
// |            |            |
// +------------|------------+
//              v             
// +-------------------------+
// |     Fund Management     |
// |                         |
// |  +-------------------+  |
// |  | Secure Wallet     |  | // you are always doing bounties, you can just top up your secure wallet and just create bounties from it
// |  | Fund Deposits     |  | // you can also do one off bounties, where you generate links and people pay into the links
// |  | Fund Withdrawals  |  | // bounty creators are withdrawing back their funds
// |  | Fund Transfers    |  | // there is a dispute period, users can only claim withdrawals after dipute period has passed and the bounty duration
// |  +-------------------+  | // how do we dispute resolution
// |            |            | // 
// |            v            |
// |  +-------------------+  |
// |  | Task Assignment   |  |
// |  | Mechanism         |  |
// |  +-------------------+  |
// |            |            |
// +------------|------------+
//              v             
// +-------------------------+
// |  Task Progress Tracking |
// |                         |
// |  +-------------------+  |
// |  | Progress Tracking |  |
// |  | Updates Submission|  |
// |  +-------------------+  |
// |            |            |
// |            v            |
// |  +-------------------+  |
// |  | Verification and  |  |
// |  | Fund Release      |  |
// |  +-------------------+  |
// |            |            |
// +------------|------------+
//              v             
// +-------------------------+
// |    Refund Mechanism     |
// |                         |
// |  +-------------------+  |
// |  | Refund on Timeout |  |
// |  | Dispute Handling  |  |
// |  +-------------------+  |
// |            |            |
// |            v            |
// |  +-------------------+  |
// |  | Event Handling    |  |
// |  | (Smart Contract)  |  |
// |  +-------------------+  |
// |                         |
// +-------------------------+

//from hyperlane bounties
// What I'm saying is that they manually assign the bounties
// there's no bot involved
// but due to the way the github is setup they can pull out the bounty to their website UI

//our project is different from hyperlane's bounty setup in the sense the bot we're building is not tied to a repository you just need to mention the bot and it should be able to respond in any repo

//Alright so I think it's time you did a sketch of your contract based on the user flow and let's see what you'll do I'm reading githubs documentation over here