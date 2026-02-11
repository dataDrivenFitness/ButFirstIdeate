# Claude Code Agents Guide
## Specialized AI Assistants for Your Project

*Three agents. Not thirty. Here's which ones actually matter and how to build your own.*

---

## What Are Agents?

Agents (subagents) are **specialized AI assistants** that run in their own context window. Each agent has:
- A custom system prompt (what it knows)
- Specific tool access (what it can do)
- Its own context (separate from your main conversation)
- Optional persistent memory (learns across sessions)

When Claude encounters a task matching an agent's description, it delegates to that agent. The agent works independently and returns results.

**Agents are Markdown files.** That's it. A `.md` file with YAML frontmatter, stored in a specific folder. No SDK, no build step, no dependencies.

---

## When to Use Agents (and When Not To)

### Use agents when:
- The task produces **verbose output** you don't need in your main context (test runs, log analysis, large searches)
- You want to **enforce tool restrictions** (read-only reviewer that can't accidentally edit code)
- The work is **self-contained** and can return a summary
- You need **parallel execution** of independent tasks

### Don't use agents when:
- The task needs **frequent back-and-forth** with you
- Multiple phases **share context** (planning → implementing → testing the same feature)
- You're making a **quick, targeted change**
- **Latency matters** — agents start fresh and need time to gather context

### Agents vs. Skills vs. Main Conversation

| Mechanism | Context | Best For |
|-----------|---------|----------|
| **Main conversation** | Shared with you | Iterative work, quick changes, anything needing your input |
| **Skills** | Injected into main context | Reusable prompts, domain knowledge, slash commands |
| **Agents** | Isolated (own window) | Verbose tasks, enforced constraints, parallel work |

> **Rule of thumb:** If you'd want to see every step, use the main conversation. If you just want the answer, use an agent.

---

## The Starter Set: 3 Agents

Research and production experience converge on the same conclusion: **3-4 agents maximum.** More than that and you spend more time deciding which agent to invoke than actually working.

These three cover the highest-value use cases for any project:

### 1. Code Reviewer (Universal)

The single highest-ROI agent. Runs on haiku (fast, cheap), can't modify your code (read-only), and catches issues the main conversation misses because it runs in fresh context.

**Create `.claude/agents/code-reviewer.md`:**

```markdown
---
name: code-reviewer
description: Expert code review specialist. Use proactively after writing or modifying code to catch quality issues, security problems, and pattern violations.
tools: Read, Grep, Glob, Bash
model: haiku
---

You are a senior code reviewer. Your job is to find real problems, not nitpick style.

When invoked:
1. Run `git diff` to see recent changes
2. Focus on modified files — don't review the entire codebase
3. Begin review immediately

Review for (in priority order):
1. **Bugs** — Logic errors, off-by-ones, null/undefined issues
2. **Security** — Exposed secrets, injection vulnerabilities, missing auth checks
3. **Breaking changes** — Does this change break existing callers or contracts?
4. **Error handling** — Are failures caught and handled gracefully?
5. **Simplicity** — Could this be simpler? Unnecessary abstractions?

DO NOT review for:
- Code style or formatting (that's what linters are for)
- Missing comments on obvious code
- Theoretical "what if" scenarios that aren't relevant

Output format:
- **Critical** (must fix before merging)
- **Warning** (should fix, creates risk if ignored)
- **Note** (suggestion for improvement, take it or leave it)

For each finding: file, line, what's wrong, how to fix it.
If nothing significant is found, say so. Don't manufacture issues.
```

### 2. Debugger (Universal)

Isolates debugging from your main conversation. Verbose stack traces, log analysis, and hypothesis testing stay in the agent's context — you get back a clean diagnosis.

**Create `.claude/agents/debugger.md`:**

```markdown
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use when encountering bugs, crashes, or confusing behavior.
tools: Read, Edit, Bash, Grep, Glob
model: inherit
---

You are an expert debugger. Your approach is systematic, not guessing.

When invoked:
1. Understand the symptom — what's happening vs. what should happen
2. Gather evidence — error messages, stack traces, recent changes
3. Form hypotheses — list 2-3 possible causes, most likely first
4. Test each hypothesis — look at the code, add logging if needed
5. Implement the fix — minimal change that addresses root cause
6. Verify — confirm the fix works and doesn't break anything else

Debugging principles:
- Read the ACTUAL error message. Don't assume what it says.
- Check `git diff` for recent changes — the bug is often in what just changed.
- The simplest explanation is usually correct.
- If adding a fix, make the MINIMUM change needed.
- Don't refactor surrounding code while fixing a bug.

When reporting back:
1. **Root cause**: One sentence explaining why
2. **Evidence**: What you found that confirms it
3. **Fix applied**: What you changed (or what needs changing)
4. **Verification**: How to confirm it's fixed
5. **Prevention**: One-liner on how to prevent recurrence (if applicable)

If you can't determine the root cause after systematic investigation, say so and explain what you've eliminated.
```

### 3. Planner (Universal)

The built-in Plan agent is generic. A custom planner preloaded with your project's architecture patterns is significantly more effective.

**Create `.claude/agents/planner.md`:**

```markdown
---
name: planner
description: Architecture and implementation planning specialist. Use before starting complex features, refactors, or when scope is unclear.
tools: Read, Grep, Glob
model: inherit
---

You are a technical planner. Your job is to produce a clear, actionable implementation plan — not to write code.

When invoked:
1. Understand the goal — what's being built or changed
2. Research the codebase — find relevant existing patterns, files, utilities
3. Identify the scope — which files need to change, what's the blast radius
4. Design the approach — simplest path that works
5. Present the plan — clear steps with file paths

Plan format:
## Goal
[One sentence]

## Approach
[2-3 sentences on the strategy]

## Files to Modify
- `path/to/file.ext` — what changes and why

## Files to Create (if any)
- `path/to/new_file.ext` — purpose

## Dependencies
- [Anything that needs to exist first]

## Risks
- [What could go wrong, how to mitigate]

## Estimated Complexity
🟢 SIMPLE / 🟡 MEDIUM / 🔴 COMPLEX

Planning principles:
- ALWAYS search the codebase for existing patterns before proposing new ones.
- PREFER modifying existing files over creating new ones.
- The best plan is the one with the fewest files changed.
- If the task seems 🔴 COMPLEX, say so and suggest breaking it down.
- Never propose abstractions, interfaces, or "future-proof" designs unless explicitly needed.
```

---

## Complexity Tier Recommendations

| Tier | Agents | Reasoning |
|------|--------|-----------|
| **🟢 SIMPLE** | None | Simple projects don't need agents. The main conversation handles everything. Add a code-reviewer later if you want one. |
| **🟡 MODERATE** | code-reviewer (optional) | One agent is enough. The reviewer catches issues the main conversation misses because it runs in fresh context with no attachment to the code it just wrote. |
| **🔴 COMPLEX** | All 3 + domain-specific | Complex projects benefit from context isolation. The planner prevents scope explosions. The debugger keeps verbose traces out of your main context. Add domain agents for compliance/security. |

> **Start with zero agents.** Add the code-reviewer when you feel the need. You can always add more later. You can't easily un-learn the habit of over-delegating.

---

## Creating Project-Specific Agents

The three universal agents above work for any project. But real value comes from **domain-specific agents** tailored to your codebase. Here's the 5-step recipe:

### Step 1: Identify the Recurring Task

What do you keep asking the main conversation to do repeatedly? Common patterns:
- "Check this for HIPAA compliance"
- "Review this PR for our coding standards"
- "Analyze this screen for accessibility"
- "Validate this against our API schema"

If you're doing it more than 3 times, it's worth an agent.

### Step 2: Define the Constraints

| Question | Why It Matters |
|----------|---------------|
| Should it modify files? | Read-only agents are safer. Omit Edit/Write if it only analyzes. |
| What model? | `haiku` for fast/cheap analysis. `inherit` for complex reasoning. `sonnet` for balanced work. |
| What tools does it need? | Minimum needed. A security auditor needs Read + Grep. A fixer needs Edit + Bash too. |
| Should it learn across sessions? | Enable `memory` if it benefits from accumulated codebase knowledge. |

### Step 3: Write the System Prompt

The system prompt is the body of your markdown file. Effective prompts share these traits:

```
1. ROLE — Who is this agent? One sentence.
2. WORKFLOW — Numbered steps: what to do when invoked.
3. CRITERIA — What specifically to look for or produce.
4. OUTPUT FORMAT — How to structure the response.
5. BOUNDARIES — What NOT to do (prevents scope creep in the agent itself).
```

**Tip:** Include your project's specific patterns directly in the prompt:
```markdown
Our codebase uses:
- Riverpod for state management (not Provider, not BLoC)
- Freezed for data models (never hand-write fromJson/toJson)
- AppColors/SpacingTokens for theming (never raw Colors.* or magic numbers)

Flag violations of these patterns.
```

### Step 4: Choose Scope

| Scope | Location | When to Use |
|-------|----------|-------------|
| **Project** | `.claude/agents/` | Specific to this codebase. Check into version control so your team gets them too. |
| **User** | `~/.claude/agents/` | Personal agents you want in all projects (your code-reviewer, your debugger). |
| **Session** | `--agents` CLI flag | Testing or one-off use. Not saved to disk. |

Most agents should be **project-level**. Your starter set (reviewer, debugger, planner) can be user-level since they're universal.

### Step 5: Enable Memory (If Needed)

Memory gives agents a persistent directory that survives across conversations. The agent builds knowledge over time — codebase patterns, recurring issues, architectural decisions.

```yaml
---
name: security-auditor
description: Reviews code for security vulnerabilities and compliance violations.
memory: project
---
```

| Memory Scope | Location | Use When |
|-------|----------|----------|
| `user` | `~/.claude/agent-memory/<name>/` | Agent knowledge applies across all projects |
| `project` | `.claude/agent-memory/<name>/` | Knowledge is project-specific, shareable via git |
| `local` | `.claude/agent-memory-local/<name>/` | Project-specific, private (not in git) |

**Tip:** Include memory instructions in the system prompt:
```markdown
After completing a review, update your agent memory with:
- Patterns you discovered in this codebase
- Common issues you keep finding
- Key architectural decisions that affect your reviews
```

---

## Domain Agent Examples

These illustrate the 5-step recipe applied to specific domains. **Don't copy these blindly** — adapt them to your project's actual patterns and requirements.

### Healthcare Security Auditor

```markdown
---
name: security-auditor
description: Reviews code for HIPAA compliance, PHI protection, and security vulnerabilities. Use after implementing features that handle patient data.
tools: Read, Grep, Glob
model: sonnet
memory: project
---

You are a healthcare security auditor specializing in HIPAA compliance.

When invoked, scan the specified code for:

1. **PHI Exposure** — Any patient data (names, emails, medical info) in:
   - print/debugPrint/log statements
   - Error messages shown to users
   - Analytics events or crash reports
   - Comments in code

2. **Access Control** — Verify:
   - Patient data accessed only through shift-scoped queries
   - No direct patient-nurse relationships outside shifts
   - Role-based permissions enforced (RN vs LPN vs CNA)
   - Organization boundaries respected

3. **Audit Trail** — Confirm:
   - AuditService used for system events
   - PatientAccessAudit used for PHI access
   - No silent data modifications

4. **Data Handling** — Check:
   - Sensitive fields encrypted at rest
   - Proper cleanup/disposal of patient data
   - No caching of PHI in insecure locations

Output: List findings as CRITICAL / WARNING / INFO with file, line, and remediation.
```

### E-commerce Payment Reviewer

```markdown
---
name: payment-reviewer
description: Reviews payment and financial code for security, PCI compliance, and correctness. Use when modifying checkout, billing, or payment processing code.
tools: Read, Grep, Glob
model: sonnet
---

You are a payment systems security reviewer.

When invoked, check for:

1. **PCI Compliance** — No card numbers, CVVs, or raw payment data in:
   - Logs, print statements, error messages
   - Local storage or unencrypted databases
   - URLs or query parameters

2. **Financial Correctness** — Verify:
   - All monetary calculations use integer cents (not floating point)
   - Currency conversions handled correctly
   - Rounding is explicit and consistent
   - Tax calculations are auditable

3. **Security** — Check:
   - Payment tokens used instead of raw card data
   - Webhook signatures verified
   - Idempotency keys on payment requests
   - No duplicate charge vulnerabilities

Output: CRITICAL / WARNING / NOTE with file, line, and fix.
```

---

## Advanced Patterns

### Running Agents in Parallel

For independent investigations, spawn multiple agents simultaneously:

```
Research the auth module, database layer, and API endpoints
in parallel using separate agents
```

Each agent explores its area independently, then Claude synthesizes findings. Works best when paths don't depend on each other.

### Chaining Agents

For multi-step workflows, agents run in sequence:

```
Use the planner to design the approach, then use the main conversation
to implement it, then use the code-reviewer to check the result
```

### Hooks for Guardrails

Agents can define lifecycle hooks that run before/after tool use. Example: a database agent that only allows SELECT queries:

```yaml
---
name: db-reader
description: Execute read-only database queries for analysis.
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---
```

The validation script blocks INSERT/UPDATE/DELETE/DROP commands by exiting with code 2.

### Preloading Skills

Inject domain knowledge into an agent at startup:

```yaml
---
name: api-developer
description: Implement API endpoints following team conventions.
skills:
  - api-conventions
  - error-handling-patterns
---
```

The full skill content is injected into the agent's context. Agents don't inherit skills from the parent conversation — list them explicitly.

---

## Anti-Patterns

### Too Many Agents
**Problem:** 10+ agents means decision paralysis. "Should I use the frontend-agent, the component-agent, or the UI-reviewer?"
**Fix:** 3-4 maximum. Merge overlapping agents. If two agents do similar things, combine them.

### Wrong Model Selection
**Problem:** Running a simple grep-and-report agent on Opus. Costs 10x more, not 10x better.
**Fix:**
- `haiku` — read-only analysis, simple pattern matching, fast searches
- `sonnet` — balanced analysis requiring judgment
- `inherit` / `opus` — complex reasoning, multi-step debugging, architecture planning

### Context Waste
**Problem:** Agents that return massive results back to the main conversation, consuming your context window.
**Fix:** Tell agents to return **summaries**, not raw output. "Report only failing tests with error messages, not the full test output."

### Agents That Should Be Skills
**Problem:** Creating an agent for something that needs your main conversation's context (the current file, the current task, your recent decisions).
**Fix:** Use a skill instead. Skills run in the main conversation context. Agents run in isolation.

### Agents Without Clear Boundaries
**Problem:** A "general helper" agent that does everything. It's just a worse version of the main conversation.
**Fix:** Every agent should have one job. If you can't describe it in one sentence, it's too broad.

---

## File Format Reference

### Location

| Location | Scope | Priority |
|----------|-------|----------|
| `--agents` CLI flag | Current session only | 1 (highest) |
| `.claude/agents/` | Current project | 2 |
| `~/.claude/agents/` | All your projects | 3 |
| Plugin `agents/` directory | Where plugin is enabled | 4 (lowest) |

When multiple agents share the same name, higher-priority location wins.

### Frontmatter Fields

```yaml
---
name: my-agent              # Required. Lowercase + hyphens.
description: When to use me  # Required. Claude uses this to decide delegation.
tools: Read, Grep, Glob      # Optional. Inherits all if omitted.
disallowedTools: Write, Edit  # Optional. Deny specific tools.
model: haiku                  # Optional. sonnet | opus | haiku | inherit
permissionMode: default       # Optional. default | plan | dontAsk | bypassPermissions
maxTurns: 20                  # Optional. Max agentic turns before stopping.
memory: project               # Optional. user | project | local
skills:                       # Optional. Skills to preload.
  - skill-name
hooks:                        # Optional. Lifecycle hooks.
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate.sh"
---

System prompt goes here in Markdown.
This is the only instructions the agent receives.
```

### Managing Agents

```bash
# Interactive management (recommended)
/agents

# Create manually
# Place .md file in .claude/agents/ or ~/.claude/agents/

# Session-only via CLI
claude --agents '{"my-agent": {"description": "...", "prompt": "...", "tools": ["Read"]}}'

# Disable a specific agent
# Add to settings: "permissions": { "deny": ["Task(agent-name)"] }
```

---

## Quick Setup

### For a new project

```bash
# Create the agents directory
mkdir -p .claude/agents

# Copy the starter set (or create via /agents command)
# code-reviewer.md, debugger.md, planner.md

# Verify they're loaded
# Run /agents in Claude Code
```

### For an existing project

```bash
# Start with just the code-reviewer
mkdir -p .claude/agents
# Create .claude/agents/code-reviewer.md with the template above

# Try it
# "Use the code-reviewer agent to review my recent changes"

# Add more agents only when you feel the need
```

### For your user profile (all projects)

```bash
# Universal agents go in ~/.claude/agents/
mkdir -p ~/.claude/agents
# Place code-reviewer.md, debugger.md, planner.md here
```

---

## Further Reading

- **[Official Claude Code Subagents Docs](https://code.claude.com/docs/en/sub-agents)** — Full configuration reference
- **Guide 04 - Caution Guide** — Safety rules and enforcement patterns (permission tiers, deny patterns)
- **Guide 10 - Parallel Development** — Git worktrees for filesystem isolation between agents
- **Guide 11 - Scaling Guide** — When your project grows past MVP and needs more structure

---

*This guide is part of The Vibe Coding Blueprint*
*Three agents. Clear boundaries. Start with zero, add when needed.*
