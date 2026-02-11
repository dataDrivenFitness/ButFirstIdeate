# Design System Documentation Guide
## Ensuring Consistency, Reusability & AI Compliance

*Without a documented design system, AI will reinvent your wheel every single time.*

---

## 🛠️ Quick Start with Scripts

**`vibe-init`** creates a starter `design_system.md` with common tokens.

**`vibe-mockup`** generates UI mockups using your design system colors.

This guide shows you how to customize and extend beyond the defaults.

---

## Why This Matters for AI-Assisted Development

When you ask AI to "create a settings screen," it has no idea:
- What colors your app uses
- What your buttons look like
- What spacing scale you follow
- What components already exist
- How you format dates and times

**The result?** AI creates new, inconsistent implementations every time.

**The solution?** Document your design system so AI uses what you've already built.

---

## The Design System Documentation Structure

```
.context/
├── CLAUDE.md              ← Rules that ENFORCE the design system
├── design_system.md       ← Complete reference of tokens & components
└── context.md             ← Links to design system

lib/
├── core/
│   ├── theme/
│   │   ├── app_colors.dart
│   │   ├── app_typography.dart
│   │   ├── app_spacing.dart
│   │   ├── app_radius.dart
│   │   ├── app_shadows.dart
│   │   ├── app_animations.dart
│   │   └── app_theme.dart
│   └── utils/
│       ├── formatters.dart
│       ├── validators.dart
│       └── converters.dart
└── shared/
    └── widgets/
        ├── buttons/
        ├── cards/
        ├── inputs/
        ├── feedback/
        └── layout/
```

---

# Part 1: Design Tokens

## What Are Design Tokens?

Design tokens are the atomic values of your design system - the single source of truth for colors, typography, spacing, etc. They ensure consistency and make global changes easy.

**Without tokens:**
```dart
// ❌ Magic numbers everywhere - impossible to maintain
Container(
  padding: EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Color(0xFF2196F3),
    borderRadius: BorderRadius.circular(8),
    boxShadow: [BoxShadow(blurRadius: 4, color: Colors.black26)],
  ),
  child: Text('Hello', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
)
```

**With tokens:**
```dart
// ✅ Semantic, maintainable, consistent
Container(
  padding: AppSpacing.insetMd,
  decoration: BoxDecoration(
    color: AppColors.surface,
    borderRadius: AppRadius.md,
    boxShadow: AppShadows.sm,
  ),
  child: Text('Hello', style: AppTypography.bodyLarge),
)
```

---

## Token Category 1: Colors

### Template: `app_colors.dart`

```dart
import 'package:flutter/material.dart';

/// App color palette - NEVER use raw Color() values elsewhere
abstract class AppColors {
  // ============================================
  // BRAND COLORS
  // ============================================
  
  /// Primary brand color - main actions, links, focus states
  static const Color primary = Color(0xFF2563EB);       // Blue 600
  static const Color primaryLight = Color(0xFF3B82F6);  // Blue 500
  static const Color primaryDark = Color(0xFF1D4ED8);   // Blue 700
  
  /// Secondary brand color - secondary actions, accents
  static const Color secondary = Color(0xFF7C3AED);     // Violet 600
  static const Color secondaryLight = Color(0xFF8B5CF6);
  static const Color secondaryDark = Color(0xFF6D28D9);

  // ============================================
  // SEMANTIC COLORS
  // ============================================
  
  /// Success states - confirmations, completed actions
  static const Color success = Color(0xFF16A34A);       // Green 600
  static const Color successLight = Color(0xFFDCFCE7);  // Green 100
  
  /// Warning states - caution, pending actions
  static const Color warning = Color(0xFFD97706);       // Amber 600
  static const Color warningLight = Color(0xFFFEF3C7); // Amber 100
  
  /// Error states - errors, destructive actions
  static const Color error = Color(0xFFDC2626);         // Red 600
  static const Color errorLight = Color(0xFFFEE2E2);   // Red 100
  
  /// Info states - informational messages
  static const Color info = Color(0xFF0891B2);          // Cyan 600
  static const Color infoLight = Color(0xFFCFFAFE);    // Cyan 100

  // ============================================
  // NEUTRAL COLORS
  // ============================================
  
  /// Text colors
  static const Color textPrimary = Color(0xFF111827);   // Gray 900
  static const Color textSecondary = Color(0xFF6B7280); // Gray 500
  static const Color textTertiary = Color(0xFF9CA3AF);  // Gray 400
  static const Color textInverse = Color(0xFFFFFFFF);   // White
  
  /// Surface colors
  static const Color surface = Color(0xFFFFFFFF);       // White
  static const Color surfaceSecondary = Color(0xFFF9FAFB); // Gray 50
  static const Color surfaceTertiary = Color(0xFFF3F4F6);  // Gray 100
  
  /// Background colors
  static const Color background = Color(0xFFF9FAFB);    // Gray 50
  static const Color backgroundDark = Color(0xFF111827); // Gray 900
  
  /// Border colors
  static const Color border = Color(0xFFE5E7EB);        // Gray 200
  static const Color borderFocused = primary;
  static const Color divider = Color(0xFFF3F4F6);       // Gray 100

  // ============================================
  // SPECIAL PURPOSE
  // ============================================
  
  /// Overlay for modals, drawers
  static const Color overlay = Color(0x80000000);       // Black 50%
  
  /// Disabled state
  static const Color disabled = Color(0xFFD1D5DB);      // Gray 300
  static const Color disabledText = Color(0xFF9CA3AF);  // Gray 400
  
  /// Shimmer loading
  static const Color shimmerBase = Color(0xFFE5E7EB);
  static const Color shimmerHighlight = Color(0xFFF9FAFB);
}
```

