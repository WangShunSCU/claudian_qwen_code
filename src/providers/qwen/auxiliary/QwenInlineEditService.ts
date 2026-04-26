import type ClaudianPlugin from '../../../main';
import type {
  InlineEditRequest,
  InlineEditResult,
  InlineEditService,
} from '../../../core/providers/types';

export class QwenInlineEditService implements InlineEditService {
  constructor(plugin: ClaudianPlugin) {}

  resetConversation(): void {
    // 简化实现
  }

  async editText(request: InlineEditRequest): Promise<InlineEditResult> {
    // 简化实现：暂时返回原内容
    if (request.mode === 'selection') {
      return {
        success: true,
        editedText: request.selectedText,
      };
    } else {
      return {
        success: true,
        insertedText: '',
      };
    }
  }

  async continueConversation(
    message: string,
    contextFiles?: string[] | undefined,
  ): Promise<InlineEditResult> {
    return {
      success: true,
      editedText: '',
    };
  }

  cancel(): void {
    // 简化实现
  }
}
