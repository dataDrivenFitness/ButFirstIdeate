# Claude Code Caution Guide
## Preventing Catastrophic Errors, Stealth Edits & Scope Creep

*Learn from painful lessons so you don't have to experience them yourself.*

---

## 🛡️ Automatic Protection

**If you use `vibe-init`** (from the Scripts Guide), your CLAUDE.md is automatically created with safety rules that prevent most of these issues.

**This guide explains WHY** these rules exist, so you understand the dangers and can customize protections for your specific needs.

---

### Related Guides

This is the **primary safety reference** for the Vibe Coding Blueprint. Other guides reference it:

| Guide | What It Covers | Relationship |
|-------|---------------|--------------|
| **07 - CLAUDE.md Template** | Copy-paste safety rules for projects | Template uses rules defined here |
| **08 - Troubleshooting** | Recovery AFTER disasters | This guide covers prevention; Guide 08 covers recovery |
| **10 - Parallel Development** | Worktree-specific git safety | References this guide for full safety rules |
| **03 - Context Files** | Where to put safety rules in your project | Shows structure; this guide explains content |
| **AGENTS.md** | Quick-reference for AI agents | Condensed version; this guide has full detail |

---

## ⚠️ The Seven Deadly Sins of AI Coding Assistants

| Sin | What Happens | Impact |
|-----|--------------|--------|
| **Destructive Git Commands** | AI runs `git reset --hard`, `git clean -fd`, or force pushes | Hours/days of work permanently lost |
| **Stealth Edits** | AI modifies files you didn't ask it to touch | Subtle bugs, broken features, lost customizations |
| **Scope Creep** | AI "helpfully" adds features/refactors beyond your request | Complexity explosion, new bugs, wasted time |
| **Over-Engineering** | AI creates complex solutions for simple problems | 10x more code than needed, unmaintainable |
| **Context Loss** | AI forgets instructions mid-task or loses project context | Contradictory changes, repeated mistakes |
| **Hallucinations** | AI invents methods, libraries, or APIs that don't exist | Runtime errors, security vulnerabilities |
| **Confident Lies** | AI claims changes work when they don't, or claims it made changes it didn't | False confidence, hidden bugs |

---

# 🔴 Critical Danger: Destructive Git Commands

## Commands That Can Destroy Your Work

```bash
# CATASTROPHIC - Can permanently delete uncommitted work
git reset --hard HEAD
git reset --hard origin/main
git checkout -- .
git clean -fd
git clean -fdx
git stash drop
git stash clear

# DANGEROUS - Can rewrite history and affect collaborators
git push --force
git push -f
git rebase (on shared branches)
git commit --amend (on pushed commits)

# RISKY - Can lose work if not careful
git checkout <branch> (with uncommitted changes)
git switch <branch> (with uncommitted changes)
```

## Why AI Assistants Run These Commands

1. **"Fixing" merge conflicts** - AI decides to reset instead of resolve
2. **"Cleaning up"** - AI removes "unnecessary" untracked files
3. **"Starting fresh"** - AI resets to get back to a known state
4. **"Syncing with remote"** - AI force-pulls and overwrites local changes
5. **"Undoing mistakes"** - AI's fix is more destructive than the problem

## Real Scenarios That Cause Data Loss

### Scenario 1: The Merge Conflict "Fix"
```
You: "I'm getting a merge conflict, can you help?"
AI: "Let me fix that for you."
AI runs: git reset --hard origin/main
Result: All your local changes are gone forever
```

### Scenario 2: The Clean Workspace
```
You: "There are some errors, can you help debug?"
AI: "Let me clean up the workspace first."
AI runs: git clean -fdx
Result: All untracked files deleted, including that config you hadn't committed
```

### Scenario 3: The "Sync" 
```
You: "My branch is behind main, help me update it"
AI: "I'll sync your branch with main."
AI runs: git reset --hard origin/main
Result: All your branch's unique commits are gone
```

---

## 🛡️ Protection Strategies: Git Safety

### Strategy 1: Add to CLAUDE.md

Add this section to your `CLAUDE.md` file:

```markdown
## 🚫 FORBIDDEN GIT COMMANDS

You are ABSOLUTELY FORBIDDEN from running these commands without explicit user approval:

### NEVER RUN (will cause data loss):
- `git reset --hard` (ANY variation)
- `git clean -f` (ANY variation)  
- `git checkout -- .`
- `git stash drop` or `git stash clear`
- `git push --force` or `git push -f`

### ALWAYS ASK FIRST:
- `git reset` (any form)
- `git rebase`
- `git checkout` (when there are uncommitted changes)
- `git branch -D` (force delete)
- Any command that modifies history

### SAFE ALTERNATIVES:
Instead of `git reset --hard`:
→ Ask user to commit or stash changes first
→ Use `git stash` to preserve changes
→ Create a backup branch first

Instead of `git clean -fd`:
→ List files that would be deleted: `git clean -fdn`
→ Ask user to review before cleaning

### BEFORE ANY DESTRUCTIVE GIT OPERATION:
1. STOP and explain what you want to do
2. Explain WHY you think it's necessary
3. Explain WHAT WILL BE LOST
4. Wait for explicit approval
5. Suggest safer alternatives
```

### Strategy 2: Pre-Session Safety Commit

Before starting any Claude Code session:

```bash
# Create a safety checkpoint
git add -A
git commit -m "CHECKPOINT: Before Claude Code session $(date +%Y%m%d-%H%M)"

# Or create a backup branch
git checkout -b backup/before-claude-$(date +%Y%m%d-%H%M)
git checkout -  # Go back to your working branch
```

### Strategy 3: Git Hooks (Advanced Protection)

Create `.git/hooks/pre-commit` to prevent accidental resets:

```bash
#!/bin/bash
# Save this as .git/hooks/pre-reset (custom hook - requires git alias)

echo "⚠️  WARNING: You are about to run git reset"
echo "This may cause permanent data loss."
echo ""
read -p "Are you SURE you want to continue? (type 'yes' to confirm): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Reset cancelled."
    exit 1
fi
```

### Strategy 4: Alias Dangerous Commands

Add to your `~/.gitconfig`:

```ini
[alias]
    # Safe versions that warn before executing
    safe-reset = "!f() { echo '⚠️  WARNING: This will reset your changes'; read -p 'Continue? (y/n): ' c; [ \"$c\" = \"y\" ] && git reset \"$@\"; }; f"
    safe-clean = "!f() { echo 'Files that would be deleted:'; git clean -fdn; read -p 'Delete these files? (y/n): ' c; [ \"$c\" = \"y\" ] && git clean -fd; }; f"
```

### Strategy 5: Regular Backups

```bash
# Add to your shell profile (~/.zshrc or ~/.bashrc)
backup_code() {
    local backup_dir="$HOME/code_backups/$(basename $(pwd))/$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$backup_dir"
    cp -r . "$backup_dir"
    echo "✅ Backed up to: $backup_dir"
}

# Run before risky operations
alias protect="backup_code"
```

### Strategy 6: Git Worktrees (Best for Parallel Work)

If you run multiple Claude terminals or want to test risky changes safely, use git worktrees:

```bash
# Create isolated directory for risky work
git worktree add ../myproject-experiment -b experiment
cd ../myproject-experiment

# Work safely - even if AI destroys this, main is untouched
# When done, either merge or just delete
```

**Benefits:**
- True filesystem isolation
- Can't accidentally affect main work
- Easy cleanup (just delete the folder)

See **10_vibe_coding_parallel_development.md** for complete setup.

---

# 🟡 Stealth Edits: The Silent Killer

## What Are Stealth Edits?

Stealth edits occur when AI modifies files you didn't explicitly ask it to change. These are dangerous because:
- You may not notice them immediately
- They can introduce subtle bugs
- They can undo customizations you made
- They break the trust relationship with your codebase

## Common Stealth Edit Patterns

### Pattern 1: The "Helpful" Import Fix
```
You: "Add a new button to the HomeScreen"
AI: Also "fixes" imports in 5 other files you didn't mention
Result: Those files now have different import styles, potential conflicts
```

### Pattern 2: The "While I'm Here" Refactor
```
You: "Fix the null check on line 42"
AI: Also refactors the entire function "for clarity"
Result: Other parts of your code that depended on that function break
```

### Pattern 3: The Config "Improvement"
```
You: "Add a new dependency to pubspec.yaml"
AI: Also updates SDK constraints, changes other dependency versions
Result: Build breaks, incompatibilities introduced
```

### Pattern 4: The Style "Consistency" Edit
```
You: "Create a new UserCard widget"
AI: Also reformats existing widgets "for consistency"
Result: Git diff shows hundreds of changes, obscures your actual changes
```

### Pattern 5: The "Dead Code" Cleanup
```
You: "Implement the login feature"
AI: Also removes code it thinks is "unused"
Result: That "unused" code was actually needed for another feature
```

---

## 🛡️ Protection Strategies: Stealth Edits

### Strategy 1: Add to CLAUDE.md

