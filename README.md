# Claudian

![GitHub stars](https://img.shields.io/github/stars/YishenTu/claudian?style=social)
![GitHub release](https://img.shields.io/github/v/release/YishenTu/claudian)
![License](https://img.shields.io/github/license/YishenTu/claudian)

![Preview](Preview.png)

An Obsidian plugin that embeds Qwen Code AI coding agent in your vault. Your vault becomes the agent's working directory — file read/write, search, bash, and multi-step workflows all work out of the box.

## Features & Usage

Open the chat sidebar from the ribbon icon or command palette. Select text and use the hotkey for inline edit. Everything works like Qwen Code — talk to the agent, and it reads, writes, edits, and searches files in your vault.

**Inline Edit** — Select text or start at the cursor position + hotkey to edit directly in notes with word-level diff preview.

**Slash Commands & Skills** — Type `/` or `$` for reusable prompt templates or Skills from user- and vault-level scopes.

**`@mention`** - Type `@` to mention anything you want the agent to work with, vault files, subagents, MCP servers, or files in external directories.

**Plan Mode** — Toggle via `Shift+Tab`. The agent explores and designs before implementing, then presents a plan for approval.

**Instruction Mode (`#`)** — Refined custom instructions added from the chat input.

**MCP Servers** — Connect external tools via Model Context Protocol (stdio, SSE, HTTP). Qwen manages vault MCP in-app using its own CLI-managed MCP configuration.

**Multi-Tab & Conversations** — Multiple chat tabs, conversation history, fork, resume, and compact.

## Requirements

- **Qwen provider**: [Qwen Code CLI](https://github.com/QwenLM/qwen-code) installed (brew install qwen or npm install -g @qwen/cli recommended).
- Obsidian v1.4.5+
- Desktop only (macOS, Linux, Windows)

## Installation

### From GitHub Release (recommended)

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/YishenTu/claudian/releases/latest)
2. Create a folder called `claudian` in your vault's plugins folder:
   ```
   /path/to/vault/.obsidian/plugins/claudian/
   ```
3. Copy the downloaded files into the `claudian` folder
4. Enable the plugin in Obsidian:
   - Settings → Community plugins → Enable "Claudian"

### Using BRAT

[BRAT](https://github.com/TfTHacker/obsidian42-brat) (Beta Reviewers Auto-update Tester) allows you to install and automatically update plugins directly from GitHub.

1. Install the BRAT plugin from Obsidian Community Plugins
2. Enable BRAT in Settings → Community plugins
3. Open BRAT settings and click "Add Beta plugin"
4. Enter the repository URL: `https://github.com/YishenTu/claudian`
5. Click "Add Plugin" and BRAT will install Claudian automatically
6. Enable Claudian in Settings → Community plugins

> **Tip**: BRAT will automatically check for updates and notify you when a new version is available.

### From source (development)

1. Clone this repository into your vault's plugins folder:
   ```bash
   cd /path/to/vault/.obsidian/plugins
   git clone https://github.com/YishenTu/claudian.git
   cd claudian
   ```

2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

3. Enable the plugin in Obsidian:
   - Settings → Community plugins → Enable "Claudian"

### Development

```bash
# Watch mode
npm run dev

# Production build
npm run build
```

> **Tip**: Copy `.env.local.example` to `.env.local` or `npm install` and setup your vault path to auto-copy files during development.

## Privacy & Data Use

- **Sent to API**: Your input, attached files, images, and tool call outputs. Default: Alibaba Cloud (Qwen); configurable via Qwen CLI settings.
- **Local storage**: Claudian settings and session metadata in `vault/.claudian/`; Qwen provider files in `vault/.qwen/`; transcripts in `~/.qwen/projects/`.
- **No telemetry**: No tracking beyond your configured API provider.

## Troubleshooting

### Qwen CLI not found

If you encounter `spawn qwen ENOENT` or `Qwen CLI not found`, the plugin can't auto-detect your Qwen installation. Common with Node version managers (nvm, fnm, volta).

**Solution**: Find your CLI path and set it in Settings → Qwen → Qwen CLI path.

| Platform | Command | Example Path |
|----------|---------|--------------|
| macOS/Linux | `which qwen` | `/opt/homebrew/bin/qwen` or `/Users/you/.volta/bin/qwen` |
| Windows (native) | `where.exe qwen` | `C:\Users\you\AppData\Roaming\npm\qwen.exe` |
| Windows (npm) | `npm root -g` | `{root}\@qwen\cli\bin\qwen.js` |

> **Note**: On Windows, avoid `.cmd` wrappers. Use `qwen.exe` or `qwen.js`.

### Node.js not found

If you encounter `env: node not found` error, Obsidian can't find your Node.js installation.

**Solution**: Find your Node.js path and set it in Settings → Qwen → Node.js path.

| Platform | Command | Example Path |
|----------|---------|--------------|
| macOS/Linux | `which node` | `/opt/homebrew/bin/node` |
| Windows | `where.exe node` | `C:\Program Files\nodejs\node.exe` |

**Alternative**: Add your Node.js bin directory to PATH in Settings → Environment → Custom variables.

## Architecture

```
src/
├── main.ts                      # Plugin entry point
├── app/                         # Shared defaults and plugin-level storage
├── core/                        # Provider-neutral runtime, registry, and type contracts
│   ├── runtime/                 # ChatRuntime interface and approval types
│   ├── providers/               # Provider registry and workspace services
│   ├── security/                # Approval utilities
│   └── ...                      # commands, mcp, prompt, storage, tools, types
├── providers/
│   └── qwen/                    # Qwen Code SDK adaptor, prompt encoding, storage, MCP, plugins
├── features/
│   ├── chat/                    # Sidebar chat: tabs, controllers, renderers
│   ├── inline-edit/             # Inline edit modal and provider-backed edit services
│   └── settings/                # Settings shell with provider tabs
├── shared/                      # Reusable UI components and modals
├── i18n/                        # Internationalization (10 locales)
├── utils/                       # Cross-cutting utilities
└── style/                       # Modular CSS
```

## Roadmap

- [x] Qwen Code provider full integration
- [x] Custom Node.js path configuration
- [ ] More model support
- [ ] More features to come!

## License

Licensed under the [MIT License](LICENSE).

## Star History

<a href="https://www.star-history.com/?repos=YishenTu%2Fclaudian&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=YishenTu/claudian&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=YishenTu/claudian&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/image?repos=YishenTu/claudian&type=date&legend=top-left" />
 </picture>
</a>

## Acknowledgments

- [Obsidian](https://obsidian.md) for the plugin API
- [Alibaba Cloud Qwen](https://tongyi.aliyun.com/qwen) for Qwen Code and the [Qwen Agent SDK](https://github.com/QwenLM/qwen-code)
