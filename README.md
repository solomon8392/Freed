# BountyPal x Solana Encode hackathon 

Live Demo - [Vimeo video](https://vimeo.com/910420574) <br />
Live Link - [BountyPal dapp](https://bountypal.vercel.app/) <br />
[BountyPal](https://bountypal.vercel.app/) is your go-to platform for managing bounties across different development platforms.

We are interested in revolutionizing the way bounties are managed in the open-source world.


## ✨ Description
In the world of web3, bounties are extremely important to developers as they are a community incentive for them to contribute to interesting projects, learn new concepts on the fly, gain valuable experience and at the same time strengthing the open source culture. 

But in the world of bounties, there is sometimes an issue of knowing who is working on a current task, tracking bounty participants etc, and managing this most times manually is strenous on the bounty creator or bounty host, that's why we built BountyPal, BountyPal uses geminiAI to manage tasks and give smart responses to inquiries about bounties, tracks who is working on which bounty, creates payout links for smooth deposits into the bounty pool as well and many more.

### How it works 

#### Starting a Bounty:

Developers can mention the bot in a GitHub comment to kick off a bounty for a specific task. Include details like the stake amount, a brief task description, and any requirements.

#### Handling Missing Stake Info:

If the bot spots a missing stake amount, it can tag the commenter, asking for the needed info. The commenter replies to the bot with the missing details.

#### Creating a Payment Link:

Once the stake is confirmed, the bot generates a link to a DApp or blockchain smart contract. This link lets users securely contribute to the bounty pool, ensuring safe storage.

#### Bounty Status Check:

Users, including the task initiator, can ask the bot about the bounty's current status. The bot provides info on the stake, contributors, and task progress.

#### Task Assignment and Tracking:

The bot helps assign the task to a developer or keeps a list of interested developers. Developers update progress in GitHub comments, and the bot tracks and reports progress.

#### Claiming the Bounty:
After completing the task, the developer submits proof or a code link. The bot verifies and, if successful, releases funds to the developer.

#### Refunding or Reallocating Funds:

If the task isn't done or there's a dispute, stakeholders can set rules for refunding or reallocating the funds.

### What we built
Here's a breakdown of how it was built:

1. We need to initialize the bountyPal global state account with the ```init-bounty-platform``` instruction, so that bounty hunters and creators alike can interact with our program

2. Bounty creators have to initialize their account with ```init-bounty-creator``` instruction, so as to be able to interact with our platform

3. Bounty hunters have to initialize their account with ```init-bounty-hunter``` instruction, so as to be able to interact with our platform

4. Bounty creators need to call the ```create-bounty``` instruction to be able to create bounties

5. Bounty hunters need to call the ```apply_for_bounty``` instruction to be able to apply for bounties

6. Bounty creators can call ```cancel_bounty``` instruction to cancel a bounty abruptly due to whatever reasons but in the future we plan to implement a dispute period where bounty hunters can come and challenge this decision and we would look for a way to handle disputes amicably and fairly to all parties, also bounty creators loose reputation for every bounty cancelled.

7. Bounty creators can call ```accept_bounty_submission``` to accept a bounty submission from a bounty hunter and choose a winner, bounty winners earn reputation with every win.

## Where we deployed to/contract details

We created and deployed our program on the solana devnet

### Solana Devnet

BountyPal Program - Ab2ScbQzLejfeGDkTeqcGd5LG2jfqbMqnE8Jdyni3Bot

[View on solana Devnet](https://explorer.solana.com/address/Ab2ScbQzLejfeGDkTeqcGd5LG2jfqbMqnE8Jdyni3Bot?cluster=devnet
)