### Document in `design_system.md`:

```markdown
## 🎨 Colors

### Brand Colors
| Token | Usage | Hex |
|-------|-------|-----|
| `AppColors.primary` | Primary actions, links, focus | `#2563EB` |
| `AppColors.primaryLight` | Hover states, backgrounds | `#3B82F6` |
| `AppColors.primaryDark` | Pressed states | `#1D4ED8` |
| `AppColors.secondary` | Secondary actions, accents | `#7C3AED` |

### Semantic Colors
| Token | Usage | Hex |
|-------|-------|-----|
| `AppColors.success` | Success states, confirmations | `#16A34A` |
| `AppColors.successLight` | Success backgrounds | `#DCFCE7` |
| `AppColors.warning` | Warnings, caution states | `#D97706` |
| `AppColors.warningLight` | Warning backgrounds | `#FEF3C7` |
| `AppColors.error` | Errors, destructive actions | `#DC2626` |
| `AppColors.errorLight` | Error backgrounds | `#FEE2E2` |
| `AppColors.info` | Informational states | `#0891B2` |

### Text Colors
| Token | Usage | Hex |
|-------|-------|-----|
| `AppColors.textPrimary` | Primary text, headings | `#111827` |
| `AppColors.textSecondary` | Secondary text, labels | `#6B7280` |
| `AppColors.textTertiary` | Placeholder, hints | `#9CA3AF` |
| `AppColors.textInverse` | Text on dark backgrounds | `#FFFFFF` |

### Surface Colors
| Token | Usage | Hex |
|-------|-------|-----|
| `AppColors.surface` | Card backgrounds, modals | `#FFFFFF` |
| `AppColors.surfaceSecondary` | Alternate rows, sections | `#F9FAFB` |
| `AppColors.background` | Page backgrounds | `#F9FAFB` |
| `AppColors.border` | Borders, dividers | `#E5E7EB` |
```

---

## Token Category 2: Typography

### Template: `app_typography.dart`

```dart
import 'package:flutter/material.dart';

/// App typography - NEVER use raw TextStyle() elsewhere
abstract class AppTypography {
  static const String _fontFamily = 'Inter';  // Or your font
  
  // ============================================
  // DISPLAY - Hero text, splash screens
  // ============================================
  
  static const TextStyle displayLarge = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 57,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.25,
    height: 1.12,
  );
  
  static const TextStyle displayMedium = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 45,
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
    height: 1.16,
  );
  
  static const TextStyle displaySmall = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 36,
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
    height: 1.22,
  );

  // ============================================
  // HEADLINE - Section headers
  // ============================================
  
  static const TextStyle headlineLarge = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 32,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.25,
  );
  
  static const TextStyle headlineMedium = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 28,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.29,
  );
  
  static const TextStyle headlineSmall = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 24,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.33,
  );

  // ============================================
  // TITLE - Card titles, dialogs
  // ============================================
  
  static const TextStyle titleLarge = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 22,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.27,
  );
  
  static const TextStyle titleMedium = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.15,
    height: 1.50,
  );
  
  static const TextStyle titleSmall = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.43,
  );

  // ============================================
  // BODY - Main content
  // ============================================
  
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.5,
    height: 1.50,
  );
  
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.25,
    height: 1.43,
  );
  
  static const TextStyle bodySmall = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.4,
    height: 1.33,
  );

  // ============================================
  // LABEL - Buttons, tabs, chips
  // ============================================
  
  static const TextStyle labelLarge = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.43,
  );
  
  static const TextStyle labelMedium = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.5,
    height: 1.33,
  );
  
  static const TextStyle labelSmall = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 11,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.5,
    height: 1.45,
  );

  // ============================================
  // SPECIAL PURPOSE
  // ============================================
  
  /// Monospace for code, IDs
  static const TextStyle code = TextStyle(
    fontFamily: 'JetBrains Mono',
    fontSize: 14,
    fontWeight: FontWeight.w400,
    letterSpacing: 0,
    height: 1.43,
  );
  
  /// Overline for section labels
  static const TextStyle overline = TextStyle(
    fontFamily: _fontFamily,
    fontSize: 10,
    fontWeight: FontWeight.w600,
    letterSpacing: 1.5,
    height: 1.6,
  );
}
```

### Document in `design_system.md`:

```markdown
## 📝 Typography

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `AppTypography.displayLarge` | 57px | 400 | Hero text |
| `AppTypography.displayMedium` | 45px | 400 | Splash screens |
| `AppTypography.headlineLarge` | 32px | 600 | Page titles |
| `AppTypography.headlineMedium` | 28px | 600 | Section headers |
| `AppTypography.headlineSmall` | 24px | 600 | Card headers |
| `AppTypography.titleLarge` | 22px | 600 | Dialog titles |
| `AppTypography.titleMedium` | 16px | 600 | List item titles |
| `AppTypography.titleSmall` | 14px | 600 | Subtitles |
| `AppTypography.bodyLarge` | 16px | 400 | Main content |
| `AppTypography.bodyMedium` | 14px | 400 | Secondary content |
| `AppTypography.bodySmall` | 12px | 400 | Captions |
| `AppTypography.labelLarge` | 14px | 600 | Buttons |
| `AppTypography.labelMedium` | 12px | 600 | Chips, tabs |
| `AppTypography.labelSmall` | 11px | 600 | Badges |
| `AppTypography.code` | 14px | 400 | Code snippets |
| `AppTypography.overline` | 10px | 600 | Section labels |
```

---

## Token Category 3: Spacing

### Template: `app_spacing.dart`

```dart
import 'package:flutter/material.dart';

