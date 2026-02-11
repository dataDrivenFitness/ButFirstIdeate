# Vibe Coding Context Templates
## Copy These Into Your Project's .context/ Folder

---

## 📄 claude.md

```markdown
# Development Instructions for Claude

You are the senior technical lead for [YOUR APP NAME], a [ONE LINE DESCRIPTION].

## Core Principles
1. **Simplicity First** - Choose boring technology that works
2. **Revenue Focus** - Features that drive revenue ship first  
3. **User Value** - Every line of code must benefit users
4. **Ship Daily** - Progress over perfection

## Response Guidelines

### When I ask for code:
- Include the complete file with proper imports
- Show the file path as a comment at the top
- Explain significant decisions
- Warn about breaking changes
- Suggest simpler alternatives if applicable

### When reviewing code:
- Focus on critical issues only
- Ignore style unless it affects functionality
- Suggest performance improvements only if significant
- Prioritize security and data integrity

## Technical Preferences

### Code Style
- Functions under 20 lines
- Descriptive names over comments
- Early returns over nested conditions
- Composition over inheritance
- Explicit over clever

### Architecture Rules
- Features are self-contained in feature folders
- No cross-feature imports (use shared/)
- One responsibility per class/function
- Prefer duplication over wrong abstraction
- Delete code aggressively

## Project-Specific Patterns

### State Management
- Use [RIVERPOD/REDUX/ZUSTAND]
- Prefer local state when possible
- Global state only for user/auth/theme

### Data Fetching
- All API calls return Result<T, Error>
- Handle loading/error/success states
- Cache aggressively, invalidate precisely
- Optimistic updates for better UX

### Error Handling
- Never throw in production
- Log errors with context
- User-friendly error messages
- Graceful degradation

## Anti-Patterns to Avoid
❌ Creating abstractions "for future use"
❌ Over-engineering simple features
❌ Premature optimization
❌ Complex dependency injection
❌ Deeply nested component trees

## When You're Unsure
- Ask for clarification
- Show options with trade-offs
- Default to simpler solution
- Reference existing patterns in codebase
```

---

## 📄 context.md

```markdown
# [YOUR APP NAME]

## Vision
[ONE SENTENCE: What success looks like in 1 year]

## Problem
[2-3 SENTENCES: What specific problem you're solving]

## Solution  
[2-3 SENTENCES: How your app uniquely solves this]

## Target Users

### Primary User
- **Who:** [Specific demographic/profession]
- **Pain Point:** [What frustrates them today]
- **Goal:** [What they want to achieve]
- **Current Solution:** [What they use now]
- **Why Switch:** [Your unique value]

### Secondary User
- **Who:** [Expansion market]
- **When Ready:** [After X milestone]

## Business Model

### Revenue Streams
1. **Primary:** [e.g., Subscriptions] - $[X]/month
2. **Secondary:** [e.g., Transaction fees] - [X]%
3. **Future:** [e.g., Enterprise] - Year 2

### Unit Economics
- Customer Acquisition Cost: $[X]
- Lifetime Value: $[X]
- Payback Period: [X] months
- Gross Margin: [X]%

## Success Metrics

### Phase 1 (Weeks 1-4)
- [ ] First user can complete core action
- [ ] 5 beta users onboarded
- [ ] Core feature working end-to-end

### Phase 2 (Weeks 5-8)
- [ ] Payment processing live
- [ ] 50 active users
- [ ] First revenue received

### Phase 3 (Months 3-6)
- [ ] 500 active users
- [ ] $[X]K MRR
- [ ] Break-even achieved

## Competitive Landscape

### Direct Competitors
1. **[Competitor]:** Strong at [X], weak at [Y]
2. **[Competitor]:** Expensive, complex

### Our Advantages
1. **[Unique Feature]:** No one else has this
2. **[Approach]:** Different methodology
3. **[Price/Speed/Quality]:** Better on key metric

## Constraints

### Technical
- Platform: [iOS/Android/Web]
- Budget: $[X] total
- Timeline: [X] weeks to MVP
- Team: Solo developer / [X] people

### Non-Negotiable
1. [e.g., Must work offline]
2. [e.g., HIPAA compliant]
3. [e.g., Under 50MB app size]

## Key Decisions Made
1. **[Decision]:** [Reasoning]
2. **[Decision]:** [Reasoning]
3. **[Decision]:** [Reasoning]

## Open Questions
1. [Question needing answer]
2. [Question needing answer]

## Brand Voice
[3 ADJECTIVES: e.g., Professional, Friendly, Trustworthy]
```

