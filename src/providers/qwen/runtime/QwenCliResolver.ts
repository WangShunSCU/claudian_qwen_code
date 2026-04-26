import type { ProviderCliResolver } from '../../../core/providers/types';
import { isQwenSettings } from '../settings';
import * as fs from 'fs/promises';
import * as path from 'path';

class QwenCliResolverImpl implements ProviderCliResolver {
  private cachedPath: string | null = null;

  resolveFromSettings(settings: Record<string, unknown>): string | null {
    if (this.cachedPath) {
      return this.cachedPath;
    }

    if (isQwenSettings(settings) && settings.qwenCliPath) {
      this.cachedPath = settings.qwenCliPath;
      return this.cachedPath;
    }

    // 尝试自动查找qwen cli
    const possiblePaths = [
      '/usr/local/bin/qwen',
      '/opt/homebrew/bin/qwen',
      path.join(process.env.HOME || '', '.qwen/bin/qwen'),
      path.join(process.env.HOME || '', '.volta/bin/qwen'),
      path.join(process.env.HOME || '', '.nvm/versions/node/current/bin/qwen'),
    ];

    // 同步检查（因为这个方法是同步的）
    for (const p of possiblePaths) {
      try {
        if (require('fs').existsSync(p)) {
          this.cachedPath = p;
          return p;
        }
      } catch (e) {
        // ignore
      }
    }

    return null;
  }

  reset(): void {
    this.cachedPath = null;
  }
}

export const qwenCliResolver = new QwenCliResolverImpl();
