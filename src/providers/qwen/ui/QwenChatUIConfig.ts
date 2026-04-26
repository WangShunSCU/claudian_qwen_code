import type { ProviderChatUIConfig, ProviderUIOption } from '../../../core/providers/types';
import { DEFAULT_REASONING_EFFORT } from '../modelOptions';
import { isQwenSettings } from '../settings';

export const qwenChatUIConfig: ProviderChatUIConfig = {
  getModelOptions(settings: Record<string, unknown>): ProviderUIOption[] {
    // 模型由Qwen Code自身配置管理，不在插件中提供选择
    return [{
      value: 'default',
      label: 'Qwen Code 默认模型',
      description: '使用Qwen Code settings.json中配置的模型',
    }];
  },

  ownsModel(model: string, settings: Record<string, unknown>): boolean {
    return true; // 所有模型都由Qwen Code管理
  },

  isAdaptiveReasoningModel(model: string): boolean {
    return true;
  },

  getReasoningOptions(model: string): ProviderUIOption[] {
    return [
      { value: 'low', label: '低', description: '更快响应，更少推理' },
      { value: 'medium', label: '中', description: '平衡速度和推理深度' },
      { value: 'high', label: '高', description: '最深层推理，更慢响应' },
    ];
  },

  getDefaultReasoningValue(model: string): string {
    return DEFAULT_REASONING_EFFORT;
  },

  getContextWindowSize(model: string, customLimits?: Record<string, number>): number {
    return customLimits?.[model] || 131072; // 使用默认上下文窗口
  },

  isDefaultModel(model: string): boolean {
    return true;
  },

  applyModelDefaults(model: string, settings: unknown): void {
    // 模型配置由Qwen Code管理，不需要在插件中保存
  },

  normalizeModelVariant(model: string, settings: Record<string, unknown>): string {
    return 'default';
  },

  getCustomModelIds(envVars: Record<string, string>): Set<string> {
    return new Set(); // 不需要自定义模型，由Qwen自身配置
  },

  getProviderIcon() {
    // 官方 Qwen SVG 图标
    return {
      viewBox: '0 0 1024 1024',
      path: 'M512 0C229.226667 0 0 229.226667 0 512s229.226667 512 512 512 512-229.226667 512-512S794.773333 0 512 0zm235.306667 364.842667c11.050667 0 19.968 8.917333 19.968 19.968v274.346666c0 11.050667-8.917333 19.968-19.968 19.968H579.84c-10.837333 0-19.626667-8.576-19.968-19.349333l-17.066667-47.786667c-15.146667 12.885333-35.712 20.565333-57.770666 20.565333-67.797333 0-122.752-54.954667-122.752-122.752s54.954667-122.752 122.752-122.752c22.058667 0 42.624 7.68 57.770666 20.565333l17.066667-47.786666c0.341333-10.773333 9.130667-19.349334 19.968-19.349334h167.466667zM512 458.752c-29.397333 0-53.248 23.850667-53.248 53.248s23.850667 53.248 53.248 53.248 53.248-23.850667 53.248-53.248-23.850667-53.248-53.248-53.248z',
    };
  },

  getPermissionModeToggle() {
    return null;
  },

  getServiceTierToggle(settings: Record<string, unknown>) {
    return null;
  },

  isBangBashEnabled(settings: Record<string, unknown>) {
    return true;
  },
};