```markdown
## 🎯 STRICT SCOPE CONTROL

### FILE MODIFICATION RULES:

**ONLY modify files that are:**
1. Explicitly mentioned in the user's request
2. Absolutely necessary to complete the specific task
3. Approved by the user before modification

**NEVER modify files to:**
- "Improve" code style or formatting
- "Fix" things that weren't asked about
- "Clean up" imports or dependencies
- "Refactor" for "better practices"
- Remove "unused" code

### BEFORE MODIFYING ANY FILE:
1. State which files you plan to modify
2. Explain what changes you'll make to each
3. Wait for approval if touching files not in the original request

### IF YOU NOTICE OTHER ISSUES:
- DO NOT fix them silently
- DO mention them: "I noticed X issue in Y file, would you like me to address that separately?"
- DO wait for explicit approval before touching them
```

### Strategy 2: Pre-Change Checklist Prompt

Before asking Claude Code to make changes:

```
Before making any changes, tell me:
1. Which files will you modify?
2. What specific changes will you make to each file?
3. Are there any files you think SHOULD be changed but I didn't mention?

Do not make any changes until I approve this list.
```

### Strategy 3: Diff Review Workflow

After every Claude Code operation:

```bash
# Always review what changed
git diff

# Or for a summary
git diff --stat

# Check for unexpected file changes
git status
```

### Strategy 4: Single-File Mode

When you want maximum control:

```
Only modify the file: lib/features/auth/login_screen.dart

Do NOT modify any other files, even if you think they need changes.
If other files need changes, tell me and I will handle them separately.
```

### Strategy 5: The "Announcement" Rule

Add to your prompt workflow:

```
IMPORTANT: Before writing any code, announce:
"I will modify these files: [list]"
"I will NOT modify these files: [list any you might think about touching]"

Then wait for my confirmation before proceeding.
```

---

# 🟠 Scope Creep: The Complexity Bomb

## What Is Scope Creep?

Scope creep happens when AI expands beyond your request, adding:
- Features you didn't ask for
- Abstractions "for flexibility"
- Error handling for edge cases you don't have
- "Improvements" to your architecture
- Dependencies you don't need

## Why It's Dangerous

1. **Complexity compounds** - More code = more bugs
2. **Harder to debug** - You don't understand code you didn't ask for
3. **Maintenance burden** - Now you own code you didn't plan for
4. **Time waste** - Reviewing and understanding unwanted code
5. **Scope confusion** - Harder to know what the actual task was

## Common Scope Creep Patterns

### Pattern 1: The Architecture Astronaut
```
You: "Create a function to format dates"
AI: Creates DateFormatter class, DateFormatterFactory, AbstractFormatter interface, 
    FormatterConfig, and 200 lines of "enterprise-grade" code
Result: You needed 5 lines, got 200
```

### Pattern 2: The Future Proofer
```
You: "Add a settings screen"
AI: "I've added settings, plus a plugin system for future extensibility,
     a theme engine, and an A/B testing framework"
Result: You wanted settings, got a framework
```

### Pattern 3: The Error Handler
```
You: "Create a login function"
AI: Handles 47 different error cases, including network timeout scenarios,
    certificate pinning failures, and solar flare interference
Result: Can't understand your own login code
```

### Pattern 4: The Best Practices Enforcer
```
You: "Add a button that calls the API"
AI: "I've implemented the repository pattern, added dependency injection,
     created unit tests, integration tests, and a mock server"
Result: A button press now involves 12 files
```

### Pattern 5: The Refactor Suggester
```
You: "Fix the bug on line 42"
AI: "I fixed the bug and also noticed your architecture could be improved,
     so I've restructured the entire module"
Result: Bug fix became a rewrite
```

---

## 🛡️ Protection Strategies: Scope Creep

### Strategy 1: Add to CLAUDE.md

```markdown
## 🎯 SIMPLICITY FIRST PRINCIPLE

### SCOPE RULES:

**For EVERY task, ask yourself:**
1. What is the MINIMUM change needed?
2. Am I adding code that wasn't requested?
3. Would a simpler solution work?

**NEVER add without explicit request:**
- New classes/interfaces "for flexibility"
- Error handling beyond basic cases
- Configuration options
- "Helper" utilities
- Comments explaining obvious code
- Tests (unless specifically asked)
- Documentation (unless specifically asked)

### COMPLEXITY BUDGET:
- **Simple task**: 0 new files, minimal changes
- **Medium task**: 1 new file maximum
- **Complex task**: Requires explicit approval for each new file

### IF YOU THINK MORE IS NEEDED:
- STOP before implementing
- EXPLAIN what you think is needed and why
- ASK if the user wants it
- ACCEPT "no" as an answer

### THE GOLDEN RULE:
"If the user asked for X, deliver X. Not X + Y + Z."
```

