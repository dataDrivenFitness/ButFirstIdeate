# Troubleshooting Guide
## Common Problems & Solutions for AI-Assisted Development

*When things go wrong (and they will), here's how to fix them.*

---

## How to Use This Guide

1. **Find your problem** in the category sections below
2. **Try the solutions** in order (simplest first)
3. **Use the recovery commands** if needed
4. **Prevent recurrence** with the suggested rules

**Can't find your issue?** Check if it's a variation of a listed problem, or add it to your project notes for the framework to address.

---

# 🤖 AI Behavior Problems

## AI Is Over-Engineering Everything

### Symptoms
- Creating 5+ files for a simple feature
- Abstract classes and interfaces appearing
- Words like "BaseRepository", "IService", "Manager"
- "Clean Architecture" layers being set up
- New packages being added unnecessarily

### Immediate Fix
```
Stop. This is too complicated.

I asked for [SIMPLE THING]. You're creating [X files/abstractions].

Start over with these constraints:
- Maximum 3 files
- No abstract classes or interfaces
- No new packages
- Code a beginner could understand

Show me the simplest possible implementation.
```

### Prevention
Add to CLAUDE.md:
```markdown
## Simplicity First
NEVER create without explicit approval:
- Abstract classes or interfaces
- Generic/base classes
- More than 4 files for a single feature
- New packages (try built-in solutions first)
```

### Root Cause
AI is trained on enterprise codebases and "best practices" articles. It doesn't know you're a solo dev building an MVP unless you tell it.

---

## AI Keeps Hallucinating APIs/Methods

### Symptoms
- Code that looks right but doesn't compile
- Method names that don't exist in the package
- Parameters with wrong names
- Deprecated APIs being used

### Immediate Fix
```
That method doesn't exist. Before suggesting code:
1. Verify the API exists in [PACKAGE] version [X]
2. Check the official documentation
3. If uncertain, say so

What's the ACTUAL API for [WHAT I NEED]?
```

### Prevention
Add to CLAUDE.md:
```markdown
## API Verification
Before providing code:
- [ ] Verify methods exist in stated package version
- [ ] Use current, non-deprecated APIs
- [ ] If uncertain, say "I'm not sure this exists, please verify"
```

### Quick Verification
```bash
# Check if package has the method (Flutter)
flutter pub deps | grep [package_name]
# Then check package documentation online
```

---

## AI Isn't Following Project Patterns

### Symptoms
- Creating new patterns when existing ones exist
- Different code style than rest of codebase
- Not using existing utilities/components
- Ignoring established conventions

### Immediate Fix
```
This doesn't match our existing patterns.

Look at [EXISTING_FILE] and match that pattern exactly.
We already have [UTILITY/COMPONENT] for this - use it.
```

### Prevention
```
Before writing code for [FEATURE]:
1. Check lib/shared/ for existing components
2. Check lib/core/utils/ for existing utilities  
3. Look at similar features for patterns to follow
4. Match existing code style exactly
```

### Root Cause
AI doesn't automatically read your whole codebase. You need to point it to examples.

---

## AI Goes Off-Track / Misunderstands Request

### Symptoms
- Building something different than what you asked
- Making assumptions without asking
- Solving the wrong problem
- Adding features you didn't request

### Immediate Fix
```
Stop. That's not what I asked for.

Let me clarify: [RESTATE YOUR REQUEST CLEARLY]

Before continuing, restate what you think I'm asking for.
```

### Prevention
```
Before starting, restate what you think I'm asking for 
and list the specific files you'll create/modify.
Wait for my confirmation.
```

### Pro Tip
Start complex requests with:
```
I want to [GOAL]. 
I do NOT want [COMMON MISINTERPRETATION].
Confirm your understanding before coding.
```

---

## AI Gives Generic/Shallow Answers

### Symptoms
- Template-like responses
- Missing your specific context
- Ignoring constraints you mentioned
- Copy-paste feeling solutions

### Immediate Fix
```
That's too generic. Think about MY specific situation:
- I'm using [FRAMEWORK/VERSION]
- My constraint is [CONSTRAINT]
- The specific problem is [SPECIFIC DETAIL]

Give me a solution tailored to this context.
```

### Prevention
Always include context:
```
Context:
- Framework: Flutter 3.x with Riverpod
- Current file: [FILENAME]
- What exists: [RELEVANT EXISTING CODE]
- Constraint: [SPECIFIC LIMITATION]

Now help me with [SPECIFIC TASK].
```

---

## AI Seems Stuck in a Loop