/// App spacing scale - NEVER use raw numbers for padding/margin
abstract class AppSpacing {
  // ============================================
  // BASE SCALE (4px increments)
  // ============================================
  
  static const double xxs = 2;   // 2px - minimal
  static const double xs = 4;    // 4px - tight
  static const double sm = 8;    // 8px - compact
  static const double md = 16;   // 16px - default
  static const double lg = 24;   // 24px - relaxed
  static const double xl = 32;   // 32px - spacious
  static const double xxl = 48;  // 48px - section gaps
  static const double xxxl = 64; // 64px - page sections

  // ============================================
  // SEMANTIC SPACING
  // ============================================
  
  /// Space between icon and text
  static const double iconGap = 8;
  
  /// Space between form fields
  static const double formGap = 16;
  
  /// Space between list items
  static const double listItemGap = 12;
  
  /// Space between cards
  static const double cardGap = 16;
  
  /// Page horizontal padding
  static const double pagePaddingH = 16;
  
  /// Page vertical padding
  static const double pagePaddingV = 24;

  // ============================================
  // EDGE INSETS (Convenience)
  // ============================================
  
  static const EdgeInsets insetXs = EdgeInsets.all(xs);
  static const EdgeInsets insetSm = EdgeInsets.all(sm);
  static const EdgeInsets insetMd = EdgeInsets.all(md);
  static const EdgeInsets insetLg = EdgeInsets.all(lg);
  static const EdgeInsets insetXl = EdgeInsets.all(xl);
  
  /// Standard card padding
  static const EdgeInsets cardPadding = EdgeInsets.all(md);
  
  /// Standard page padding
  static const EdgeInsets pagePadding = EdgeInsets.symmetric(
    horizontal: pagePaddingH,
    vertical: pagePaddingV,
  );
  
  /// Button padding
  static const EdgeInsets buttonPadding = EdgeInsets.symmetric(
    horizontal: md,
    vertical: sm,
  );

  // ============================================
  // GAPS (for Row/Column)
  // ============================================
  
  static const SizedBox gapXs = SizedBox(width: xs, height: xs);
  static const SizedBox gapSm = SizedBox(width: sm, height: sm);
  static const SizedBox gapMd = SizedBox(width: md, height: md);
  static const SizedBox gapLg = SizedBox(width: lg, height: lg);
  static const SizedBox gapXl = SizedBox(width: xl, height: xl);
  
  // Horizontal only
  static const SizedBox gapHXs = SizedBox(width: xs);
  static const SizedBox gapHSm = SizedBox(width: sm);
  static const SizedBox gapHMd = SizedBox(width: md);
  static const SizedBox gapHLg = SizedBox(width: lg);
  
  // Vertical only
  static const SizedBox gapVXs = SizedBox(height: xs);
  static const SizedBox gapVSm = SizedBox(height: sm);
  static const SizedBox gapVMd = SizedBox(height: md);
  static const SizedBox gapVLg = SizedBox(height: lg);
}
```

---

## Token Category 4: Radius, Shadows, Animations

### Template: `app_radius.dart`

```dart
import 'package:flutter/material.dart';

abstract class AppRadius {
  static const double none = 0;
  static const double xs = 2;
  static const double sm = 4;
  static const double md = 8;
  static const double lg = 12;
  static const double xl = 16;
  static const double xxl = 24;
  static const double full = 9999;  // Pill shape
  
  // BorderRadius convenience
  static final BorderRadius radiusNone = BorderRadius.circular(none);
  static final BorderRadius radiusXs = BorderRadius.circular(xs);
  static final BorderRadius radiusSm = BorderRadius.circular(sm);
  static final BorderRadius radiusMd = BorderRadius.circular(md);
  static final BorderRadius radiusLg = BorderRadius.circular(lg);
  static final BorderRadius radiusXl = BorderRadius.circular(xl);
  static final BorderRadius radiusXxl = BorderRadius.circular(xxl);
  static final BorderRadius radiusFull = BorderRadius.circular(full);
  
  // Common shapes
  static final BorderRadius card = radiusMd;
  static final BorderRadius button = radiusMd;
  static final BorderRadius input = radiusSm;
  static final BorderRadius chip = radiusFull;
  static final BorderRadius avatar = radiusFull;
  static final BorderRadius bottomSheet = BorderRadius.vertical(top: Radius.circular(xl));
}
```

### Template: `app_shadows.dart`

```dart
import 'package:flutter/material.dart';

abstract class AppShadows {
  /// No shadow
  static const List<BoxShadow> none = [];
  
  /// Subtle shadow - cards at rest
  static const List<BoxShadow> sm = [
    BoxShadow(
      color: Color(0x0D000000),  // 5% black
      blurRadius: 4,
      offset: Offset(0, 1),
    ),
  ];
  
  /// Default shadow - elevated cards
  static const List<BoxShadow> md = [
    BoxShadow(
      color: Color(0x1A000000),  // 10% black
      blurRadius: 8,
      offset: Offset(0, 2),
    ),
  ];
  
  /// Prominent shadow - modals, popovers
  static const List<BoxShadow> lg = [
    BoxShadow(
      color: Color(0x1A000000),
      blurRadius: 16,
      offset: Offset(0, 4),
    ),
    BoxShadow(
      color: Color(0x0D000000),
      blurRadius: 6,
      offset: Offset(0, 2),
    ),
  ];
  
  /// Heavy shadow - floating action buttons
  static const List<BoxShadow> xl = [
    BoxShadow(
      color: Color(0x26000000),  // 15% black
      blurRadius: 24,
      offset: Offset(0, 8),
    ),
  ];
  
