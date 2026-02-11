# Parallel Development Guide
## Running Multiple Claude Sessions Without Conflicts

*One script. True isolation. No coordination required.*

---

## The Problem

You're working on Feature A in one terminal. You want to start Feature B in another. If both terminals touch the same files:
- Uncommitted changes collide
- Git state gets confused
- Work gets lost

**The solution:** Git worktrees give each terminal its own directory and branch. They literally can't conflict.

---

## Quick Start

### 1. Add the Dev Script

Create `scripts/dev.sh` in your project:

```bash
#!/bin/bash

# Parallel Development with Git Worktrees
# Usage:
#   ./scripts/dev.sh              Start session (prompts if multiple worktrees)
#   ./scripts/dev.sh feature      Create/connect to worktree
#   ./scripts/dev.sh --cleanup    Remove old worktrees
#   ./scripts/dev.sh --help       Show help

set -e

PROJECT_NAME="myproject"  # ← Change this to your project name

# Colors
BOLD='\033[1m'
DIM='\033[2m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

show_help() {
    echo -e "${BOLD}Parallel Development${NC}"
    echo ""
    echo "Usage:"
    echo "  ./scripts/dev.sh              Start session"
    echo "  ./scripts/dev.sh feature      Create/connect to worktree 'feature'"
    echo "  ./scripts/dev.sh --cleanup    Remove old worktrees"
    echo ""
    echo "Examples:"
    echo "  ./scripts/dev.sh auth         Work on authentication in parallel"
    echo "  ./scripts/dev.sh bug-123      Fix bug in isolated environment"
    echo ""
    echo "How it works:"
    echo "  Each worktree is a separate folder with its own branch."
    echo "  You can run multiple Claude sessions without conflicts."
    exit 0
}

show_cleanup() {
    echo -e "${BOLD}Worktree Cleanup${NC}"
    echo ""
    
    local main_repo=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
    local has_extras=false
    
    while IFS= read -r line; do
        local path=$(echo "$line" | awk '{print $1}')
        local branch=$(echo "$line" | awk '{print $3}' | tr -d '[]')
        
        # Skip main
        [[ "$branch" == "main" || "$branch" == "master" ]] && continue
        
        has_extras=true
        local dir=$(basename "$path")
        local last_commit=$(git -C "$path" log -1 --format="%cr" 2>/dev/null || echo "unknown")
        
        echo -e "📂 ${BOLD}$dir${NC} ($branch)"
        echo -e "   Last commit: $last_commit"
        read -p "   Delete? [y/N] " choice
        
        if [[ "$choice" =~ ^[Yy]$ ]]; then
            git worktree remove "$path" --force 2>/dev/null || rm -rf "$path"
            git branch -d "$branch" 2>/dev/null || git branch -D "$branch" 2>/dev/null || true
            echo -e "   ${GREEN}✓ Deleted${NC}"
        else
            echo -e "   ${DIM}Skipped${NC}"
        fi
        echo ""
    done <<< "$(git worktree list)"
    
    if [ "$has_extras" = false ]; then
        echo -e "${GREEN}✓ No extra worktrees. Only main exists.${NC}"
    fi
    exit 0
}

# Handle flags
case "${1:-}" in
    -h|--help|help) show_help ;;
    --cleanup|cleanup) show_cleanup ;;
esac

# Find main repo
find_main_repo() {
    local dir="$PWD"
    while [ "$dir" != "/" ]; do
        if [ -d "$dir/.git" ]; then
            echo "$dir"
            return
        elif [ -f "$dir/.git" ]; then
            # We're in a worktree
            echo "$(dirname "$(dirname "$(cat "$dir/.git" | sed 's/gitdir: //')")")"
            return
        fi
        dir="$(dirname "$dir")"
    done
    echo "$PWD"
}

MAIN_REPO=$(find_main_repo)
PARENT_DIR=$(dirname "$MAIN_REPO")

# Get worktrees
get_worktrees() {
    git -C "$MAIN_REPO" worktree list 2>/dev/null
}

# Find worktree by name
find_worktree() {
    local name="$1"
    while IFS= read -r line; do
        local path=$(echo "$line" | awk '{print $1}')
        local dir=$(basename "$path")
        if [[ "$dir" == "$name" || "$dir" == "${PROJECT_NAME}-$name" ]]; then
            echo "$path"
            return
        fi
    done <<< "$(get_worktrees)"
}

# Handle worktree argument
WORKTREE_ARG="${1:-}"
WORKTREE_COUNT=$(get_worktrees | wc -l | tr -d ' ')

if [ -n "$WORKTREE_ARG" ]; then
    # User specified a worktree
    TARGET=$(find_worktree "$WORKTREE_ARG")
    
    if [ -z "$TARGET" ]; then
        # Create new worktree
        echo -e "📂 Worktree '${BOLD}$WORKTREE_ARG${NC}' not found."
        read -p "Create it? [Y/n] " choice
        
        if [[ ! "$choice" =~ ^[Nn]$ ]]; then
            NEW_PATH="$PARENT_DIR/${PROJECT_NAME}-$WORKTREE_ARG"
            BRANCH="feature/$WORKTREE_ARG"
            
            git -C "$MAIN_REPO" worktree add "$NEW_PATH" -b "$BRANCH"
            echo -e "${GREEN}✓ Created:${NC} $NEW_PATH ($BRANCH)"
            cd "$NEW_PATH"
        else
            exit 1
        fi
    else
        cd "$TARGET"
    fi
elif [ "$WORKTREE_COUNT" -gt 1 ]; then
    # Multiple worktrees - prompt selection
    echo -e "${BOLD}Select Worktree${NC}"
    echo ""
    
    declare -a PATHS
    i=1
    while IFS= read -r line; do
        local path=$(echo "$line" | awk '{print $1}')
        local branch=$(echo "$line" | awk '{print $3}' | tr -d '[]')
        local dir=$(basename "$path")
        
        if [ "$path" = "$(pwd)" ]; then
            echo -e "  $i) $dir ($branch) ${DIM}← current${NC}"
        else
            echo -e "  $i) $dir ($branch)"
        fi
        PATHS[$i]="$path"
        ((i++))
    done <<< "$(get_worktrees)"
    
    echo ""
    read -p "Enter number (or Enter for current): " selection
    
    if [[ "$selection" =~ ^[0-9]+$ ]] && [ "$selection" -ge 1 ] && [ "$selection" -lt "$i" ]; then
        cd "${PATHS[$selection]}"
    fi
fi

# Display status
CURRENT_DIR=$(basename "$(pwd)")
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")

echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo -e "  📂 ${BOLD}$CURRENT_DIR${NC} ($CURRENT_BRANCH)"
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"

# Show other worktrees
OTHER_COUNT=$((WORKTREE_COUNT - 1))
if [ "$OTHER_COUNT" -gt 0 ]; then
    echo ""
    echo -e "${DIM}Other worktrees:${NC}"
    get_worktrees | while IFS= read -r line; do
        local path=$(echo "$line" | awk '{print $1}')
        local branch=$(echo "$line" | awk '{print $3}' | tr -d '[]')
        local dir=$(basename "$path")
        [ "$dir" != "$CURRENT_DIR" ] && echo -e "  ${DIM}• $dir ($branch)${NC}"
    done
fi

echo ""
echo -e "${DIM}Commands: ./scripts/dev.sh <name> | --cleanup | --help${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════${NC}"
echo ""

# Start Claude
claude
```

