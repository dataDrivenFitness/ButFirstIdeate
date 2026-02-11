# AI Collaboration Playbook
## Situational Prompting for Daily Development

*The right phrase at the right moment can save hours of debugging.*

---

## How This Guide Relates to Scripts

**If you're using the vibe scripts** (from Guide 09), the scripts handle starting context automatically. This playbook is your **reference during conversations** for:
- When AI seems off-track
- Phrases that get better results
- Recognizing over-engineering
- Pushing back effectively

**If you're using claude.ai directly**, this playbook provides the situational prompts you'll copy/paste.

Either way, these patterns make your AI collaboration more effective.

---

## Why This Matters

AI assistants are powerful but require **situational awareness** from you. Knowing WHEN to:
- Ask AI to search the internet
- Request documentation lookup
- Demand verification
- Break down complex tasks
- Push back on AI responses

...is the difference between productive collaboration and frustrating loops.

---

# Part 1: Situational Triggers

## 🔍 When to Say "Search the Internet"

### Trigger Situations

| Situation | Why Search Helps |
|-----------|------------------|
| **Package/version questions** | Docs change constantly |
| **"What's the latest way to..."** | Best practices evolve |
| **Error messages you don't recognize** | Stack Overflow has answers |
| **Comparing current options** | Landscape changes monthly |
| **Platform-specific issues** | iOS/Android updates break things |
| **News about tools/frameworks** | Deprecations, security issues |

### Search Trigger Phrases

```
"Search the internet for the current best practice for [X]"

"Look up the latest documentation for [PACKAGE] version [X]"

"Search for this error message: [PASTE ERROR]"

"Find recent Stack Overflow answers for [PROBLEM]"

"Search for [FRAMEWORK] [VERSION] breaking changes"

"Look up if [PACKAGE] is still maintained in 2025"

"Search for security advisories for [DEPENDENCY]"
```

### When NOT to Search

| Situation | Why Not |
|-----------|---------|
| Basic syntax questions | AI knows this |
| Conceptual explanations | AI's training is sufficient |
| Your own codebase questions | Search won't help |
| Opinion-based questions | No "right" answer to find |

---

## 📚 When to Say "Read the Documentation"

### Trigger Situations

| Situation | Prompt to Use |
|-----------|---------------|
| **Using unfamiliar package** | "Read the [package] docs before implementing" |
| **Complex API integration** | "Check the official [API] documentation for [endpoint]" |
| **Framework upgrade** | "Review the migration guide from [v1] to [v2]" |
| **Configuration questions** | "Look up the official config options for [tool]" |
| **"Is this deprecated?"** | "Check if [method] is deprecated in [version]" |

### Documentation Request Phrases

```
"Before implementing, read the official documentation for [PACKAGE]"

"Check the [FRAMEWORK] docs for the correct way to [ACTION]"

"Look up the API reference for [METHOD/CLASS]"

"Find the official example for [USE CASE] in [FRAMEWORK] docs"

"Review the migration guide for [PACKAGE] from v[X] to v[Y]"

"What does the documentation say about [SPECIFIC FEATURE]?"
```

### Pro Tip: Be Specific

```
❌ Vague: "Check the Flutter docs"
✅ Specific: "Check the Flutter docs for CustomPainter lifecycle methods"

❌ Vague: "Read the Firebase documentation"  
✅ Specific: "Read the Firestore documentation for batch writes with transactions"
```

---

## ✅ When to Say "Verify This"

### Trigger Situations

| Red Flag | Verification Prompt |
|----------|-------------------|
| **AI seems too confident** | "Verify this API exists in [package] [version]" |
| **Unfamiliar method name** | "Double-check that [method] is a real method" |
| **Complex regex/algorithm** | "Test this with edge cases before I use it" |
| **Security-sensitive code** | "Verify this follows security best practices" |
| **"I think" or "should work"** | "Actually confirm this works, don't guess" |

### Verification Phrases