### Symptoms
- Suggesting the same fix repeatedly
- Not learning from "that didn't work"
- Going in circles
- Same errors reappearing

### Immediate Fix
```
We've tried this approach multiple times and it's not working.

What we've tried:
1. [ATTEMPT 1] - Result: [WHAT HAPPENED]
2. [ATTEMPT 2] - Result: [WHAT HAPPENED]
3. [ATTEMPT 3] - Result: [WHAT HAPPENED]

Let's try a completely different approach. 
What ELSE could cause this issue?
```

### Prevention
Keep a running log of what's been tried:
```
DEBUG LOG:
- [TIME]: Tried X, got error Y
- [TIME]: Tried A, got error B
```

### Nuclear Option
```
Let's start fresh. Forget everything we've tried.
Pretend you're seeing this problem for the first time.
What would you investigate FIRST?
```

---

# 🔥 Git Disasters

> *For **prevention** of git disasters (forbidden commands, protection strategies, enforcement patterns), see [Guide 04 - Caution Guide](04_vibe_coding_caution_guide.md). This section covers **recovery** AFTER disaster strikes.*

## Accidentally Ran `git reset --hard`

### Symptoms
- Uncommitted work disappeared
- Files reverted to old state
- Changes you were working on are gone

### Recovery Steps

**Step 1: Don't panic.** Recent work might be recoverable.

**Step 2: Check reflog**
```bash
git reflog
# Shows recent HEAD positions - find the one before reset
```

**Step 3: Recover if found**
```bash
git checkout -b recovery-branch [COMMIT_HASH]
# Or
git reset --hard [COMMIT_HASH]
```

**Step 4: Check stash**
```bash
git stash list
# If you stashed before, your work might be here
git stash pop
```

### If Unrecoverable
- Check if IDE has local history (VS Code: Right-click file → "Local History")
- Check for backup files (`.swp`, `~` files)
- Check if cloud sync (Dropbox, iCloud) has previous versions

### Prevention
Add shell alias:
```bash
alias grh='echo "🚨 DANGER: Did you mean git stash? Use git-reset-hard if certain"'
alias git-reset-hard='git stash -u && git reset --hard'
```

Add to CLAUDE.md:
```markdown
NEVER run `git reset --hard` - use `git stash -u` instead
```

---

## Accidentally Ran `git clean -fd`

### Symptoms
- Untracked files permanently deleted
- New files you created are gone
- No way to recover via git

### Recovery Options

**Unfortunately, git clean is mostly unrecoverable.** But try:

1. **IDE Local History**
   - VS Code: Right-click in explorer → "Local History"
   - IntelliJ: Right-click → "Local History" → "Show History"

2. **File System Recovery** (if recent)
   - macOS: Check Time Machine
   - Windows: Check Previous Versions
   - Linux: Check backup systems

3. **Cloud Sync**
   - Dropbox/iCloud/OneDrive version history

### Prevention
Add shell alias:
```bash
alias gcl='echo "🚨 DANGER: This deletes files permanently. Use git-clean-safe"'
alias git-clean-safe='git clean -fdn' # Dry run - shows what would be deleted
```

Add to CLAUDE.md:
```markdown
NEVER run `git clean -fd`
If you need to clean, use `git clean -fdn` (dry run) first
```

---

## Accidentally Ran `git push --force`

### Symptoms
- Teammates complaining about broken history
- CI/CD failing
- Commits seem to have disappeared

### Recovery Steps

**Step 1: Find the previous state**
```bash
git reflog origin/main
# Find the commit hash before the force push
```

**Step 2: Restore (if you have the old commits locally)**
```bash
git push --force origin [GOOD_COMMIT_HASH]:main
```

**Step 3: If commits are lost**
- Ask teammates to check their local branches
- Check CI/CD systems that might have cached the commits
- Contact GitHub/GitLab support (they may have backups)

### Prevention
```bash
# Use this instead - fails if someone else pushed
git push --force-with-lease
```

Add to CLAUDE.md:
```markdown
NEVER use `git push --force`
Use `git push --force-with-lease` if force push is truly needed
```

---

## Merge Conflict Panic

