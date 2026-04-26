import type ClaudianPlugin from '../../../main';
import type { TitleGenerationService, TitleGenerationResult } from '../../../core/providers/types';

export class QwenTitleGenerationService implements TitleGenerationService {
  private plugin: ClaudianPlugin;
  private abortController: AbortController | null = null;

  constructor(plugin: ClaudianPlugin) {
    this.plugin = plugin;
  }

  async generateTitle(
    conversationId: string,
    userMessage: string,
    callback: (conversationId: string, result: TitleGenerationResult) => Promise<void>,
  ): Promise<void> {
    this.abortController = new AbortController();

    try {
      // 简化实现：使用消息的前20个字符作为标题
      const title = userMessage.length > 20 ? userMessage.substring(0, 20) + '...' : userMessage;
      await callback(conversationId, { success: true, title });
    } catch (e) {
      await callback(conversationId, { success: false, error: String(e) });
    }
  }

  cancel(): void {
    this.abortController?.abort();
  }
}
