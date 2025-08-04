#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { busTools, handleBusTool } from "./bus.js";
import { classTools, handleClassTool } from "./classes.js";
import { diningTools, handleDiningTool } from "./dining.js";
import { parkingTools, handleParkingTool } from "./parking.js";

const server = new Server(
  {
    name: "osu-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const allTools = [
  ...busTools,
  ...classTools, 
  ...diningTools,
  ...parkingTools
];

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (busTools.some(tool => tool.name === name)) {
      return await handleBusTool(name, args || {});
    }
    
    if (classTools.some(tool => tool.name === name)) {
      return await handleClassTool(name, args || {});
    }
    
    if (diningTools.some(tool => tool.name === name)) {
      return await handleDiningTool(name, args || {});
    }
    
    if (parkingTools.some(tool => tool.name === name)) {
      return await handleParkingTool(name, args || {});
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Error: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("OSU MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});