import type { ProviderRegistration } from '../../core/providers/types';
import { getQwenWorkspaceServices } from './app/QwenWorkspaceServices';
import { QWEN_PROVIDER_CAPABILITIES } from './capabilities';
import { qwenSettingsReconciler } from './env/QwenSettingsReconciler';
import { QwenChatRuntime } from './runtime/QwenChatRuntime';
import { qwenCliResolver } from './runtime/QwenCliResolver';
import { qwenChatUIConfig } from './ui/QwenChatUIConfig';

// 空实现不需要的服务
class DummyService {
  async *process() { return null; }
  async processText() { return ''; }
  async generateTitle() { return ''; }
  async refineInstruction() { return ''; }
  async applyEdit() { return true; }
  getToolCallForEdit() { return null; }
}

class DummyHistoryService {
  async getSessions() { return []; }
  async getSession() { return null; }
  async saveSession() {}
  async deleteSession() {}
  async rewindSession() { return null; }
  async branchSession() { return null; }
  async renameSession() {}
  async searchMessages() { return []; }
  async hydrateConversationHistory() { return []; }
  isPendingForkConversation() { return false; }
}

class DummyResultInterpreter {
  async *processTurnResult() { return null; }
}

export const qwenProviderRegistration: ProviderRegistration = {
  displayName: 'Qwen Code',
  blankTabOrder: 30,
  isEnabled: () => true,
  capabilities: QWEN_PROVIDER_CAPABILITIES,
  environmentKeyPatterns: [/^QWEN_/i],
  chatUIConfig: qwenChatUIConfig,
  settingsReconciler: qwenSettingsReconciler,
  createRuntime: ({ plugin }) => {
    return new QwenChatRuntime(plugin, {
      cliResolver: qwenCliResolver,
    });
  },
  createTitleGenerationService: () => new DummyService() as any,
  createInstructionRefineService: () => new DummyService() as any,
  createInlineEditService: () => new DummyService() as any,
  historyService: new DummyHistoryService() as any,
  taskResultInterpreter: new DummyResultInterpreter() as any,
};
