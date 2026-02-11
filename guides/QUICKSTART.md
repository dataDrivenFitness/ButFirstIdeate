# QUICKSTART
## The Vibe Coding Blueprint - Start Here

*Downloaded a bunch of files and not sure where to begin? This is your 5-minute guide.*

---

## What Do You Want To Do?

| Your Goal | Time Needed | Go To |
|-----------|-------------|-------|
| **"I have an app idea - should I build it?"** | 30 min | [Path A: Validate Your Idea](#path-a-validate-your-idea) |
| **"I'm ready to build something"** | 15 min setup | [Path B: Start Building](#path-b-start-building) |
| **"I want the full CLI experience"** | 15 min setup | [Path C: CLI Setup](#path-c-cli-setup-recommended-for-real-projects) |
| **"I use Claude Code, Cursor, or similar tools"** | 2 min | [Path D: AGENTS.md Setup](#path-d-agentsmd-setup-for-ai-tools) |
| **"I've never coded before"** | 30 min | [Read 01_vibe_coding_beginners_guide.md first](#never-coded-before) |

---

# Path A: Validate Your Idea

*Before you write any code, make sure you're building something worth building.*

## Step 1: Upload These Files to Claude.ai

Upload these 2 files to a new Claude.ai conversation:
- `02_vibe_coding_ideation_guide.md`
- `04_vibe_coding_caution_guide.md`

## Step 2: Paste This Prompt

```
I want to validate an app idea before building it. I've uploaded The Vibe Coding Blueprint guides.

Please read:
1. 02_vibe_coding_ideation_guide.md - for the ideation framework
2. 04_vibe_coding_caution_guide.md - for safety principles

Then guide me through ideation CONVERSATIONALLY using these rules:

=== HOW TO WORK WITH ME ===
- Ask ONE question at a time
- Dig deeper when my answers are vague
- Challenge assumptions that seem weak
- Tell me HONESTLY if my idea seems flawed
- Help me think through problems, don't just validate
- Push back on scope creep

=== WHAT WE'LL COVER ===
- The problem I'm solving and who has it
- What solutions already exist and their gaps
- My differentiation and unique value
- Technical feasibility given my skills
- Complexity classification (🟢 simple / 🟡 moderate / 🔴 complex)
- Go/No-Go recommendation

=== CAPTURE CHECKPOINTS ===
After each major topic, summarize what we've established so I can save it.

=== START ===
Ask me what I want to build and why. Be curious, not judgmental - but be honest.
```

## Step 3: Have the Conversation

Claude will guide you through validating your idea. Be honest in your answers - the goal is to find flaws NOW, not after you've built something nobody wants.

## What's Next?

After validation, if it's a GO:
- **Ready to build?** → [Path B: Start Building](#path-b-start-building)
- **Want full CLI power?** → [Path C: CLI Setup](#path-c-cli-setup-recommended-for-real-projects)
- **Using AI coding tools?** → [Path D: AGENTS.md Setup](#path-d-agentsmd-setup-for-ai-tools)

---

# Path B: Start Building

*You have an idea (validated or not) and you're ready to write code.*

## Step 1: Upload These Files to Claude.ai

Upload these 3 files to a new Claude.ai conversation:
- `04_vibe_coding_caution_guide.md`
- `05_vibe_coding_design_system_guide.md`
- `07_vibe_coding_complete_claude_md_template.md`

## Step 2: Paste This Prompt

```
I'm starting to build an app and want your help. I've uploaded The Vibe Coding Blueprint guides.

Please read:
1. 04_vibe_coding_caution_guide.md - CRITICAL safety rules (read this carefully)
2. 05_vibe_coding_design_system_guide.md - UI consistency patterns
3. 07_vibe_coding_complete_claude_md_template.md - development rules

=== MY PROJECT ===
App name: [YOUR APP NAME]
Description: [ONE SENTENCE - what does it do?]
Tech stack: [e.g., Flutter + Firebase, React Native, etc.]
My experience level: [beginner / intermediate / experienced]

=== COMPLEXITY CLASSIFICATION ===
Answer these to determine complexity:
- Does it handle protected data (health/financial/children's)? [yes/no]
- Does it need audit trails for compliance? [yes/no]
- Does it need offline mode with cloud sync? [yes/no]
- Is it multi-user with complex data relationships? [yes/no]

(Mostly "no" = 🟢 Simple | Some "yes" = 🟡 Moderate | Protected data or compliance = 🔴 Complex)

My classification: [🟢 simple / 🟡 moderate / 🔴 complex]

=== HOW TO WORK WITH ME ===
Based on my complexity level, follow these rules:

**If 🟢 SIMPLE:**
- Maximum 3-4 files per feature
- NO abstract classes or interfaces
- Screen → Provider → Service (3 layers max)
- Concrete classes only

**If 🟡 MODERATE:**
- Abstract data sources only for testing
- Repository pattern okay
- Still push back on unnecessary complexity

**If 🔴 COMPLEX:**
- Abstractions allowed WITH documentation
- Must justify each abstraction
- Still simpler is better

**ALWAYS:**
- Ask clarifying questions before writing code
- Tell me which files you'll create/modify
- NEVER run destructive git commands (reset --hard, clean -fd, etc.)
- Challenge me if I'm overcomplicating things
- Use design tokens, not raw values (colors, spacing, etc.)

=== START ===
First, confirm my complexity classification is correct based on my answers.
Then ask what feature I want to build first. Start small - what's the simplest version that would be useful?
```

## Step 3: Build Iteratively

Work with Claude to build your app feature by feature. Key habits:
- **Commit often** - Save your work with git after each working feature
- **Start simple** - Get something working before making it perfect
- **Push back** - If Claude suggests something complex, ask for a simpler way

## What You'll Copy/Paste to VS Code

Claude will generate code. For each piece:
1. Create the file in VS Code
2. Paste the code
3. Test it works
4. Commit to git

## When You're Ready to Level Up

After a few sessions, you'll notice the copy/paste gets tedious. That's when you're ready for:
- **[Path C: CLI Setup](#path-c-cli-setup-recommended-for-real-projects)** - Scripts that launch Claude with context pre-loaded
- **[Path D: AGENTS.md Setup](#path-d-agentsmd-setup-for-ai-tools)** - Works with Claude Code, Cursor, and other AI tools

---

# Path C: CLI Setup (Recommended for Real Projects)

*The most powerful way to vibe code. Worth the 15-minute setup.*

## Why CLI?

| Claude.ai | CLI + Scripts |
|-----------|---------------|
| Copy/paste code manually | Code goes directly into files |
| Re-explain context each session | Context auto-loaded from CLAUDE.md |
| Generic responses | Project-aware responses |
| Good for learning | Good for building |

## Quick Setup

### 1. Install Claude CLI

**Mac:**
```bash
brew install node
npm install -g @anthropic-ai/claude-code
claude auth login
```

**Windows (WSL):**
```bash
wsl --install  # Restart after this
# Then in Ubuntu:
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g @anthropic-ai/claude-code
claude auth login
```

### 2. Create Project & Run vibe-init

```bash
mkdir my-app
cd my-app

# Download vibe-init
curl -O https://raw.githubusercontent.com/dataDrivenFitness/VibeCodingGuide/main/scripts/vibe-init
chmod +x vibe-init
./vibe-init
```

This creates all your context files and scripts automatically.

### 3. Start Building

```bash
./scripts/vibe-ideate          # Validate ideas
./scripts/vibe-dev             # Implementation sessions
./scripts/vibe-architect       # Architecture decisions
./scripts/vibe-architect opus  # Deep reasoning (for critical decisions)
```

## Full Instructions

See `09_vibe_coding_scripts_guide.md` for:
- Detailed installation (Mac & Windows)
- All available scripts
- Customization guide
- Troubleshooting

---

# Path D: AGENTS.md Setup (For AI Tools)

*Works with Claude Code, Cursor, Windsurf, Aider, Continue.dev, and other tools that support AGENTS.md*

## Why AGENTS.md?

**Industry Standard:** 60,000+ repositories use AGENTS.md as of January 2026.

**Auto-Read:** AI coding tools automatically read AGENTS.md from your repo root.

**No Upload Needed:** Unlike uploading guides to Claude.ai, AGENTS.md is always in context.

## Quick Setup

### 1. Copy AGENTS.md to Your Project

```bash
# In your project directory:
curl -O https://raw.githubusercontent.com/dataDrivenFitness/VibeCodingBlueprint/main/AGENTS.md
```

### 2. Customize for Your Project

Edit AGENTS.md to add:
- Your app name and description
- Your specific tech stack
- Your complexity classification (🟢🟡🔴)
- Project-specific rules

### 3. Use with Any Compatible Tool

**Claude Code:**
```bash
claude code
# AGENTS.md is automatically read
```

**Cursor:**
- Opens .cursorrules (if present)
- Falls back to AGENTS.md automatically

**Windsurf, Aider, Continue.dev:**
- All automatically read AGENTS.md

## What's Inside AGENTS.md

The AGENTS.md file contains a condensed version of the Vibe Coding Blueprint:
- Complexity classification system
- Forbidden commands
- Do/Don't rules
- Design system principles
- File structure patterns
- Links to full guides

**It references the comprehensive guides** but gives AI tools enough context to work effectively without uploading files.

## When to Use This Path

Choose AGENTS.md if you:
- Use Claude Code, Cursor, Windsurf, or similar tools
- Want context automatically loaded
- Don't want to re-upload files each session
- Work in a team (share consistent AI instructions)

## Combining with Other Paths

You can use AGENTS.md AND the CLI scripts:
```bash
# Run vibe-init (creates context files)
./vibe-init

# Also add AGENTS.md
curl -O https://raw.githubusercontent.com/.../AGENTS.md

# Now you have both:
# - AGENTS.md for tool compatibility
# - CLAUDE.md for CLI scripts
# - Full guides for reference
```

---

# Never Coded Before?

If terms like "git", "terminal", or "VS Code" are unfamiliar, start here:

## Read First: `01_vibe_coding_beginners_guide.md`

This covers:
- What vibe coding actually is
- Realistic expectations (this isn't magic)
- Setting up your computer
- Terminal basics
- Git fundamentals ("save points" for your code)
- Your first AI coding session

**Time needed:** ~30 minutes to read, ~30 minutes to set up

After that, come back here and choose Path A, B, C, or D.

---

# Quick Reference: All Files

| # | File | What It's For |
|---|------|---------------|
| -- | **QUICKSTART.md** | **You are here** |
| -- | **AGENTS.md** | **Quick ref for AI tools (auto-read)** |
| 00 | Master Index | Full navigation & overview |
| 01 | Beginners Guide | New to coding? Start here |
| 02 | Ideation Guide | Validate before building |
| 03 | Context Files Guide | How the .context/ system works |
| 04 | Caution Guide | Safety rules (CRITICAL) |
| 05 | Design System Guide | UI consistency |
| 06 | Collaboration Playbook | Daily prompting tips |
| 07 | CLAUDE.md Template | All-in-one AI instructions |
| 08 | Troubleshooting Guide | When things break |
| 09 | Scripts Guide | CLI tools & vibe-init |

---

# The 2-Minute Version

**If you read nothing else:**

1. **Validate before building** - Most failed apps solve problems nobody has
2. **Simple > Clever** - 3 files beats 10 files every time
3. **Commit often** - Git saves your work. Use it.
4. **Never run** `git reset --hard` or `git clean -fd` - These destroy work
5. **Push back on AI** - If it feels complicated, ask for simpler
6. **Design tokens** - Use `AppColors.primary`, not `Color(0xFF2563EB)`
7. **Use AGENTS.md** - If you use Claude Code, Cursor, or similar tools

---

# Common Questions

## "Which path should I really choose?"

- **Just exploring?** → Path A (validate idea)
- **Building something small?** → Path B (claude.ai)
- **Building something real?** → Path C (CLI) or Path D (AGENTS.md)
- **Using AI coding tools?** → Path D (AGENTS.md)
- **Not sure?** → Path A, then decide

## "Do I need to read all 10 guides?"

No. The starter prompts and AGENTS.md carry the key principles. Read guides when:
- You want to understand WHY something works
- You're having a specific problem (→ Troubleshooting)
- You want to customize beyond defaults

## "Can I skip the Beginners Guide?"

If you can answer these, yes:
- What does `cd my-project` do?
- What does `git commit -m "message"` do?
- What is VS Code?

If not, spend 30 minutes on the Beginners Guide. It's worth it.

## "What's the difference between AGENTS.md and the guides?"

- **AGENTS.md** - Condensed rules for AI tools to auto-read
- **Guides** - Comprehensive teaching material for humans
- **Both work together** - AGENTS.md references the guides

## "How is this different from just using Claude?"

The framework provides:
- **Guardrails** - Rules that prevent common AI mistakes
- **Patterns** - Proven structures for context files
- **Prompts** - Language that gets better results
- **Safety** - Protection against destructive commands
- **AGENTS.md** - Industry-standard format for tool compatibility

Without these, AI will over-engineer, run dangerous commands, and create inconsistent code. The framework prevents that.

---

# What Success Looks Like

**Week 1:** Built first small feature, committed to git, didn't lose any work

**Month 1:** Working MVP, consistent UI, manageable codebase

**Month 3:** Real app, real users, built by you (with AI help)

---

*Welcome to vibe coding. Let's build something.*

---

*The Vibe Coding Blueprint*
*Start simple. Build real things.*
