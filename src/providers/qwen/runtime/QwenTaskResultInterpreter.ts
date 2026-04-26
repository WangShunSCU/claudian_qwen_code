import type { ProviderTaskResultInterpreter, ProviderTaskTerminalStatus } from '../../../core/providers/types';

export class QwenTaskResultInterpreter implements ProviderTaskResultInterpreter {
  hasAsyncLaunchMarker(toolUseResult: unknown): boolean {
    return false;
  }

  extractAgentId(toolUseResult: unknown): string | null {
    return null;
  }

  extractStructuredResult(toolUseResult: unknown): string | null {
    if (typeof toolUseResult === 'string') {
      return toolUseResult;
    }
    return JSON.stringify(toolUseResult);
  }

  resolveTerminalStatus(
    toolUseResult: unknown,
    fallbackStatus: ProviderTaskTerminalStatus,
  ): ProviderTaskTerminalStatus {
    return fallbackStatus;
  }

  extractTagValue(payload: string, tagName: string): string | null {
    const regex = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 's');
    const match = payload.match(regex);
    return match ? match[1].trim() : null;
  }
}