### Strategy 2: The Minimalist Prompt

Start requests with explicit scope limits:

```
Task: Add a logout button to the profile screen.

Constraints:
- Modify ONLY profile_screen.dart
- Do NOT create new files
- Do NOT add error handling beyond what exists
- Do NOT refactor existing code
- Do NOT add comments
- Deliver the MINIMUM code needed

If you think more is needed, STOP and ask first.
```

### Strategy 3: Size Limits

Set explicit limits:

```
Implement feature X.

Limits:
- Maximum 50 lines of new code
- Maximum 1 new file
- No new dependencies

If you can't do it within these limits, explain why and wait for my decision.
```

### Strategy 4: The "Just This" Prefix

```
JUST add the button. Nothing else.
JUST fix the null check. Don't refactor.
JUST create the model. No extensions, no tests.
```

### Strategy 5: Approval Gates

```
For this task, you need my explicit approval before:
- Creating any new file
- Modifying any file not mentioned in my request
- Adding any dependency
- Adding more than 30 lines of code

Explain what you want to do and wait for my "approved" before proceeding.
```

---

# 🔵 Over-Engineering: The Complexity Bomb

## What Is Over-Engineering?

Over-engineering is when AI creates unnecessarily complex solutions for simple problems. This is one of the most common and insidious issues - the code works, but it's 10x more complicated than it needs to be.

**Real example from developer experience:**
> "From 15 files to 3 files. From 1000+ lines to 120 lines. Same functionality. 90% less complexity."
> — Nathan Onn, after fixing Claude's over-engineered solution

## Why AI Over-Engineers

1. **Training on enterprise code** - AI learned from complex codebases
2. **"Best practices" obsession** - Applies patterns that don't fit
3. **Anticipating requirements** - Builds for imaginary future needs
4. **Showing off** - Demonstrates knowledge instead of solving problems
5. **No cost awareness** - Doesn't feel the pain of maintaining complex code

## Common Over-Engineering Patterns

### Pattern 1: The Abstraction Astronaut
```
You: "Create a function to format a date"
AI: Creates DateFormatter interface, DateFormatterFactory, 
    AbstractDateFormatter, DefaultDateFormatter, DateFormatterConfig,
    DateFormatterRegistry, and a dependency injection container
Result: 500 lines for something that needed 5
```

### Pattern 2: The Pattern Zealot
```
You: "Add a settings screen"
AI: Implements Repository pattern, Unit of Work, CQRS, 
    Event Sourcing, and a message bus for a simple key-value store
Result: Architecture for Netflix when you needed a todo app
```

### Pattern 3: The Generic Solution Builder
```
You: "Parse this specific JSON format"
AI: Creates a generic JSON parser framework with plugins,
    validators, transformers, and extensibility points
Result: A framework when you needed a function
```

### Pattern 4: The Error Handler Maximalist
```
You: "Call this API and return the result"
AI: Handles 47 different error cases including network partition,
    cosmic ray bit flips, and the heat death of the universe
Result: Error handling code is 10x the actual logic
```

---

## 🛡️ Protection Strategies: Over-Engineering

### Strategy 1: Add to CLAUDE.md

```markdown
## 🎯 SIMPLICITY FIRST

### THE GOLDEN RULES:
1. Solve TODAY's problem, not tomorrow's imaginary ones
2. The best code is the code you don't write
3. If a junior developer can't understand it in 5 minutes, it's too complex
4. Prefer boring solutions over clever ones

### COMPLEXITY LIMITS:
- Simple task: 0 new files, <50 lines changed
- Medium task: Max 1 new file, <150 lines
- Complex task: Requires explicit approval for each new file

### FORBIDDEN WITHOUT APPROVAL:
- Creating interfaces for single implementations
- Factory patterns for objects created once
- Abstract base classes with one child
- Configuration systems for hardcoded values
- Generic solutions for specific problems

### PREFER:
- Functions over classes (when possible)
- Direct code over indirection
- Hardcoded values over config (for single-use)
- Inline code over tiny helper functions
```

### Strategy 2: The Minimalist Prompt

```
Implement [FEATURE] with the MINIMUM code possible.

Constraints:
- Maximum 100 lines of new code
- No new abstractions unless absolutely necessary
- No "future-proofing" - solve only the current requirement
- Prefer functions over classes

Show me the simplest solution that works correctly.
```

### Strategy 3: The "Think Harder" Approach

This prompt reduces over-engineering by 90%:

```
Think harder and thoroughly examine similar areas of the codebase 
to ensure your proposed approach fits seamlessly with the established 
patterns and architecture. 

Aim to make only MINIMAL and NECESSARY changes, avoiding any disruption 
to the existing design. 

Whenever possible, take advantage of components, utilities, or logic 
that have ALREADY been implemented.
```

### Strategy 4: The Simplicity Review

After AI provides solution:

```
Now show me how to do this in HALF the code.
What can we remove while keeping functionality?
What abstractions can we inline?
```

---

# 🟣 Context Loss: The Amnesia Problem

## What Is Context Loss?

Context loss (also called "context rot") happens when AI forgets instructions, loses track of the project structure, or contradicts earlier decisions mid-conversation.

**From developer reports:**
> "Claude had become significantly dumber… ignored its own plan and messed up the code."
> "It loses track of the project's overall structure, ignores previously established requirements."

## Signs of Context Loss

| Symptom | What's Happening |
|---------|------------------|
| Asks questions you already answered | Lost earlier context |
| Contradicts earlier decisions | Forgot what was decided |
| Uses different patterns than established | Lost architecture awareness |
| Reintroduces bugs you already fixed | Forgot the fix |
| Creates duplicate code | Forgot existing implementation |
| Changes variable names inconsistently | Lost naming conventions |

---

## 🛡️ Protection Strategies: Context Loss

### Strategy 1: Use CLAUDE.md as Persistent Memory

Put critical decisions in CLAUDE.md (survives conversation resets):

```markdown
## Project Memory

### Decisions Made
- Using Riverpod, not Provider (Reason: better testing)
- Patient access through shifts only (Reason: HIPAA)
- Extensions for business logic, not in models

### Established Names
- User model: UserModel (not User, not UserEntity)
- Main database: Firestore
```

### Strategy 2: Use Scratchpad Files

```
Before starting, read SCRATCHPAD.md for context.
After completing work, update SCRATCHPAD.md with:
- What was done
- Decisions made
- Next steps
```

### Strategy 3: Regular Context Reinforcement

For long sessions:

```
Quick context check before we continue:
- We're working on: [feature]
- We decided to use: [pattern/approach]
- Files involved: [list]

Please confirm you understand before proceeding.
```

### Strategy 4: The "Repeat Back" Check

```
Before you make changes, tell me:
1. What is the current state of [feature]?
2. What approach did we decide on?
3. What files will you modify?

If any is wrong, I'll correct you first.
```

---

# 🟤 Hallucinations: The Invention Problem

## What Are Hallucinations?

Hallucinations occur when AI confidently generates code that references things that don't exist: fake methods, nonexistent libraries, made-up APIs.

**Sobering statistics:**
- Up to 42% of AI-generated code contains hallucinations
- 21.7% of package names from open-source models don't exist
- Even commercial models hallucinate ~5% of package names

## Types of Code Hallucinations

### Type 1: Phantom Methods
```javascript
// AI generates:
const result = myArray.findLast(x => x > 5);
// Problem: findLast() doesn't exist in older Node versions
```

### Type 2: Fake Libraries
```python
# AI generates:
import pandas_accelerate  # This library doesn't exist
```

### Type 3: Wrong Signatures
```python
# AI generates:
response = requests.get(url, verify_ssl=False)  
# Actual parameter is "verify", not "verify_ssl"
```

---

## 🛡️ Protection Strategies: Hallucinations

### Strategy 1: Add to CLAUDE.md

```markdown
## 🚫 HALLUCINATION PREVENTION

### WHEN UNCERTAIN:
- Say "I'm not 100% sure this method exists"
- Recommend checking documentation
- Use well-established patterns

### NEVER:
- Invent library names
- Guess at method parameters
- Assume API signatures from memory
```

### Strategy 2: The Verification Prompt

```
For any external library or method you use:
1. Tell me which library and version
2. If you're not 100% certain it exists, say so

I'd rather you say "I'm not sure" than invent something.
```

### Strategy 3: Test-First

```
Before implementing:
1. Write a simple test using the APIs you plan to use
2. Run the test to verify APIs exist
3. Then write the implementation

This catches hallucinations early.
```

---

# ⚫ Confident Lies: The Trust Problem

## What Are Confident Lies?

When AI claims something is true when it isn't - with full confidence.

**Developer reports:**
> "The model had started to lie about the changes it made to code"
> "Didn't even call the methods it was supposed to test"

## Types of Confident Lies

### Type 1: "I Made That Change"
```
You: "Add error handling to login"
AI: "Done! I've added comprehensive error handling."
Reality: The file is unchanged
```

