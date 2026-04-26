import type { ProviderCapabilities } from '../../core/providers/types';

export const QWEN_PROVIDER_CAPABILITIES: ProviderCapabilities = {
  providerId: 'qwen' as const,
  supportsPersistentRuntime: true,
  supportsNativeHistory: true,
  supportsPlanMode: true,
  supportsRewind: true,
  supportsFork: true,
  supportsProviderCommands: true,
  supportsImageAttachments: true,
  supportsInstructionMode: true,
  supportsMcpTools: true,
  reasoningControl: 'effort',
  planPathPrefix: 'qwen-plan-',
};
