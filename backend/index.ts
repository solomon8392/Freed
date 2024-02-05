import { Octokit } from "@octokit/core";

import initPaginator from "@/Library/utils/paginateData";
import poll from "@/Library/utils/poll";

type ResType = "creation" | "payout" | "enquiry" | "unclear";

interface GemResponse {
  type: ResType;
  data: CreationData | PayoutData | EnquiryData | UnclearData;
}

interface CreationData {
  details: {
    tokenAmount: number;
    tokenAddress: string;
    tokenStaked: number;
    bountyStartTime: number;
    bountyEndTime: number;
  };
  missingFields: string[];
}

interface PayoutData {
  champs: {
    userId: string;
    amount: string;
  }[];
}

interface EnquiryData {
  response: string;
}

interface UnclearData {
  response: string;
}

// Initialize Octokit with your GitHub token
const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

async function callGemini(notification: any): Promise<GemResponse> {
  return new Promise((resolve) => {
    resolve({
      type: "unclear",
      data: { response: "Example response" },
    });
  });
}

// Function to post a comment on GitHub, adjusted to use the types provided
async function postComment(
  owner: string,
  repo: string,
  issueNumber: number,
  gemResponse: GemResponse
) {
  let commentBody = "";

  switch (gemResponse.type) {
    case "creation":
      commentBody = `Bounty creation initiated. Missing fields: ${(
        gemResponse.data as CreationData
      ).missingFields.join(", ")}`;
      break;
    case "payout":
      commentBody = `Payout process started for user IDs: ${(
        gemResponse.data as PayoutData
      ).champs
        .map((champ) => champ.userId)
        .join(", ")}`;
      break;
    case "enquiry":
      commentBody = (gemResponse.data as EnquiryData).response;
      break;
    case "unclear":
      commentBody = (gemResponse.data as UnclearData).response;
      break;
  }

  try {
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner,
        repo,
        issue_number: issueNumber,
        body: commentBody,
      }
    );
  } catch (error) {
    console.error("Error posting comment:", error);
  }
}

const getPaginatedData = initPaginator(octokit);

// Function to process GitHub notifications, incorporating call to Gemini
async function processNotifications() {
  try {
    const notifications = await getPaginatedData("/notifications", {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      participating: true,
    });

    for (const notification of notifications) {
      const issueNumber = parseInt(notification.subject.url.split("/").pop());
      const { owner, repo } = notification.repository;

      // get all the comments from the issues comments url
      const comments = await getPaginatedData(
        "/repos/{owner}/{repo}/issues/{issue_number}/comments",
        {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          owner,
          repo,
          issue_number: issueNumber,
        }
      );

      // AI_TODO: implement a reverse (lifo) map to get the {id, body, user.id} if it exists in the db completely stop the rest of the map traversing from executing

      // else send store details in db and pass body to callGemini
      // when reach the end of the index mark the notification as read

      // const gemResponse = await callGemini(notification);
      // await postComment(owner.login, repo, issueNumber, gemResponse);
    }
  } catch (error) {
    console.error("Failed to process notifications:", error);
  }
}

// Main function to start the notification processing loop
async function main() {
  await poll({
    callFn: processNotifications,
    period: 5000, // Poll every 5 seconds
    condition: () => false, // This example keeps polling indefinitely. Adjust as needed.
  });
}

// main().catch(console.error);
