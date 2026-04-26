export interface QwenSettings {
  qwenCliPath?: string;
  nodePath?: string;
  model?: string;
  reasoningEffort?: 'low' | 'medium' | 'high';
  enableMcp?: boolean;
  customEnvironment?: Record<string, string>;
}

export interface QwenModel {
  id: string;
  name: string;
  contextWindow: number;
  description?: string;
}
