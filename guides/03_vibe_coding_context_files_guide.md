# Context Files & Strategic Documentation Guide
## The Vibe Coding Blueprint - AI-Powered Development Setup

*The secret sauce: strategic files that make AI 10x more effective at building your app.*

---

## 🚀 Quick Start: Use vibe-init

**The fastest way to create all context files:**

```bash
./vibe-init
```

This script (from the Scripts Guide) creates all the files documented here automatically. 

**Use this guide when you want to:**
- Understand what each file does
- Customize beyond the defaults
- Create files manually
- Learn the patterns for your own projects

---

## 🎯 Why Context Files Matter

Without context files, every AI conversation starts from zero. You waste time re-explaining:
- What you're building
- Your technical decisions
- Your coding standards
- What's already been built

**With context files**, AI understands your project instantly and produces consistent, high-quality code that matches your patterns.

---

## The Context File System

```
your-app/
├── CLAUDE.md                    # AI behavior instructions (PROJECT ROOT - auto-loaded)
├── .context/                    # Additional context files
│   ├── context.md              # Business context & current status
│   ├── architecture.md         # Technical decisions & patterns
│   ├── prompts.md              # Reusable AI agent prompts
│   ├── standards.md            # Coding standards & conventions
│   └── design_system.md        # Design tokens & reusable components
├── docs/                        # Business documents
│   ├── mvp_features.md         # Feature definitions
│   ├── revenue_model.md        # Business model
│   └── development_timeline.md # Milestones
└── lib/                         # Your actual code
```

**Important:** `CLAUDE.md` must be in the project root for Claude Code to auto-load it.

---

# File 1: CLAUDE.md (AI Instructions)

## Purpose
This file tells Claude (or any AI) how to behave when working on your project. It's loaded at the start of every Claude Code session.

## When AI Reads This
- Claude Code automatically reads `CLAUDE.md` from project root
- Sets the "personality" and rules for that project
- Defines what the AI should and shouldn't do

---

## AI Prompt: Generate Your CLAUDE.md

```
I'm setting up a new project and need to create a CLAUDE.md file that will instruct AI assistants on how to work on my codebase.

Project Details:
- App Name: [YOUR APP NAME]
- Description: [WHAT IT DOES]
- Tech Stack: [e.g., Flutter, Firebase, Riverpod]
- Target Platform: [iOS/Android/Web]
- My Role: [Solo developer / Small team / etc.]

Special Requirements:
- [Any compliance needs like HIPAA]
- [Any architectural patterns you require]
- [Any things AI should NEVER do]

Generate a comprehensive CLAUDE.md file that:
1. Defines the AI's role and expertise
2. Lists critical rules and constraints
3. Specifies coding patterns to follow
4. Defines file organization expectations
5. Includes workflow instructions
6. Has clear DO and DON'T sections

Make it specific to my project, not generic.
```

---

## CLAUDE.md Template

```markdown
# CLAUDE.md - AI Development Instructions

## Project Overview
**App Name**: [YOUR APP NAME]
**Description**: [One-line description]
**Tech Stack**: [Flutter/React/etc.] + [Firebase/Supabase/etc.]
**Target**: [iOS-first / Cross-platform / Web]

---

## Your Role
You are the senior developer for [APP NAME]. You have expertise in:
- [Primary technology]
- [Secondary technology]
- [Domain expertise - e.g., healthcare, fitness, finance]

---

## Critical Rules

> *The rules below show the **structure** for a CLAUDE.md safety section. For comprehensive safety content to fill in (forbidden commands, scope control, enforcement patterns), see [Guide 04 - Caution Guide](04_vibe_coding_caution_guide.md). For a ready-to-copy complete template, see [Guide 07 - CLAUDE.md Template](07_vibe_coding_complete_claude_md_template.md).*

### ALWAYS Do:
- [ ] Read context.md before starting any task
- [ ] Follow patterns in architecture.md
- [ ] Use existing code patterns before creating new ones
- [ ] Ask clarifying questions before making assumptions
- [ ] Update context.md after completing significant work
- [ ] Write code that matches existing style exactly

### NEVER Do:
- [ ] Create new architectural patterns without approval
- [ ] Skip error handling
- [ ] Use deprecated packages or methods
- [ ] Hardcode sensitive values
- [ ] [PROJECT-SPECIFIC: e.g., "Create direct patient-nurse relationships"]
- [ ] [PROJECT-SPECIFIC: e.g., "Log PHI to console"]

---

## Architecture Principles

### [PRINCIPLE 1 NAME]
[Explain the principle and why it matters]

Example:
```dart
// ✅ CORRECT
[Good code example]

// ❌ WRONG
[Bad code example]
```

### [PRINCIPLE 2 NAME]
[Explain the principle]

---

## File Organization

```
lib/
├── core/           # [What goes here]
├── features/       # [What goes here]
├── shared/         # [What goes here]
└── main.dart       # [Entry point]
```

### Naming Conventions
- Files: `snake_case.dart`
- Classes: `PascalCase`
- Variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`

---

## Development Workflow

### Before Starting Any Task:
1. Read `context.md` for current status
2. Read relevant section of `architecture.md`
3. Check if similar code exists to follow

### After Completing Any Task:
1. Update `context.md` with progress
2. Note any decisions made
3. List any blockers encountered

### Mockup-First Rule (For New UI):
When asked to create new screens or complex UI:
1. **Generate a mockup artifact FIRST** - don't jump to code
2. **Wait for approval** before implementing
3. **Reference the approved mockup** during implementation
4. Use design system tokens in mockups (AppColors, AppTypography, etc.)

**Trigger phrases that require mockup first:**
- "Create a [screen/page/view]"
- "Build the UI for [feature]"
- "Add a new [feature] screen"

**Skip mockups for:**
- Bug fixes that don't change UI
- Adding fields to existing screens
- Backend-only changes
- When told "no mockup needed"

---

## Code Patterns

### State Management
[Your preferred pattern - e.g., Riverpod, BLoC, Provider]

```dart
// Standard provider pattern for this project
[Code example]
```

### Error Handling
[Your preferred approach]

```dart
// Standard error handling pattern
[Code example]
```

### API/Database Access
[Your preferred pattern]

```dart
// Standard data access pattern
[Code example]
```

---

## Testing Requirements

- [ ] Unit tests for business logic
- [ ] Widget tests for UI components
- [ ] Integration tests for critical flows

---

## Questions to Ask Before Coding

1. Does similar code already exist in the project?
2. Does this follow our established patterns?
3. Will this work offline / handle errors gracefully?
4. Is this the simplest solution that works?

---

## Project-Specific Notes

[Add any unique requirements, compliance needs, or special considerations]

---