### Symptoms
- Scary-looking conflict markers in files
- AI suggesting to reset/clean (DON'T!)
- Unsure what to keep

### Safe Resolution

**Step 1: Don't let AI run git commands.** Resolve manually.

**Step 2: Understand the markers**
```
<<<<<<< HEAD
Your changes (current branch)
=======
Their changes (incoming branch)
>>>>>>> branch-name
```

**Step 3: For each conflict**
```bash
# See the conflict in context
git diff

# Open in VS Code's merge editor
code [filename]
# Use the GUI to pick changes
```

**Step 4: After resolving**
```bash
git add [resolved-files]
git commit
# Or if rebasing:
git rebase --continue
```

### Prevention
```
Before any merge/rebase:
1. Commit or stash all current work
2. Make sure working directory is clean
3. Have recent changes pushed to remote (backup)
```

---

# 💻 Code Quality Problems

## Inconsistent Code Style

### Symptoms
- Some files use one pattern, others use different
- Mix of naming conventions
- Inconsistent formatting

### Immediate Fix
```
This code doesn't match our style. 

Our patterns (from [EXAMPLE_FILE]):
- Naming: [CONVENTION]
- Structure: [PATTERN]
- Formatting: [STYLE]

Rewrite to match exactly.
```

### Prevention
```bash
# Run formatter before commits
dart format .
flutter analyze
```

Add pre-commit hook:
```bash
#!/bin/sh
dart format . --set-exit-if-changed
dart analyze --fatal-infos
```

---

## Magic Numbers/Hardcoded Values

### Symptoms
- `Color(0xFF2196F3)` instead of `AppColors.primary`
- `padding: 16` instead of `AppSpacing.md`
- Literal strings scattered in code

### Immediate Fix
```
This has hardcoded values. Use our design system:
- Colors: AppColors.[name]
- Spacing: AppSpacing.[size]
- Typography: AppTypography.[style]

Never use raw Color(), EdgeInsets with numbers, or TextStyle with fontSize.
```

### Prevention
Add to CLAUDE.md (Design System Rules section):
```markdown
FORBIDDEN:
- Color(0xFFXXXXXX) → Use AppColors
- EdgeInsets.all(X) → Use AppSpacing
- TextStyle(fontSize: X) → Use AppTypography
- BorderRadius.circular(X) → Use AppRadius
```

---

## Duplicated Code

### Symptoms
- Same logic in multiple places
- Similar widgets that should be one component
- Copy-pasted code with minor variations

### Immediate Fix
```
This duplicates [EXISTING CODE/COMPONENT].

Either:
1. Use the existing [COMPONENT/UTILITY]
2. Or extract a shared component to lib/shared/

Don't duplicate - reuse or refactor.
```

### Prevention
```
Before creating new code:
1. Search codebase for similar functionality
2. Check lib/shared/ for reusable components
3. Check lib/core/utils/ for utility functions
```

---

# 🔧 Environment Problems

## Claude Code/CLI Not Connecting

### Quick Checks
- Is Claude CLI installed? Run `claude --version`
- Are you authenticated? Run `claude auth login`
- Is project folder open in terminal?

### Common Fixes
```bash
# Re-authenticate
claude auth login

# Check version
claude --version

# If "command not found", reinstall
npm install -g @anthropic-ai/claude-code
```

**See also:** Scripts Guide (09) - Part 1: Installing Claude CLI

---

## VS Code Extensions Conflicting

### Common Culprits
- Multiple Dart/Flutter extensions
- Outdated extensions
- Extension conflicts

### Quick Fix
1. Disable all extensions
2. Enable one by one
3. Identify conflicting extension
4. Keep only essential extensions:
   - Dart
   - Flutter
   - Claude (if using extension)

---

## Build Errors After Package Update

### Quick Fixes
```bash
flutter clean
flutter pub get

# If still failing
rm -rf .dart_tool
rm pubspec.lock
flutter pub get
```

### Check for Version Conflicts
```yaml
# pubspec.yaml - look for conflicting versions
dependencies:
  package_a: ^1.0.0  # Requires package_c: ^2.0.0
  package_b: ^1.0.0  # Requires package_c: ^3.0.0  <- CONFLICT
```

---

## Hot Reload Not Working

### Quick Fixes
```bash
# Restart app completely (not just hot reload)
# Press 'R' (capital R) for hot restart

# If still broken
flutter clean
flutter pub get
flutter run
```

### Common Causes
- Syntax errors blocking rebuild
- Changes to main() or app initialization
- Native code changes (require full restart)
- State initialization issues

---

# 🗣️ Communication Problems

## AI Doesn't Understand My Request

### The Restate Pattern
```
Before answering, restate what you think I'm asking for.
Include:
- What you'll create
- What you WON'T do  
- Any assumptions you're making

Wait for my confirmation before proceeding.
```

### The Clarify Pattern
```
I'm confused by your response.

When I said "[MY WORDS]", I meant [CLARIFICATION].

Let's align before continuing:
- I want: [SPECIFIC OUTCOME]
- I don't want: [WHAT TO AVOID]
```

---

## AI Responds But Doesn't Help

### The Specificity Pattern
```
That answer is too generic.

My SPECIFIC situation:
- Framework: [VERSION]
- File: [FILENAME]  
- Error: [EXACT ERROR]
- What I've tried: [LIST]

Give me a solution for THIS situation, not a general answer.
```

### The Actionable Pattern
```
I need actionable steps, not explanation.

Give me:
1. Exact code to write/change
2. Exact commands to run
3. How to verify it worked

Skip the theory - I need to fix this now.
```

---

## Conversation Lost Context

### The Reset Pattern
```
Let's reset context. Here's where we are:

PROJECT: [NAME]
TECH: [STACK]
CURRENT TASK: [WHAT WE'RE DOING]
PROBLEM: [CURRENT ISSUE]
ALREADY TRIED: [LIST]

Now, help me with [SPECIFIC NEXT STEP].
```

### The Summary Pattern (End of Session)
```
Before we end, summarize:
1. What we accomplished
2. What's still broken/pending
3. What to do first next session
4. Any important context to remember
```

---

# 📋 Quick Reference: Recovery Commands

## Git Recovery
```bash
# See recent history (find lost commits)
git reflog

# Recover deleted branch
git checkout -b [branch] [commit-hash]

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what would be deleted (safe)
git clean -fdn

# Recover stashed work
git stash list
git stash pop
```

## Flutter Recovery
```bash
# Nuclear clean
flutter clean
rm -rf pubspec.lock
rm -rf .dart_tool
flutter pub get

# Reset iOS
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..

# Reset Android
cd android && ./gradlew clean && cd ..
```

## When All Else Fails
```bash
# Clone fresh and copy your changes
cd ..
mv [project] [project]-broken
git clone [repo-url]
# Manually copy changed files from [project]-broken
```

---

# 🚨 Emergency Procedures

## AI Deleted/Overwrote Important Code

1. **Stop immediately** - Don't let AI continue
2. **Check git status** - See what changed
3. **Recover from git**:
   ```bash
   git checkout -- [file]  # Restore single file
   git stash -u           # Save current state just in case
   git checkout HEAD~1 -- [file]  # Get previous version
   ```
4. **Check IDE local history** if not in git
5. **Document what happened** to prevent recurrence

## AI Made Breaking Changes Across Multiple Files

1. **Stop immediately**
2. **Review all changes**:
   ```bash
   git diff
   git status
   ```
3. **If changes are bad**:
   ```bash
   git stash -u  # Saves changes recoverable
   git checkout .  # Reverts all files
   ```
4. **If some changes are good**:
   ```bash
   git add -p  # Interactive staging - keep good, discard bad
   ```
5. **Commit good changes, discard bad**

## You're Completely Lost

1. **Breathe** - It's recoverable
2. **Stop AI from doing anything**
3. **Check git log**:
   ```bash
   git log --oneline -20  # Recent commits
   git reflog             # ALL recent actions
   ```
4. **Find last known good state**
5. **Create backup branch**:
   ```bash
   git checkout -b backup-current
   ```
6. **Reset to good state**:
   ```bash
   git checkout main
   git reset --hard [good-commit]
   ```

---

# 🔧 Platform-Specific Debugging Tips

## Cross-Platform Debugging Strategy

When debugging on one platform gives unhelpful errors, try another:

```
Mobile (iOS/Android) gives vague errors?
  → Try running on Chrome/web for better stack traces

Web works but mobile crashes?
  → Likely a native plugin or platform channel issue

Works in debug but not release?
  → Check tree shaking, minification, or missing assets
```

### Database / Backend Gotchas

**Cloud databases (Firestore, Supabase, etc.):**

| Problem | Why It Happens | Fix |
|---------|---------------|-----|
| Query works in console but fails in app | Security rules require query constraints that match rule conditions | Add matching `where` clauses to your query |
| Collection group queries fail | Collection group rules are **separate** from document-level rules | Add explicit collection group rules |
| "Permission denied" on valid data | Rules evaluate the **query**, not the **results** | Rules are NOT filters — your query must prove it only returns allowed data |
| Writes succeed but reads fail | Read rules are stricter than write rules | Check read rules independently |

**General backend debugging:**
```
1. Test the EXACT query in your database console first
2. Check security rules / RLS policies in isolation
3. Verify authentication token has expected claims
4. Check if the issue is query structure vs. permissions
```

### Build Environment Issues

Common environment problems that waste hours:

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Gradle build fails after update | Wrong JDK version | Pin JDK version in project config |
| iOS build fails after `clean` | Missing pod install | Always run `pod install` after cleaning iOS |
| Android emulator crashes | Stale build cache | Clean DerivedData/build folders |
| "Module not found" after rename | Stale caches referencing old names | Full clean + rebuild |
| Works on one machine, fails on another | Different SDK/tool versions | Pin versions in project config files |

### Post-Clean Checklist

After running a full project clean, don't forget these steps:

```bash
# Flutter projects
flutter clean
flutter pub get
cd ios && pod install && cd ..   # iOS only

# Node/React projects
rm -rf node_modules
npm install                      # or yarn/pnpm

# General: clear IDE caches too
# VS Code: Cmd+Shift+P → "Restart Extension Host"
# Xcode: rm -rf ~/Library/Developer/Xcode/DerivedData/YourProject-*
```

---

# 📝 Issue Template

When documenting new issues for this guide:

```markdown
## [Problem Name]

### Symptoms
- What you see/experience
- Error messages
- Unexpected behavior

### Immediate Fix
[Quick solution to try first]

### Full Solution
[Step-by-step resolution]

### Prevention
[How to avoid this in future]

### Root Cause
[Why this happens]
```

---

*This guide is part of The Vibe Coding Blueprint*
*Problems are inevitable. Recovery is a skill.*

---

# 🛠️ Script Problems

## "command not found: claude"

### Cause
Claude CLI not installed or not in PATH.

### Fix (Mac)
```bash
npm install -g @anthropic-ai/claude-code
```

### Fix (Windows - WSL/Git Bash)
```bash
npm install -g @anthropic-ai/claude-code
```

### If Still Failing
```bash
# Check if npm is installed
npm --version

# If not, install Node.js first
# Mac: brew install node
# Windows: Download from nodejs.org
```

---

## "Permission denied" When Running Scripts

### Cause
Script not marked as executable.

### Fix
```bash
chmod +x scripts/vibe-dev
chmod +x scripts/vibe-architect
# Or all at once:
chmod +x scripts/*
```

---

## Scripts Run But Claude Ignores CLAUDE.md

### Cause
- CLAUDE.md doesn't exist
- CLAUDE.md is in wrong location
- Corrupted content

### Fix
```bash
# Check if file exists in project root
ls -la CLAUDE.md

# If missing, create it
./vibe-init

# If exists but not working, check content
cat CLAUDE.md | head -20
```

---

## "No such file or directory"

### Cause
Running scripts from wrong directory.

### Fix
```bash
# Make sure you're in project root
pwd
# Should show your project folder

# Navigate to project
cd /path/to/your/project

# Run scripts with path
./scripts/vibe-dev
```

---

## Windows: Scripts Don't Run at All

### Cause
Not using bash environment.

### Fix
- **Use WSL**: Open "Ubuntu" from Start menu
- **Use Git Bash**: Open "Git Bash" from Start menu
- **Don't use**: PowerShell or CMD directly

### Access Project Files in WSL
```bash
cd /mnt/c/Users/YourUsername/path/to/project
```

---

## vibe-init Creates Corrupted Files

### Symptoms
- CLAUDE.md has placeholder text not replaced
- Syntax errors in generated files

### Fix
```bash
# Remove and recreate
rm CLAUDE.md
rm -rf .context
rm -rf scripts

# Run init again
./vibe-init
```

### If Still Broken
Create files manually using templates from:
- Guide 03 (Context Files)
- Guide 07 (CLAUDE.md Template)

---

## Claude CLI Authentication Fails

### Symptoms
- "Not authenticated" errors
- "Invalid API key" messages

### Fix
```bash
# Re-authenticate
claude auth login

# Follow browser prompts
# Make sure you're logging into correct account
```

### Check Your Plan
- Free tier has limited Claude access
- Pro ($20/mo) required for regular use
- API access requires separate API key

---

# 📝 Issue Template

When documenting new issues for this guide:

```markdown
## [Problem Name]

### Symptoms
- What you see/experience
- Error messages
- Unexpected behavior

### Immediate Fix
[Quick solution to try first]

### Full Solution
[Step-by-step resolution]

### Prevention
[How to avoid this in future]

### Root Cause
[Why this happens]
```

---

*This guide is part of The Vibe Coding Blueprint*
*Problems are inevitable. Recovery is a skill.*
