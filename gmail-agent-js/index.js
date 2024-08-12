const { AgentExecutor, createToolCallingAgent } = require("langchain/agents");
const { LangchainToolSet } = require("composio-core");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatMistralAI } = require("@langchain/mistralai");

const toolset = new LangchainToolSet({ apiKey: process.env.COMPOSIO_API_KEY });

async function setupUserConnection(entityId) {
  const entity = toolset.client.getEntity(entityId);
  const connection = await entity.getConnection("gmail");

  if (!connection) {
    // If this entity/user hasn't already connected the account
    const connection = await entity.initiateConnection("gmail");
    console.log("Log in via: ", connection.redirectUrl);
    return connection.waitUntilActive(100);
  }

  return connection;
}

async function executeAgent(entityName) {
  // Create entity and get tools

  const entity = await toolset.client.getEntity(entityName);
  await setupUserConnection(entity.id);
  const tools = await toolset.getActions(
    {
      actions: [
        "gmail_send_email",
        "gmail_fetch_emails",
        "gmail_create_email_draft",
        "gmail_create_label",
      ],
    },
    entity.id
  );

  const llm = new ChatMistralAI({
    model: "mistral-large-latest",
    apiKey: process.env.MISTRAL_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an AI email assistant that can write, fetch, and manage emails and labels. Follow the user’s instructions carefully and perform the requested actions. If fetching emails, print the Subject and Mail content in a readable format.",
    ],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const agent = await createToolCallingAgent({
    llm,
    tools: tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({ agent, tools, verbose: true });
  const result = await agentExecutor.invoke({
    input: "Send a mail to example@gmail.com saying hi",
  });

  console.log(result.output);
}

executeAgent("arunabh");