```
"Verify that [METHOD] exists in [PACKAGE] version [X]"

"Double-check this syntax is correct for [LANGUAGE/FRAMEWORK]"

"Confirm this is the current recommended approach, not deprecated"

"Test this logic with these edge cases: [LIST CASES]"

"Verify this doesn't have security vulnerabilities"

"Are you certain about this? If not, say so."

"What's your confidence level on this solution? Be honest."
```

### The "Are You Sure?" Pattern

When AI gives an answer that seems off:

```
"You said [X]. Are you certain? I want to verify before implementing because [REASON FOR DOUBT]."
```

This prompts AI to:
1. Re-evaluate its answer
2. Admit uncertainty if present
3. Provide sources or reasoning

---

## 🧩 When to Say "Break This Down"

### Trigger Situations

| Complexity Signal | Action |
|-------------------|--------|
| **Task feels overwhelming** | "Break this into smaller steps" |
| **AI response is huge** | "Let's do this one step at a time" |
| **Multiple files involved** | "List all files we'll touch first" |
| **Unclear dependencies** | "What needs to exist before we can do this?" |
| **You're losing track** | "Summarize what we've done and what's left" |

### Breakdown Phrases

```
"This feels complex. Break it into steps and we'll do one at a time."

"Before we start, list all the files we'll need to create or modify."

"What's the dependency order? What do we build first?"

"Give me just step 1. We'll move to step 2 after I confirm it works."

"I'm lost. Summarize our progress and what remains."

"What's the minimum viable implementation? Strip out nice-to-haves."
```

### The "One Thing" Pattern

When overwhelmed:

```
"Stop. What's the ONE thing I should do next? Just that, nothing else."
```

---

## 🤔 When to Say "Think Harder"

### Trigger Situations

| Situation | Prompt |
|-----------|--------|
| **First answer seems shallow** | "Think through this more carefully" |
| **Missing edge cases** | "What could go wrong with this approach?" |
| **Architecture decisions** | "What are the trade-offs I should consider?" |
| **Debugging isn't working** | "Step back. What else could cause this?" |
| **AI is pattern-matching** | "Don't give me a generic answer. Think about MY specific case." |

### "Think Harder" Phrases

```
"Think step by step before answering."

"Consider edge cases before giving me the solution."

"What are 3 different ways to solve this? Compare them."

"What could go wrong with this approach?"

"You gave me a generic answer. Think about MY specific situation: [CONTEXT]"

"Pretend you're reviewing this code for production. What concerns would you raise?"

"Before implementing, what questions should I be asking?"
```

### The "Devil's Advocate" Pattern

```
"Play devil's advocate. Why might this solution be wrong or suboptimal?"
```

---

## 🛑 When to Say "Stop and Clarify"

### Trigger Situations

| Warning Sign | Action |
|--------------|--------|
| **You're confused** | Stop immediately, ask for clarification |
| **AI is making assumptions** | "Wait - what are you assuming about [X]?" |
| **Requirements are unclear** | "Before coding, let's clarify requirements" |
| **Terminology mismatch** | "When you say [X], do you mean [A] or [B]?" |
| **AI is going off-track** | "Pause. This isn't what I asked for." |

### Clarification Phrases

```
"Stop. Before we continue, I need to understand [SPECIFIC THING]."

"You're making an assumption about [X]. Let me clarify: [CLARIFICATION]"

"Wait - when I said [X], I meant [SPECIFIC MEANING]."

"This isn't what I asked for. I want [RESTATE REQUEST]."

"I'm confused about [PART]. Explain just that part simply."

"Let's align on requirements before writing any code."
```

### The "Restate" Pattern

```
"Restate what you think I'm asking for before you answer."
```

This catches misunderstandings BEFORE wasted effort.

---

# Part 2: Complexity Warning Signs (For Novices)

## Why This Section Exists

When watching Claude Code work, **novices don't know what "too complicated" looks like**. By the time you realize something's wrong, Claude has created 15 files and you're lost.

This section teaches you to recognize warning signs **in real-time** so you can interrupt before things spiral.

---

## 🚨 The 10 Red Flags of Over-Complication

### Red Flag #1: Too Many Files Being Created