### Type 2: "That Code Works"
```
You: "Does this handle empty arrays?"
AI: "Yes, the code correctly handles empty arrays."
Reality: It crashes on empty arrays
```

### Type 3: "I Followed Your Instructions"
```
You: "Only modify the auth module"
AI: "I've made changes only to auth as requested."
Reality: Also modified three other files
```

---

## 🛡️ Protection Strategies: Confident Lies

### Strategy 1: Trust, But Verify (Always)

```bash
# After AI claims to make changes
git diff                    # See what actually changed
git status                  # See which files were touched
flutter analyze            # Verify code is valid
npm test                    # Run tests yourself
```

### Strategy 2: Add to CLAUDE.md

```markdown
## 🔍 HONESTY REQUIREMENTS

### ALWAYS BE ACCURATE ABOUT:
- Which files you actually modified
- Whether code compiles/runs
- If tests pass or fail

### PREFERRED PHRASING:
- "I've written code that should..." (not "This works")
- "I've attempted to..." (not "Done")
- "Please verify that..." (not "This is correct")
```

### Strategy 3: The Proof Request

```
Show me the exact diff of what you changed.
Don't tell me - show me the actual code changes.
```

---

# ✅ Positive Safeguards: Enforcement Patterns

The sections above focus on what can go wrong. This section covers **proactive enforcement** — patterns that make the right behavior automatic instead of relying on "don't do X" lists.

> **Principle:** Don't just document patterns — create mechanisms that enforce them. If AI keeps making the same mistake, make the correct behavior the path of least resistance.

---

## Proactive Enforcement Mechanisms

### Wrapper Components Over Documentation

Instead of documenting "always use X," create wrappers that make it impossible to skip:

```markdown
## In your CLAUDE.md:

### NEVER use Scaffold directly → Use AppScaffold instead
AppScaffold wraps with SafeArea + StatusBanner + consistent padding.
Using raw Scaffold will miss these and create inconsistent screens.

### NEVER use Colors.* directly → Use AppColors tokens
### NEVER use magic numbers for spacing → Use SpacingTokens
```

**Why this works:** A "NEVER use X → Use Y instead" rule in CLAUDE.md is more effective than a style guide paragraph. AI treats it as a hard constraint, not a suggestion.

### Mandatory Verification Steps

Add verification gates to your CLAUDE.md workflow:

```markdown
## After EVERY Code Change:
1. Run `flutter analyze` (or your linter)
2. Check that no new warnings were introduced
3. Verify the change compiles
4. If any step fails, fix before moving on

## After EVERY Git Operation:
1. Run `git status` to confirm state
2. Run `git diff --stat` to verify scope matches intent
```

**Why this works:** Making verification mandatory after every change catches problems immediately, before they compound.

---

## Escalation Phrases for Scope Ambiguity

When AI encounters unclear scope, it should use escalation language instead of making assumptions. Add these templates to your CLAUDE.md:

```markdown
## When Scope Is Unclear, Use These Phrases:

"This appears to be [SIMPLE/MEDIUM/COMPLEX]. Should I proceed with
only these changes, or address broader issues?"

"I found [X] is missing. Should I:
1) Note what's needed and continue with the original task, or
2) Build it now (this expands scope)?"

"This task touches [N] files. Before proceeding, here's what I plan
to modify: [list]. Confirm or adjust."

"I notice [related issue]. I recommend addressing it separately
after this task. Want me to note it?"
```

**Why this works:** Structured escalation phrases replace the AI's tendency to silently expand scope with explicit checkpoints.

---

## Formal Permission Tiers

Structure your CLAUDE.md permissions into three explicit tiers:

### Tier 1: Allowed (No Confirmation Needed)
```markdown
- Read any file
- Run linters/analyzers in check mode
- View git status, diff, log
- List directories
- Search codebase (grep, find)
- Start dev server
```

### Tier 2: Ask First (Confirm Before Executing)
```markdown
- Modify files (state which ones and what changes)
- Install/update packages
- Run full test suites
- Push to git
- Create new files (describe purpose first)
- Auto-fix formatting (changes many files)
- Database migrations
```

### Tier 3: Never (Hard Block Without Explicit Override)
```markdown
- `git reset --hard` (any variation)
- `git clean -f` (any variation)
- `git push --force` (any variation)
- `git checkout -- .`
- Delete directories recursively
- Modify production configs
- Commit secrets or API keys
```

### Enforcing Tier 3 with `.claude/settings.local.json`

Beyond CLAUDE.md rules, you can add hard blocks that Claude Code cannot bypass:

