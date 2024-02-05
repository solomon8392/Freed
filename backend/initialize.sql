CREATE TABLE Bounty (
    bountyId TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issue INTEGER NOT NULL,
    repo TEXT NOT NULL,
    creator TEXT NOT NULL,
);

-- Table for responded prompts
CREATE TABLE RespondedPrompts (
    promptId TEXT PRIMARY KEY,
    bountyId TEXT NOT NULL,
    userId TEXT NOT NULL,
    commentId TEXT NOT NULL,
    FOREIGN KEY (bountyId) REFERENCES Bounty(bountyId)
);

-- Table for bounty required info
CREATE TABLE CreationData (
    creationDataId TEXT PRIMARY KEY,
    bountyId TEXT NOT NULL,
    tokenAmount INTEGER NOT NULL,
    tokenAddress TEXT NOT NULL,
    tokenStaked INTEGER NOT NULL,
    bountyStartTime INTEGER NOT NULL,
    bountyEndTime INTEGER NOT NULL,
    FOREIGN KEY (bountyId) REFERENCES Bounty(bountyId)
);

-- Table for champ payouts
CREATE TABLE PayoutData (
    champsId TEXT PRIMARY KEY,
    bountyId TEXT NOT NULL,
    tokenAmount INTEGER NOT NULL,
    userId TEXT NOT NULL,
    FOREIGN KEY (bountyId) REFERENCES Bounty(bountyId)
);