### 2. Make It Executable

```bash
chmod +x scripts/dev.sh
```

### 3. Add Git Protection

> *For the full safety rules, enforcement patterns, and permission tier system, see [Guide 04 - Caution Guide](04_vibe_coding_caution_guide.md). Below are the worktree-essentials.*

Add to your `CLAUDE.md` (or `.claude/settings.local.json`):

```markdown
## 🚫 FORBIDDEN GIT COMMANDS

NEVER run these - they destroy uncommitted work:

```bash
git reset --hard          # Destroys all uncommitted changes
git clean -fd             # Deletes untracked files permanently
git checkout -- .         # Discards all changes
git checkout -- <file>    # Discards changes to file
```

Safe alternatives:
```bash
git stash -u              # Temporarily store changes (retrievable)
git stash pop             # Restore stashed changes
```
```

For additional protection, add to `.claude/settings.local.json`:

```json
{
  "permissions": {
    "deny": [
      "Bash(git reset --hard*)",
      "Bash(git clean -fd*)",
      "Bash(git checkout -- *)",
      "Bash(git checkout . *)"
    ]
  }
}
```

---

## Usage

### Start a Session

```bash
./scripts/dev.sh
```

If multiple worktrees exist, you'll see a selection menu.

### Create Parallel Work

```bash
./scripts/dev.sh auth-refactor
```