**What you see:**
```
Creating lib/core/services/base_service.dart...
Creating lib/core/services/service_locator.dart...
Creating lib/core/interfaces/i_repository.dart...
Creating lib/core/interfaces/i_service.dart...
Creating lib/data/datasources/remote/base_remote_datasource.dart...
```

**Why it's bad:** You asked for ONE feature. Why are there abstract base classes and interfaces?

**What to say:**
```
"Stop. I asked for [SIMPLE THING]. Why are we creating [X] files? 
Can we do this with 1-2 files instead?"
```

**Healthy range:** For most features, 1-4 new files is normal. 5+ files for a simple feature = red flag.

---

### Red Flag #2: Abstract Classes and Interfaces Appearing

**What you see:**
```dart
abstract class IUserRepository {
  Future<Either<Failure, User>> getUser(String id);
}

class UserRepositoryImpl implements IUserRepository {
  // ...
}
```

**Why it's bad:** You're building an MVP, not enterprise software. You don't need dependency injection patterns yet.

**What to say:**
```
"I don't need interfaces/abstractions right now. Just give me a simple, 
concrete implementation. We can refactor later if needed."
```

---

### Red Flag #3: "Base" or "Generic" Classes Being Created

**What you see:**
```dart
class BaseRepository<T> {
  // Generic CRUD operations
}

class BaseNotifier<T> extends AsyncNotifier<T> {
  // Generic state management
}
```

**Why it's bad:** Generic solutions for specific problems = over-engineering. You have ONE type of thing, not many.

**What to say:**
```
"I don't need a generic/base class. I just need [SPECIFIC THING]. 
Build it directly without abstraction layers."
```

---

### Red Flag #4: Multiple Layers of Indirection

**What you see:**
```
Screen → Controller → UseCase → Repository → DataSource → API
```

**Why it's bad:** "Clean Architecture" is great for big teams. For solo devs, it's death by boilerplate.

**What to say:**
```
"This has too many layers. Can we simplify to: 
Screen → Provider → Firebase? 
Skip the intermediate layers."
```

---

### Red Flag #5: Lots of Files With "Manager", "Handler", "Service", "Helper"

**What you see:**
```
auth_manager.dart
session_handler.dart
token_service.dart
auth_helper.dart
credential_manager.dart
```

**Why it's bad:** These vague names often mean the code is poorly organized and responsibilities are unclear.

**What to say:**
```
"We have 5 auth-related files with unclear purposes. Can we consolidate 
into 1-2 files with clear responsibilities?"
```

---

### Red Flag #6: Configuration Files and Dependency Injection Setup

**What you see:**
```dart
// service_locator.dart
final getIt = GetIt.instance;

void setupServiceLocator() {
  getIt.registerLazySingleton<IAuthRepository>(() => AuthRepositoryImpl());
  getIt.registerLazySingleton<IUserRepository>(() => UserRepositoryImpl());
  // 20 more registrations...
}
```

**Why it's bad:** Dependency injection is overkill for most apps. Riverpod already handles this elegantly.

**What to say:**
```
"I don't need a service locator or DI container. Let's use Riverpod 
providers directly. Remove this complexity."
```

---

### Red Flag #7: The Response Is REALLY Long

**What you see:** Claude writes 200+ lines of code in one response.

**Why it's bad:** You can't review it properly. Bugs hide in long code dumps.

**What to say:**
```
"This is too much at once. Let's do it in smaller pieces:
1. First, just [SMALLEST PIECE]
2. Let me verify it works
3. Then we'll add the next piece"
```

---

### Red Flag #8: New Packages Being Added

**What you see:**
```yaml
dependencies:
  get_it: ^7.0.0
  injectable: ^2.0.0
  dartz: ^0.10.0
  equatable: ^2.0.0
```

**Why it's bad:** Each package is a dependency you must maintain. Many problems don't need packages.

**What to say:**
```
"Before adding [PACKAGE], can we solve this with what we already have?
What's the simplest solution without new dependencies?"
```

---

### Red Flag #9: Claude Mentions "Best Practices" or "Clean Architecture"

**What you see:**
```
"Following clean architecture best practices, we should separate 
this into domain, data, and presentation layers..."
```

**Why it's bad:** "Best practices" for enterprise apps are worst practices for MVPs. Claude defaults to over-engineering.