  // Semantic aliases
  static const List<BoxShadow> card = sm;
  static const List<BoxShadow> cardHover = md;
  static const List<BoxShadow> modal = lg;
  static const List<BoxShadow> fab = xl;
}
```

### Template: `app_animations.dart`

```dart
import 'package:flutter/material.dart';

abstract class AppAnimations {
  // ============================================
  // DURATIONS
  // ============================================
  
  /// Instant feedback (ripples, highlights)
  static const Duration instant = Duration(milliseconds: 100);
  
  /// Quick transitions (tooltips, small changes)
  static const Duration fast = Duration(milliseconds: 200);
  
  /// Standard transitions (page changes, modals)
  static const Duration normal = Duration(milliseconds: 300);
  
  /// Deliberate animations (complex transitions)
  static const Duration slow = Duration(milliseconds: 400);
  
  /// Emphasis animations (celebrations, onboarding)
  static const Duration slower = Duration(milliseconds: 600);

  // ============================================
  // CURVES
  // ============================================
  
  /// Standard easing - most transitions
  static const Curve standard = Curves.easeInOut;
  
  /// Decelerate - entering elements
  static const Curve enter = Curves.easeOut;
  
  /// Accelerate - exiting elements
  static const Curve exit = Curves.easeIn;
  
  /// Bounce - playful interactions
  static const Curve bounce = Curves.elasticOut;
  
  /// Sharp - quick state changes
  static const Curve sharp = Curves.easeInOutCubic;

  // ============================================
  // COMMON ANIMATION CONFIGS
  // ============================================
  
  /// Page transition
  static const Duration pageTransition = normal;
  static const Curve pageTransitionCurve = standard;
  
  /// Modal/bottom sheet
  static const Duration modalTransition = normal;
  static const Curve modalTransitionCurve = enter;
  
  /// List item stagger delay
  static const Duration staggerDelay = Duration(milliseconds: 50);
  
  /// Loading spinner
  static const Duration spinnerRotation = Duration(milliseconds: 1000);
}
```

---

# Part 2: Reusable Components

## Component Library Structure

```
lib/shared/widgets/
├── buttons/
│   ├── app_button.dart          # Primary/Secondary/Text buttons
│   ├── app_icon_button.dart     # Icon-only buttons
│   └── app_fab.dart             # Floating action button
├── cards/
│   ├── app_card.dart            # Standard card container
│   ├── app_list_tile_card.dart  # Card with leading/trailing
│   └── app_info_card.dart       # Info/warning/error cards
├── inputs/
│   ├── app_text_field.dart      # Standard text input
│   ├── app_dropdown.dart        # Dropdown selector
│   ├── app_checkbox.dart        # Checkbox with label
│   └── app_switch.dart          # Toggle switch
├── feedback/
│   ├── loading_state.dart       # Loading spinner
│   ├── error_state.dart         # Error with retry
│   ├── empty_state.dart         # Empty list placeholder
│   └── app_snackbar.dart        # Snackbar messages
├── layout/
│   ├── app_scaffold.dart        # Standard page scaffold
│   ├── section_header.dart      # Section title with optional action
│   └── responsive_layout.dart   # Breakpoint-aware layout
└── index.dart                   # Barrel export
```

## Example Component: AppCard

```dart
import 'package:flutter/material.dart';
import 'package:your_app/core/theme/app_colors.dart';
import 'package:your_app/core/theme/app_radius.dart';
import 'package:your_app/core/theme/app_shadows.dart';
import 'package:your_app/core/theme/app_spacing.dart';

/// Standard card container - use instead of raw Card or Container
class AppCard extends StatelessWidget {
  const AppCard({
    super.key,
    required this.child,
    this.padding,
    this.onTap,
    this.color,
    this.elevation = AppCardElevation.sm,
  });

  final Widget child;
  final EdgeInsets? padding;
  final VoidCallback? onTap;
  final Color? color;
  final AppCardElevation elevation;

  @override
  Widget build(BuildContext context) {
    final card = Container(
      padding: padding ?? AppSpacing.cardPadding,
      decoration: BoxDecoration(
        color: color ?? AppColors.surface,
        borderRadius: AppRadius.card,
        boxShadow: elevation.shadow,
        border: Border.all(color: AppColors.border, width: 1),
      ),
      child: child,
    );

    if (onTap != null) {
      return Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: AppRadius.card,
          child: card,
        ),
      );
    }

    return card;
  }
}

enum AppCardElevation {
  none(AppShadows.none),
  sm(AppShadows.sm),
  md(AppShadows.md),
  lg(AppShadows.lg);

  const AppCardElevation(this.shadow);
  final List<BoxShadow> shadow;
}
```

## Example Component: LoadingState

```dart
import 'package:flutter/material.dart';
import 'package:your_app/core/theme/app_colors.dart';
import 'package:your_app/core/theme/app_spacing.dart';
import 'package:your_app/core/theme/app_typography.dart';

/// Standard loading state - use for all async loading
class LoadingState extends StatelessWidget {
  const LoadingState({
    super.key,
    this.message,
  });