*Last Updated: [DATE]*
```

---

## Real Example: NurseOS CLAUDE.md (Excerpt)

```markdown
# CLAUDE.md - NurseOS Development Instructions

## Project Overview
**App Name**: NurseOS
**Description**: Shift-centric nursing management app for healthcare agencies
**Tech Stack**: Flutter + Firebase + Riverpod
**Target**: iOS-first, HIPAA-compliant

---

## Your Role
You are the senior healthcare software developer for NurseOS. You have expertise in:
- Flutter mobile development
- Firebase backend services
- HIPAA compliance requirements
- Healthcare workflow optimization

---

## Critical Rules

### ALWAYS Do:
- Read context.md before starting any task
- Follow shift-centric architecture (patients accessed ONLY through shifts)
- Use freezed for all data models
- Implement proper error handling with Either<Failure, Success>
- Log audit trails for all PHI access

### NEVER Do:
- Create direct patient-nurse relationships (use shifts!)
- Log PHI to console or crash reports
- Skip authentication checks
- Use `assignedNurses` field on Patient model
- Store sensitive data in plain text

---

## Architecture Principles

### Shift-Centric Core
All patient access flows through shift assignments. This is non-negotiable.

```dart
// ✅ CORRECT: Access patients through shifts
final shifts = await shiftRepository.getShiftsForNurse(nurseId);
final patientIds = shifts.expand((s) => s.assignedPatientIds).toList();
final patients = await patientRepository.getPatientsByIds(patientIds);

// ❌ WRONG: Direct patient-nurse relationship
final patients = await patientRepository.where('assignedNurses', arrayContains: nurseId);
```

### Pure Data Models
Models contain ONLY data. Business logic goes in extensions.

```dart
// ✅ CORRECT: Pure model + extension
@freezed
class Patient with _$Patient {
  const factory Patient({required String id, required String name}) = _Patient;
}

extension PatientX on Patient {
  String get displayName => name.toUpperCase();
}

// ❌ WRONG: Logic in model
@freezed
class Patient with _$Patient {
  String get displayName => name.toUpperCase(); // NO!
}
```
```

---

# File 2: context.md (Business Context & Status)

## Purpose
This file captures the current state of your project - what's built, what's in progress, recent decisions, and blockers. It's your project's "memory."

## When to Update
- After every significant coding session
- When making architectural decisions
- When encountering blockers
- When completing features

---

## AI Prompt: Generate Your context.md

```
I need to create a context.md file for my project that captures the current state and business context.

Project: [APP NAME]
Current Status: [Starting fresh / In progress / Near completion]

Help me create a context.md that includes:
1. Project vision and goals
2. Target users and their problems
3. Current development phase
4. What's been built so far
5. What's currently being worked on
6. Recent decisions and their reasoning
7. Known issues and blockers
8. Next priorities

Here's what I know about my project:
[PASTE YOUR VALIDATED CONCEPT DOCUMENT FROM PHASE 0]

Generate a comprehensive context.md I can use and update as I build.
```

---

## context.md Template

```markdown
# context.md - Project Context & Status

*Last Updated: [DATE]*

---

## Project Vision

### One-Line Description
[What is this app in one sentence?]

### The Problem
[What problem does this solve?]

### The Solution
[How does your app solve it?]

### Target Users
[Who specifically is this for?]

---

## Business Context

### Market Opportunity
- TAM: $[X]
- Target Segment: [Specific niche]
- Competitors: [Top 3]
- Our Differentiation: [What makes us different]

### Revenue Model
[How will this make money?]

### Success Metrics
- [Metric 1]: [Target]
- [Metric 2]: [Target]
- [Metric 3]: [Target]

---

## Current Development Status

### Project Stage
[ ] Planning & Validation
[x] Foundation & Setup
[ ] Core Features
[ ] Polish & Launch
[ ] Growth & Iteration

### What's Built
- [x] [Feature/Component 1]
- [x] [Feature/Component 2]
- [ ] [Feature/Component 3] - In Progress
- [ ] [Feature/Component 4] - Not Started

