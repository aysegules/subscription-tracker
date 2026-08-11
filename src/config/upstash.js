import { Client } from "@upstash/workflow";

const workflowClient = new Client({
  baseUrl: process.env.QSTASH_URL,
  token: process.env.QSTASH_TOKEN,
});

export { workflowClient };
