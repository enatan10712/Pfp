export interface AssistantConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  stream: boolean;
}

export const assistantConfig: AssistantConfig = {
  model: "gpt-4-turbo", // Default placeholder
  temperature: 0.7,
  maxTokens: 500,
  stream: true,
};