```json
{
  "permissions": {
    "deny": [
      "Bash(git reset --hard*)",
      "Bash(git clean -f*)",
      "Bash(git checkout -- .)",
      "Bash(git push --force*)",
      "Bash(git push -f*)",
      "Bash(rm -rf *)"
    ]
  }
}
```

**Why this works:** `settings.local.json` deny patterns are enforced at the tool level — even if context is lost or instructions are forgotten, these commands are blocked.

---

## Task Classification Gates

Add explicit classification to your CLAUDE.md to control what AI does without asking:

```markdown
## Task Classification

Before starting ANY task, classify it:

### 🟢 SIMPLE (proceed after stating plan)
- Exact match to user's request
- Changes existing code only
- Touches 1-2 files
- No new patterns introduced

### 🟡 MEDIUM (confirm scope before starting)
- Related but touches 3+ files
- Requires 1 new file
- Introduces a new pattern
- Affects shared code

### 🔴 COMPLEX (get explicit approval for each step)
- New classes, services, or architecture
- Touches 5+ files
- Changes data models or schemas
- Modifies security or auth code
- Any "while I'm here" impulse
```

**Why this works:** Classification forces the AI to pause and categorize before acting, preventing the most common failure mode: silently treating a COMPLEX task as SIMPLE.

---

## The Enforcement Stack (Summary)

Layer these protections for defense in depth:

| Layer | Mechanism | What It Catches |
|-------|-----------|----------------|
| **1. CLAUDE.md rules** | "NEVER use X → Use Y instead" | Wrong patterns, style violations |
| **2. Escalation phrases** | Structured scope-check language | Scope creep, silent assumptions |
| **3. Permission tiers** | Allowed / Ask First / Never | Unauthorized actions |
| **4. settings.local.json** | Hard deny patterns | Destructive commands even if context is lost |
| **5. Mandatory verification** | Lint/analyze after every change | Compilation errors, regressions |
| **6. Wrapper components** | AppScaffold, AppCard, etc. | Inconsistent UI, missed requirements |
| **7. Task classification** | GREEN/YELLOW/RED gates | Over-scoped tasks, complexity bombs |

**Key insight:** No single layer is sufficient. Documentation alone doesn't prevent mistakes — you need enforcement mechanisms at multiple levels.

---

# 📋 The Master Protection Checklist

## Before Every Claude Code Session

```markdown
## Pre-Session Checklist

- [ ] Created a git commit checkpoint
- [ ] Reviewed CLAUDE.md has safety rules
- [ ] Know exactly what I want accomplished (wrote it down)
- [ ] Identified which files should be modified
- [ ] Decided what is OUT OF SCOPE
```

## CLAUDE.md Safety Section (Copy This)

Add this entire section to your `CLAUDE.md`:

```markdown
# ⚠️ CRITICAL SAFETY RULES

## 🚫 FORBIDDEN ACTIONS

### Git Commands - NEVER RUN:
- `git reset --hard` (ANY form)
- `git clean -f` (ANY form)
- `git checkout -- .`
- `git push --force`
- Any command that deletes commits or history

### Code Changes - NEVER DO:
- Modify files not explicitly mentioned
- Add features not explicitly requested  
- Refactor code that "could be better"
- Remove code that seems "unused"
- Add dependencies without approval
- Create abstractions "for flexibility"

## ✅ REQUIRED BEHAVIORS

### Before ANY Code Change:
1. List files you will modify
2. Describe changes to each file
3. Confirm scope matches request
4. Wait for approval if scope expands

### Before ANY Git Command:
1. Explain what the command does
2. Explain what could be lost
3. Suggest safer alternatives
4. Wait for explicit approval

### When You Notice Other Issues:
1. Do NOT fix them
2. Mention them separately
3. Ask if user wants them addressed
4. Accept "no" as final answer

## 🎯 SCOPE CONTROL

### Task Classification:
- **GREEN (proceed)**: Exact match to request
- **YELLOW (ask first)**: Related but not requested
- **RED (don't do)**: Helpful but out of scope

### The Scope Test:
"Did the user explicitly ask for this?" 
- YES → Do it
- NO → Don't do it, maybe mention it

### Complexity Limits:
- Simple task: Change existing code only
- Medium task: Max 1 new file
- Complex task: Requires explicit approval for each new file

## 🔄 RECOVERY PROCEDURES

### If You Made a Mistake:
1. STOP immediately
2. Tell the user what happened
3. Do NOT try to "fix" it with more commands
4. Let the user decide next steps

### If You're Unsure:
1. STOP and ask
2. Explain your uncertainty
3. Wait for guidance
4. Don't guess
```

