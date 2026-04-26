import type { QwenModel } from './types';

// 模型列表直接从Qwen Code自身的配置继承，不在插件中硬编码
export const QWEN_DEFAULT_MODELS: QwenModel[] = [];

export const DEFAULT_QWEN_MODEL = 'default'; // 使用Qwen默认配置的模型
export const DEFAULT_REASONING_EFFORT = 'medium';
