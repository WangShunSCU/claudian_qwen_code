import { ProviderRegistry } from '../core/providers/ProviderRegistry';
import { ProviderWorkspaceRegistry } from '../core/providers/ProviderWorkspaceRegistry';
import { qwenWorkspaceRegistration } from './qwen/app/QwenWorkspaceServices';
import { qwenProviderRegistration } from './qwen/registration';

let builtInProvidersRegistered = false;

export function registerBuiltInProviders(): void {
  if (builtInProvidersRegistered) {
    return;
  }

  ProviderRegistry.register('qwen', qwenProviderRegistration);
  ProviderWorkspaceRegistry.register('qwen', qwenWorkspaceRegistration);
  builtInProvidersRegistered = true;
}

registerBuiltInProviders();