---

## 📄 architecture.md

```markdown
# Technical Architecture

## Technology Stack

### Frontend
- **Framework:** [Flutter/React/Next.js/Swift]
- **State Management:** [Riverpod/Redux/Zustand]
- **UI Library:** [Material/Custom/Tailwind]
- **Navigation:** [GoRouter/React Router]

### Backend
- **Database:** [Firebase/Supabase/PostgreSQL]
- **Auth:** [Firebase Auth/Supabase Auth/Auth0]
- **Storage:** [Firebase Storage/S3/Cloudinary]
- **API:** [REST/GraphQL/tRPC]

### External Services
- **Payments:** [Stripe/RevenueCat]
- **Analytics:** [Mixpanel/PostHog/Firebase]
- **Errors:** [Sentry/LogRocket]
- **Push Notifications:** [FCM/OneSignal]

## Project Structure

```
lib/
├── core/
│   ├── theme/
│   │   ├── app_colors.dart
│   │   ├── app_typography.dart
│   │   └── app_theme.dart
│   ├── config/
│   │   ├── env.dart
│   │   └── constants.dart
│   └── router/
│       └── app_router.dart
├── features/
│   ├── auth/
│   │   ├── models/
│   │   │   ├── user.dart
│   │   │   └── user.freezed.dart
│   │   ├── providers/
│   │   │   └── auth_provider.dart
│   │   ├── services/
│   │   │   └── auth_service.dart
│   │   ├── ui/
│   │   │   ├── login_screen.dart
│   │   │   └── signup_screen.dart
│   │   └── auth.dart (barrel export)
│   └── [feature_name]/
│       └── [same structure]
└── shared/
    ├── widgets/
    │   ├── buttons/
    │   └── inputs/
    ├── utils/
    │   ├── validators.dart
    │   └── formatters.dart
    └── extensions/
        └── string_extensions.dart
```

## Data Models

### User Model
```dart
class User {
  String id;
  String email;
  String name;
  DateTime createdAt;
  SubscriptionTier? subscription;
}
```

### [Core Model]
```dart
class [Model] {
  String id;
  String userId;
  [fields]
  DateTime createdAt;
  DateTime updatedAt;
}
```

## State Management Patterns

### Provider Pattern (Riverpod)
```dart
// Service layer
class AuthService {
  Future<Result<User>> signIn(String email, String password);
  Future<Result<void>> signOut();
}

// Provider layer  
final authProvider = NotifierProvider<AuthNotifier, AuthState>();

// UI layer
Consumer(builder: (context, ref, _) {
  final authState = ref.watch(authProvider);
  return authState.when(...);
});
```

## API Patterns

### Result Type
```dart
sealed class Result<T> {
  Success(T value);
  Failure(AppError error);
}
```

### Service Methods
```dart
Future<Result<T>> getResource(String id);
Future<Result<List<T>>> listResources({int? limit});
Future<Result<T>> createResource(T data);
Future<Result<T>> updateResource(String id, T data);
Future<Result<void>> deleteResource(String id);
```

## Security Rules

### Authentication
- JWT tokens with 1hr expiry
- Refresh tokens with 30 day expiry
- Biometric authentication optional

### Data Access
- Users can only read/write their own data
- Admin role for support access
- Public data cached aggressively

## Development Phases

### Phase 1: Core (Weeks 1-4)
- User authentication
- Core feature CRUD
- Basic UI/UX
- Local data storage

### Phase 2: Revenue (Weeks 5-8)
- Payment processing
- Subscription management
- Usage tracking
- Basic analytics

### Phase 3: Growth (Weeks 9-12)
- Push notifications
- Referral system
- Advanced features
- Performance optimization

### Phase 4: Scale (Months 4-6)
- Admin dashboard
- Advanced analytics
- A/B testing
- Enterprise features

## Performance Targets
- App size: < 50MB
- Cold start: < 2 seconds
- API response: < 200ms p95
- Crash rate: < 0.1%
- FCP: < 1.5 seconds

## Testing Strategy
- Unit tests for business logic (80% coverage)
- Widget tests for UI components
- Integration tests for critical paths
- Manual testing for edge cases

## Deployment

### Environments
1. **Local:** localhost:3000
2. **Staging:** staging.app.com
3. **Production:** app.com

### CI/CD Pipeline
1. Push to main → Run tests
2. Tests pass → Deploy to staging
3. Manual approval → Deploy to production
4. Post-deploy → Smoke tests

## Monitoring

### Key Metrics
- Daily active users
- Crash-free sessions
- API latency (p50, p95, p99)
- Conversion funnel
- Revenue metrics
```

