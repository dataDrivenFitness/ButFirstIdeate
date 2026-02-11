# The Vibe Coding Blueprint

A comprehensive framework for AI-assisted app development that actually works.

**~13,000 lines of practical guidance** for building apps with Claude, Cursor, and other AI coding assistants.

---

## 🚀 Quick Start

**New here? Start with [`guides/QUICKSTART.md`](guides/QUICKSTART.md)**

It will route you to the right place based on what you want to do:
- Validate an app idea
- Start building something
- Set up the full CLI experience

---

## What Problems Does This Solve?

| Problem | How This Framework Helps |
|---------|--------------------------|
| AI over-engineers everything | Complexity classification + simplicity rules |
| Destructive git commands | Forbidden command lists + safe alternatives |
| Inconsistent code | Design system documentation + enforcement |
| AI forgets project context | Strategic context files (CLAUDE.md, etc.) |
| Hours wasted on hallucinated APIs | Verification prompts + situational triggers |
| Scope creep | Scope control phrases + approval workflows |

---

## What's Included

### Guides (`guides/`)

| File | Purpose |
|------|---------|
| `QUICKSTART.md` | **Start here** - 5-minute entry point |
| `00_vibe_coding_master_index.md` | Full navigation & overview |
| `01_vibe_coding_beginners_guide.md` | New to coding? Start here |
| `02_vibe_coding_ideation_guide.md` | Validate before building |
| `03_vibe_coding_context_files_guide.md` | The .context/ system explained |
| `04_vibe_coding_caution_guide.md` | Safety rules (critical!) |
| `05_vibe_coding_design_system_guide.md` | UI consistency |
| `06_vibe_coding_ai_collaboration_playbook.md` | Daily prompting tips |
| `07_vibe_coding_complete_claude_md_template.md` | All-in-one CLAUDE.md |
| `08_vibe_coding_troubleshooting_guide.md` | When things break |
| `09_vibe_coding_scripts_guide.md` | CLI tools & setup |
| `10_vibe_coding_parallel_development.md` | Multi-terminal safety |
| `11_vibe_coding_scaling_guide.md` | Growing past MVP (10K+ lines) |

### Scripts (`scripts/`)

| Script | Purpose |
|--------|---------|
| `vibe-init` | Scaffold new project with all context files |
| `dev.sh` | Parallel development with git worktrees |

After running `vibe-init`, you'll also have:
- `vibe-ideate` - Validate app ideas conversationally
- `vibe-architect` - Architecture decisions (Sonnet/Opus)
- `vibe-dev` - Implementation sessions
- `vibe-debug` - Debugging help
- `vibe-review` - Code review
- `vibe-mockup` - UI mockup generation

---

## One-Command Setup

```bash
mkdir my-app && cd my-app
curl -O https://raw.githubusercontent.com/dataDrivenFitness/VibeCodingGuide/main/scripts/vibe-init
chmod +x vibe-init
./vibe-init
```

---

## The Core Philosophy

```
Simple > Clever
Working > Perfect
Fewer files > "Proper" structure
Ask first > Assume
Validate > Build
```

**The Golden Rule:** If you can't explain it simply, it's too complex.

---

## Who Is This For?

- **Beginners** who want to build their first app with AI help
- **Experienced developers** who want better AI collaboration patterns
- **Solo developers** building MVPs without a team
- **Anyone frustrated** with AI that over-engineers or breaks things

---

## Built From Real Experience

This framework was developed while building:
- NurseOS (healthcare shift management app)
- GLP-1 Protein Tracker (nutrition tracking)
- Multiple client projects

Every guide addresses problems encountered in real AI-assisted development.

---

## License

MIT - Use freely, modify as needed, share with others.

---

*Stop fighting your AI. Start collaborating.*
