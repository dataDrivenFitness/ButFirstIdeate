# Vibe Coding Scripts Guide
## CLI Tools for AI-Assisted Flutter Development

*Stop copy/pasting prompts. Start conversations.*

---

## What This Guide Covers

This guide provides ready-to-use command-line scripts that launch Claude with pre-configured context for different development tasks. Instead of copy/pasting prompts, you run a script and start talking.

```bash
./scripts/vibe-ideate          # Validate your app idea conversationally
./scripts/vibe-architect opus  # Make architecture decisions (with Opus reasoning)
./scripts/vibe-dev             # Start an implementation session
./scripts/vibe-debug           # Get help debugging an issue
```

**Prerequisites:**
- Claude CLI installed
- Basic terminal familiarity (Beginners Guide covers this)

**Time to set up:** ~15 minutes

---

## Table of Contents

1. [Installing Claude CLI](#part-1-installing-claude-cli)
2. [Project Setup (vibe-init)](#part-2-project-setup-vibe-init)
3. [The Scripts](#part-3-the-scripts)
4. [Understanding the Pattern](#part-4-understanding-the-pattern)
5. [Customizing for Your Project](#part-5-customizing-for-your-project)
6. [Creating Your Own Scripts](#part-6-creating-your-own-scripts)
7. [Troubleshooting](#part-7-troubleshooting)
8. [Quick Reference](#part-8-quick-reference)

---

# Part 1: Installing Claude CLI

## Mac Installation

### Step 1: Install Homebrew (if you don't have it)

Open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the prompts. When done, verify:

```bash
brew --version
# Should show: Homebrew 4.x.x
```

### Step 2: Install Node.js (required for Claude CLI)

```bash
brew install node
```

Verify:

```bash
node --version
# Should show: v20.x.x or higher
```

### Step 3: Install Claude CLI

```bash
npm install -g @anthropic-ai/claude-code
```

Verify:

```bash
claude --version
# Should show: claude-code version x.x.x
```

### Step 4: Authenticate

```bash
claude auth login
```

This opens a browser window. Log in with your Anthropic account (the same one you use for claude.ai).

### Step 5: Verify It Works

```bash
claude "Say hello"
```

You should see Claude respond. If so, you're ready!

### Mac Troubleshooting

| Problem | Solution |
|---------|----------|
| "command not found: brew" | Close and reopen Terminal, try again |
| "command not found: node" | Run: `brew install node` |
| "command not found: claude" | Run: `npm install -g @anthropic-ai/claude-code` |
| Permission errors | Run: `sudo npm install -g @anthropic-ai/claude-code` |
| Auth fails | Make sure you have Claude Pro or API access |

---

## Windows Installation

Windows doesn't run bash scripts natively. You'll need to set up a bash environment first.

### Option A: WSL (Recommended for Serious Development)

WSL (Windows Subsystem for Linux) gives you a full Linux environment inside Windows.

#### Step 1: Install WSL

Open **PowerShell as Administrator** (right-click PowerShell → "Run as administrator"):

```powershell
wsl --install
```

This installs Ubuntu by default. **Restart your computer** when prompted.

#### Step 2: Set Up Ubuntu

After restart, open "Ubuntu" from the Start menu. First launch takes a few minutes.

When prompted:
- Create a username (lowercase, no spaces)
- Create a password (you'll need this for `sudo` commands)

#### Step 3: Install Node.js in WSL

In the Ubuntu terminal:

```bash
# Update package list
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
```

#### Step 4: Install Claude CLI

```bash
sudo npm install -g @anthropic-ai/claude-code
```

#### Step 5: Authenticate

```bash
claude auth login
```

Follow the browser prompts to log in.

#### Step 6: Access Your Windows Files

Your Windows files are at `/mnt/c/Users/YourUsername/`:

```bash
cd /mnt/c/Users/YourUsername/Documents/Projects
```

**Tip:** Create a shortcut:

```bash
echo 'alias projects="cd /mnt/c/Users/YourUsername/Documents/Projects"' >> ~/.bashrc
source ~/.bashrc
# Now just type: projects
```

---

### Option B: Git Bash (Simpler, Limited)

If you just want to run the scripts without a full Linux environment:

#### Step 1: Install Git for Windows

Download from: https://git-scm.com/download/win

During installation:
- ✅ Select "Git Bash Here" (context menu option)
- ✅ Select "Use Git from Git Bash only"
- Accept other defaults

#### Step 2: Install Node.js

Download from: https://nodejs.org/

Run the installer, accept defaults.

#### Step 3: Open Git Bash

From Start menu, open "Git Bash"

#### Step 4: Install Claude CLI

```bash
npm install -g @anthropic-ai/claude-code
```

#### Step 5: Authenticate

```bash
claude auth login
```

### Which to Choose?

| Use Case | Recommendation |
|----------|----------------|
| Building Flutter apps seriously | WSL |
| Just trying out vibe coding | Git Bash |
| Already have Linux experience | WSL |
| Want simplest setup | Git Bash |

---

## Verify Your Setup

Run these commands to verify everything works:

```bash
# Check Claude CLI
claude --version

# Check Node
node --version

# Test Claude
claude "Say hello from vibe coding!"
```

If all commands work, you're ready for Part 2!

---

# Part 2: Project Setup (vibe-init)

The `vibe-init` script creates your entire project structure with all context files.

## Quick Start

```bash
# Navigate to your project folder (or create one)
mkdir my-app
cd my-app

# Download and run vibe-init
curl -O https://raw.githubusercontent.com/dataDrivenFitness/VibeCodingGuide/main/scripts/vibe-init
chmod +x vibe-init
./vibe-init
```

Or create the script manually:

## The vibe-init Script

Create a file called `vibe-init` in your project root:

```bash
#!/bin/bash

# ================================================================
# VIBE-INIT: Project Scaffolding for AI-Assisted Development
# ================================================================
# Creates the full .context folder structure and vibe scripts
# Run once when starting a new project
# ================================================================

echo "🚀 Vibe Coding Project Setup"
echo "============================"
echo ""

# === CUSTOMIZE THIS SECTION ===
read -p "App name: " APP_NAME
read -p "One-line description: " APP_DESCRIPTION
read -p "Complexity (simple/moderate/complex): " COMPLEXITY

# Validate complexity
case "$COMPLEXITY" in
  simple|moderate|complex) ;;
  *) 
    echo "❌ Invalid complexity. Use: simple, moderate, or complex"
    exit 1
    ;;
esac

echo ""
echo "Creating project structure for: $APP_NAME"
echo "Complexity: $COMPLEXITY"
echo ""

# === CREATE DIRECTORIES ===
mkdir -p .context
mkdir -p .context/mockups
mkdir -p scripts

echo "✅ Created directories"

# === CREATE CLAUDE.md ===
cat > CLAUDE.md << 'CLAUDEMD'
# CLAUDE.md - AI Development Instructions

## Project Overview

**App Name**: APP_NAME_PLACEHOLDER
**Description**: APP_DESCRIPTION_PLACEHOLDER
**Complexity**: COMPLEXITY_PLACEHOLDER

---

## App Complexity & Architecture Rules

COMPLEXITY_RULES_PLACEHOLDER

---

## 🚫 FORBIDDEN GIT COMMANDS

**NEVER run these commands:**
```bash
git reset --hard        # Destroys uncommitted work
git clean -fd           # Deletes untracked files permanently  
git checkout -- .       # Discards all uncommitted changes
git push --force        # Rewrites shared history
```

**Safe alternatives:**
```bash
git stash -u            # Instead of reset --hard
git stash list          # See what's stashed
```

---

## 🔒 FILE MODIFICATION RULES

**Before modifying ANY file:**
1. State which file you're modifying
2. Explain what changes you're making
3. Wait for approval on significant changes

**NEVER modify without telling me:**
- pubspec.yaml
- Configuration files
- Security/auth code

---

## 🎯 SCOPE CONTROL

**Before starting ANY task:**
1. Restate what you think I'm asking
2. List specific files you'll create/modify
3. Wait for confirmation

**STOP and ask if:**
- Task requires more than 4 new files
- You need to modify files outside stated scope
- The "simple" task is becoming complex

---

## 📁 PROJECT STRUCTURE

```
lib/
├── core/                    # App-wide utilities
│   ├── theme/              # Design tokens
│   └── utils/              # Helpers
├── features/               # Feature modules
│   └── [feature]/
│       ├── [feature]_screen.dart
│       ├── [feature]_provider.dart
│       └── widgets/
├── shared/                 # Shared widgets
│   └── widgets/
└── data/                   # Data layer
    ├── models/
    └── services/
```

---

## 🤝 COLLABORATION RULES

- Ask ONE question at a time
- If uncertain, say so
- Challenge unnecessary complexity
- Suggest simpler alternatives
- Push back on scope creep

---

*Read .context/context.md for current status before starting work.*
CLAUDEMD

# Replace placeholders
sed -i.bak "s/APP_NAME_PLACEHOLDER/$APP_NAME/g" CLAUDE.md
sed -i.bak "s/APP_DESCRIPTION_PLACEHOLDER/$APP_DESCRIPTION/g" CLAUDE.md
sed -i.bak "s/COMPLEXITY_PLACEHOLDER/$COMPLEXITY/g" CLAUDE.md

# Add complexity-specific rules
if [ "$COMPLEXITY" = "simple" ]; then
  RULES="### 🟢 SIMPLE App Rules

**Architecture:**
- Screen → Provider → Service (3 layers max)
- Concrete classes only, no interfaces
- Maximum 3-4 files per feature

**NEVER create without approval:**
- Abstract classes or interfaces
- Generic/base classes
- Repository pattern
- More than 4 files for a single feature"

elif [ "$COMPLEXITY" = "moderate" ]; then
  RULES="### 🟡 MODERATE App Rules

**Architecture:**
- Screen → Provider → Repository → DataSource
- Abstract data sources for testing
- Interfaces only where 2+ implementations exist

**Abstractions ALLOWED for:**
- Data sources (for mocking in tests)
- External API clients

**Abstractions FORBIDDEN without approval:**
- Business logic / use cases
- UI components
- Generic base classes"

else
  RULES="### 🔴 COMPLEX App Rules

**Architecture:**
- Full layered architecture permitted
- Each abstraction MUST be documented with WHY
- Security-critical code isolated

**Abstractions ALLOWED (with documentation) for:**
- Data sources (Firestore, local cache, mock)
- Auth providers
- Audit logging
- Platform services

**Still FORBIDDEN:**
- Abstractions without clear justification
- Over-engineering beyond requirements"
fi

# Use awk for multi-line replacement (more portable)
awk -v rules="$RULES" '{gsub(/COMPLEXITY_RULES_PLACEHOLDER/, rules)}1' CLAUDE.md > CLAUDE.md.tmp && mv CLAUDE.md.tmp CLAUDE.md
rm -f CLAUDE.md.bak

echo "✅ Created CLAUDE.md"

# === CREATE CONTEXT.MD ===
cat > .context/context.md << CONTEXTMD
# context.md - Current Project Status

*Last Updated: $(date +%Y-%m-%d)*

---

## Project Summary

**App**: $APP_NAME
**Description**: $APP_DESCRIPTION
**Complexity**: $COMPLEXITY

---

## Current Sprint

**Goal**: [What you're trying to accomplish this week]

**Tasks**:
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

---

## What's Built

- [ ] Project setup
- [ ] Basic navigation
- [ ] Core feature 1
- [ ] Core feature 2

---

## Current Focus

**Working on**: [Current task]

**Blocked by**: [Any blockers]

**Next up**: [What's next after current task]

---

## Recent Decisions

| Date | Decision | Reasoning |
|------|----------|-----------|
| $(date +%Y-%m-%d) | Project created | Starting $APP_NAME |

---

## Open Questions

- [ ] Question 1?
- [ ] Question 2?

---

*Update this file as you make progress.*
CONTEXTMD

echo "✅ Created .context/context.md"

# === CREATE ARCHITECTURE.MD ===
cat > .context/architecture.md << ARCHMD
# architecture.md - Technical Architecture

*Last Updated: $(date +%Y-%m-%d)*

---

## Complexity Classification

**Classification**: $COMPLEXITY

### Why This Classification

| Question | Answer |
|----------|--------|
| Handles protected data (HIPAA/GDPR/PCI)? | No |
| Requires audit trails? | No |
| Needs compliance certification? | No |
| Requires offline sync? | No |
| Multiple data sources? | No |

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Flutter | 3.x | UI Framework |
| Dart | 3.x | Language |
| Riverpod | 2.x | State Management |
| Freezed | 2.x | Immutable Models |

### Backend
| Technology | Purpose |
|------------|---------|
| Firebase Auth | Authentication |
| Firestore | Database |
| Cloud Storage | File storage |

---

## Folder Structure

\`\`\`
lib/
├── core/
│   ├── theme/
│   ├── routing/
│   └── utils/
├── features/
│   └── [feature]/
├── shared/
│   └── widgets/
└── data/
    ├── models/
    └── services/
\`\`\`

---

## Key Patterns

### State Management
- Riverpod for all state
- AsyncNotifier for async operations
- .when() for handling loading/error/data

### Data Models
- Freezed for immutability
- withConverter for Firestore

---

## Architecture Decision Log

| Date | Decision | Reasoning | Alternatives Considered |
|------|----------|-----------|------------------------|
| $(date +%Y-%m-%d) | Flutter + Firebase | Best for solo dev, fast iteration | React Native |
| $(date +%Y-%m-%d) | Riverpod | Type-safe, testable | Provider, Bloc |

---

*Update this file when making architectural decisions.*
ARCHMD

echo "✅ Created .context/architecture.md"

# === CREATE DESIGN_SYSTEM.MD ===
cat > .context/design_system.md << DESIGNMD
# design_system.md - UI Design Tokens

*Last Updated: $(date +%Y-%m-%d)*

---

## Colors

\`\`\`dart
class AppColors {
  // Primary
  static const primary = Color(0xFF2563EB);
  static const primaryLight = Color(0xFF3B82F6);
  static const primaryDark = Color(0xFF1D4ED8);
  
  // Neutral
  static const background = Color(0xFFFAFAFA);
  static const surface = Color(0xFFFFFFFF);
  static const textPrimary = Color(0xFF1F2937);
  static const textSecondary = Color(0xFF6B7280);
  
  // Semantic
  static const success = Color(0xFF10B981);
  static const warning = Color(0xFFF59E0B);
  static const error = Color(0xFFEF4444);
}
\`\`\`

---

## Typography

\`\`\`dart
class AppTypography {
  static const headlineLarge = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );
  
  static const titleMedium = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );
  
  static const bodyMedium = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    color: AppColors.textPrimary,
  );
  
  static const labelSmall = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: AppColors.textSecondary,
  );
}
\`\`\`

---

## Spacing

\`\`\`dart
class AppSpacing {
  static const xs = 4.0;
  static const sm = 8.0;
  static const md = 16.0;
  static const lg = 24.0;
  static const xl = 32.0;
  static const xxl = 48.0;
}
\`\`\`

---

## NEVER Use Raw Values

\`\`\`dart
// ❌ FORBIDDEN
color: Color(0xFF2563EB)
padding: EdgeInsets.all(16)
style: TextStyle(fontSize: 18)

// ✅ REQUIRED
color: AppColors.primary
padding: EdgeInsets.all(AppSpacing.md)
style: AppTypography.titleMedium
\`\`\`

---

*Use these tokens in all UI code.*
DESIGNMD

echo "✅ Created .context/design_system.md"

# === CREATE PROMPTS.MD ===
cat > .context/prompts.md << PROMPTSMD
# prompts.md - Reusable AI Prompts

*Copy/paste these when needed*

---

## Simplification Prompts

### Too Complicated
\`\`\`
Stop. This is too complicated.
Start over with maximum 3 files.
No abstractions. Concrete classes only.
Show me the simplest implementation.
\`\`\`

### Force File Limit
\`\`\`
Implement this in exactly 2 files:
1. [feature]_screen.dart (UI)
2. [feature]_provider.dart (logic + state)

No other files. No services. No repositories.
\`\`\`

---

## Clarification Prompts

### Restate Understanding
\`\`\`
Before coding, restate:
1. What you think I'm asking for
2. Files you'll create/modify
3. What you WON'T do

Wait for my confirmation.
\`\`\`

### Explain Decision
\`\`\`
Why did you choose this approach?
What alternatives did you consider?
What are the tradeoffs?
\`\`\`

---

## Code Quality Prompts

### Review for Issues
\`\`\`
Review this code for:
1. Bugs or logic errors
2. Missing error handling
3. Security issues
4. Performance problems

Be specific about what's wrong and how to fix it.
\`\`\`

### Match Existing Pattern
\`\`\`
Look at [existing_file.dart].
Match that pattern exactly for [new feature].
Same structure, same naming, same style.
\`\`\`

---

## Debug Prompts

### Systematic Debug
\`\`\`
This isn't working: [describe problem]

Error message: [paste error]

What I expected: [expected behavior]

What actually happens: [actual behavior]

Help me debug systematically.
\`\`\`

---

*Add your own frequently-used prompts here.*
PROMPTSMD

echo "✅ Created .context/prompts.md"

# === CREATE SCRIPTS ===

# vibe-ideate
cat > scripts/vibe-ideate << 'IDEATE'
#!/bin/bash

# VIBE-IDEATE: Conversational App Ideation
# Usage: ./scripts/vibe-ideate

echo "💡 Starting Ideation Session"
echo "==========================="
echo ""

claude --model sonnet "You are a product strategist and app ideation partner.

=== YOUR ROLE ===
Guide me through validating an app idea conversationally.
We'll cover: problem, users, competition, differentiation, feasibility, complexity.
Follow the CONVERSATION, not a rigid checklist.

=== HOW TO WORK WITH ME ===
- Ask ONE question at a time
- Dig deeper when my answers are vague
- Challenge assumptions that seem weak
- Tell me honestly if an idea seems flawed
- Help me think through problems
- Push back on scope creep
- Be a thinking partner, not a yes-man

=== CAPTURE CHECKPOINTS ===
After each major topic, offer to summarize:
'Want me to summarize what we've established about [TOPIC] so you can save it?'

=== COMPLEXITY CLASSIFICATION ===
Help determine if this is:
- 🟢 SIMPLE: Single user, no compliance, basic CRUD
- 🟡 MODERATE: Multi-user, needs testing, some offline
- 🔴 COMPLEX: HIPAA/GDPR, audit trails, compliance

=== AT THE END ===
When we've covered enough, synthesize into:
1. Problem Statement
2. Target Users
3. Competition & Gaps
4. Differentiation  
5. Tech Stack Recommendation
6. Complexity Classification (🟢/🟡/🔴)
7. Go/No-Go Recommendation
8. Key Risks & Next Steps

=== START ===
Ask me what I want to build and why."
IDEATE
chmod +x scripts/vibe-ideate
echo "✅ Created scripts/vibe-ideate"

# vibe-architect
cat > scripts/vibe-architect << 'ARCHITECT'
#!/bin/bash

# VIBE-ARCHITECT: Architecture Decision Partner
# Usage: 
#   ./scripts/vibe-architect           # Sonnet (default, fast)
#   ./scripts/vibe-architect opus      # Opus (deep reasoning)

MODEL_ARG="${1:-sonnet}"

case "$MODEL_ARG" in
  opus|o)
    MODEL="opus"
    MODEL_DISPLAY="Opus (Strategic Reasoning)"
    echo "🧠 Using Opus for deep architectural analysis"
    ;;
  sonnet|s|*)
    MODEL="sonnet"
    MODEL_DISPLAY="Sonnet (Fast & Balanced)"
    ;;
esac

echo "🏗️  Starting Architecture Session ($MODEL_DISPLAY)"
echo "==========================================="
echo ""

claude --model "$MODEL" "Read CLAUDE.md first.
Then read .context/architecture.md for current technical decisions.
Then read .context/context.md for current status.

You are a Senior Software Architect specializing in Flutter/Firebase apps.

=== YOUR ROLE ===
Help make sound architectural decisions that balance:
- Simplicity (fewer files, less abstraction)
- Maintainability (code that's easy to change)
- Scalability (can grow if needed)
- The app's complexity classification

=== HOW TO WORK WITH ME ===
- Challenge decisions that add unnecessary complexity
- Defend simpler approaches with reasoning
- Question scope creep
- Be open to adjustment with good arguments
- Stay respectful but firm

=== COMPLEXITY AWARENESS ===
Check CLAUDE.md for this project's complexity level:
- 🟢 SIMPLE: Push back HARD on any abstractions
- 🟡 MODERATE: Allow abstractions only for testing
- 🔴 COMPLEX: Allow justified abstractions with documentation

=== WHEN RECOMMENDING CHANGES ===
1. State the current situation
2. Explain the problem
3. Propose solution with tradeoffs
4. Note what we're NOT doing and why

=== START ===
What architectural question or decision do you need help with?"
ARCHITECT
chmod +x scripts/vibe-architect
echo "✅ Created scripts/vibe-architect"

# vibe-dev
cat > scripts/vibe-dev << 'DEV'
#!/bin/bash

# VIBE-DEV: Implementation Session
# Usage: ./scripts/vibe-dev

echo "💻 Starting Development Session"
echo "==============================="
echo ""

claude --model sonnet "Read CLAUDE.md first - especially the architecture rules.
Then read .context/context.md for current task.
Then read .context/design_system.md for UI tokens.

You are an Implementation Developer for this Flutter app.

=== YOUR ROLE ===
Implement features following established patterns and architecture.

=== CRITICAL RULES ===
1. Check CLAUDE.md for complexity level and architecture rules
2. Use design tokens from design_system.md (never raw values)
3. Follow existing patterns in the codebase
4. Update context.md when completing tasks

=== HOW TO WORK WITH ME ===
- Ask clarifying questions before coding
- State which files you'll create/modify
- Push back on requests that add unnecessary complexity
- Suggest simpler alternatives
- Match existing code style exactly

=== BEFORE WRITING CODE ===
1. Restate what you're implementing
2. List files you'll create/modify
3. Confirm approach before proceeding

=== START ===
What would you like to implement? I'll read context.md to see current focus."
DEV
chmod +x scripts/vibe-dev
echo "✅ Created scripts/vibe-dev"

# vibe-debug
cat > scripts/vibe-debug << 'DEBUG'
#!/bin/bash

# VIBE-DEBUG: Debugging Session
# Usage: ./scripts/vibe-debug

echo "🔍 Starting Debug Session"
echo "========================="
echo ""

claude --model sonnet "You are a debugging expert for Flutter/Firebase apps.

=== YOUR ROLE ===
Help systematically debug issues without guessing.

=== DEBUGGING APPROACH ===
1. Understand the problem (what should happen vs what happens)
2. Gather information (error messages, logs, code)
3. Form hypotheses (most likely causes)
4. Test hypotheses systematically
5. Fix root cause, not symptoms

=== HOW TO WORK WITH ME ===
- Ask for specific information before guessing
- Consider multiple possible causes
- Explain your reasoning
- Don't just suggest random fixes
- If stuck, suggest how to gather more info

=== COMMON FLUTTER/FIREBASE ISSUES ===
- State management (provider not updating)
- Async issues (FutureBuilder, StreamBuilder)
- Firebase rules (permission denied)
- Navigation (context issues)
- Build errors (dependency conflicts)

=== START ===
What's the issue you're seeing? Include:
1. What you expected to happen
2. What actually happened
3. Any error messages"
DEBUG
chmod +x scripts/vibe-debug
echo "✅ Created scripts/vibe-debug"

# vibe-review
cat > scripts/vibe-review << 'REVIEW'
#!/bin/bash

# VIBE-REVIEW: Code Review Session
# Usage: ./scripts/vibe-review

echo "👀 Starting Code Review Session"
echo "================================"
echo ""

claude --model sonnet "Read CLAUDE.md first.
Read .context/design_system.md for UI tokens.

You are a Code Reviewer for this Flutter app.

=== YOUR ROLE ===
Review code for quality, consistency, and potential issues.

=== REVIEW CHECKLIST ===
1. **Correctness**: Does it work? Logic errors? Edge cases?
2. **Consistency**: Matches existing patterns? Uses design tokens?
3. **Simplicity**: Over-engineered? Could be simpler?
4. **Security**: Sensitive data exposed? Input validation?
5. **Performance**: Obvious inefficiencies? Unnecessary rebuilds?

=== HOW TO GIVE FEEDBACK ===
- Be specific (line numbers, exact issues)
- Explain WHY something is a problem
- Suggest fixes, not just problems
- Prioritize (critical vs nice-to-have)
- Acknowledge what's done well

=== COMPLEXITY CHECK ===
Based on CLAUDE.md complexity level:
- Flag unnecessary abstractions
- Flag violations of architecture rules
- Flag scope creep

=== START ===
What code would you like me to review?"
REVIEW
chmod +x scripts/vibe-review
echo "✅ Created scripts/vibe-review"

# vibe-mockup
cat > scripts/vibe-mockup << 'MOCKUP'
#!/bin/bash

# VIBE-MOCKUP: UI Mockup Generation
# Usage: ./scripts/vibe-mockup

echo "🎨 Starting Mockup Session"
echo "=========================="
echo ""

claude --model sonnet "Read .context/design_system.md for UI tokens and colors.

You are a UI Designer creating Flutter mockups.

=== YOUR ROLE ===
Create visual mockups as React artifacts before any implementation.

=== MOCKUP REQUIREMENTS ===
- Use colors from design_system.md
- Show realistic data (not Lorem ipsum)
- Include all states: default, empty, loading, error
- Match existing app style
- Consider mobile-first (phone dimensions)

=== HOW TO PRESENT MOCKUPS ===
1. Create a React artifact showing the UI
2. Explain key design decisions
3. Note any assumptions made
4. Wait for approval before implementation

=== AFTER APPROVAL ===
When mockup is approved, provide:
1. Implementation plan (which files)
2. Any new components needed
3. Design tokens to use

=== START ===
What screen or component would you like to mockup?"
MOCKUP
chmod +x scripts/vibe-mockup
echo "✅ Created scripts/vibe-mockup"

# vibe-status
cat > scripts/vibe-status << 'STATUS'
#!/bin/bash

# VIBE-STATUS: Quick Status Check
# Usage: ./scripts/vibe-status

echo "📊 Project Status"
echo "================="
echo ""

if [ -f ".context/context.md" ]; then
  echo "=== CURRENT CONTEXT ==="
  cat .context/context.md
else
  echo "❌ No .context/context.md found"
  echo "Run ./scripts/vibe-init to set up project"
fi
STATUS
chmod +x scripts/vibe-status
echo "✅ Created scripts/vibe-status"

# vibe-checkpoint
cat > scripts/vibe-checkpoint << 'CHECKPOINT'
#!/bin/bash

# VIBE-CHECKPOINT: Save Conversation Progress
# Usage: ./scripts/vibe-checkpoint

echo "💾 Creating Checkpoint"
echo "======================"
echo ""

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
CHECKPOINT_FILE=".context/checkpoints/checkpoint_$TIMESTAMP.md"

mkdir -p .context/checkpoints

echo "# Checkpoint: $TIMESTAMP" > "$CHECKPOINT_FILE"
echo "" >> "$CHECKPOINT_FILE"
echo "## Summary" >> "$CHECKPOINT_FILE"
echo "" >> "$CHECKPOINT_FILE"
echo "[Paste conversation summary here]" >> "$CHECKPOINT_FILE"
echo "" >> "$CHECKPOINT_FILE"
echo "## Decisions Made" >> "$CHECKPOINT_FILE"
echo "" >> "$CHECKPOINT_FILE"
echo "- " >> "$CHECKPOINT_FILE"
echo "" >> "$CHECKPOINT_FILE"
echo "## Next Steps" >> "$CHECKPOINT_FILE"
echo "" >> "$CHECKPOINT_FILE"
echo "- " >> "$CHECKPOINT_FILE"

echo "✅ Created: $CHECKPOINT_FILE"
echo ""
echo "Edit this file to save your conversation progress."
CHECKPOINT
chmod +x scripts/vibe-checkpoint
echo "✅ Created scripts/vibe-checkpoint"

# === FINAL SUMMARY ===
echo ""
echo "=========================================="
echo "✅ VIBE CODING PROJECT SETUP COMPLETE"
echo "=========================================="
echo ""
echo "Created:"
echo "  📄 CLAUDE.md (AI instructions)"
echo "  📁 .context/"
echo "     ├── context.md (project status)"
echo "     ├── architecture.md (tech decisions)"
echo "     ├── design_system.md (UI tokens)"
echo "     └── prompts.md (reusable prompts)"
echo "  📁 scripts/"
echo "     ├── vibe-ideate (validate ideas)"
echo "     ├── vibe-architect (architecture decisions)"
echo "     ├── vibe-dev (implementation)"
echo "     ├── vibe-debug (debugging help)"
echo "     ├── vibe-review (code review)"
echo "     ├── vibe-mockup (UI mockups)"
echo "     ├── vibe-status (check status)"
echo "     └── vibe-checkpoint (save progress)"
echo ""
echo "Next steps:"
echo "  1. Review and customize CLAUDE.md"
echo "  2. Update .context/context.md with your first tasks"
echo "  3. Run: ./scripts/vibe-dev"
echo ""
echo "Quick commands:"
echo "  ./scripts/vibe-ideate        # Validate an idea"
echo "  ./scripts/vibe-dev           # Start coding"
echo "  ./scripts/vibe-architect     # Architecture help"
echo "  ./scripts/vibe-architect opus  # Deep architecture analysis"
echo ""
echo "Happy vibe coding! 🚀"
```

## Running vibe-init

### Step 1: Make It Executable

```bash
chmod +x vibe-init
```

### Step 2: Run It

```bash
./vibe-init
```

### Step 3: Answer the Prompts

```
🚀 Vibe Coding Project Setup
============================

App name: MyTodoApp
One-line description: A simple todo app with categories
Complexity (simple/moderate/complex): simple
```

### Step 4: Start Coding

```bash
./scripts/vibe-dev
```

---

# Part 3: The Scripts

## Overview

| Script | Purpose | Model |
|--------|---------|-------|
| `vibe-ideate` | Validate app idea conversationally | Sonnet |
| `vibe-architect` | Architecture decisions | Sonnet (Opus flag) |
| `vibe-dev` | Implementation sessions | Sonnet |
| `vibe-debug` | Debugging help | Sonnet |
| `vibe-review` | Code review | Sonnet |
| `vibe-mockup` | UI mockup generation | Sonnet |
| `vibe-status` | Check project status | (no Claude) |
| `vibe-checkpoint` | Save conversation progress | (no Claude) |

---

## vibe-ideate

**Purpose:** Validate your app idea through conversation before writing code.

**When to use:**
- Starting a new project
- Exploring a new feature direction
- Validating pivot ideas

**Usage:**
```bash
./scripts/vibe-ideate
```

**What it does:**
- Asks about your problem and users
- Probes for weak assumptions
- Explores competition
- Helps determine complexity classification
- Synthesizes into go/no-go recommendation

---

## vibe-architect

**Purpose:** Make architecture decisions with expert guidance.

**When to use:**
- Designing new features
- Deciding on patterns
- Evaluating tradeoffs
- Planning refactors

**Usage:**
```bash
./scripts/vibe-architect           # Sonnet (default - fast)
./scripts/vibe-architect opus      # Opus (deep reasoning)
```

**When to use Opus:**
- Critical architecture decisions
- Complex tradeoff analysis
- Go/no-go decisions on major features
- Creating Architecture Decision Records (ADRs)

---

## vibe-dev

**Purpose:** Implementation sessions with context-aware assistance.

**When to use:**
- Building features
- Writing code
- Daily development

**Usage:**
```bash
./scripts/vibe-dev
```

**What it does:**
- Reads CLAUDE.md for project rules
- Reads context.md for current task
- Follows design system tokens
- Matches existing patterns

---

## vibe-debug

**Purpose:** Systematic debugging assistance.

**When to use:**
- Something isn't working
- Strange behavior
- Error messages you don't understand

**Usage:**
```bash
./scripts/vibe-debug
```

**What it does:**
- Asks for specific information before guessing
- Considers multiple causes
- Tests hypotheses systematically
- Focuses on root cause, not symptoms

---

## vibe-review

**Purpose:** Code review with quality focus.

**When to use:**
- Before committing significant changes
- Periodic code quality checks
- Learning from feedback

**Usage:**
```bash
./scripts/vibe-review
```

**What it does:**
- Checks correctness, consistency, simplicity
- Verifies design token usage
- Flags complexity violations
- Suggests specific improvements

---

## vibe-mockup

**Purpose:** Generate UI mockups before implementation.

**When to use:**
- New screens
- New components
- UI redesigns

**Usage:**
```bash
./scripts/vibe-mockup
```

**What it does:**
- Creates React artifact mockups
- Uses your design system colors
- Shows all states (empty, loading, error)
- Waits for approval before implementation

---

## vibe-status

**Purpose:** Quick view of project status.

**When to use:**
- Start of session
- Remember where you left off

**Usage:**
```bash
./scripts/vibe-status
```

**What it does:**
- Displays context.md contents
- No Claude call (instant)

---

## vibe-checkpoint

**Purpose:** Create checkpoint files to save conversation progress.

**When to use:**
- End of productive session
- Before switching contexts
- After important decisions

**Usage:**
```bash
./scripts/vibe-checkpoint
```

**What it does:**
- Creates timestamped checkpoint file
- Template for summary, decisions, next steps
- You fill in the details

---

# Part 4: Understanding the Pattern

*This section explains how the scripts work. Skip if you just want to use them.*

## Anatomy of a Vibe Script

```bash
#!/bin/bash
# ☝️ Shebang: Tells computer to run this as bash script

# VIBE-DEV: Implementation Session
# ☝️ Comment: What this script does

echo "💻 Starting Development Session"
# ☝️ Echo: Prints text to terminal

claude --model sonnet "..."
# ☝️ Claude command: Starts Claude with prompt
#    --model sonnet: Uses Sonnet model
#    "...": The system prompt that shapes Claude's behavior
```

## The Prompt Structure

Every vibe script prompt follows this pattern:

```
1. CONTEXT LOADING
   "Read CLAUDE.md first..."
   "Then read .context/context.md..."
   
2. ROLE DEFINITION
   "You are a [ROLE] for this [TYPE] app."
   
3. BEHAVIORAL RULES
   "=== HOW TO WORK WITH ME ==="
   - Specific behaviors to follow
   - Things to avoid
   
4. DOMAIN CONTEXT
   Complexity awareness, patterns to follow, etc.
   
5. START INSTRUCTION
   "What would you like to [DO]?"
```

## Why This Structure Works

| Section | Purpose |
|---------|---------|
| Context loading | Claude knows your project specifics |
| Role definition | Sets expertise and perspective |
| Behavioral rules | Shapes interaction style |
| Domain context | Project-specific constraints |
| Start instruction | Clear entry point for conversation |

---

# Part 5: Customizing for Your Project

## What to Customize

### Always Customize

**In CLAUDE.md:**
- App name and description
- Complexity classification
- Project-specific patterns

**In .context/context.md:**
- Current tasks and status

### Customize for Domain

**Healthcare apps:** Add to vibe-dev prompt:
```
=== HEALTHCARE REQUIREMENTS ===
- All patient data access must verify authorization
- Create audit log for every data operation
- Never log PHI to console
- HIPAA compliance is non-negotiable
```

**Finance apps:** Add to vibe-dev prompt:
```
=== FINANCIAL REQUIREMENTS ===
- All money values in cents (integers)
- Validate all financial calculations
- Audit trail for transactions
- Never expose account numbers in logs
```

**E-commerce apps:** Add to vibe-dev prompt:
```
=== E-COMMERCE REQUIREMENTS ===
- Cart state must persist
- Handle payment edge cases
- Inventory validation before checkout
- Order state machine must be explicit
```

## Example: Custom Healthcare Script

Based on your NurseOS scripts:

```bash
#!/bin/bash

# HEALTHCARE-DEV: HIPAA-Compliant Implementation Session

echo "🏥 Starting Healthcare Development Session"
echo "=========================================="

claude --model sonnet "Read CLAUDE.md first.
Then read .context/context.md for current task.

You are a Healthcare Implementation Developer.

=== HIPAA-CRITICAL RULES ===
1. All patient data access through shift assignments ONLY
2. Audit log EVERY medical data operation
3. NEVER log PHI to console or error messages
4. Encrypt sensitive data at rest
5. Validate all medical data inputs

=== HEALTHCARE UI PATTERNS ===
- Large touch targets (gloved hands)
- High contrast (various lighting)
- Quick access for emergencies
- Never expose patient data in navigation

=== ARCHITECTURE ===
This is a 🔴 COMPLEX app due to HIPAA requirements.
Abstractions are allowed for:
- Data sources (Firestore, local cache, mock)
- Audit logging
- Auth providers

Each abstraction must document WHY it exists.

=== START ===
What healthcare feature are you implementing?"
```

---

# Part 6: Creating Your Own Scripts

*Advanced section - for when you need custom scripts.*

## When to Create Custom Scripts

- Repetitive tasks with specific context
- Domain-specific workflows
- Team standardization
- Personal preferences

## The Template

```bash
#!/bin/bash

# [NAME]: [Brief description]
# Usage: ./scripts/[name]

echo "[Emoji] Starting [Session Type]"
echo "================================"
echo ""

claude --model sonnet "Read CLAUDE.md first.
[Additional context files to read]

You are a [ROLE] for [CONTEXT].

=== YOUR ROLE ===
[What Claude should focus on]

=== HOW TO WORK WITH ME ===
[Behavioral rules]
- [Rule 1]
- [Rule 2]

=== [DOMAIN] CONTEXT ===
[Project-specific rules]

=== START ===
[Entry question or instruction]"
```

## Tips for Effective Prompts

| Do | Don't |
|----|-------|
| Be specific about role | Generic "You are helpful" |
| Include behavioral rules | Assume Claude knows your style |
| Reference project files | Re-explain everything in prompt |
| Give clear start instruction | Leave Claude wondering what to do |
| Keep prompts focused | Cram everything in one prompt |

---

# Part 7: Troubleshooting

## Common Issues

### "command not found: claude"

**Cause:** Claude CLI not installed or not in PATH.

**Fix:**
```bash
npm install -g @anthropic-ai/claude-code
```

### "Permission denied"

**Cause:** Script not executable.

**Fix:**
```bash
chmod +x scripts/vibe-dev
```

### Claude doesn't read context files

**Cause:** Files don't exist or wrong path.

**Fix:**
```bash
# Check files exist
ls -la CLAUDE.md
ls -la .context/

# If missing, run vibe-init
./vibe-init
```

### "No such file or directory"

**Cause:** Running from wrong directory.

**Fix:**
```bash
# Make sure you're in project root
pwd
# Should show your project folder

# Run scripts with path
./scripts/vibe-dev
```

### Scripts work but Claude ignores rules

**Cause:** CLAUDE.md might have issues.

**Fix:**
- Check CLAUDE.md exists in project root
- Verify content is correct (not corrupted)
- Start fresh: backup and regenerate with vibe-init

### Windows-specific: "bash: command not found"

**Cause:** Not running in bash environment.

**Fix:**
- Use WSL: Open Ubuntu from Start menu
- Use Git Bash: Open Git Bash from Start menu
- Don't use PowerShell or CMD directly

---

# Part 8: Quick Reference

## Script Commands

```bash
# Ideation & Planning
./scripts/vibe-ideate              # Validate app idea

# Architecture
./scripts/vibe-architect           # Architecture help (Sonnet)
./scripts/vibe-architect opus      # Deep architecture (Opus)

# Development
./scripts/vibe-dev                 # Implementation session
./scripts/vibe-debug               # Debugging help
./scripts/vibe-review              # Code review
./scripts/vibe-mockup              # UI mockups

# Utilities
./scripts/vibe-status              # Show project status
./scripts/vibe-checkpoint          # Save progress
```

## File Structure

```
project/
├── CLAUDE.md                 # AI instructions
├── .context/
│   ├── context.md           # Current status
│   ├── architecture.md      # Tech decisions
│   ├── design_system.md     # UI tokens
│   ├── prompts.md           # Reusable prompts
│   ├── mockups/             # UI mockups
│   └── checkpoints/         # Saved progress
└── scripts/
    ├── vibe-ideate
    ├── vibe-architect
    ├── vibe-dev
    ├── vibe-debug
    ├── vibe-review
    ├── vibe-mockup
    ├── vibe-status
    └── vibe-checkpoint
```

## Daily Workflow

```
Morning:
  ./scripts/vibe-status          # Where did I leave off?
  
Development:
  ./scripts/vibe-dev             # Start implementing
  
When stuck:
  ./scripts/vibe-debug           # Debugging help
  
Before commit:
  ./scripts/vibe-review          # Quick review
  
End of day:
  ./scripts/vibe-checkpoint      # Save progress
```

## Model Selection

| Task | Model | Command |
|------|-------|---------|
| Daily development | Sonnet | `./scripts/vibe-dev` |
| Quick architecture | Sonnet | `./scripts/vibe-architect` |
| Critical decisions | Opus | `./scripts/vibe-architect opus` |
| Debugging | Sonnet | `./scripts/vibe-debug` |
| Code review | Sonnet | `./scripts/vibe-review` |

---

## What's Next?

### Running Multiple Sessions

Need to work on two things at once? See **10_vibe_coding_parallel_development.md** for:
- Git worktrees for true isolation
- `dev.sh` script for parallel terminals
- Safe context switching without conflicts

```bash
./scripts/dev.sh auth          # Terminal 1: auth feature
./scripts/dev.sh payment       # Terminal 2: payment feature (separate directory)
```

---

*This guide is part of The Vibe Coding Blueprint*
*Stop copy/pasting. Start conversations.*
