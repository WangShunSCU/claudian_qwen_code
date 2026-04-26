import type ClaudianPlugin from '../../../main';
import type {
  InstructionRefineResult,
  InstructionRefineService,
  RefineProgressCallback,
} from '../../../core/providers/types';

export class QwenInstructionRefineService implements InstructionRefineService {
  constructor(plugin: ClaudianPlugin) {}

  resetConversation(): void {
    // 简化实现
  }

  async refineInstruction(
    rawInstruction: string,
    existingInstructions: string,
    onProgress?: RefineProgressCallback,
  ): Promise<InstructionRefineResult> {
    // 简化实现：直接返回原始指令
    return {
      refinedInstruction: rawInstruction,
      needsMoreInformation: false,
    };
  }

  async continueConversation(
    message: string,
    onProgress?: RefineProgressCallback,
  ): Promise<InstructionRefineResult> {
    return {
      refinedInstruction: message,
      needsMoreInformation: false,
    };
  }

  cancel(): void {
    // 简化实现
  }
}
