import type {
  ProviderSettingsTabRenderer,
  ProviderSettingsTabRendererContext,
} from '../../../core/providers/types';
import type { QwenSettings } from '../types';

export class QwenSettingsTabRenderer implements ProviderSettingsTabRenderer {
  render(container: HTMLElement, context: ProviderSettingsTabRendererContext): void {
    container.empty();

    // 先渲染静态内容，避免读取配置出错
    container.createEl('h3', { text: 'Qwen Code 设置' });

    // CLI路径设置
    const cliPathSetting = container.createDiv({ cls: 'setting-item' });
    const cliInfo = cliPathSetting.createDiv({ cls: 'setting-item-info' });
    cliInfo.createDiv({ cls: 'setting-item-name', text: 'Qwen Code CLI 路径' });
    cliInfo.createDiv({ cls: 'setting-item-description', text: 'Qwen Code 可执行文件的完整路径，留空会自动查找，例如 ~/.qwen/bin/qwen' });
    const cliControl = cliPathSetting.createDiv({ cls: 'setting-item-control' });
    const cliInput = cliControl.createEl('input', {
      type: 'text',
      placeholder: '/Users/yourname/.qwen/bin/qwen',
    });
    
    // 安全读取配置
    let qwenSettings: QwenSettings = {
      reasoningEffort: 'medium',
      enableMcp: true,
    };
    try {
      if (context?.plugin?.settings?.providerConfigs?.qwen) {
        qwenSettings = context.plugin.settings.providerConfigs.qwen as QwenSettings;
      }
      // 回填配置值
      if (qwenSettings.qwenCliPath) {
        cliInput.value = qwenSettings.qwenCliPath;
      }
    } catch (e) {
      console.error('读取Qwen配置失败', e);
    }

    cliInput.addEventListener('change', async () => {
      try {
        qwenSettings.qwenCliPath = cliInput.value.trim() || undefined;
        await context.plugin.saveSettings();
        context.refreshModelSelectors();
      } catch (e) {
        console.error('保存CLI路径失败', e);
      }
    });

    // Node路径设置
    const nodePathSetting = container.createDiv({ cls: 'setting-item' });
    const nodeInfo = nodePathSetting.createDiv({ cls: 'setting-item-info' });
    nodeInfo.createDiv({ cls: 'setting-item-name', text: 'Node.js 可执行文件路径' });
    nodeInfo.createDiv({ cls: 'setting-item-description', text: 'Node.js 可执行文件的完整路径，留空会自动使用 /opt/homebrew/bin/node，例如 /usr/local/bin/node' });
    const nodeControl = nodePathSetting.createDiv({ cls: 'setting-item-control' });
    const nodeInput = nodeControl.createEl('input', {
      type: 'text',
      placeholder: '/opt/homebrew/bin/node',
    });
    // 回填配置值
    if (qwenSettings.nodePath) {
      nodeInput.value = qwenSettings.nodePath;
    }

    nodeInput.addEventListener('change', async () => {
      try {
        qwenSettings.nodePath = nodeInput.value.trim() || undefined;
        await context.plugin.saveSettings();
      } catch (e) {
        console.error('保存Node路径失败', e);
      }
    });

    // 默认推理强度
    const effortSetting = container.createDiv({ cls: 'setting-item' });
    const effortInfo = effortSetting.createDiv({ cls: 'setting-item-info' });
    effortInfo.createDiv({ cls: 'setting-item-name', text: '默认推理强度' });
    effortInfo.createDiv({ cls: 'setting-item-description', text: 'Qwen Code 生成回答时的推理深度，强度越高回答越准确但速度越慢' });
    const effortControl = effortSetting.createDiv({ cls: 'setting-item-control' });
    const effortSelect = effortControl.createEl('select');
    const effortOptions = [
      { value: 'low', label: '低 - 最快响应' },
      { value: 'medium', label: '中 - 平衡速度和质量' },
      { value: 'high', label: '高 - 最强推理能力' },
    ];
    effortOptions.forEach(opt => {
      const option = effortSelect.createEl('option', { value: opt.value, text: opt.label });
      if ((qwenSettings.reasoningEffort || 'medium') === opt.value) {
        option.selected = true;
      }
    });
    effortSelect.addEventListener('change', async () => {
      try {
        qwenSettings.reasoningEffort = effortSelect.value as any;
        await context.plugin.saveSettings();
      } catch (e) {
        console.error('保存推理强度失败', e);
      }
    });

    // 启用MCP支持
    const mcpSetting = container.createDiv({ cls: 'setting-item' });
    const mcpInfo = mcpSetting.createDiv({ cls: 'setting-item-info' });
    mcpInfo.createDiv({ cls: 'setting-item-name', text: '启用 MCP 工具支持' });
    mcpInfo.createDiv({ cls: 'setting-item-description', text: '是否启用 Model Context Protocol 工具调用功能' });
    const mcpControl = mcpSetting.createDiv({ cls: 'setting-item-control' });
    const mcpInput = mcpControl.createEl('input', {
      type: 'checkbox',
      checked: qwenSettings.enableMcp !== false,
    });
    mcpInput.addEventListener('change', async () => {
      try {
        qwenSettings.enableMcp = mcpInput.checked;
        await context.plugin.saveSettings();
      } catch (e) {
        console.error('保存MCP设置失败', e);
      }
    });

    // 提示信息
    const hintSetting = container.createDiv({ cls: 'setting-item' });
    const hintInfo = hintSetting.createDiv({ cls: 'setting-item-info' });
    hintInfo.createDiv({ cls: 'setting-item-name', text: '模型和API配置' });
    hintInfo.createDiv({ cls: 'setting-item-description', 
      text: '模型选择、API密钥、代理等配置请直接在 Qwen Code 自身的 settings.json 中配置，插件会自动继承这些配置，无需重复设置。' 
    });
  }
}
