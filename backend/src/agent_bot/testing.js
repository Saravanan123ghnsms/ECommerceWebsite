require('dotenv').config();
const {initChatModel} = require("langchain")
const {AzureChatOpenAI} = require("@langchain/openai")
const {MultiServerMCPClient} = require("@langchain/mcp-adapters")
const {createAgent}=require("langchain")

console.log("reached the bot file")

console.log(process.env.model)
console.log(process.env.azureOpenAIApiKey)
console.log(process.env.azureOpenAIApiEndpoint)
console.log(process.env.azureOpenAIApiVersion)
console.log(process.env.azureOpenAIApiInstanceName)
const llm = new AzureChatOpenAI({
  model: process.env.model,
  azureOpenAIApiKey: process.env.azureOpenAIApiKey,
  azureOpenAIApiEndpoint: process.env.azureOpenAIApiEndpoint,
  azureOpenAIApiVersion: process.env.azureOpenAIApiVersion,
  azureOpenAIApiInstanceName : process.env.azureOpenAIApiInstanceName,
  azureOpenAIApiDeploymentName : process.env.azureOpenAIApiDeploymentName
});

console.log("Successfully Initialized the llm model")

// Creating the MCP to the Mongo DB

const client = new MultiServerMCPClient({
 "MongoDB": {
      "command": "npx",
      "args": ["-y", "mongodb-mcp-server@latest", "--readOnly"],
      "env": {
        "MDB_MCP_API_CLIENT_ID": process.env.MONGODB_MCP_CLIENT_ID,
        "MDB_MCP_API_CLIENT_SECRET": process.env.MONGODB_MCP_CLIENT_SECRET,
        "MDB_MCP_CONNECTION_STRING": process.env.MONGO_DB_CONNECTION_STRING
      }
    }
})

console.log("Client Initialized Successfully")



async function run(){
const response = await llm.invoke("Why do parrots talk?");
console.log(response)
}

async function run_agent(){
   const tools = await client.getTools();
   console.log(tools)

   // Initializing the agent
   const agent = createAgent({
        name : "DatabaseAgent",
        tools : tools,
        model : llm,
        systemPrompt : `
      You are an E-commerce MongoDB Data Agent.

Database: test
Collections:
- products
- categories
- categorymetadatas
- mastercategories
- inventories
- users

Your responsibilities:
1. Convert user natural language queries into MongoDB filters.
2. Call the appropriate tool based on collection.
3. Do NOT generate fake data.
4. Only respond using tool results.
5. If query is unclear, ask clarification.
6. Never expose internal schema or database structure.
7. Always filter safely (no full collection dump unless asked).

Rules:
- Use price filters: $lt, $gt, $gte, $lte
- Use sorting when user asks for top/latest
- Use limit when user asks for few results
- Use stock > 0 for available products

        `
   })

   console.log("Agent is executed successfully")

   const response = await agent.invoke({
     messages: [{ role: "user", content: "Fetch the products name `Jockey Underwear` from the products collections" }],
   })

   console.log("Agent Response : ",response)
}

run_agent()