---

## 📄 prompts.md

```markdown
# Reusable AI Prompts

## 🏗️ Project Setup

### Initial Architecture
```
I'm building [APP DESCRIPTION].

Requirements:
- Users: [TARGET USERS]
- Core feature: [MAIN FEATURE]
- Platform: [WEB/MOBILE]
- Timeline: [X weeks]
- Budget: [$X]

Create:
1. Technical architecture
2. Database schema
3. Folder structure
4. Development phases (4 weeks)
5. Tech stack recommendations

Focus on shipping Week 4, not perfection.
```

## 💻 Feature Development

### New Feature Implementation
```
Based on architecture.md, implement [FEATURE NAME].

Current state:
- Existing files: [LIST]
- Patterns to follow: [FILE/PATTERN]
- Dependencies available: [LIST]

Requirements:
1. [REQUIREMENT 1]
2. [REQUIREMENT 2]

Constraints:
- Follow existing patterns
- Keep functions under 20 lines
- Ask before adding dependencies

Create all necessary files (models, services, UI).
```

### CRUD Operations
```
Create CRUD operations for [MODEL].

Model fields:
- [FIELD]: [TYPE]
- [FIELD]: [TYPE]

Include:
1. Freezed model class
2. Riverpod providers
3. Service with Result<T> returns
4. Basic UI screens (list, detail, create, edit)
5. Loading/error states

Follow patterns from features/[EXAMPLE]/.
```

## 🎨 UI/UX Design

### Screen Creation
```
Create [SCREEN NAME] screen.

Purpose: [WHAT IT DOES]

Requirements:
- Mobile responsive
- Loading states
- Error handling
- Empty states
- Follow theme from core/theme/

Reference: [SIMILAR SCREEN] for patterns.
```

### Component Library
```
Create reusable [COMPONENT NAME] widget.

Props:
- [PROP]: [TYPE] - [DESCRIPTION]
- onTap: Function - [WHAT IT DOES]

Variants:
- Primary (default)
- Secondary
- Disabled

Include:
- Proper prop validation
- Accessibility labels
- Theme integration
```

## 🧪 Testing

### Test Generation
```
Create tests for [FEATURE/FILE].

Cover:
1. Happy path
2. Error cases
3. Edge cases
4. Loading states

Use:
- Mock data from fixtures/
- Existing test utilities
- AAA pattern (Arrange, Act, Assert)
```

## 🐛 Debugging

### Bug Fix
```
Bug: [DESCRIPTION]

Steps to reproduce:
1. [STEP]
2. [STEP]

Expected: [WHAT SHOULD HAPPEN]
Actual: [WHAT HAPPENS]

Error message: [IF ANY]

Fix this following existing error handling patterns.
```

### Performance Optimization
```
This screen/function is slow.

Current code:
[PASTE CODE]

Measurements:
- Current: [Xms]
- Target: [<Yms]

Optimize without changing functionality.
Explain what caused the issue.
```

## 📱 Platform-Specific

### Mobile Features
```
Add [PLATFORM FEATURE] support.

Requirements:
- iOS: [SPECIFIC NEED]
- Android: [SPECIFIC NEED]

Use platform channels if needed.
Handle permissions properly.
Graceful degradation if unavailable.
```

## 💰 Revenue Features

### Payment Integration
```
Integrate Stripe payment for [PRODUCT/SUBSCRIPTION].

Flow:
1. User selects [PRODUCT]
2. Show payment sheet
3. Process payment
4. Update user account
5. Send confirmation

Include:
- Price display
- Error handling
- Success feedback
- Receipt generation
```

## 🚀 Launch Preparation

### App Store Submission
```
Prepare for [iOS/Android] submission.

Check:
1. App size (<50MB)
2. Performance metrics
3. Privacy policy URL
4. Screenshots needed
5. App description

Fix any blocking issues.
Create missing assets.
```

## 📊 Analytics

### Event Tracking
```
Add analytics tracking for [FEATURE].