**What to say:**
```
"I don't need enterprise architecture. I need SIMPLE code that works.
What's the most straightforward implementation?"
```

---

### Red Flag #10: You Don't Understand What's Being Created

**What you see:** Claude is creating files and you have no idea why they're needed.

**Why it's bad:** If you can't understand it, you can't maintain it. You'll be helpless when bugs appear.

**What to say:**
```
"Stop. I don't understand why we need [FILE/CLASS]. 
Explain in simple terms what it does and why it's necessary.
If you can't justify it simply, we probably don't need it."
```

---

## 🛑 When to Interrupt Claude Code

### Immediate Stop Triggers

Stop Claude immediately if you see:

| You See | You Say |
|---------|---------|
| 5+ files being created for simple feature | "Stop. Why so many files?" |
| Abstract/interface classes appearing | "Stop. I don't need abstractions." |
| Words: "base", "generic", "manager", "handler" | "Stop. Keep it concrete and specific." |
| New packages being added | "Stop. Do we really need this package?" |
| You're confused about what's happening | "Stop. Explain what you're doing and why." |
| Code is 100+ lines and growing | "Stop. Let's do this in smaller pieces." |
| Folder structure getting deep | "Stop. Why so many nested folders?" |

### The 30-Second Rule

**If you've been watching Claude work for 30 seconds and don't understand what it's building, STOP IT.**

```
"Pause. I've lost track of what you're creating. 
Summarize: What files exist now? What does each one do? 
Why do we need each one?"
```

---

## 📊 Complexity Comparison: Simple vs Over-Engineered

### Example: "Add user authentication"

**❌ Over-Engineered (What Claude might create):**
```
lib/
├── core/
│   ├── errors/
│   │   ├── failures.dart
│   │   └── exceptions.dart
│   ├── usecases/
│   │   └── usecase.dart
│   └── services/
│       └── service_locator.dart
├── features/
│   └── auth/
│       ├── domain/
│       │   ├── entities/
│       │   │   └── user_entity.dart
│       │   ├── repositories/
│       │   │   └── i_auth_repository.dart
│       │   └── usecases/
│       │       ├── sign_in_usecase.dart
│       │       ├── sign_out_usecase.dart
│       │       └── get_current_user_usecase.dart
│       ├── data/
│       │   ├── models/
│       │   │   └── user_model.dart
│       │   ├── datasources/
│       │   │   └── auth_remote_datasource.dart
│       │   └── repositories/
│       │       └── auth_repository_impl.dart
│       └── presentation/
│           ├── bloc/
│           │   ├── auth_bloc.dart
│           │   ├── auth_event.dart
│           │   └── auth_state.dart
│           └── pages/
│               └── login_page.dart

Total: 15+ files 😱
```

**✅ Simple (What you actually need):**
```
lib/
├── features/
│   └── auth/
│       ├── auth_provider.dart      # State management
│       ├── auth_service.dart       # Firebase auth calls
│       └── login_screen.dart       # UI

Total: 3 files ✨
```

### The Conversation That Prevents This

```
You: "Add user authentication with Firebase"

Claude: "I'll set up a clean architecture with domain, data, and 
presentation layers, including use cases for each auth operation..."

You: "STOP. I need 3 things:
1. A provider that holds auth state
2. A service that calls Firebase Auth
3. A login screen

That's it. Three files. No abstractions, no use cases, no interfaces.
Simple and direct."
```

---

## 🔢 The File Count Heuristic

A rough guide for feature complexity:

| Feature Type | Expected Files | If More, Ask Why |
|--------------|----------------|------------------|
| Simple CRUD screen | 2-3 files | Widget + Provider |
| Form with validation | 2-4 files | Widget + Provider + (Model) |
| New data type | 2-3 files | Model + Provider + (Repository) |
| Complex feature | 4-6 files | Reasonable for multi-screen features |
| Authentication | 3-5 files | Service + Provider + Screens |
| **Any feature** | 7+ files | 🚨 Almost always over-engineered |

---

## 💬 Simplification Phrases

When things get complicated, use these:

### Force Simplicity
```
"What's the SIMPLEST possible implementation that works?"

"Remove all abstractions. Give me concrete, direct code."

"Pretend I'm a junior developer. Make it obvious what's happening."

"Can this be done in half the files? How?"

"I should be able to understand every line. Simplify until I can."
```

### Challenge Complexity
```
"Why do we need [ABSTRACTION]? What breaks without it?"

"You're building for a team of 50. I'm one person. Simplify."

"Will I understand this code in 6 months? If not, simplify."

"What would a beginner tutorial show? Do that instead."
```

### Reset and Restart
```
"Let's start over. Give me the most naive, simple implementation first.
We can add complexity ONLY if we hit a real problem."

"Delete everything and show me the 'hello world' version of this feature."

"Pretend we have 1 hour to ship this. What's the MVP?"
```

---

## 🎯 The Complexity Test

Before accepting any solution, ask:

### The "Explain It" Test
```
"Explain this solution to me like I'm a beginner.
If you need more than 2 minutes, it's too complex."
```

### The "Maintain It" Test
```
"If this breaks at 2am and I'm half-asleep, can I debug it?
If not, simplify."
```

### The "Delete It" Test
```
"What happens if I delete [FILE/CLASS]? 
If nothing breaks, we don't need it."
```

### The "Justify It" Test
```
"For each file, tell me: what specific problem does it solve?
If you can't answer clearly, delete it."
```

---

## 📋 Pre-Implementation Checklist

Before Claude starts coding, say:

```
"Before you write any code, answer these questions:

1. How many files will you create? (If >4, explain why each is necessary)
2. Are you creating any abstract classes or interfaces? (If yes, justify)
3. Are you adding any new packages? (If yes, can we avoid them?)
4. Can a beginner understand this structure? (If no, simplify)
5. What's the SIMPLEST version of this?"
```

---

## ⚠️ Claude's Over-Engineering Tendencies

Be aware that Claude tends to:

| Claude's Tendency | Your Counter |
|-------------------|--------------|
| Default to "clean architecture" | "I don't need enterprise patterns" |
| Create interfaces "for testing" | "I'll add interfaces when I need them" |
| Add abstraction "for flexibility" | "YAGNI - I ain't gonna need it" |
| Use design patterns everywhere | "Patterns solve specific problems. What problem?" |
| Separate everything into layers | "Fewer layers = less complexity" |
| Add packages for convenience | "Built-in solutions first" |

### The Root Cause

Claude was trained on:
- Enterprise codebases with big teams
- "Best practices" blog posts
- Architecture books

**It doesn't know you're a solo dev building an MVP.** You must constantly remind it:

```
"Remember: I'm one developer building an MVP. 
Simple, working code beats elegant abstractions.
Every file I create is a file I must maintain."
```

---

# Part 3: Daily Workflow Triggers

## Starting a Session

### First Message Patterns

```
"Read CLAUDE.md and context.md before we begin."

"We're continuing work on [FEATURE]. Current status: [STATUS]"

"Today's goal: [SPECIFIC OUTCOME]. Let's plan before coding."

"Before we start, what questions do you have about the task?"
```

### Context Loading

```
"Here's my current file structure: [PASTE TREE]"

"The error I'm seeing: [PASTE ERROR]"

"Here's the relevant code: [PASTE CODE]"

"User feedback we're addressing: [PASTE FEEDBACK]"
```

---

## During Development

### When Starting New Feature

```
"Before implementing [FEATURE]:
1. Show me a mockup first
2. List files we'll create/modify
3. Identify any dependencies we need
4. Start with the smallest working piece"
```

### When Debugging

```
"I'm seeing [ERROR]. Before suggesting fixes:
1. What are the possible causes?
2. How can I identify which one it is?
3. Then suggest the most likely fix"
```

### When Stuck

```
"I've been stuck on [PROBLEM] for [TIME]. 
What I've tried: [LIST]
What I think is happening: [THEORY]
Help me debug systematically."
```

### When Code Works But Seems Wrong

```
"This works but feels hacky. Is there a better approach?
[PASTE CODE]
I'm concerned about: [SPECIFIC CONCERN]"
```

