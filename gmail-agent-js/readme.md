# Building an AI Email Assistant with Mistral AI and Composio

This guide demonstrates how to build an AI-powered email assistant using Mistral AI and Composio in less than 50 lines of code! By using Mistral’s large language models (LLMs) and Composio’s Gmail tool, we can create a system capable of performing common Gmail actions such as sending, fetching, drafting emails etc., all through natural language commands.

## Setup and Dependencies

### Install dependencies - 

To install all dependencies, run: 

```
npm install
```

### Set up environment variables - 

Create a .env file in the root directory and add your API keys:

- Add the Mistral API key
- Add the Composio API key

### Run the program - 

```
npm run start
```

The script performs the following steps- 

- The API keys are loaded from the environment variables.
- Initializes Composio's toolset and actions associated with Gmail.
- Initializes Mistral's LLMs with custom prompt.
- Takes user input as task, the LLM populates the provided JSON schema and returns the output.

## Connect with Composio and learn more

If you encounter any problems, please let us know at out [Discord](https://discord.com/invite/cNruWaAhQk).

Check [Composio docs](https://docs.composio.dev/introduction/intro/overview) to learn more about how to use and integrate various tools.