  final String? message;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircularProgressIndicator(
            color: AppColors.primary,
            strokeWidth: 3,
          ),
          if (message != null) ...[
            AppSpacing.gapVMd,
            Text(
              message!,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
```

## Example Component: ErrorState

```dart
import 'package:flutter/material.dart';
import 'package:your_app/core/theme/app_colors.dart';
import 'package:your_app/core/theme/app_spacing.dart';
import 'package:your_app/core/theme/app_typography.dart';
import 'package:your_app/shared/widgets/buttons/app_button.dart';

/// Standard error state - use for all error displays
class ErrorState extends StatelessWidget {
  const ErrorState({
    super.key,
    required this.message,
    this.onRetry,
    this.icon,
  });

  final String message;
  final VoidCallback? onRetry;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: AppSpacing.pagePadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon ?? Icons.error_outline,
              size: 48,
              color: AppColors.error,
            ),
            AppSpacing.gapVMd,
            Text(
              message,
              style: AppTypography.bodyLarge.copyWith(
                color: AppColors.textSecondary,
              ),
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              AppSpacing.gapVLg,
              AppButton(
                label: 'Try Again',
                onPressed: onRetry,
                variant: AppButtonVariant.secondary,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

---

# Part 3: Utility Functions

## Formatters

### Template: `formatters.dart`

```dart
import 'package:intl/intl.dart';

/// Date/Time formatters - use these instead of creating new DateFormat instances
abstract class AppFormatters {
  // ============================================
  // DATE FORMATTERS
  // ============================================
  
  /// "Jan 15, 2025"
  static String dateShort(DateTime date) {
    return DateFormat.yMMMd().format(date);
  }
  
  /// "January 15, 2025"
  static String dateLong(DateTime date) {
    return DateFormat.yMMMMd().format(date);
  }
  
  /// "01/15/2025"
  static String dateNumeric(DateTime date) {
    return DateFormat('MM/dd/yyyy').format(date);
  }
  
  /// "Wednesday, January 15"
  static String dateFull(DateTime date) {
    return DateFormat.MMMMEEEEd().format(date);
  }

  // ============================================
  // TIME FORMATTERS
  // ============================================
  
  /// "3:45 PM"
  static String time(DateTime date) {
    return DateFormat.jm().format(date);
  }
  
  /// "15:45"
  static String time24(DateTime date) {
    return DateFormat.Hm().format(date);
  }
  
  /// "Jan 15, 3:45 PM"
  static String dateTime(DateTime date) {
    return DateFormat.yMMMd().add_jm().format(date);
  }

  // ============================================
  // RELATIVE TIME
  // ============================================
  
  /// "2 hours ago", "Yesterday", "Jan 15"
  static String timeAgo(DateTime date) {
    final now = DateTime.now();
    final diff = now.difference(date);
    
    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    if (diff.inDays < 2) return 'Yesterday';
    if (diff.inDays < 7) return '${diff.inDays}d ago';
    
    return dateShort(date);
  }
  
  /// "In 2 hours", "Tomorrow", "Jan 15"
  static String timeUntil(DateTime date) {
    final now = DateTime.now();
    final diff = date.difference(now);
    
    if (diff.isNegative) return timeAgo(date);
    if (diff.inMinutes < 1) return 'Now';
    if (diff.inMinutes < 60) return 'In ${diff.inMinutes}m';
    if (diff.inHours < 24) return 'In ${diff.inHours}h';
    if (diff.inDays < 2) return 'Tomorrow';
    if (diff.inDays < 7) return 'In ${diff.inDays}d';
    
    return dateShort(date);
  }

  // ============================================
  // NUMBER FORMATTERS
  // ============================================
  
  /// "1,234"
  static String number(num value) {
    return NumberFormat('#,##0').format(value);
  }
  
  /// "$1,234.56"
  static String currency(num value, {String symbol = '\$'}) {
    return NumberFormat.currency(symbol: symbol, decimalDigits: 2).format(value);
  }
  
  /// "1,234.5"
  static String decimal(num value, {int places = 1}) {
    return NumberFormat.decimalPatternDigits(decimalDigits: places).format(value);
  }
  
  /// "45%"
  static String percent(num value, {int places = 0}) {
    return NumberFormat.percentPattern().format(value);
  }
  
  /// "1.2K", "3.4M"
  static String compact(num value) {
    return NumberFormat.compact().format(value);
  }

  // ============================================
  // PHONE/TEXT FORMATTERS
  // ============================================
  
  /// "(555) 123-4567"
  static String phone(String value) {
    final digits = value.replaceAll(RegExp(r'\D'), '');
    if (digits.length != 10) return value;
    return '(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}';
  }
  
  /// "John D."
  static String nameInitial(String firstName, String lastName) {
    return '$firstName ${lastName.isNotEmpty ? '${lastName[0]}.' : ''}';
  }
  
  /// "JD"
  static String initials(String firstName, String lastName) {
    final first = firstName.isNotEmpty ? firstName[0].toUpperCase() : '';
    final last = lastName.isNotEmpty ? lastName[0].toUpperCase() : '';
    return '$first$last';
  }
}
```

### Document in `design_system.md`:

```markdown
## 🔧 Formatters

All formatters are in `lib/core/utils/formatters.dart`

### Date/Time
| Function | Input | Output |
|----------|-------|--------|
| `AppFormatters.dateShort(date)` | DateTime | "Jan 15, 2025" |
| `AppFormatters.dateLong(date)` | DateTime | "January 15, 2025" |
| `AppFormatters.time(date)` | DateTime | "3:45 PM" |
| `AppFormatters.dateTime(date)` | DateTime | "Jan 15, 3:45 PM" |
| `AppFormatters.timeAgo(date)` | DateTime | "2 hours ago" |
| `AppFormatters.timeUntil(date)` | DateTime | "In 2 hours" |

### Numbers
| Function | Input | Output |
|----------|-------|--------|
| `AppFormatters.number(1234)` | num | "1,234" |
| `AppFormatters.currency(1234.56)` | num | "$1,234.56" |
| `AppFormatters.percent(0.45)` | num | "45%" |
| `AppFormatters.compact(1234567)` | num | "1.2M" |

### Text
| Function | Input | Output |
|----------|-------|--------|
| `AppFormatters.phone('5551234567')` | String | "(555) 123-4567" |
| `AppFormatters.initials('John', 'Doe')` | String, String | "JD" |
```

---

# Part 4: CLAUDE.md Integration

## Design System Rules for CLAUDE.md

Add this section to your CLAUDE.md:

```markdown
# 🎨 DESIGN SYSTEM RULES

## BEFORE CREATING ANY UI:
1. Read `design_system.md` for available tokens and components
2. Check `lib/shared/widgets/` for existing components
3. NEVER use hardcoded values for colors, spacing, typography, or shadows

## TOKEN USAGE (MANDATORY):

### Colors
```dart
// ❌ FORBIDDEN
color: Color(0xFF2563EB)
color: Colors.blue

// ✅ REQUIRED
color: AppColors.primary
```

### Typography
```dart
// ❌ FORBIDDEN
style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)

// ✅ REQUIRED
style: AppTypography.titleMedium
```

### Spacing
```dart
// ❌ FORBIDDEN
padding: EdgeInsets.all(16)
SizedBox(height: 8)

// ✅ REQUIRED
padding: AppSpacing.insetMd
AppSpacing.gapVSm
```

### Radius
```dart
// ❌ FORBIDDEN
borderRadius: BorderRadius.circular(8)

// ✅ REQUIRED
borderRadius: AppRadius.md
```

### Shadows
```dart
// ❌ FORBIDDEN
boxShadow: [BoxShadow(blurRadius: 4, ...)]

// ✅ REQUIRED
boxShadow: AppShadows.sm
```

## COMPONENT USAGE (MANDATORY):

### Cards
```dart
// ❌ FORBIDDEN - creating new card containers
Container(
  decoration: BoxDecoration(color: Colors.white, borderRadius: ...),
  child: ...
)

// ✅ REQUIRED - use existing component
AppCard(child: ...)
```

### Loading States
```dart
// ❌ FORBIDDEN
CircularProgressIndicator()
Center(child: Text('Loading...'))

// ✅ REQUIRED
LoadingState()
LoadingState(message: 'Loading patients...')
```

### Error States
```dart
// ❌ FORBIDDEN - custom error UI
Column(children: [Icon(Icons.error), Text('Error')])

// ✅ REQUIRED
ErrorState(message: 'Failed to load', onRetry: _retry)
```

### Formatters
```dart
// ❌ FORBIDDEN
DateFormat('MMM d, yyyy').format(date)
'\$${amount.toStringAsFixed(2)}'

// ✅ REQUIRED
AppFormatters.dateShort(date)
AppFormatters.currency(amount)
```

## BEFORE CREATING A NEW COMPONENT:

1. Search `lib/shared/widgets/` - does something similar exist?
2. Can an existing component be extended or composed?
3. If truly new, create in `lib/shared/widgets/` with:
   - Uses design tokens (colors, spacing, typography)
   - Follows existing component patterns
   - Is generic/reusable, not feature-specific
   - Has clear documentation

## FORBIDDEN WITHOUT EXPLICIT APPROVAL:
- Magic numbers (raw color hex, pixel values)
- New loading/error/empty state implementations
- Inline styles that should be tokens
- Feature-specific components in shared/
- Duplicate functionality of existing utilities
```

---

# Part 5: Quick Reference Template

## `design_system.md` Template

Copy and customize this for your project:

```markdown
# Design System Reference

> Last updated: [DATE]
> This document is the source of truth for UI consistency.

---

## 🎨 Colors

### Brand
| Token | Usage | Preview |
|-------|-------|---------|
| `AppColors.primary` | Primary actions | 🟦 |
| `AppColors.secondary` | Secondary actions | 🟪 |

### Semantic
| Token | Usage | Preview |
|-------|-------|---------|
| `AppColors.success` | Success states | 🟢 |
| `AppColors.warning` | Warning states | 🟡 |
| `AppColors.error` | Error states | 🔴 |
| `AppColors.info` | Info states | 🔵 |

### Text
| Token | Usage |
|-------|-------|
| `AppColors.textPrimary` | Headings, primary text |
| `AppColors.textSecondary` | Secondary text, labels |
| `AppColors.textTertiary` | Placeholders, hints |

### Surfaces
| Token | Usage |
|-------|-------|
| `AppColors.surface` | Cards, modals |
| `AppColors.background` | Page backgrounds |
| `AppColors.border` | Borders, dividers |

---

## 📝 Typography

| Token | Size | Usage |
|-------|------|-------|
| `AppTypography.headlineLarge` | 32px | Page titles |
| `AppTypography.headlineMedium` | 28px | Section headers |
| `AppTypography.titleLarge` | 22px | Card titles |
| `AppTypography.titleMedium` | 16px | List item titles |
| `AppTypography.bodyLarge` | 16px | Main content |
| `AppTypography.bodyMedium` | 14px | Secondary content |
| `AppTypography.bodySmall` | 12px | Captions |
| `AppTypography.labelLarge` | 14px | Buttons |
| `AppTypography.labelSmall` | 11px | Badges |

---

## 📐 Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `AppSpacing.xs` | 4px | Tight spacing |
| `AppSpacing.sm` | 8px | Compact spacing |
| `AppSpacing.md` | 16px | Default spacing |
| `AppSpacing.lg` | 24px | Relaxed spacing |
| `AppSpacing.xl` | 32px | Section spacing |

### Presets
| Token | Usage |
|-------|-------|
| `AppSpacing.cardPadding` | Inside cards |
| `AppSpacing.pagePadding` | Page margins |
| `AppSpacing.gapVMd` | Vertical gap (16px) |
| `AppSpacing.gapHSm` | Horizontal gap (8px) |

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
| `AppShadows.md` | Elevated cards |
| `AppShadows.lg` | Modals, popovers |

---

## 🧱 Components

### Location: `lib/shared/widgets/`

| Component | File | Usage |
|-----------|------|-------|
| `AppCard` | `cards/app_card.dart` | Standard card container |
| `AppButton` | `buttons/app_button.dart` | Primary/secondary buttons |
| `AppTextField` | `inputs/app_text_field.dart` | Text input |
| `LoadingState` | `feedback/loading_state.dart` | Loading spinner |
| `ErrorState` | `feedback/error_state.dart` | Error with retry |
| `EmptyState` | `feedback/empty_state.dart` | Empty list placeholder |

---

## 🔧 Utilities

### Location: `lib/core/utils/`

| Function | File | Example Output |
|----------|------|----------------|
| `AppFormatters.dateShort()` | `formatters.dart` | "Jan 15, 2025" |
| `AppFormatters.timeAgo()` | `formatters.dart` | "2 hours ago" |
| `AppFormatters.currency()` | `formatters.dart` | "$1,234.56" |
| `AppFormatters.phone()` | `formatters.dart` | "(555) 123-4567" |

---

## ⚡ Animation

| Token | Duration | Usage |
|-------|----------|-------|
| `AppAnimations.fast` | 200ms | Tooltips, small changes |
| `AppAnimations.normal` | 300ms | Page transitions |
| `AppAnimations.slow` | 400ms | Complex animations |

| Curve | Usage |
|-------|-------|
| `AppAnimations.standard` | Most transitions |
| `AppAnimations.enter` | Elements appearing |
| `AppAnimations.exit` | Elements leaving |

---

## 📱 Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| Mobile | < 600px | Single column |
| Tablet | 600-1024px | Two columns |
| Desktop | > 1024px | Multi-column |

---

## ✅ Checklist for New UI

- [ ] Using `AppColors` not raw colors
- [ ] Using `AppTypography` not raw TextStyle
- [ ] Using `AppSpacing` not raw numbers
- [ ] Using `AppRadius` not raw BorderRadius
- [ ] Using `AppShadows` not raw BoxShadow
- [ ] Checked for existing components
- [ ] Using `AppFormatters` for dates/numbers
```

---

# Part 6: Mockup-First Workflow

## Why Mockup Before Implementing?

```
❌ WITHOUT MOCKUPS:
Developer: "Build me a patient list screen"
AI: *creates something with random styling*
Developer: "That's not what I wanted"
AI: *rewrites everything*
Developer: "Still wrong"
→ 3 hours wasted

✅ WITH MOCKUPS:
Developer: "Build me a patient list screen"
AI: "Here's a mockup first" *shows visual*
Developer: "Move the FAB, bigger cards"
AI: *updates mockup in 30 seconds*
Developer: "Perfect, now implement it"
→ 30 minutes total, correct result
```

## When to Request Mockups

### Always Request Mockup First

| Situation | Trigger Phrase |
|-----------|----------------|
| **New screen** | "Create a mockup for [SCREEN] before implementing" |
| **Complex layout** | "Show me a visual of how this would look" |
| **Multiple options** | "Mock up 2-3 layout options for [FEATURE]" |
| **Unsure about UX** | "What's the best way to display [DATA]?" |
| **Major changes** | "Before we refactor, show me the new design" |

### Quick Mockup Triggers

Train yourself to say these phrases:

```
🎨 "Before you code that, show me a mockup"
🎨 "What would this look like? Generate a preview"
🎨 "I'm not sure about the layout - mock it up first"
🎨 "Show me 2 options for how to display this"
🎨 "Generate a visual before implementing"
```

### Skip Mockups For

- Bug fixes that don't change UI
- Adding data fields to existing patterns
- Performance improvements
- Backend-only changes

---

## Mockup Request Templates

### Template 1: New Screen Mockup

```
Before implementing, generate a mockup for [SCREEN NAME].

This screen should:
- Purpose: [WHAT IT DOES]
- Data displayed: [LIST DATA]
- Actions available: [LIST ACTIONS]
- Navigation: User comes from [SCREEN], goes to [SCREENS]

Follow our design system:
- Use AppColors, AppTypography, AppSpacing
- Match our existing [SIMILAR SCREEN] styling
- Include realistic data, not placeholders

Show me the mockup first, then we'll implement.
```

### Template 2: Layout Options

```
I need to display [DATA/FEATURE] on the [SCREEN] screen.

Generate 2-3 mockup options showing different approaches:
- Option A: [APPROACH 1, e.g., "cards in a grid"]
- Option B: [APPROACH 2, e.g., "list with expandable items"]
- Option C: [APPROACH 3, e.g., "tabs with filtered views"]

For each option, show:
- How it looks with 1 item, 5 items, 20 items
- How it handles empty state
- Where the primary action lives

I'll pick the best one before we implement.
```

### Template 3: Component Preview

```
Before creating the [COMPONENT NAME] component, show me a mockup.

The component should:
- Purpose: [WHAT IT DISPLAYS/DOES]
- Variants needed: [e.g., "small, medium, large" or "primary, secondary"]
- States: default, hover, disabled, loading, error
- Responsive behavior: [HOW IT ADAPTS]

Match our design system tokens.
Show all variants and states in a single mockup.
```

### Template 4: User Flow Mockup

```
Mock up the complete flow for [USER ACTION].

Steps:
1. User starts at [SCREEN]
2. User taps [BUTTON/ELEMENT]
3. [INTERMEDIATE STEPS]
4. User sees [SUCCESS STATE]

Error paths:
- If [CONDITION], show [ERROR STATE]

Generate connected mockups showing each step.
Include transitions/animations notes if relevant.
```

---

## Adding Mockup Rules to CLAUDE.md

Add this to your CLAUDE.md to enforce mockup-first workflow:

```markdown
# 🎨 MOCKUP-FIRST WORKFLOW

## BEFORE IMPLEMENTING NEW UI:
When asked to create new screens or complex UI, ALWAYS:
1. Generate a mockup artifact first
2. Wait for approval before implementing
3. Reference the approved mockup during implementation

## TRIGGER PHRASES:
If the user asks for any of these, generate mockup FIRST:
- "Create a [screen/page/view]"
- "Add a new [feature] screen"
- "Build the UI for [feature]"
- "Implement [screen name]"

## MOCKUP REQUIREMENTS:
- Use design system tokens (AppColors, AppTypography, etc.)
- Include realistic data, not "Lorem ipsum"
- Show all states: default, empty, loading, error
- Match existing app styling

## EXCEPTION - Skip Mockups For:
- Bug fixes
- Adding fields to existing screens
- Backend-only work
- Explicitly told "no mockup needed"

## AFTER MOCKUP APPROVAL:
- Reference the mockup during implementation
- Call out any deviations from mockup
- Use exact colors/spacing from approved design
```

---

## Mockup Validation Checklist

Before approving a mockup, verify:

```
DESIGN SYSTEM COMPLIANCE:
- [ ] Uses AppColors (no hex codes visible)
- [ ] Typography matches our scale
- [ ] Spacing follows our grid
- [ ] Components match existing patterns

COMPLETENESS:
- [ ] Shows realistic data
- [ ] Empty state included
- [ ] Error state included
- [ ] Loading state included (if async)
- [ ] All interactive elements visible

CONSISTENCY:
- [ ] Matches other screens in the app
- [ ] Navigation is clear
- [ ] Actions are obvious
- [ ] Platform conventions followed

FEASIBILITY:
- [ ] Can be implemented with current components
- [ ] No impossible interactions
- [ ] Data requirements are clear
```

---

## When to Refresh Mockups

### During Development

Request updated mockups when:

| Trigger | Action |
|---------|--------|
| **Scope change** | "Feature changed - update the mockup" |
| **User feedback** | "Users said X - show me the new design" |
| **Technical constraint** | "Can't do X - what's the alternative?" |
| **Lost the vision** | "Remind me what we're building - regenerate mockup" |

### Motivation Boost

When energy is low during difficult coding sessions:

```
I've been debugging for hours and lost sight of the goal.
Regenerate the vision mockup for [FEATURE] to remind me what I'm building.
Make it polished - I need motivation to push through.
```

---

## Storing Mockup References

### Export and Save

```
.context/
└── mockups/
    ├── dashboard_v1.png
    ├── dashboard_v2_approved.png
    ├── patient_flow.png
    ├── settings.png
    └── mockup_log.md
```

### mockup_log.md Template

```markdown
# Mockup Log

## Dashboard
- v1: Initial design - rejected, too cluttered
- v2: Simplified with card layout - APPROVED 2025-01-15
- Implementation: Complete

## Patient List
- v1: Table layout - rejected, not mobile friendly
- v2: Card list with swipe actions - APPROVED 2025-01-16
- Implementation: In progress

## Settings
- v1: Approved 2025-01-14
- Implementation: Pending

## Pending Mockups Needed
- [ ] Notification preferences screen
- [ ] Export data flow
- [ ] Onboarding sequence
```

---

## Beyond Tokens: Enforcement Widgets

Design tokens tell the AI *what values to use*. Enforcement widgets make the *right thing automatic*. As your codebase grows, you'll find that even with perfect tokens, AI still creates inconsistency because it forgets to apply patterns.

### The Pattern: Wrapper Widgets

Instead of relying on AI to remember every convention, create wrapper widgets that enforce them:

```dart
// Instead of: "Always use SafeArea + Banner + correct padding"
// Create: AppScaffold that does it automatically

// Instead of: "Always wrap premium content with blur + upgrade prompt"
// Create: FeatureGate widget

// Instead of: "Always show loading/error/data states correctly"
// Create: AsyncValueWidget that handles all three
```

### Common Enforcement Widgets

| Widget | Enforces |
|--------|----------|
| `AppScaffold` | SafeArea, consistent padding, app chrome |
| `FeatureGate` | Premium content blur + upgrade prompt |
| `AsyncDataWrapper` | Loading/error/data state handling |
| `FormField` wrappers | Consistent validation, labels, error display |
| `CardContainer` | Elevation, border radius, spacing |

### CLAUDE.md Integration

Add enforcement rules to your CLAUDE.md:

```markdown
## Enforcement Widgets (MANDATORY)
- NEVER use Scaffold directly → Use AppScaffold
- NEVER hand-write loading/error states → Use AsyncDataWrapper
- NEVER create custom card layouts → Use CardContainer
- NEVER build premium gates manually → Use FeatureGate
```

### The Conversion Pattern (UX Polish Phase)

As you build, you'll notice one-off implementations that should be reusable:

1. **Identify**: "I've built 5 different selection UIs with 5 different patterns"
2. **Extract**: Create `ChoiceField` widget that handles all selection cases
3. **Convert**: Replace all 5 implementations with the new widget
4. **Enforce**: Add to CLAUDE.md so AI uses it going forward

**Measure success in negative LOC** — if your polish pass removes more lines than it adds while improving consistency, you're doing it right.

---

*This guide is part of The Vibe Coding Blueprint*
*Consistency is maintainability. Document your design system.*