Events to track:
1. [ACTION] - Properties: [LIST]
2. [ACTION] - Properties: [LIST]

Use existing analytics service.
Follow current naming convention.
Don't track PII.
```

## 🔒 Security

### Security Audit
```
Review [FEATURE] for security issues.

Check for:
1. Input validation
2. SQL injection
3. XSS vulnerabilities
4. Proper authentication
5. Data encryption

Fix any issues found.
Explain the vulnerabilities.
```

## 📝 Documentation

### API Documentation
```
Document the [SERVICE/API] methods.

Include:
- Purpose
- Parameters
- Return types
- Error codes
- Example usage

Format: JSDoc/Dartdoc comments
```

### README Creation
```
Create README for [PROJECT/FEATURE].

Sections:
1. Overview
2. Installation
3. Usage
4. API Reference
5. Contributing
6. License

Keep it concise and practical.
```

## 🎯 Quick Fixes

### One-Liner Prompts
- "Make this responsive"
- "Add loading state"
- "Fix this TypeScript error"
- "Simplify this function"
- "Add error handling"
- "Make this accessible"
- "Add input validation"
- "Cache this API call"
- "Debounce this search"
- "Paginate these results"

## 💡 Best Practices Reminder

Always include in complex prompts:
- Current file structure context
- Existing patterns to follow
- Specific constraints
- Expected outcome
- "Ask before adding complexity"
```

---

## 📄 standards.md

```markdown
# Coding Standards

## Git Workflow

### Branch Naming
- `feat/short-description` - New features
- `fix/issue-description` - Bug fixes
- `refactor/what-changed` - Code improvements
- `docs/what-documented` - Documentation

### Commit Messages
```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `test`: Tests
- `chore`: Maintenance

Examples:
```
feat(auth): add biometric login
fix(payments): handle declined cards
docs(api): update endpoint documentation
```

### Pull Request Template
```markdown
## What
[Brief description]

## Why
[Business justification]

## How
[Technical approach]

## Testing
- [ ] Manual testing
- [ ] Unit tests
- [ ] Integration tests

## Screenshots
[If applicable]
```

## Code Standards

### File Naming
```
// React/Next.js
components/UserProfile.tsx  // PascalCase
utils/formatDate.ts         // camelCase
styles/globals.css          // kebab-case
__tests__/user.test.ts      // test files

// Flutter
lib/features/auth/models/user.dart  // snake_case
lib/shared/widgets/custom_button.dart
test/features/auth/auth_test.dart
```

### Function Standards
```dart
// ✅ Good: Clear, single purpose
Future<Result<User>> getUserById(String userId) async {
  try {
    final doc = await _firestore
        .collection('users')
        .doc(userId)
        .get();
    
    if (!doc.exists) {
      return Failure(UserNotFoundError());
    }
    
    return Success(User.fromJson(doc.data()!));
  } catch (e) {
    return Failure(DatabaseError(e.toString()));
  }
}

// ❌ Bad: Too many responsibilities
Future<dynamic> handleUserStuff(String id, bool flag) async {
  // Unclear purpose
  // Multiple responsibilities
  // Poor error handling
}
```

### Component Standards
```tsx
// ✅ Good: Focused, typed, documented
interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ 
  label, 
  onPress, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles[variant]}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
```

## State Management

### Provider Pattern
```dart
// ✅ Good: Clear state management
@riverpod
class AuthNotifier extends _$AuthNotifier {
  @override
  AuthState build() => const AuthState.initial();

  Future<void> signIn(String email, String password) async {
    state = const AuthState.loading();
    
    final result = await _authService.signIn(email, password);
    
    state = result.fold(
      (failure) => AuthState.error(failure.message),
      (user) => AuthState.authenticated(user),
    );
  }
}
```

## Error Handling

### Result Type Pattern
```dart
// Define clear success/failure types
sealed class Result<T> {
  const Result();
}

class Success<T> extends Result<T> {
  final T value;
  const Success(this.value);
}

class Failure<T> extends Result<T> {
  final AppError error;
  const Failure(this.error);
}

// Use in services
Future<Result<User>> createUser(UserData data) async {
  try {
    final user = await api.createUser(data);
    return Success(user);
  } on ValidationException catch (e) {
    return Failure(ValidationError(e.message));
  } catch (e) {
    return Failure(UnknownError());
  }
}
```