This creates:
- New directory: `../myproject-auth-refactor/`
- New branch: `feature/auth-refactor`
- Completely isolated from your main work

Then open a **new terminal** and run the same command to connect.

### Clean Up When Done

```bash
./scripts/dev.sh --cleanup
```

Reviews each worktree and offers to delete.

---

## How It Works

```
Parent Directory/
├── myproject/                  # Main repo (main branch)
│   ├── .git/
│   ├── scripts/dev.sh
│   └── ... your code
│
├── myproject-auth/             # Worktree (feature/auth)
│   └── ... separate copy
│
└── myproject-payment/          # Worktree (feature/payment)
    └── ... another copy
```

Each worktree:
- Has its own directory (true isolation)
- Has its own branch (clean git history)
- Shares history with main (easy merging)
- Can run builds independently

---

## Common Workflows

### "I need to fix a bug while working on a feature"

```bash
# Terminal 1: You're working on feature
./scripts/dev.sh payment-integration

# Terminal 2: Fix the bug in a new worktree
./scripts/dev.sh hotfix-login
# ... fix bug, commit, merge to main ...
./scripts/dev.sh --cleanup  # Remove hotfix worktree
```

### "I want to test something risky"

```bash
./scripts/dev.sh experiment
# ... try risky changes ...
# If it works: merge to main
# If it fails: just delete the worktree
./scripts/dev.sh --cleanup
```

### "I'm reviewing a PR while coding"

```bash
# Terminal 1: Your current work
./scripts/dev.sh

# Terminal 2: Review the PR
./scripts/dev.sh pr-review
git fetch origin pull/123/head:pr-123
git checkout pr-123
# ... review, test, comment ...
```

---

## When to Use Worktrees

| Situation | Use Worktree? |
|-----------|---------------|
| Quick fix (< 5 min) | No, just commit first |
| Parallel feature work | ✅ Yes |
| Testing something risky | ✅ Yes |
| Code review while coding | ✅ Yes |
| Running tests while coding | ✅ Yes |
| Switching context frequently | ✅ Yes |

---

## Best Practices

1. **One feature per worktree** - Keep focused
2. **Merge frequently** - Don't let branches diverge too far
3. **Clean up when done** - Old worktrees clutter your disk
4. **Name descriptively** - `auth-refactor`, `bug-123`, `experiment-caching`
5. **Commit before switching** - Even in worktrees, commit your work

---

## Troubleshooting

### "fatal: 'feature/x' is already checked out"

A branch can only be checked out in one worktree. Either:
- Use a different branch name
- Remove the existing worktree first

### "I accidentally deleted a worktree folder"

```bash
git worktree prune  # Cleans up stale worktree references
```

### "I want to rename a worktree"

You can't directly rename. Create a new one and delete the old:

```bash
./scripts/dev.sh new-name
./scripts/dev.sh --cleanup  # Delete the old one
```

---

## Customization

### Change Project Name

Edit the `PROJECT_NAME` variable at the top of `dev.sh`:

```bash
PROJECT_NAME="nurseOS"  # Your project name
```

### Add Startup Instructions

Add Claude instructions at the bottom of the script:

```bash
claude "
Read CLAUDE.md and ask what I want to work on.
"
```

### Add Model Selection

```bash
MODEL="${2:-sonnet}"
claude --model "$MODEL" "..."
```

Usage: `./scripts/dev.sh feature opus`

---

*Part of The Vibe Coding Blueprint*
