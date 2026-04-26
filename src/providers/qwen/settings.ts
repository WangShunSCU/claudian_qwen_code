import { DEFAULT_QWEN_MODEL, DEFAULT_REASONING_EFFORT } from './modelOptions';
import type { QwenSettings } from './types';

export const DEFAULT_QWEN_SETTINGS: QwenSettings = {
  model: DEFAULT_QWEN_MODEL,
  reasoningEffort: DEFAULT_REASONING_EFFORT,
  enableMcp: true,
  customEnvironment: {},
  nodePath: '',
};

export function isQwenSettings(settings: unknown): settings is QwenSettings {
  return typeof settings === 'object' && settings !== null;
}
