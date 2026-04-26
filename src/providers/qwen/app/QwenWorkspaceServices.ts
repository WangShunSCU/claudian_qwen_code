import type {
  ProviderWorkspaceInitContext,
  ProviderWorkspaceRegistration,
  ProviderWorkspaceServices,
  ManagedMcpServer,
} from '../../../core/providers/types';
import { qwenCliResolver } from '../runtime/QwenCliResolver';
import { QwenSettingsTabRenderer } from '../ui/QwenSettingsTab';

let qwenWorkspaceServices: ProviderWorkspaceServices | null = null;

export function getQwenWorkspaceServices(): ProviderWorkspaceServices | null {
  return qwenWorkspaceServices;
}

// 空实现的MCP管理器，避免初始化报错
const dummyMcpManager = {
  load: async (): Promise<ManagedMcpServer[]> => [],
  save: async (): Promise<void> => {},
  startServer: async (): Promise<void> => {},
  stopServer: async (): Promise<void> => {},
  getRunningServers: (): ManagedMcpServer[] => [],
  getServers: (): ManagedMcpServer[] => [],
  getContextSavingServers: (): ManagedMcpServer[] => [],
};

export const qwenWorkspaceRegistration: ProviderWorkspaceRegistration = {
  async initialize(context: ProviderWorkspaceInitContext): Promise<ProviderWorkspaceServices> {
    if (qwenWorkspaceServices) {
      return qwenWorkspaceServices;
    }

    // 初始化服务
    const services: ProviderWorkspaceServices = {
      cliResolver: qwenCliResolver,
      settingsTabRenderer: new QwenSettingsTabRenderer(),
      mcpServerManager: dummyMcpManager as any,
      agentService: {
        async initialize() {},
        getAgent() {
          return {
            sendRequest: async () => {},
          };
        },
        cleanup: async () => {},
      },
      cleanup: async () => {},
    };

    qwenWorkspaceServices = services;
    return services;
  },
};
