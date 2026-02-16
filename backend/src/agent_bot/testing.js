const {initChatModel} = require("langchain")
const {AzureChatOpenAI} = require("@langchain/openai")
const {MultiServerMCPClient} = require("@langchain/mcp-adapters")

 

const llm = new AzureChatOpenAI({
  model: "",
  azureOpenAIApiKey: "",
  azureOpenAIApiEndpoint: "",
  azureOpenAIApiVersion: "",
  azureOpenAIApiInstanceName : "",
  azureOpenAIApiDeploymentName : ""
});

console.log("Successfully Initialized the llm model")

// Creating the MCP to the Mongo DB

const client = new MultiServerMCPClient({
      mongodb : {
          url : "",
          
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
}

run_agent()



