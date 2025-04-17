export interface AgentConfig {
  name: string;
  description: string;
  tools: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: {
        [key: string]: {
          type: string;
          description: string;
        };
      };
      required: string[];
    };
  }[];
  systemPrompt: string;
}