---

## Before Committing/Deploying

### Pre-Commit Checklist Prompts

```
"Review this diff for:
1. Security issues
2. Performance concerns
3. Missing error handling
4. Incomplete implementations
[PASTE DIFF]"
```

```
"What could break if I deploy this change?"
```

```
"Are there any edge cases I'm not handling?"
```

---

## Ending a Session

### Session Wrap-Up

```
"Summarize what we accomplished today."

"What's left to do for [FEATURE]?"

"Update context.md with our progress."

"What should I tackle first next session?"
```

---

# Part 4: Magic Phrases Reference

## Quality Improvement Phrases

| Phrase | Effect |
|--------|--------|
| "Think step by step" | More thorough reasoning |
| "Consider edge cases" | Broader coverage |
| "What could go wrong?" | Defensive thinking |
| "Play devil's advocate" | Critical evaluation |
| "Be specific to MY situation" | Less generic answers |
| "What's your confidence level?" | Honest uncertainty |
| "Verify before answering" | Fact-checking |

## Scope Control Phrases

| Phrase | Effect |
|--------|--------|
| "Just this one thing" | Prevents scope creep |
| "Minimal implementation first" | Avoids over-engineering |
| "What's the dependency order?" | Structured approach |
| "List all files before starting" | Visibility |
| "One step at a time" | Controlled progress |
| "Stop - that's out of scope" | Boundary enforcement |

## Clarification Phrases

| Phrase | Effect |
|--------|--------|
| "Restate my request first" | Catches misunderstandings |
| "What are you assuming?" | Surface hidden assumptions |
| "When you say X, do you mean..." | Terminology alignment |
| "I need to understand X first" | Prerequisite knowledge |
| "Explain like I'm new to this" | Beginner-friendly |

## Research Phrases

| Phrase | Effect |
|--------|--------|
| "Search the internet for..." | Current information |
| "Check the official docs for..." | Authoritative source |
| "Find recent examples of..." | Practical patterns |
| "Look up if X is deprecated" | Version awareness |
| "What's the latest best practice?" | Current standards |

---

# Part 5: Situation-Response Quick Reference

## Error Handling

| You See | You Say |
|---------|---------|
| Error message you don't recognize | "Search the internet for this exact error: [ERROR]" |
| AI's fix doesn't work | "That didn't work. What else could cause this?" |
| Error keeps coming back | "Let's debug systematically. What's the root cause?" |
| Build error after update | "Search for [PACKAGE] [VERSION] breaking changes" |

## Code Quality

| You See | You Say |
|---------|---------|
| Code seems too complex | "Is there a simpler way to do this?" |
| Long function | "Break this into smaller functions" |
| Magic numbers | "Use constants from our design system" |
| Duplicated logic | "Check if we have an existing utility for this" |
| Missing tests | "What test cases should cover this?" |

## Architecture

| You See | You Say |
|---------|---------|
| Unsure about approach | "What are 3 ways to implement this? Compare trade-offs" |
| New pattern introduced | "Is this consistent with our existing patterns?" |
| Cross-feature dependency | "How does this affect [OTHER FEATURE]?" |
| Performance concern | "What's the time/space complexity?" |

## Package/Dependency

| You See | You Say |
|---------|---------|
| Need new package | "Search for the best [PURPOSE] package for [FRAMEWORK] in 2025" |
| Package isn't working | "Check the docs for [PACKAGE] version [X]" |
| Deprecation warning | "Look up the replacement for [DEPRECATED THING]" |
| Security vulnerability | "Search for security advisories for [PACKAGE]" |

## Getting Unstuck

| You Feel | You Say |
|----------|---------|
| Overwhelmed | "What's the ONE next thing I should do?" |
| Lost context | "Summarize where we are and what's left" |
| Going in circles | "We've tried X, Y, Z. What haven't we tried?" |
| Need fresh perspective | "Pretend you're seeing this problem for the first time" |
| Frustrated | "Let's step back. Is there a completely different approach?" |

---

# Part 6: CLAUDE.md Integration

Add this to your CLAUDE.md for AI self-awareness:

```markdown
# 🤝 COLLABORATION RULES

## Simplicity First (CRITICAL)
I am a solo developer building an MVP. My priorities:
1. Working code over perfect architecture
2. Fewer files over "proper" structure
3. Direct implementations over abstractions
4. Built-in solutions over new packages

BEFORE writing code, consider:
- Can this be done in 2-3 files? (If proposing more, justify each)
- Am I creating any interfaces or abstract classes? (If yes, probably don't)
- Am I adding new packages? (Try without first)
- Would a beginner understand this? (If no, simplify)

NEVER create without explicit approval:
- Abstract classes or interfaces
- Generic/base classes
- Service locators or DI containers
- "Clean Architecture" layers (domain/data/presentation)
- More than 4 files for a single feature

When I say "simple", I mean:
- Screen → Provider → Firebase (3 layers max)
- Concrete classes, no abstractions
- Direct function calls, no indirection
- State in Riverpod, not custom solutions

## When Uncertain
- Admit uncertainty clearly: "I'm not 100% sure, but..."
- Recommend verification: "Please verify this in the official docs"
- Suggest searching when information might be outdated

## When Complex
- Offer to break down into steps before implementing
- Ask clarifying questions if requirements are ambiguous
- Start with the simplest working implementation
- ALWAYS offer the simple version first, mention complex option second

## When Debugging
- Ask what's already been tried
- Suggest systematic debugging before random fixes
- Consider multiple possible causes

## Self-Check Triggers
Before providing code, verify:
- [ ] Solution uses minimum necessary files
- [ ] No unnecessary abstractions introduced
- [ ] No new packages unless essential
- [ ] A beginner could follow this code
- [ ] API methods actually exist in the stated version
- [ ] Syntax is correct for the framework version

## Phrases to Watch For
When user says these, take extra care:
- "Too complicated" → Immediately simplify, remove abstractions
- "Why so many files?" → Justify each file or consolidate
- "I don't understand" → Explain simply or redo more simply
- "Are you sure?" → Re-verify before confirming
- "That doesn't work" → Ask for error details, try different approach
- "Think harder" → More thorough analysis
- "Search for..." → Acknowledge if search is needed
```

---

# Part 7: Prompts.md Additions

Add these to your prompts.md:

```markdown
## Situational Prompts

### When Starting Something New
```
Before implementing [FEATURE]:
1. Read relevant context files
2. Show me a mockup first
3. List all files we'll touch
4. Identify dependencies
5. Start with the minimal version
```

### When Debugging
```
I'm seeing this error: [ERROR]

Before suggesting fixes:
1. What are ALL possible causes?
2. How do I identify which one?
3. What's the most likely based on context?
```

### When Reviewing Code
```
Review this code for production readiness:
[CODE]

Check for:
- Security vulnerabilities
- Performance issues
- Missing error handling
- Edge cases not covered
- Consistency with our patterns
```

### When Stuck
```
I've been stuck on [PROBLEM] for [TIME].
Tried: [LIST]
Theory: [YOUR GUESS]

Help me:
1. Confirm/deny my theory
2. Systematic debug approach
3. Alternative solutions if needed
```

### When Ending a Session
```
Wrap up today's session:
1. Summarize what we accomplished
2. List what's remaining
3. Note any blockers discovered
4. Suggest first task for next session
```

### When Things Get Too Complicated
```
Stop. This is getting too complicated.

You're creating [X files / abstractions / layers].
I asked for [SIMPLE THING].

Let's start over with these constraints:
- Maximum 3 files
- No abstract classes or interfaces
- No new packages
- Code a beginner could understand

Show me the simplest possible implementation.
```

### Complexity Pre-Check
```
Before you write any code for [FEATURE], answer:

1. How many files will you create? (Max 3-4)
2. Any abstract classes or interfaces? (Should be no)
3. Any new packages needed? (Prefer built-in)
4. Can you explain the structure in 2 sentences?

If you can't satisfy these, simplify your approach first.
```

### Force Simplification
```
This solution has [PROBLEM: too many files / abstractions / etc].