## Testing Standards

### Test Structure
```dart
void main() {
  group('AuthService', () {
    late AuthService authService;
    late MockFirebaseAuth mockAuth;

    setUp(() {
      mockAuth = MockFirebaseAuth();
      authService = AuthService(mockAuth);
    });

    test('signIn returns user on success', () async {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      final expectedUser = User(id: '123', email: email);
      
      when(() => mockAuth.signIn(email, password))
          .thenAnswer((_) async => expectedUser);

      // Act
      final result = await authService.signIn(email, password);

      // Assert
      expect(result, isA<Success<User>>());
      expect((result as Success).value, equals(expectedUser));
    });
  });
}
```

## Documentation

### Code Comments
```dart
/// Authenticates a user with email and password.
/// 
/// Returns [Success] with [User] if authentication succeeds.
/// Returns [Failure] with [AuthError] if authentication fails.
/// 
/// Throws [NetworkException] if network is unavailable.
Future<Result<User>> signIn(String email, String password) async {
  // Implementation
}
```

### README Structure
```markdown
# Project Name

One line description.

## Features
- Feature 1
- Feature 2

## Installation
\`\`\`bash
flutter pub get
\`\`\`

## Usage
\`\`\`dart
final result = await authService.signIn(email, password);
\`\`\`

## Contributing
See CONTRIBUTING.md

## License
MIT
```

## Performance Standards

### Image Optimization
- Max size: 200KB for UI images
- Format: WebP for web, PNG for mobile
- Lazy load below the fold
- Use CDN for production

### API Optimization
- Paginate lists (default 20 items)
- Cache GET requests (5 min default)
- Debounce search (300ms)
- Batch operations when possible

### Bundle Size
- Monitor with `flutter build apk --analyze-size`
- Code split by route/feature
- Tree shake unused code
- Lazy load heavy features

## Security Standards

### Never Commit
```
# .gitignore
.env
.env.local
*.pem
*.key
*.cert
service-account.json
```

### Always Validate
```dart
// Input validation
bool isValidEmail(String email) {
  return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
      .hasMatch(email);
}

// Sanitize user input
String sanitizeInput(String input) {
  return input
      .replaceAll(RegExp(r'<[^>]*>'), '') // Remove HTML
      .trim();
}
```

### API Security
- Use HTTPS always
- Implement rate limiting
- Validate all inputs
- Use parameterized queries
- Implement CORS properly

## Review Checklist

Before merging:
- [ ] Code follows style guide
- [ ] Tests pass (if applicable)
- [ ] No console.log/print statements
- [ ] Error handling added
- [ ] Loading states implemented
- [ ] Responsive on mobile
- [ ] Accessibility checked
- [ ] Documentation updated
- [ ] Performance impact considered
- [ ] Security implications reviewed
```

---

## Quick Start Instructions

1. **Create Your Project**
```bash
# Flutter
flutter create your_app_name
cd your_app_name

# OR Next.js
npx create-next-app@latest your_app_name
cd your_app_name
```

2. **Set Up Context Files**
```bash
# Create the context folder
mkdir .context

# Create the files
touch .context/claude.md
touch .context/context.md
touch .context/architecture.md
touch .context/prompts.md
touch .context/standards.md

# Copy templates above into each file
# Edit with your specific details
```

3. **Initialize Git with Proper Ignore**
```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "*.pem" >> .gitignore
echo "service-account*.json" >> .gitignore

# Initial commit
git init
git add .
git commit -m "feat: initial project setup with context files"
```

4. **Start Your First AI Session**
```
Open Claude.ai and paste:

"I'm starting a new project. Here's my context:
[PASTE YOUR context.md]

Based on this, using your Architecture Agent skills:
1. Review my vision and suggest improvements
2. Create the technical architecture
3. Design the database schema
4. Break down into 4-week phases
5. Identify the ONE feature to build first"
```

5. **Begin Building**
```
"Based on the architecture we defined:
[PASTE architecture.md]

Let's implement Phase 1, Week 1:
Create the authentication system with email/password.

Include:
- User model
- Auth service
- Login/Signup screens
- State management
- Error handling

Follow the patterns in standards.md."
```

---

Remember: These templates are starting points. Customize them for your specific project, but keep them concise. The goal is clarity for AI, not comprehensive documentation.
