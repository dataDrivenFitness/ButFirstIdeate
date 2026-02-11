# Vibe Coding Blueprint - Agent Instructions

**AI-assisted development framework for building apps that actually work.**

Full documentation: https://github.com/dataDrivenFitness/VibeCodingBlueprint

---

## What This Framework Provides

This is a battle-tested methodology from building real apps (NurseOS, GLP-1 trackers, client projects). It provides:
- **Guardrails** - Rules that prevent common AI mistakes
- **Patterns** - Proven structures for context files  
- **Safety** - Protection against destructive commands
- **Simplicity** - "Simple > Clever" philosophy

---

## Core Philosophy

```
Simple > Clever
Working > Perfect
Fewer files > "Proper" structure
Ask first > Assume
Validate > Build
```

**The Golden Rule:** If you can't explain it simply, it's too complex.

---

## Complexity Classification System

Before writing ANY code, classify the project:

### 🟢 SIMPLE
- No protected data (health/financial/children's)
- No audit trails needed
- No offline sync
- Single user or simple multi-user
- **Rules:**
  - Maximum 3-4 files per feature
  - NO abstract classes or interfaces
  - Screen → Provider → Service (3 layers max)
  - Concrete classes only

### 🟡 MODERATE  
- Some complexity but not regulated
- Multi-user with moderate data relationships
- May need offline mode
- **Rules:**
  - Abstract data sources ONLY for testing
  - Repository pattern okay
  - Still push back on unnecessary complexity

### 🔴 COMPLEX
- Protected health/financial/children's data
- Requires audit trails for compliance
- Complex offline sync
- HIPAA/FERPA/PCI compliance needed
- **Rules:**
  - Abstractions allowed WITH documentation
  - Must justify each abstraction
  - Still simpler is better

**Default to 🟢 SIMPLE unless proven otherwise.**

---

## Do

### Before Writing Code
- **Ask clarifying questions first** - Understand the task fully
- **Tell user which files you'll create/modify** - No surprises
- **Challenge overcomplication** - If user requests complexity, ask for simpler way
- **Verify assumptions** - Especially with external APIs, check they exist

### Code Structure
- **Use design tokens, not raw values** - `AppColors.primary` not `Color(0xFF2563EB)`
- **Keep components/screens under 200 lines** - Split if larger
- **Maximum 3-4 files per feature** (for 🟢 SIMPLE projects)
- **One feature at a time** - Build iteratively, not all at once

### File Management
- **Show full file paths** - So user knows exactly where code goes
- **Preserve existing functionality** - Don't break working code
- **Test incrementally** - After each change, verify it works

### Collaboration
- **Be honest about risks** - If something might break, say so
- **Suggest alternatives** - "Here's the simple way vs complex way"
- **Explain tradeoffs** - Help user make informed decisions

---

## Don't

### Destructive Commands (NEVER RUN)

**Forbidden:** `git reset --hard`, `git clean -f`, `git checkout -- .`, `git push --force`
**Safe alternative:** `git stash -u` (preserves work, recoverable)
**If you need to undo changes:** Use `git checkout <file>` for specific files or ask user first.

> **Full details:** See [Guide 04 - Caution Guide](guides/04_vibe_coding_caution_guide.md) for complete forbidden command list, real disaster scenarios, protection strategies, and enforcement patterns.

### Code Anti-Patterns
- **Don't hard-code values** - Use design tokens
- **Don't create abstractions in 🟢 SIMPLE projects** - Concrete classes only
- **Don't skip error handling** - Especially for API calls
- **Don't assume APIs exist** - Verify before generating code
- **Don't generate code without context** - Ask questions first

### Architecture Anti-Patterns  
- **Don't over-engineer** - No factories, builders, facades for simple apps
- **Don't create "proper" structure** - Pragmatic > textbook
- **Don't add layers without reason** - Each layer must solve real problem
- **Don't use abstract classes in 🟢 SIMPLE** - Only in 🟡/🔴 with justification

---

## Commands

### Development
```bash
# Start local dev server (framework specific)
npm run dev
flutter run
python manage.py runserver

# Build for production
npm run build
flutter build apk
docker build -t app .

# Run tests
npm test
flutter test
pytest
```

### Linting & Formatting
```bash
# Check code style (don't auto-run without permission)
npm run lint
flutter analyze
black --check .

# Fix formatting (ASK FIRST)
npm run lint:fix
dart format .
black .
```

### Git Workflow
```bash
# Safe git commands (allowed)
git status
git diff
git log
git add <specific-file>
git commit -m "message"
git branch
git checkout <branch>

# Dangerous git commands (ASK FIRST)
git push
git pull
git merge
git rebase
```

---

## Safety & Permissions

| Tier | Actions | Examples |
|------|---------|---------|
| **Allowed** | Read-only operations | Read files, git status/diff/log, run linters in check mode, list directories |
| **Ask First** | Modifications & installs | Modify files, install packages, git push, delete files, run full builds, auto-fix formatting |
| **Never** | Destructive operations | `git reset --hard`, `git clean -f`, `rm -rf`, modify production configs, commit secrets |

> **Full permission model with enforcement patterns:** See [Guide 04 - Caution Guide](guides/04_vibe_coding_caution_guide.md#formal-permission-tiers) for the complete three-tier system, `settings.local.json` deny patterns, and the defense-in-depth enforcement stack.

---

## Design System Principles

### Use Design Tokens
```dart
// ❌ DON'T - Hard-coded values
Container(
  color: Color(0xFF2563EB),
  padding: EdgeInsets.all(16),
)

// ✅ DO - Design tokens
Container(
  color: AppColors.primary,
  padding: AppSpacing.medium,
)
```

### Consistent Spacing
Define spacing scale early (e.g., 4, 8, 12, 16, 24, 32, 48, 64)

### Color Palette
- Primary/Secondary/Accent colors
- Neutral grays (50-900 scale)
- Semantic colors (success, warning, error, info)
- Background/surface/text colors

### Typography
- Define font families upfront
- Font size scale (12, 14, 16, 18, 20, 24, 32, 48)
- Font weights (regular, medium, semibold, bold)

---

## Project Structure Patterns

### Flutter Example (🟢 SIMPLE)
```
lib/
├── models/          # Data models only
├── screens/         # UI screens
├── services/        # API/business logic
└── main.dart
```

**That's it.** No providers, repositories, adapters for simple apps.

### React/Next.js Example (🟢 SIMPLE)
```
app/
├── components/      # Reusable UI
├── api/            # API routes
└── pages/          # Route pages
```

### When Complexity Increases (🟡 MODERATE)
```
lib/
├── data/
│   ├── models/
│   └── repositories/    # Only when needed for testing
├── domain/
│   └── services/
└── presentation/
    ├── providers/       # State management
    └── screens/
```

---

## Ideation Before Building

**From Guide 02_vibe_coding_ideation_guide.md:**

Before writing code, validate the idea:

### Questions to Ask
1. **Problem** - What problem? Who has it? How do you know?
2. **Solutions** - What exists already? What are the gaps?
3. **Users** - Who specifically? Can you reach them?
4. **Differentiation** - Why would they choose this?
5. **Feasibility** - Can they build it? What's the complexity?
6. **Go/No-Go** - Honest recommendation

### Red Flags
- "Everyone needs this"
- "No competition" (usually means no market)
- "I'll figure out monetization later"
- Scope keeps expanding
- No specific target users

---

## Context Files to Create

When starting a new project with vibe-init, these files are created:

### CLAUDE.md (Project Overview)
```markdown
# Project Name

## Overview
[What does this app do?]

## Tech Stack
- Framework: [Next.js, Flutter, etc.]
- Database: [Supabase, Firebase, etc.]
- Deployment: [Vercel, etc.]

## Complexity: 🟢 SIMPLE

## Core Features
1. [Feature 1]
2. [Feature 2]
```

### RULES.md (Safety Rules)
```markdown
# Development Rules

## Forbidden Git Commands
[List of dangerous commands]

## Complexity Rules  
[Based on 🟢🟡🔴 classification]

## Approval Required For
- New dependencies
- Database schema changes
- Breaking API changes
```

### DESIGN_SYSTEM.md (UI Consistency)
```markdown
# Design System

## Colors
- Primary: #2563EB
- [etc.]

## Typography
- Headings: [font, sizes]
- Body: [font, sizes]

## Spacing Scale
4, 8, 12, 16, 24, 32, 48, 64
```

### ARCHITECTURE.md (Technical Decisions)
```markdown
# Architecture Decisions

## Tech Stack Rationale
[Why these choices?]

## Folder Structure
[Explain organization]

## Key Patterns
[Patterns used in this codebase]
```

---

## Common Pitfalls to Avoid

### Over-Engineering
**User asks:** "Build user authentication"
**Bad response:** Generate abstract UserRepository, IAuthService interface, factory pattern, etc.
**Good response:** Ask about complexity level, then generate simple concrete auth service

### Hallucinating APIs  
**Bad:** Assume Firebase has `getUserByEmail()` method
**Good:** Check Firebase docs or ask user to verify API exists

### Breaking Working Code
**Bad:** Refactor entire file to "improve" code structure  
**Good:** Only modify what's needed, preserve existing functionality

### Ignoring Context
**Bad:** Generate generic boilerplate without reading existing code
**Good:** Check coding patterns already in use, match that style

---

## Handling Ambiguity

When user request is unclear:

1. **Ask specific questions** - Don't assume
2. **Suggest simplest approach first** - Can always add complexity later  
3. **Provide options** - "Here are 3 ways to do this..."
4. **Warn about tradeoffs** - "Simple way vs flexible way"

**Example:**
```
User: "Add authentication"

You: "I can help with that! A few questions first:
- What complexity level is this project? (🟢🟡🔴)
- Do you need: Email/password only, or social auth too?
- Should I use an auth service (Firebase, Supabase) or build custom?
- Any specific security requirements?"
```

---

## Debugging Workflow

When user reports a bug:

1. **Ask for error message** - Exact text matters
2. **Check recent changes** - What was modified?
3. **Reproduce locally** - Can you test it?
4. **Hypothesize cause** - Explain your thinking
5. **Suggest fix** - With explanation why
6. **Test incrementally** - Verify each step

**Don't:** Rewrite entire files "just to be safe"

---

## Testing Approach

### For 🟢 SIMPLE Projects
- Manual testing is fine
- Add tests for critical paths only
- Don't over-test

### For 🟡 MODERATE Projects  
- Unit tests for business logic
- Integration tests for key workflows
- E2E tests for critical user paths

### For 🔴 COMPLEX Projects
- Comprehensive test coverage
- Compliance-driven testing
- Audit trail verification

---

## When User is Overcomplicating

**Signs:**
- Requesting abstractions for 2-3 simple screens
- "I want it flexible for future features"
- Designing for scale before MVP

**Response:**
```
"I notice this might be more complex than needed. This is a 🟢 SIMPLE 
project - let's start with the straightforward approach. We can always 
refactor later if complexity is actually needed. Here's the simple way..."
```

**Your job is to steer toward simplicity while respecting user's autonomy.**

---

## Prompting Tips

### Good Prompts
- "Create a login screen with email/password. 🟢 SIMPLE project, no abstractions."
- "Add error handling to this API call. Show the user a clear message."
- "This file is getting long. Split into smaller files following our pattern."

### Vague Prompts (Ask for Clarity)
- "Make it better"
- "Add more features"  
- "Fix the bug"

---

## Integration with Vibe Scripts

If user has vibe-init installed, they have these scripts:

- `vibe-ideate` - Ideation validation
- `vibe-architect` - Architecture decisions (use Sonnet by default, Opus for critical)
- `vibe-dev` - Implementation sessions
- `vibe-debug` - Debugging help
- `vibe-review` - Code review
- `vibe-mockup` - UI mockup generation

**These scripts auto-load context from CLAUDE.md and other files.**

---

## Resources

**Full Guides:** https://github.com/dataDrivenFitness/VibeCodingBlueprint/tree/main/guides

- 00: Master Index
- 01: Beginners Guide  
- 02: Ideation Guide
- 03: Context Files Guide
- 04: Caution Guide (Safety rules - CRITICAL)
- 05: Design System Guide
- 06: AI Collaboration Playbook
- 07: Complete CLAUDE.md Template
- 08: Troubleshooting Guide
- 09: Scripts Guide
- 10: Parallel Development Guide
- 11: Scaling Guide (Growing past MVP)
- 12: Agents Guide (Custom subagents & starter set)

---

## When the Project Scales (🔴 COMPLEX or 10K+ Lines)

As projects grow, new problems emerge. See Guide 11 for full details.

### Memory Management
- **Replace** context.md each session (don't append)
- **Keep** permanent patterns in MEMORY.md
- **Track** feature progress in development_focus.md

### Enforcement Over Documentation
- Don't just document patterns — create **wrapper widgets** that enforce them
- If AI keeps making the same mistake, create a component that makes the right thing automatic
- Add enforcement rules to CLAUDE.md: "NEVER use X directly → Use Y instead"

### Code Generation
- For models that need serialization: use codegen (freezed, json_serializable, Prisma, etc.)
- Never hand-write toJson/fromJson/copyWith — it drifts from the schema
- Always run the codegen command after model changes

### Rebranding / Major Renaming
Use the tiered approach:
1. **User-facing strings first** (what customers see)
2. **Package/module names** (what imports reference)
3. **Dev scripts** (what developers run) — optional, can skip
4. **Code internals** (comments, class names) — last priority

---

## Summary

This framework helps you build apps that:
- Work reliably
- Stay maintainable  
- Don't over-engineer
- Ship quickly
- Follow safety practices

**Start simple. Build iteratively. Ask questions. Challenge complexity.**

---

*The Vibe Coding Blueprint*  
*Simple > Clever. Working > Perfect.*