Rewrite it following these rules:
- One file if possible, max 3
- No base classes, no interfaces, no generics
- Direct calls to Firebase/API, no repository pattern
- State in a single Riverpod provider
- A junior developer should understand every line

Show me the "boring" simple version.
```
```

---

# Part 8: Quick Reference Card

Print this or keep it visible:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI COLLABORATION TRIGGERS                     │
├─────────────────────────────────────────────────────────────────┤
│ 🔍 SEARCH THE INTERNET                                          │
│    • Package versions/breaking changes                          │
│    • Error messages you don't recognize                         │
│    • "What's the latest way to..."                              │
│    • Security advisories                                        │
├─────────────────────────────────────────────────────────────────┤
│ 📚 CHECK THE DOCS                                               │
│    • Before using unfamiliar package                            │
│    • Complex API integrations                                   │
│    • "Is this deprecated?"                                      │
│    • Migration between versions                                 │
├─────────────────────────────────────────────────────────────────┤
│ ✅ VERIFY THIS                                                  │
│    • AI seems too confident                                     │
│    • Unfamiliar method names                                    │
│    • Security-sensitive code                                    │
│    • "I think" / "should work"                                  │
├─────────────────────────────────────────────────────────────────┤
│ 🧩 BREAK THIS DOWN                                              │
│    • Task feels overwhelming                                    │
│    • AI response is huge                                        │
│    • Multiple files involved                                    │
│    • You're losing track                                        │
├─────────────────────────────────────────────────────────────────┤
│ 🤔 THINK HARDER                                                 │
│    • First answer seems shallow                                 │
│    • Missing edge cases                                         │
│    • Architecture decisions                                     │
│    • Generic response to specific problem                       │
├─────────────────────────────────────────────────────────────────┤
│ 🛑 STOP AND CLARIFY                                             │
│    • You're confused                                            │
│    • AI is making assumptions                                   │
│    • Going off-track                                            │
│    • Terminology mismatch                                       │
└─────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────┐
│              🚨 COMPLEXITY RED FLAGS - STOP CLAUDE 🚨            │
├─────────────────────────────────────────────────────────────────┤
│ TOO MANY FILES                                                  │
│    • Creating 5+ files for a simple feature                     │
│    • Deep nested folder structures appearing                    │
│    ➜ "Stop. Why so many files? Can we do this with 2-3?"       │
├─────────────────────────────────────────────────────────────────┤
│ ABSTRACTIONS APPEARING                                          │
│    • Interface/abstract classes (IRepository, BaseService)      │
│    • Generic classes (Repository<T>, BaseNotifier<T>)           │
│    • Words: "base", "generic", "abstract", "interface"          │
│    ➜ "Stop. I don't need abstractions. Concrete code only."    │
├─────────────────────────────────────────────────────────────────┤
│ ENTERPRISE PATTERNS                                             │
│    • "Clean Architecture", "Domain layer", "Use cases"          │
│    • Dependency injection setup (GetIt, service locators)       │
│    • Multiple layers: Screen→Controller→UseCase→Repository      │
│    ➜ "Stop. I'm a solo dev, not an enterprise. Simplify."      │
├─────────────────────────────────────────────────────────────────┤
│ PACKAGE CREEP                                                   │
│    • New packages being added to pubspec.yaml                   │
│    • "We'll need [package] for this"                            │
│    ➜ "Stop. Can we solve this without a new dependency?"        │
├─────────────────────────────────────────────────────────────────┤
│ CONFUSION                                                       │
│    • You don't understand what's being created                  │
│    • 30+ seconds watching without comprehension                 │
│    • Response is 100+ lines of code                             │
│    ➜ "Stop. I'm lost. Explain simply or start over simpler."   │
├─────────────────────────────────────────────────────────────────┤
│ THE GOLDEN RULE                                                 │
│    Simple feature = 2-3 files max                               │
│    Medium feature = 4-5 files max                               │
│    If you can't explain it, it's too complex                    │
│    When in doubt: "What's the SIMPLEST version?"                │
└─────────────────────────────────────────────────────────────────┘
```

---

*This guide is part of The Vibe Coding Blueprint*
*The right prompt at the right moment changes everything.*