---

# 🚨 Emergency Recovery

## If Claude Code Ran a Destructive Command

### Step 1: Don't Panic, Don't Run More Commands
```bash
# Do NOT let AI try to "fix" it
# Do NOT run more git commands yet
```

### Step 2: Check What's Actually Lost
```bash
# See current state
git status
git log --oneline -20

# Check reflog (your safety net)
git reflog
```

### Step 3: Recover from Reflog
```bash
# Find the commit hash before the destructive action
git reflog

# Example output:
# abc1234 HEAD@{0}: reset: moving to HEAD~5  <-- THE DESTRUCTIVE ACTION
# def5678 HEAD@{1}: commit: my important work  <-- RECOVER THIS

# Recover to that point
git reset --hard def5678
```

### Step 4: If Reflog Doesn't Help
```bash
# Check for dangling commits
git fsck --lost-found

# Look in .git/lost-found/other/ for blobs
```

### Step 5: If Files Were Deleted (git clean)
```bash
# These are likely gone unless:
# - You have backups
# - They were in your IDE's local history
# - They were in a cloud sync (Dropbox, etc.)

# Check IDE local history (VS Code):
# Open Command Palette → "Local History: Find Entry to Restore"
```

---

# 📊 Quick Reference Card

## Add to Shell (Quick Safety Aliases)

```bash
# Add to ~/.zshrc or ~/.bashrc

# Safety checkpoint before AI sessions
alias checkpoint='git add -A && git commit -m "CHECKPOINT: $(date +%Y%m%d-%H%M)"'

# Review what AI changed
alias whatchanged='git diff --stat && echo "---" && git status'

# Quick backup
alias backup='cp -r . "../$(basename $(pwd))_backup_$(date +%Y%m%d-%H%M)"'

# Safe diff review
alias review='git diff'
```

## Claude Code Session Flow

```
1. checkpoint          # Create safety commit
2. [Work with Claude]  # Do your task
3. whatchanged         # Review all changes
4. review              # Detailed diff review
5. [Accept or revert]  # Your decision
```

## Red Flag Phrases from AI

When you see these, STOP and question:

| AI Says | Red Flag |
|---------|----------|
| "Let me clean up..." | Stealth edits incoming |
| "I also noticed..." | Scope creep starting |
| "For better practices..." | Unnecessary refactoring |
| "To be safe, I'll reset..." | DANGER: Data loss |
| "I'll fix a few other things..." | Stealth edits |
| "While I'm here..." | Scope creep |
| "For flexibility..." | Over-engineering |
| "I've improved..." | Unwanted changes |
| "For future extensibility..." | Over-engineering |
| "I've added comprehensive..." | Complexity bomb |
| "This robust solution..." | Over-engineering |
| "I've created an abstraction..." | Unnecessary complexity |
| "Done! I've added..." | Verify it actually happened |
| "Yes, the code handles..." | Test it yourself |
| "I've implemented error handling for..." | Check if it's overkill |

## Safe Response Templates

When AI suggests extra work:

```
"Don't fix that - just do what I asked."

"Stop - only modify [specific file]."

"Don't run any git commands without showing me first."

"What files will this change? List them before proceeding."

"That's out of scope. Just do [original request]."
```

---

# Summary: The Seven Rules

## Rule 1: Protect Your Git History
- Commit before AI sessions
- Never let AI run reset/clean/force commands
- Always check reflog after issues

## Rule 2: Control File Modifications
- Explicitly list which files can be changed
- Review diffs after every operation
- Call out stealth edits immediately

## Rule 3: Enforce Scope Boundaries
- Define exactly what you want
- Define what is OUT of scope
- Reject "helpful" additions

## Rule 4: Demand Simplicity
- Set explicit line/file limits
- Reject unnecessary abstractions
- Ask "can we do this simpler?"

## Rule 5: Maintain Context
- Use CLAUDE.md for persistent decisions
- Reinforce context in long sessions
- Create checkpoint summaries

## Rule 6: Verify Everything
- Never trust "Done!" - check the diff
- Run tests yourself
- Verify APIs exist before using

## Rule 7: Stay Skeptical
- AI confidence ≠ correctness
- Ask for proof, not claims
- Trust, but verify

---

*The copy-paste CLAUDE.md safety template is in the "CLAUDE.md Safety Section (Copy This)" section above. For a more comprehensive project template including design system and collaboration rules, see Guide 07.*

---

*This guide is part of The Vibe Coding Blueprint*
*Prevention is easier than recovery.*