### Current Sprint/Focus
**Goal**: [What you're trying to accomplish this week]

**Tasks**:
1. [ ] [Task 1]
2. [ ] [Task 2]
3. [ ] [Task 3]

---

## Recent Decisions

### [DATE] - [Decision Title]
**Decision**: [What was decided]
**Reasoning**: [Why this choice was made]
**Alternatives Considered**: [What else was considered]
**Impact**: [What this affects]

### [DATE] - [Decision Title]
**Decision**: 
**Reasoning**: 
**Alternatives Considered**: 
**Impact**: 

---

## Architecture Decisions Log

| Date | Decision | Reasoning | Status |
|------|----------|-----------|--------|
| [DATE] | [Decision] | [Why] | Active |
| [DATE] | [Decision] | [Why] | Active |

---

## Known Issues & Blockers

### Critical
- [ ] [Issue description] - [Potential solution]

### Non-Critical
- [ ] [Issue description]
- [ ] [Issue description]

### Technical Debt
- [ ] [Item to address later]
- [ ] [Item to address later]

---

## Dependencies & Integrations

| Service | Purpose | Status | Notes |
|---------|---------|--------|-------|
| Firebase Auth | Authentication | ✅ Connected | |
| Firestore | Database | ✅ Connected | |
| [Service] | [Purpose] | [Status] | |

---

## Environment Setup

### Required Accounts
- [ ] Apple Developer ($99/year)
- [ ] Google Play ($25 one-time)
- [ ] Firebase (free tier)
- [ ] [Other services]

### Environment Variables
```
# .env file structure
FIREBASE_PROJECT_ID=xxx
API_KEY=xxx
```

---

## Next Priorities

### This Week
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

### This Month
1. [Goal 1]
2. [Goal 2]

### Before MVP Launch
1. [Must-have 1]
2. [Must-have 2]
3. [Must-have 3]

---

## Notes & Ideas

### Feature Ideas (Backlog)
- [Idea 1]
- [Idea 2]
- [Idea 3]

### Questions to Research
- [Question 1]
- [Question 2]

### Lessons Learned
- [Lesson 1]
- [Lesson 2]

---

*Remember to update this file after every significant development session!*
```

---

## Scaling Up: Layered Memory System

As your project grows (10K+ lines), a single context.md won't cut it. You need a **layered memory system** where different files serve different purposes at different timescales.

### The Three-Layer Pattern

| Layer | File | Lifespan | What Goes Here |
|-------|------|----------|----------------|
| **Permanent** | `MEMORY.md` | Forever | Stable patterns, architectural decisions, user preferences, build environment notes |
| **Session** | `context.md` | One session | Last session recap, **replaced** each session (not appended) |
| **Dashboard** | `development_focus.md` | Project lifetime | Feature tracking, development tracks, progress by area |

### Key Insight: Replace, Don't Append

The biggest mistake is appending to context.md session after session until it becomes thousands of lines of stale history. Instead:

```markdown
# context.md — Replace Each Session

## Last Session: [Feature Name] ([Date])

### What Was Done
- [Bullet points of accomplishments]

### Decisions Made
- [Any choices that affect future work]

### Build State
- `flutter analyze` / `npm run build` — [result]
- [Any new warnings or issues]

### Next Steps
- [What to do first next session]
```

### When to Use MEMORY.md

Save things to permanent memory when they:
- Are confirmed across multiple sessions (not one-off findings)
- Represent stable patterns or conventions
- Are user preferences for workflow or tools
- Are solutions to recurring problems
- Are explicitly requested by the user ("always do X")

**Don't save:** Session-specific context, speculative conclusions, anything that duplicates CLAUDE.md.

### Architecture Decision Records (ADRs)

When you make a significant technical decision, record it so it doesn't get re-debated:

```markdown
## ADR: [Decision Title]
**Date:** [Date]
**Status:** Accepted / Superseded by [ADR-XX]

### Context
[Why this decision was needed]

### Decision
[What was decided]

### Consequences
- [What this enables]
- [What this prevents or limits]
- [Any trade-offs accepted]
```

**Store ADRs in:** Your MEMORY.md (if few), or a dedicated `docs/decisions/` folder (if many).

**Examples of ADR-worthy decisions:**
- "We use Firestore, not SQLite" (database choice)
- "All models use code generation, not hand-written serialization"
- "Mobile-first; web admin deferred until X milestone"
- "Feature flags use enum + gate widget, not remote config"

---

# File 3: architecture.md (Technical Decisions)

## Purpose
Documents all technical decisions, patterns, and structure. This ensures AI produces consistent code that matches your architecture.

---

## AI Prompt: Generate Your architecture.md

```
I need to create an architecture.md file that documents all technical decisions for my project.

Project Details:
- App Type: [Mobile app / Web app / Both]
- Framework: [Flutter / React Native / Next.js / etc.]
- Backend: [Firebase / Supabase / Custom API / etc.]
- State Management: [Riverpod / BLoC / Redux / etc.]
- Database: [Firestore / PostgreSQL / etc.]

Key Requirements:
- [Requirement 1 - e.g., "Must work offline"]
- [Requirement 2 - e.g., "HIPAA compliant"]
- [Requirement 3 - e.g., "Real-time updates"]

Generate a comprehensive architecture.md that includes:
1. Technology stack with version numbers
2. Folder structure with explanations
3. Data model patterns with examples
4. State management patterns with examples
5. API/Database access patterns
6. Error handling approach
7. Authentication flow
8. Key architectural decisions and reasoning

Make it specific enough that another developer (or AI) could follow it exactly.
```

---

## architecture.md Template

```markdown
# architecture.md - Technical Architecture

*Last Updated: [DATE]*

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Flutter | 3.x | UI Framework |
| Dart | 3.x | Language |
| [Package] | x.x.x | [Purpose] |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Firebase | x.x | Backend Services |
| Firestore | - | Database |
| Cloud Functions | - | Server Logic |

### State Management
| Technology | Version | Purpose |
|------------|---------|---------|
| Riverpod | 2.x | State Management |
| Freezed | 2.x | Immutable Models |

### Tech Stack Justification

**Why [FRAMEWORK] over alternatives:**

| Factor | Our Choice | Why |
|--------|------------|-----|
| **Platforms** | [iOS + Android + Web] | [Needed all three] |
| **Developer skills** | [Your background] | [How this influenced choice] |
| **Timeline** | [X months to MVP] | [This stack fits timeline] |
| **Performance needs** | [Standard / High] | [Framework meets requirements] |
| **Key decision factor** | [e.g., single codebase] | [Primary reason for choice] |

**Alternatives considered:**
- [Alternative 1]: Rejected because [REASON]
- [Alternative 2]: Rejected because [REASON]

**Trade-offs accepted:**
- [Trade-off 1]: [Why acceptable]
- [Trade-off 2]: [Why acceptable]

---

## Complexity Classification

**Classification: 🟢 SIMPLE / 🟡 MODERATE / 🔴 COMPLEX**

### Classification Reasoning

| Question | Answer |
|----------|--------|
| Handles protected data (HIPAA/GDPR/PCI)? | Yes / No |
| Requires audit trails? | Yes / No |
| Needs compliance certification? | Yes / No |
| Requires offline sync? | Yes / No |
| Multiple data sources? | Yes / No |
| Complex data relationships? | Yes / No |

### Architecture Implications

**Based on 🟢 SIMPLE classification:**
- Use concrete classes only (no interfaces/abstract classes)
- Screen → Provider → Service pattern (3 layers max)
- No repository pattern needed
- Maximum 3-4 files per feature
- Skip abstractions unless explicitly justified

**Based on 🟡 MODERATE classification:**
- Abstract data sources for testability
- Repository pattern for data access
- Screen → Provider → Repository → DataSource
- Interfaces only where 2+ implementations exist
- Unit tests for business logic

**Based on 🔴 COMPLEX classification:**
- Full abstraction layer permitted with documentation
- Abstract: data sources, auth providers, audit logging
- Each abstraction must document WHY it exists
- Comprehensive test coverage required
- Security-critical code isolated

*Delete the sections that don't apply to your classification.*

---

## Folder Structure

```
lib/
├── core/                    # App-wide utilities
│   ├── constants/          # App constants, strings
│   ├── theme/              # Colors, typography, spacing
│   ├── routing/            # Navigation setup
│   └── utils/              # Helper functions
│
├── data/                    # Data layer
│   ├── models/             # Data models (freezed)
│   ├── repositories/       # Data access
│   ├── datasources/        # Remote/local data sources
│   └── extensions/         # Model extensions (business logic)
│
├── features/                # Feature modules
│   ├── auth/               # Authentication feature
│   │   ├── presentation/   # Screens, widgets
│   │   ├── providers/      # State management
│   │   └── services/       # Feature-specific services
│   ├── [feature_2]/
│   └── [feature_3]/
│
├── shared/                  # Shared components
│   ├── widgets/            # Reusable widgets
│   └── services/           # Shared services
│
└── main.dart               # Entry point
```

### Folder Rules
- **core/**: Only app-wide, feature-agnostic code
- **data/**: Only data models, repositories, no UI
- **features/**: Self-contained feature modules
- **shared/**: Code used by 2+ features

---

## Data Models

### Pattern: Pure Data + Extensions

Models are immutable data containers. Business logic lives in extensions.

```dart
// lib/data/models/user_model.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String email,
    required String name,
    required DateTime createdAt,
    @Default(false) bool isActive,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
```

```dart
// lib/data/extensions/user_extensions.dart
extension UserModelX on UserModel {
  /// Display name with fallback
  String get displayName => name.isNotEmpty ? name : email.split('@').first;
  
  /// Check if user is new (created within 7 days)
  bool get isNewUser => DateTime.now().difference(createdAt).inDays < 7;
  
  /// Formatted creation date
  String get formattedJoinDate => DateFormat('MMM d, yyyy').format(createdAt);
}
```

### Firestore Converters

```dart
// Include converter for type-safe Firestore queries
static CollectionReference<UserModel> get collection =>
    FirebaseFirestore.instance.collection('users').withConverter(
          fromFirestore: (doc, _) => UserModel.fromJson({...doc.data()!, 'id': doc.id}),
          toFirestore: (user, _) => user.toJson()..remove('id'),
        );
```

---

## State Management

### Pattern: Riverpod with AsyncNotifier

```dart
// lib/features/auth/providers/auth_provider.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auth_provider.g.dart';

@riverpod
class AuthNotifier extends _$AuthNotifier {
  @override
  FutureOr<UserModel?> build() async {
    // Initial state - check if user is logged in
    final authState = ref.watch(firebaseAuthProvider);
    if (authState.currentUser == null) return null;
    
    return await _fetchUserProfile(authState.currentUser!.uid);
  }

  Future<void> signIn(String email, String password) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      final credential = await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: email, password: password);
      return await _fetchUserProfile(credential.user!.uid);
    });
  }

  Future<void> signOut() async {
    await FirebaseAuth.instance.signOut();
    state = const AsyncData(null);
  }

  Future<UserModel> _fetchUserProfile(String uid) async {
    final doc = await UserModel.collection.doc(uid).get();
    return doc.data()!;
  }
}
```

### UI Usage Pattern

```dart
// In widgets, use .when() for async state
class ProfileScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authNotifierProvider);
    
    return authState.when(
      loading: () => const LoadingWidget(),
      error: (error, stack) => ErrorWidget(error: error),
      data: (user) => user == null 
          ? const LoginPrompt() 
          : ProfileContent(user: user),
    );
  }
}
```

---

## Repository Pattern

### Abstract Repository (Interface)

```dart
// lib/data/repositories/user_repository.dart
abstract class UserRepository {
  Future<Either<Failure, UserModel>> getUser(String id);
  Future<Either<Failure, UserModel>> updateUser(UserModel user);
  Future<Either<Failure, void>> deleteUser(String id);
  Stream<UserModel?> watchUser(String id);
}
```

### Firebase Implementation

```dart
// lib/data/repositories/firebase_user_repository.dart
class FirebaseUserRepository implements UserRepository {
  final FirebaseFirestore _firestore;
  
  FirebaseUserRepository(this._firestore);

  @override
  Future<Either<Failure, UserModel>> getUser(String id) async {
    try {
      final doc = await UserModel.collection.doc(id).get();
      if (!doc.exists) {
        return Left(NotFoundFailure('User not found'));
      }
      return Right(doc.data()!);
    } on FirebaseException catch (e) {
      return Left(ServerFailure(e.message ?? 'Firebase error'));
    } catch (e) {
      return Left(UnknownFailure(e.toString()));
    }
  }

  @override
  Stream<UserModel?> watchUser(String id) {
    return UserModel.collection.doc(id).snapshots().map((doc) => doc.data());
  }
}
```

---

## Error Handling

### Failure Classes

```dart
// lib/core/errors/failures.dart
abstract class Failure {
  final String message;
  final String? code;
  
  const Failure(this.message, {this.code});
}

class ServerFailure extends Failure {
  const ServerFailure(super.message, {super.code});
}

class NetworkFailure extends Failure {
  const NetworkFailure([String message = 'No internet connection']) : super(message);
}

class NotFoundFailure extends Failure {
  const NotFoundFailure(super.message);
}

class ValidationFailure extends Failure {
  const ValidationFailure(super.message);
}

class UnknownFailure extends Failure {
  const UnknownFailure(super.message);
}
```

### Either Pattern Usage

```dart
// Always return Either<Failure, Success> from repositories
final result = await userRepository.getUser(userId);

result.fold(
  (failure) => showError(failure.message),
  (user) => showProfile(user),
);
```

---

## Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  App Start  │────▶│ Check Auth  │────▶│  Has Token? │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                         ┌─────────────────────┴─────────────────────┐
                         │                                           │
                         ▼                                           ▼
                   ┌───────────┐                              ┌───────────┐
                   │   YES     │                              │    NO     │
                   └─────┬─────┘                              └─────┬─────┘
                         │                                           │
                         ▼                                           ▼
                   ┌───────────┐                              ┌───────────┐
                   │ Home Page │                              │  Sign In  │
                   └───────────┘                              └───────────┘
```

---

## Database Schema

### Collections Structure

```
firestore/
├── users/                    # User profiles
│   └── {userId}
│       ├── email: string
│       ├── name: string
│       ├── createdAt: timestamp
│       └── metadata: map
│
├── [collection_2]/           # [Description]
│   └── {docId}
│       └── [fields]
│
└── [collection_3]/           # [Description]
```

### Security Rules Pattern

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // [Additional rules]
  }
}
```

---

## Key Architectural Decisions

### ADR-001: [Decision Title]
**Status**: Accepted
**Date**: [DATE]
**Context**: [What prompted this decision]
**Decision**: [What was decided]
**Consequences**: [Impact of this decision]

### ADR-002: [Decision Title]
**Status**: Accepted
**Date**: [DATE]
**Context**: 
**Decision**: 
**Consequences**: 

---

## Performance Considerations

- [ ] Use pagination for lists (limit: 20 items)
- [ ] Implement image caching
- [ ] Lazy load features/routes
- [ ] Minimize Firestore reads with local caching

---

## Security Checklist

- [ ] No sensitive data in logs
- [ ] Environment variables for secrets
- [ ] Input validation on all forms
- [ ] Firestore security rules tested
- [ ] Authentication required for protected routes

---

*Update this document when making significant architectural changes.*
```

---

# File 4: prompts.md (Reusable AI Prompts)

## Purpose
A library of tested prompts for common development tasks. Copy-paste these to get consistent, high-quality AI output.

---

## AI Prompt: Generate Your prompts.md

```
I need to create a prompts.md file with reusable AI prompts for my project.

Project: [APP NAME]
Tech Stack: [YOUR STACK]
Key Patterns: [YOUR PATTERNS - e.g., "Riverpod, Freezed, Repository pattern"]

Generate a collection of copy-paste prompts for:
1. Creating new features
2. Creating data models
3. Creating UI screens
4. Writing tests
5. Debugging issues
6. Code review
7. Documentation

Each prompt should:
- Reference my specific architecture
- Include placeholders I can fill in
- Request output in my preferred format
- Include "do" and "don't" instructions
```

---

## prompts.md Template

```markdown
# prompts.md - Reusable AI Prompts

*Copy, paste, and customize these prompts for consistent AI output.*

---

## Feature Development Prompts

### Create New Feature Module

```
Create a new feature module for [FEATURE NAME].

Context:
- Read architecture.md for folder structure
- Read CLAUDE.md for coding patterns
- This feature should: [DESCRIBE WHAT IT DOES]

Create:
1. Data model (freezed) in lib/data/models/
2. Model extensions in lib/data/extensions/
3. Repository interface and implementation
4. Riverpod provider with AsyncNotifier
5. Main screen with loading/error/data states
6. Any necessary widgets

Follow existing patterns exactly. Ask questions if anything is unclear.
```

### Add Feature to Existing Module

```
Add [NEW CAPABILITY] to the [EXISTING FEATURE] module.

Current implementation is in:
- lib/features/[feature]/

Requirements:
- [Requirement 1]
- [Requirement 2]

Follow existing patterns in this module. Minimize new files.
```

---

## Data Model Prompts

### Create New Model

```
Create a freezed data model for [MODEL NAME].

Fields needed:
- [field1]: [type] - [description]
- [field2]: [type] - [description]
- [field3]: [type] - [description]

Include:
1. The @freezed model class
2. fromJson factory
3. Firestore converter
4. Extension file with computed properties: [list any]

Follow the pattern in architecture.md exactly.
```

### Add Field to Existing Model

```
Add a new field to the [MODEL NAME] model.

New field:
- [fieldName]: [type] - [description]
- Default value: [value or required]

Update:
1. The model class
2. Any relevant extensions
3. Firestore converter if needed
4. Note any migration considerations
```

---

## UI/Screen Prompts

### Create New Screen

```
Create a new screen: [SCREEN NAME]

Purpose: [What this screen does]

UI Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Data needed:
- [What data/providers this screen uses]

Include:
1. ConsumerWidget or ConsumerStatefulWidget
2. Proper loading/error/data states using .when()
3. Responsive layout considerations
4. Any necessary sub-widgets

Follow existing screen patterns in the codebase.
```

### Mockup Screen Before Implementation

```
BEFORE implementing, generate a mockup for [SCREEN NAME].

This screen should:
- Purpose: [What it does]
- Data displayed: [List what shows]
- Actions available: [List user actions]
- User arrives from: [Previous screen]
- User goes to: [Next screens]

Follow our design system:
- Use AppColors, AppTypography, AppSpacing
- Match our existing [SIMILAR SCREEN] styling
- Include realistic data, not placeholders

Show me:
1. Default state (with data)
2. Empty state (no data yet)
3. Loading state
4. Error state (if applicable)

I'll review the mockup before we implement.
```

### Mockup Layout Options

```
I need to display [DATA/FEATURE] on the [SCREEN] screen.

Generate 2-3 mockup options:
- Option A: [e.g., "cards in a grid"]
- Option B: [e.g., "list with expandable items"]  
- Option C: [e.g., "tabs with filtered views"]

For each option show:
- How it looks with realistic data
- Empty state
- Where primary actions live

I'll pick the best approach before implementing.
```

### Mockup User Flow

```
Mock up the complete flow for [USER ACTION].

Steps:
1. User starts at [SCREEN]
2. User taps [ELEMENT]
3. [INTERMEDIATE STEPS]
4. Success state: [WHAT USER SEES]

Error paths:
- If [CONDITION], show [ERROR]

Generate connected mockups showing each step.
Use consistent styling throughout.
```

### Motivation Refresh Mockup

```
I've been coding for a while and need to refresh my vision.

Regenerate a polished mockup of [SCREEN/FEATURE] showing:
- The ideal end state
- Realistic data
- Professional styling

This is my motivation reference - make it look great.
```

### Create Reusable Widget

```
Create a reusable widget: [WIDGET NAME]

Purpose: [What this widget displays/does]

Props/Parameters:
- [param1]: [type] - [description]
- [param2]: [type] - [description]

Include:
1. Clear documentation comments
2. Sensible defaults where appropriate
3. Callback functions for interactions
4. Consistent styling with app theme

Place in lib/shared/widgets/
```

---

## Provider Prompts

### Create AsyncNotifier Provider

```
Create a Riverpod AsyncNotifier provider for [PURPOSE].

Data type: [What this provider manages]
Dependencies: [Other providers it needs]

Methods needed:
- [method1]: [description]
- [method2]: [description]

Include:
1. @riverpod annotation
2. Proper error handling with AsyncValue.guard
3. Loading states during operations
4. Clear documentation

Follow the pattern in architecture.md.
```

---

## Repository Prompts

### Create Repository

```
Create a repository for [ENTITY NAME].

Operations needed:
- [operation1]: [input] -> [output]
- [operation2]: [input] -> [output]
- [operation3]: [input] -> [output]

Include:
1. Abstract repository interface
2. Firebase implementation
3. Either<Failure, T> return types
4. Proper error handling
5. Streams for real-time data if needed

Follow existing repository patterns.
```

---

## Testing Prompts

### Write Unit Tests

```
Write unit tests for [CLASS/FUNCTION NAME].

Test cases needed:
1. [Happy path scenario]
2. [Edge case 1]
3. [Edge case 2]
4. [Error scenario]

Use:
- flutter_test package
- Mocktail for mocking
- Clear test descriptions
- Arrange-Act-Assert pattern
```

### Write Widget Tests

```
Write widget tests for [WIDGET NAME].

Test:
1. Widget renders correctly with valid data
2. Loading state displays properly
3. Error state displays properly
4. User interactions work (tap, scroll, etc.)
5. Callbacks are triggered correctly

Use ConsumerWidget testing patterns with ProviderScope.
```

---

## Debugging Prompts

### Diagnose Issue

```
I'm experiencing this issue: [DESCRIBE PROBLEM]

Error message (if any):
```
[PASTE ERROR]
```

Relevant code:
```dart
[PASTE CODE]
```

Help me:
1. Understand what's causing this
2. Identify the root cause
3. Provide a solution that follows our architecture
4. Explain how to prevent this in the future
```

### Performance Issue

```
I'm seeing performance issues with [FEATURE/SCREEN].

Symptoms:
- [Symptom 1]
- [Symptom 2]

Help me:
1. Identify potential causes
2. Suggest profiling approaches
3. Recommend optimizations
4. Implement the fix
```

---

## Code Review Prompts

### Review My Code

```
Review this code for [FEATURE/COMPONENT]:

```dart
[PASTE CODE]
```

Check for:
1. Adherence to our architecture patterns
2. Error handling completeness
3. Performance concerns
4. Security issues
5. Code clarity and documentation
6. Test coverage needs

Be specific about issues and provide corrected code.
```

---

## Documentation Prompts

### Document Function/Class

```
Write documentation for this code:

```dart
[PASTE CODE]
```

Include:
1. Class/function description
2. Parameter descriptions
3. Return value description
4. Usage example
5. Any important notes/warnings

Use Dart documentation style (///).
```

### Update README

```
Update the README for [FEATURE/PROJECT] to include:

1. What it does
2. How to use it
3. Configuration options
4. Examples
5. Common issues

Keep it concise and scannable.
```

---

## Daily Development Prompts

### Start of Day

```
I'm starting development for the day.

Read context.md and tell me:
1. What was I working on last?
2. What's the current priority?
3. Are there any blockers noted?
4. What should I focus on today?
```

### End of Day

```
I'm wrapping up for the day.

Today I:
- [What you accomplished]
- [What you struggled with]
- [What's left to do]

Help me update context.md with:
1. Progress made
2. Any decisions made
3. Current blockers
4. Next priorities
```

---

*Add new prompts as you discover useful patterns!*
```

---

# File 5: standards.md (Coding Standards)

## Purpose
Defines coding conventions, naming rules, and style guidelines. Ensures consistency across the codebase.

---

## AI Prompt: Generate Your standards.md

```
Create a coding standards document for my project.

Project: [APP NAME]
Language: [Dart / TypeScript / etc.]
Framework: [Flutter / React / etc.]

I want standards for:
1. File naming conventions
2. Class/function naming
3. Code organization within files
4. Import ordering
5. Comment/documentation style
6. Git commit messages
7. Branch naming
8. PR requirements

Make them specific and enforceable. Include examples for each rule.
```

---

## standards.md Template

```markdown
# standards.md - Coding Standards & Conventions

*Consistent code is maintainable code.*

---

## Naming Conventions

### Files
| Type | Convention | Example |
|------|------------|---------|
| Models | `snake_case_model.dart` | `user_model.dart` |
| Screens | `snake_case_screen.dart` | `home_screen.dart` |
| Widgets | `snake_case_widget.dart` | `profile_card_widget.dart` |
| Providers | `snake_case_provider.dart` | `auth_provider.dart` |
| Services | `snake_case_service.dart` | `analytics_service.dart` |
| Utils | `snake_case_utils.dart` | `date_utils.dart` |
| Extensions | `type_extensions.dart` | `string_extensions.dart` |
| Tests | `*_test.dart` | `user_model_test.dart` |

### Classes
| Type | Convention | Example |
|------|------------|---------|
| Models | `PascalCase` + `Model` | `UserModel` |
| Screens | `PascalCase` + `Screen` | `HomeScreen` |
| Widgets | `PascalCase` | `ProfileCard` |
| Providers | `PascalCase` + `Notifier` | `AuthNotifier` |
| Repositories | `PascalCase` + `Repository` | `UserRepository` |
| Services | `PascalCase` + `Service` | `AnalyticsService` |

### Variables & Functions
| Type | Convention | Example |
|------|------------|---------|
| Local variables | `camelCase` | `userName` |
| Private variables | `_camelCase` | `_isLoading` |
| Constants | `camelCase` | `defaultTimeout` |
| Global constants | `kCamelCase` or `SCREAMING_CASE` | `kDefaultPadding` |
| Functions | `camelCase` | `getUserById()` |
| Private functions | `_camelCase` | `_validateInput()` |
| Boolean getters | `is/has/can` prefix | `isActive`, `hasPermission` |

---

## File Organization

### Standard File Structure

```dart
// 1. File documentation
/// Brief description of what this file contains
/// 
/// More detailed explanation if needed.

// 2. Dart imports (alphabetical)
import 'dart:async';
import 'dart:io';

// 3. Package imports (alphabetical)
import 'package:flutter/material.dart';
import 'package:riverpod/riverpod.dart';

// 4. Project imports (alphabetical, grouped by type)
import 'package:myapp/core/constants.dart';
import 'package:myapp/core/theme.dart';
import 'package:myapp/data/models/user_model.dart';
import 'package:myapp/features/auth/providers/auth_provider.dart';

// 5. Part directives
part 'user_model.freezed.dart';
part 'user_model.g.dart';

// 6. Constants (if any)
const _kDefaultPadding = 16.0;

// 7. Main class/function
class UserModel {
  // ...
}

// 8. Private helper classes/functions (if any)
class _UserValidator {
  // ...
}
```

---

## Import Rules

### Order
1. `dart:` imports
2. `package:` imports (external packages)
3. `package:myapp/` imports (project imports)
4. Relative imports (avoid when possible)

### Rules
- ✅ Use absolute imports: `import 'package:myapp/...'`
- ❌ Avoid relative imports: `import '../../../models/user.dart'`
- ✅ Group by type with blank lines between groups
- ✅ Alphabetize within each group

---

## Documentation

### When to Document
- ✅ All public classes
- ✅ All public methods
- ✅ Complex private methods
- ✅ Non-obvious code blocks
- ❌ Obvious getters/setters
- ❌ Self-explanatory code

### Documentation Style

```dart
/// A user in the system.
///
/// This model represents a registered user with their
/// profile information and preferences.
///
/// Example:
/// ```dart
/// final user = UserModel(
///   id: '123',
///   email: 'user@example.com',
///   name: 'John Doe',
/// );
/// ```
class UserModel {
  /// The unique identifier for this user.
  final String id;
  
  /// Creates a new user with the given properties.
  ///
  /// Throws [ArgumentError] if [email] is not valid.
  factory UserModel.create({
    required String email,
    required String name,
  }) {
    // ...
  }
}
```

---

## Git Conventions

### Branch Naming
```
feature/[ticket-number]-short-description
bugfix/[ticket-number]-short-description
hotfix/[ticket-number]-short-description
refactor/short-description
docs/short-description
```

Examples:
- `feature/123-user-authentication`
- `bugfix/456-login-crash-fix`
- `refactor/improve-error-handling`

### Commit Messages

Format:
```
type(scope): short description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code change that neither fixes nor adds
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add Google Sign-In support

fix(profile): resolve crash when avatar is null

docs(readme): update installation instructions

refactor(models): extract validation to extensions
```

### Commit Rules
- ✅ Present tense: "add feature" not "added feature"
- ✅ Lowercase: "add feature" not "Add feature"
- ✅ No period at end
- ✅ Keep subject under 50 characters
- ✅ Separate subject from body with blank line

---

## Code Style

### Line Length
- Maximum: 80 characters
- Break long lines logically

### Trailing Commas
- ✅ Always use trailing commas in multi-line structures
```dart
// ✅ Good
final user = UserModel(
  id: '123',
  email: 'test@example.com',
  name: 'Test User',  // <-- trailing comma
);

// ❌ Bad
final user = UserModel(
  id: '123',
  email: 'test@example.com',
  name: 'Test User'  // <-- no trailing comma
);
```

### Const Usage
- ✅ Use `const` wherever possible
- ✅ Prefer `const` constructors
```dart
// ✅ Good
const EdgeInsets.all(16)
const Text('Hello')

// ❌ Bad
EdgeInsets.all(16)
Text('Hello')
```

---

## Widget Guidelines

### StatelessWidget vs StatefulWidget
- Use `StatelessWidget` by default
- Use `StatefulWidget` only when you have local mutable state
- Use `ConsumerWidget` / `ConsumerStatefulWidget` with Riverpod

### Widget Structure

```dart
class MyWidget extends ConsumerWidget {
  const MyWidget({
    super.key,
    required this.title,
    this.onTap,
  });

  final String title;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 1. Get data from providers
    final user = ref.watch(userProvider);
    
    // 2. Get theme/media query
    final theme = Theme.of(context);
    
    // 3. Return widget tree
    return Container(
      // ...
    );
  }
}
```

---

## Error Messages

### User-Facing Messages
- ✅ Clear and helpful
- ✅ Suggest next action
- ❌ No technical jargon
- ❌ No stack traces

```dart
// ✅ Good
'Unable to save your profile. Please check your internet connection and try again.'

// ❌ Bad
'Error: FirebaseException [code: permission-denied]'
```

### Developer Messages (Logs)
- ✅ Include context
- ✅ Include relevant IDs
- ❌ No sensitive data (PII, tokens, passwords)

```dart
// ✅ Good
log('Failed to fetch user profile', error: e, userId: userId);

// ❌ Bad
log('Error: $e');  // No context
log('User email: $email failed');  // PII in logs
```

---

## Testing Standards

### Test File Location
- Mirror the `lib/` structure in `test/`
```
lib/features/auth/providers/auth_provider.dart
test/features/auth/providers/auth_provider_test.dart
```

### Test Naming
```dart
void main() {
  group('UserModel', () {
    test('should create user with valid email', () {
      // ...
    });
    
    test('should throw when email is invalid', () {
      // ...
    });
  });
}
```

### Test Structure (AAA Pattern)
```dart
test('should return user when found', () async {
  // Arrange
  final repository = MockUserRepository();
  when(() => repository.getUser('123')).thenAnswer(
    (_) async => Right(testUser),
  );
  
  // Act
  final result = await repository.getUser('123');
  
  // Assert
  expect(result.isRight(), true);
  expect(result.getOrElse(() => throw Error()), testUser);
});
```

---

*Run `dart format .` and `dart analyze` before every commit!*
```

---

# File 6: design_system.md (Design Tokens & Components)

## Purpose
Documents your design tokens, reusable components, and utility functions. This ensures AI uses existing patterns instead of creating inconsistent implementations.

## Why This Is Critical

**Without design_system.md:**
```dart
// AI generates this chaos:
Container(
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Color(0xFF2196F3),
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text('Hello', style: TextStyle(fontSize: 16)),
)
```

**With design_system.md:**
```dart
// AI generates consistent code:
AppCard(
  child: Text('Hello', style: AppTypography.bodyLarge),
)
```

---

## AI Prompt: Generate Your design_system.md

```
I need to create a design_system.md file for my project that documents all design tokens and reusable components.

My project uses:
- Tech Stack: [Flutter/React/etc.]
- UI Framework: [Material 3 / Custom]
- Brand Colors: [Primary: #XXXX, Secondary: #XXXX]
- Font Family: [Inter / Roboto / Custom]

Current components I have or want:
- [List your existing components]
- [e.g., AppCard, AppButton, LoadingState]

Current utilities:
- [Date formatters]
- [Currency formatters]
- [Validators]

Generate a comprehensive design_system.md that:
1. Documents all color tokens with semantic names
2. Documents typography scale
3. Documents spacing scale
4. Lists all reusable components with usage examples
5. Lists all utility functions with examples
6. Includes a checklist for new UI work

This should serve as a quick reference for AI to use existing patterns.
```

---

## design_system.md Template

```markdown
# Design System Reference

> Last updated: [DATE]
> This is the source of truth for UI consistency.

---

## 🎨 Colors

### Brand Colors
| Token | Usage | Hex |
|-------|-------|-----|
| `AppColors.primary` | Primary actions, links | `#2563EB` |
| `AppColors.primaryLight` | Hover states | `#3B82F6` |
| `AppColors.secondary` | Secondary actions | `#7C3AED` |

### Semantic Colors
| Token | Usage | Hex |
|-------|-------|-----|
| `AppColors.success` | Success states | `#16A34A` |
| `AppColors.warning` | Warnings | `#D97706` |
| `AppColors.error` | Errors | `#DC2626` |
| `AppColors.info` | Information | `#0891B2` |

### Text Colors
| Token | Usage |
|-------|-------|
| `AppColors.textPrimary` | Headings, primary text |
| `AppColors.textSecondary` | Secondary text, labels |
| `AppColors.textTertiary` | Placeholders, hints |

### Surface Colors
| Token | Usage |
|-------|-------|
| `AppColors.surface` | Cards, modals |
| `AppColors.background` | Page backgrounds |
| `AppColors.border` | Borders, dividers |

---

## 📝 Typography

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `AppTypography.headlineLarge` | 32px | 600 | Page titles |
| `AppTypography.headlineMedium` | 28px | 600 | Section headers |
| `AppTypography.titleLarge` | 22px | 600 | Card titles |
| `AppTypography.titleMedium` | 16px | 600 | List item titles |
| `AppTypography.bodyLarge` | 16px | 400 | Main content |
| `AppTypography.bodyMedium` | 14px | 400 | Secondary content |
| `AppTypography.bodySmall` | 12px | 400 | Captions |
| `AppTypography.labelLarge` | 14px | 600 | Buttons |
| `AppTypography.labelSmall` | 11px | 600 | Badges |

---

## 📐 Spacing

### Scale
| Token | Value | Usage |
|-------|-------|-------|
| `AppSpacing.xs` | 4px | Tight spacing |
| `AppSpacing.sm` | 8px | Compact |
| `AppSpacing.md` | 16px | Default |
| `AppSpacing.lg` | 24px | Relaxed |
| `AppSpacing.xl` | 32px | Sections |

### Presets
| Token | Usage |
|-------|-------|
| `AppSpacing.cardPadding` | Inside cards (16px all) |
| `AppSpacing.pagePadding` | Page margins |
| `AppSpacing.gapVMd` | Vertical gap widget |
| `AppSpacing.gapHSm` | Horizontal gap widget |

---

## 🔲 Radius

| Token | Value | Usage |
|-------|-------|-------|
| `AppRadius.sm` | 4px | Inputs |
| `AppRadius.md` | 8px | Cards, buttons |
| `AppRadius.lg` | 12px | Modals |
| `AppRadius.full` | 9999px | Pills, avatars |

---

## 🌑 Shadows

| Token | Usage |
|-------|-------|
| `AppShadows.sm` | Cards at rest |
| `AppShadows.md` | Elevated cards, hover |
| `AppShadows.lg` | Modals, popovers |

---

## ⚡ Animation

| Token | Duration | Usage |
|-------|----------|-------|
| `AppAnimations.fast` | 200ms | Tooltips |
| `AppAnimations.normal` | 300ms | Page transitions |
| `AppAnimations.slow` | 400ms | Complex animations |

---

## 🧱 Components

### Location: `lib/shared/widgets/`

| Component | File | Usage |
|-----------|------|-------|
| `AppCard` | `cards/app_card.dart` | Standard card container |
| `AppButton` | `buttons/app_button.dart` | Primary/secondary buttons |
| `AppTextField` | `inputs/app_text_field.dart` | Text inputs |
| `LoadingState` | `feedback/loading_state.dart` | Loading spinner |
| `ErrorState` | `feedback/error_state.dart` | Error with retry button |
| `EmptyState` | `feedback/empty_state.dart` | Empty list placeholder |

### Usage Examples

```dart
// Card
AppCard(
  child: Text('Content'),
)

// Card with tap
AppCard(
  onTap: () => print('tapped'),
  child: Text('Tappable card'),
)

// Loading
LoadingState()
LoadingState(message: 'Loading patients...')

// Error
ErrorState(
  message: 'Failed to load data',
  onRetry: () => ref.invalidate(patientsProvider),
)

// Empty
EmptyState(
  icon: Icons.inbox,
  title: 'No patients',
  message: 'Add your first patient to get started',
)
```

---

## 🔧 Utilities

### Location: `lib/core/utils/formatters.dart`

| Function | Example Input | Example Output |
|----------|---------------|----------------|
| `AppFormatters.dateShort(date)` | DateTime | "Jan 15, 2025" |
| `AppFormatters.dateLong(date)` | DateTime | "January 15, 2025" |
| `AppFormatters.time(date)` | DateTime | "3:45 PM" |
| `AppFormatters.timeAgo(date)` | DateTime | "2 hours ago" |
| `AppFormatters.currency(1234.56)` | num | "$1,234.56" |
| `AppFormatters.number(1234)` | num | "1,234" |
| `AppFormatters.percent(0.45)` | num | "45%" |
| `AppFormatters.phone('5551234567')` | String | "(555) 123-4567" |
| `AppFormatters.initials('John', 'Doe')` | Strings | "JD" |

---

## ✅ Checklist for New UI

Before creating any new UI, verify:

- [ ] Using `AppColors` not raw `Color()` or `Colors.x`
- [ ] Using `AppTypography` not raw `TextStyle()`
- [ ] Using `AppSpacing` not raw numbers
- [ ] Using `AppRadius` not raw `BorderRadius`
- [ ] Using `AppShadows` not raw `BoxShadow`
- [ ] Checked `lib/shared/widgets/` for existing components
- [ ] Using `AppFormatters` for dates/numbers/currency
- [ ] New reusable component goes in `lib/shared/widgets/`
```

---

## CLAUDE.md Addition for Design System

Add this section to your CLAUDE.md to enforce design system usage:

```markdown
# 🎨 DESIGN SYSTEM RULES

## BEFORE CREATING ANY UI:
1. Read `design_system.md` for available tokens and components
2. Check `lib/shared/widgets/` for existing components
3. NEVER use hardcoded values for colors, spacing, typography

## FORBIDDEN (will cause inconsistency):
```dart
// ❌ Raw colors
Color(0xFF2563EB)
Colors.blue

// ❌ Raw typography
TextStyle(fontSize: 16, fontWeight: FontWeight.w600)

// ❌ Raw spacing
EdgeInsets.all(16)
SizedBox(height: 8)

// ❌ Raw radius
BorderRadius.circular(8)

// ❌ Creating new card containers
Container(decoration: BoxDecoration(color: Colors.white, ...))

// ❌ Custom loading/error states
CircularProgressIndicator()
Center(child: Text('Loading...'))
```

## REQUIRED (use design system):
```dart
// ✅ Design tokens
AppColors.primary
AppTypography.bodyLarge
AppSpacing.md
AppRadius.md
AppShadows.sm

// ✅ Existing components
AppCard(child: ...)
LoadingState()
ErrorState(message: '...', onRetry: _retry)

// ✅ Existing formatters
AppFormatters.dateShort(date)
AppFormatters.currency(amount)
```

## BEFORE CREATING NEW COMPONENTS:
1. Search `lib/shared/widgets/` - does similar exist?
2. Can existing component be extended?
3. If truly new:
   - Use design tokens (no magic numbers)
   - Follow existing patterns
   - Place in `lib/shared/widgets/`
   - Make it reusable, not feature-specific
```

---

# Summary: All Context Files

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `CLAUDE.md` | AI behavior instructions | When patterns change |
| `context.md` | Current status & decisions | Every session |
| `architecture.md` | Technical decisions | When architecture changes |
| `prompts.md` | Reusable AI prompts | As you discover new ones |
| `standards.md` | Coding conventions | Rarely |
| `design_system.md` | Design tokens & components | When adding new tokens/components |

---

# Quick Setup Commands

```bash
# Create the folder structure
mkdir -p .context docs

# Create CLAUDE.md in project root (required location for Claude Code)
touch CLAUDE.md

# Create context files in .context/
touch .context/context.md
touch .context/architecture.md
touch .context/prompts.md
touch .context/standards.md
touch .context/design_system.md

# Create docs files
touch docs/mvp_features.md
touch docs/revenue_model.md
touch docs/development_timeline.md
```

**Or use `vibe-init`** from the Scripts Guide to create all files automatically.

---

# Next Steps

After creating your context files:

1. **Fill out each file** using the templates and AI prompts
2. **Review for accuracy** - AI suggestions need human verification
3. **Test with Claude Code** - Start a session and verify it reads your files
4. **Iterate** - Update files as you learn what works

→ Continue to: **Caution Guide** (safety rules) then **Scripts Guide** (CLI tools)

---

*This guide is part of The Vibe Coding Blueprint*
*Created from real app development experience with NurseOS and GLP-1 Protein Tracker*
