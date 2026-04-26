import type { ProviderSettingsReconciler } from '../../../core/providers/types';
import type { Conversation } from '../../../core/types';
import { DEFAULT_QWEN_MODEL } from '../modelOptions';
import { isQwenSettings } from '../settings';

export const qwenSettingsReconciler: ProviderSettingsReconciler = {
  reconcileModelWithEnvironment(
    settings: Record<string, unknown>,
    conversations: Conversation[],
  ): { changed: boolean; invalidatedConversations: Conversation[] } {
    const invalidated: Conversation[] = [];
    let changed = false;

    if (!isQwenSettings(settings)) {
      return { changed, invalidatedConversations: invalidated };
    }

    // 检查环境变量中的QWEN_MODEL
    const envModel = process.env.QWEN_MODEL;
    if (envModel && settings.model !== envModel) {
      settings.model = envModel;
      changed = true;
    }

    return { changed, invalidatedConversations: invalidated };
  },

  normalizeModelVariantSettings(settings: Record<string, unknown>): boolean {
    if (!isQwenSettings(settings)) {
      return false;
    }

    let changed = false;

    if (!settings.model) {
      settings.model = DEFAULT_QWEN_MODEL;
      changed = true;
    }

    return changed;
  },
};
