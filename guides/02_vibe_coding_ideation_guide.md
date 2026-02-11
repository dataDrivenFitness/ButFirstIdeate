# Ideation & Market Research Guide
## The Vibe Coding Blueprint - Pre-Development Guide

*Before you write a single line of code, validate that you're building something worth building.*

---

## 🚀 Two Ways to Use This Guide

### Option A: Conversational (Recommended)

Run the `vibe-ideate` script from the Scripts Guide:

```bash
./scripts/vibe-ideate
```

This starts a natural conversation where AI guides you through ideation, asks clarifying questions, and synthesizes your answers into a go/no-go recommendation.

### Option B: Prompt-by-Prompt

Follow the stages below, using the prompts as templates. Good for:
- Understanding what each stage covers
- Targeted exploration of specific topics
- When you prefer structured checklists

---

## 🎯 Overview

This guide walks you through the strategic thinking phase before development. Most failed apps fail not because of bad code, but because they solved problems nobody cared about or couldn't compete with existing solutions.

**Time Investment**: 2-5 hours of focused research
**Output**: Go/No-Go decision + validated concept document

---

## The 7-Stage Ideation Process

```
┌─────────────────────────────────────────────────────────────────┐
│  1. PAIN DISCOVERY                                              │
│     ↓                                                           │
│  2. EXISTING SOLUTION AUDIT                                     │
│     ↓                                                           │
│  3. GAP ANALYSIS                                                │
│     ↓                                                           │
│  4. OPPORTUNITY VALIDATION                                      │
│     ↓                                                           │
│  5. DIFFERENTIATION STRATEGY                                    │
│     ↓                                                           │
│  6. FEASIBILITY CHECK (includes Tech Stack Selection)           │
│     ↓                                                           │
│  ✅ GO  or  ❌ NO-GO                                            │
│     ↓ (if GO)                                                   │
│  7. APP VISION MOCKUPS  ← Visualize before you build!          │
└─────────────────────────────────────────────────────────────────┘
```

---

# Stage 1: Pain Discovery

## Purpose
Identify a real problem worth solving. The best app ideas come from personal frustration or observed inefficiencies.

## Sources of Valid Pain Points

| Source | Strength | Example |
|--------|----------|---------|
| **Personal Experience** | Highest - you feel it daily | "I use WellSky for nursing and it's terrible" |
| **Professional Observation** | High - you see others struggle | "Nurses at my agency waste 30 min/shift on paperwork" |
| **Industry Research** | Medium - validated by data | "70% of nurses report burnout from administrative tasks" |
| **Trend Spotting** | Medium - emerging needs | "15M Americans now on GLP-1 medications" |
| **Customer Complaints** | Medium - proven demand | "App Store reviews show users hate X feature" |

---

## AI Prompting: Pain Discovery

### Prompt 1: Personal Pain Exploration

```
I work as a [YOUR ROLE] and I'm frustrated with [TOOL/PROCESS/SITUATION].

Help me articulate this pain point by asking me:
1. What specific tasks are frustrating?
2. How often do I experience this frustration?
3. What workarounds do I currently use?
4. How much time/money does this problem cost me?
5. Who else experiences this same problem?

After I answer, help me write a clear problem statement.
```

### Prompt 2: Industry Pain Research

```
I'm exploring app opportunities in the [INDUSTRY] space.

Research and tell me:
1. What are the top 5 complaints professionals in this industry have about existing tools?
2. What inefficiencies or pain points are commonly discussed in industry forums/Reddit/social media?
3. What regulatory or workflow changes have created new problems recently?
4. What tasks do people in this industry hate doing?
5. Where is time/money being wasted?

Cite sources where possible and be specific about the severity of each problem.
```

### Prompt 3: Trend-Based Opportunity

```
I've noticed a trend: [DESCRIBE THE TREND - e.g., "millions of people are now on GLP-1 weight loss medications"]

Help me explore this as an app opportunity:
1. How many people are affected by this trend?
2. What new problems does this trend create?
3. What do these people need that doesn't exist yet?
4. Who is currently serving this audience and how well?
5. What's the growth trajectory of this trend?

Be realistic and cite data where possible.
```

---

## Self-Assessment Questions

Before proceeding, answer honestly:

| Question | Your Answer | Red Flag If... |
|----------|-------------|----------------|
| Do I personally experience this pain? | | "No, but I think others do" |
| How often does this problem occur? | | Less than weekly |
| What's the cost of this problem (time/money/stress)? | | Can't quantify it |
| Would I pay to solve this problem? | | "Probably not" |
| Do I know 10 people with this problem? | | Can't name them |

---

## Real Example: NurseOS

**Pain Source**: Personal experience using WellSky daily

**Pain Statement**: 
> "As a utilization review nurse, I spend excessive time on administrative tasks in WellSky. The interface is clunky, not mobile-friendly, and wasn't designed for how nurses actually work. I process 60 authorization requests per day and the current tools slow me down instead of helping me."

**Validation**: 
- Personal experience (11+ years in nursing)
- Observable in colleagues
- Quantifiable (time wasted per shift)
- High frequency (daily frustration)

---

## Stage 1 Output Template

```markdown
## Problem Statement

**The Problem**: [One sentence describing the core pain]

**Who Experiences It**: [Specific audience - be narrow]

**Frequency**: [How often this problem occurs]

**Current Cost**: [Time/money/stress this problem causes]

**My Connection**: [Why I understand this problem]

**Evidence**: [How I know this is real - personal, observed, researched]
```

---

# Stage 2: Existing Solution Audit

## Purpose
Understand what already exists. If great solutions exist, you need a compelling reason to build something new.

---

## AI Prompting: Competitive Research

### Prompt 4: Direct Competitor Discovery

```
I want to build an app that [DESCRIBE YOUR SOLUTION].

Research and provide:
1. A list of the top 10 existing apps/tools that solve this or similar problems
2. For each, tell me:
   - Name and company
   - Pricing model
   - App Store rating and review count
   - Key features
   - Target audience
   - Biggest user complaints (from reviews)
3. Which of these is the market leader and why?
4. Are there any that failed recently? Why?

Search app stores, Product Hunt, G2, Capterra, and industry publications.
```

### Prompt 5: Deep Competitor Analysis

```
Analyze [COMPETITOR NAME] as a potential competitor to my app idea.

Tell me:
1. Their exact pricing tiers
2. Their core features vs. premium features
3. What users love about them (from reviews)
4. What users hate about them (from reviews)
5. Their target customer
6. How long they've been in market
7. Their estimated user base or revenue
8. Recent updates or changes
9. Their apparent strategy/direction
10. Weaknesses I could exploit

Provide specific quotes from user reviews where relevant.
```

### Prompt 6: Indirect Competitor & Workaround Analysis

```
For someone experiencing [THE PROBLEM], what do they currently do if they don't use a dedicated app?

Research:
1. Manual workarounds (spreadsheets, paper, etc.)
2. General-purpose tools being misused for this
3. Combinations of tools people cobble together
4. Services (human-based) that solve this
5. The "do nothing" option - what happens if they ignore it?

Understanding workarounds reveals the true competition.
```

---

## Competitor Audit Template

| Competitor | Price | Rating | Users | Strengths | Weaknesses | My Advantage |
|------------|-------|--------|-------|-----------|------------|--------------|
| [Name 1] | | | | | | |
| [Name 2] | | | | | | |
| [Name 3] | | | | | | |
| [Name 4] | | | | | | |
| [Name 5] | | | | | | |

---

## Real Example: GLP-1 Protein App

| Competitor | Price | Rating | Strengths | Weaknesses | Our Advantage |
|------------|-------|--------|-----------|------------|---------------|
| MyFitnessPal | $20/mo | 4.6 | 14M food database | Overwhelming, not GLP-1 specific | Free, protein-only focus |
| Sequence | $99/mo | 4.2 | Medical integration | Expensive, no tracking | Free + product sales |
| Calibrate | $135/mo | 4.0 | Coaching included | Year commitment, pricey | No subscription |
| Foodvisor | $5/mo | 4.4 | AI photo scanning | Generic, not GLP-1 | GLP-1 timeline aware |

**Key Insight**: No free, GLP-1-specific, protein-focused app exists.

---

## Red Flags in Competitive Research

| Red Flag | What It Means |
|----------|---------------|
| 5+ well-funded competitors with 4.5+ ratings | Market may be saturated |
| Market leader is free | Hard to compete on price |
| Recent failures/shutdowns | Market may not support this |
| Low review counts across all competitors | Market may be too small |
| Competitors backed by industry giants | Difficult to outspend them |

## Green Lights in Competitive Research

| Green Light | What It Means |
|-------------|---------------|
| All competitors have major complaint themes | Clear improvement opportunity |
| No competitor serves your specific niche | White space exists |
| Competitors are old/outdated | Room for modern solution |
| Pricing is uniformly high | Room for disruption |
| Competitors solve adjacent problem, not yours | Direct opportunity |

---

# Stage 3: Gap Analysis

## Purpose
Identify specific gaps between what exists and what users actually need.

---

## AI Prompting: Gap Analysis

### Prompt 7: Feature Gap Matrix

```
Based on our competitor research for [APP CATEGORY], create a feature comparison matrix.

Columns: Top 5 competitors + "Ideal Solution"
Rows: All features mentioned in reviews as wanted/needed

For each cell, mark:
- ✅ = Has feature
- ⚠️ = Partial/poor implementation
- ❌ = Missing

Then identify the biggest gaps - features users want that no one provides well.
```

### Prompt 8: User Complaint Synthesis

```
Analyze the negative reviews (1-3 stars) for these apps: [LIST COMPETITORS]

Synthesize the complaints into categories:
1. Missing features
2. Poor user experience
3. Pricing complaints
4. Reliability/bugs
5. Customer support issues
6. Performance problems

For each category, give me:
- Frequency (how often mentioned)
- Severity (how angry are users)
- Solvability (can we fix this?)

Identify the top 3 gaps we could exploit.
```

### Prompt 9: Underserved Segment Discovery

```
For [PROBLEM SPACE], help me identify underserved user segments.

Research:
1. Who are the power users vs. casual users?
2. Are there demographic segments being ignored?
3. Are there use-case segments not served well?
4. Are there geographic markets overlooked?
5. Are there professional/industry niches underserved?

For each underserved segment:
- Estimate size
- Explain why they're underserved
- Describe what they specifically need
```

---

## Gap Analysis Framework

### The 5 Types of Gaps

| Gap Type | Description | Example |
|----------|-------------|---------|
| **Feature Gap** | Missing capability | "No app has AI photo scanning for protein" |
| **Audience Gap** | Underserved segment | "No app targets GLP-1 users specifically" |
| **Price Gap** | Over/underpriced market | "All solutions are $100+/month" |
| **Experience Gap** | Poor UX in existing tools | "WellSky isn't mobile-friendly" |
| **Integration Gap** | Doesn't connect to needed tools | "No app connects to gym check-ins" |

---

## Real Example: NurseOS Gaps from WellSky

| Gap Type | WellSky Problem | NurseOS Solution |
|----------|-----------------|------------------|
| Experience | Desktop-first, clunky | Mobile-first, nurse-friendly |
| Feature | No shift-centric patient view | Shift-based architecture |
| Feature | Manual patient assignments | Real-time assignment updates |
| Integration | Doesn't work with agency workflows | Built for agency operations |
| Audience | Built for hospitals, not agencies | Designed for staffing agencies |

---

## Stage 3 Output Template

```markdown
## Gap Analysis Summary

### Top 3 Gaps Identified

**Gap 1: [Name]**
- Type: [Feature/Audience/Price/Experience/Integration]
- Evidence: [How you know this gap exists]
- Severity: [High/Medium/Low]
- Our Solution: [How we'll fill this gap]

**Gap 2: [Name]**
- Type: 
- Evidence: 
- Severity: 
- Our Solution: 

**Gap 3: [Name]**
- Type: 
- Evidence: 
- Severity: 
- Our Solution: 

### White Space Statement
[One sentence describing the unfilled market position you'll occupy]
```

---

# Stage 4: Opportunity Validation

## Purpose
Size the market and validate that enough people care about solving this problem.

---

## AI Prompting: Market Validation

### Prompt 10: Market Sizing (TAM/SAM/SOM)

```
Help me size the market for [APP CONCEPT].

Calculate:
1. TAM (Total Addressable Market)
   - Everyone who could possibly use this
   - Include market size in dollars and users

2. SAM (Serviceable Addressable Market)
   - The segment we can realistically reach
   - Based on our specific features/positioning

3. SOM (Serviceable Obtainable Market)
   - What we can realistically capture in Year 1-3
   - Based on comparable company growth rates

For each, show your math and cite sources.
Be conservative - I want realistic numbers, not optimistic projections.
```

### Prompt 11: Demand Validation Research

```
Help me validate demand for [APP CONCEPT].

Research:
1. Search volume for related terms (if you can estimate)
2. Reddit/forum discussions about this problem
3. Social media conversations about this pain point
4. News articles about this trend/problem
5. Industry reports mentioning this need
6. Crowdfunding campaigns for similar products
7. Job postings that suggest this need exists

I want evidence that people actively seek solutions to this problem.
```

### Prompt 12: Willingness to Pay Assessment

```
For [APP CONCEPT], help me understand willingness to pay.

Research:
1. What do competitors charge?
2. What do users say about pricing in reviews?
3. What's the cost of the problem (if unsolved)?
4. What do adjacent products charge?
5. Are there price anchors in this market?

Help me determine:
- Price range users would accept
- Whether free + monetization works better than subscription
- Value-based pricing opportunities
```

---

## Market Validation Checklist

| Validation Point | Evidence Needed | Status |
|------------------|-----------------|--------|
| Market size > $1B TAM | Research data | ☐ |
| Growth rate > 10%/year | Industry reports | ☐ |
| Active online discussions | Reddit/forums/social | ☐ |
| People asking for solutions | Quora, reviews, forums | ☐ |
| Willingness to pay established | Competitor pricing | ☐ |
| Problem severity is high | User complaints | ☐ |
| Trend is growing, not shrinking | News, data | ☐ |

---

## Real Example: GLP-1 Protein App Market

| Metric | Value | Source |
|--------|-------|--------|
| TAM | $2.7B | 15M GLP-1 users × $180/year |
| SAM | $405M | 2.25M gym-going GLP-1 users |
| SOM (Year 1) | $2.6M | 5,000 active users × $520 LTV |
| Growth Rate | 40%/year | GLP-1 prescription trends |
| Demand Evidence | 500K+ r/Ozempic members | Reddit |

---

# Stage 5: Differentiation Strategy

## Purpose
Define your unique angle that makes your solution better than alternatives.

---

## AI Prompting: Differentiation

### Prompt 13: Positioning Statement Development

```
Based on our research, help me craft a positioning statement.

Use this framework:
"For [TARGET CUSTOMER] who [STATEMENT OF NEED], 
[PRODUCT NAME] is a [PRODUCT CATEGORY] that [KEY BENEFIT].
Unlike [COMPETITORS], we [KEY DIFFERENTIATOR]."

Give me 3 variations with different angles:
1. Feature-focused
2. Audience-focused  
3. Experience-focused

Then recommend which is strongest.
```

### Prompt 14: Competitive Moat Analysis

```
For my app concept [DESCRIBE IT], help me identify potential competitive moats.

Analyze these moat types:
1. Network Effects - does it get better with more users?
2. Data Advantage - do we accumulate valuable data?
3. Switching Costs - is it hard to leave once you start?
4. Brand/Trust - can we build reputation?
5. Cost Advantage - can we be cheaper sustainably?
6. Speed/First Mover - can we capture market before others?
7. Integration Depth - can we become embedded in workflows?

Be honest about which moats are realistic for a solo/small developer.
```

### Prompt 15: Unique Value Proposition

```
Synthesize everything we've discussed into a Unique Value Proposition.

Answer these questions:
1. What do we do better than anyone else?
2. What do we do that no one else does?
3. What do we NOT do that others waste time on?
4. Why should customers choose us over the market leader?
5. Why should customers choose us over doing nothing?

Give me a one-sentence UVP and a one-paragraph explanation.
```

---

## Differentiation Strategy Canvas

```
┌─────────────────────────────────────────────────────────────┐
│ ELIMINATE                    │ RAISE                        │
│ (What industry takes for     │ (What should we do WAY       │
│ granted that we should       │ better than competition?)    │
│ remove?)                     │                              │
│                              │                              │
│ - [Feature/practice 1]       │ - [Feature/practice 1]       │
│ - [Feature/practice 2]       │ - [Feature/practice 2]       │
├──────────────────────────────┼──────────────────────────────┤
│ REDUCE                       │ CREATE                       │
│ (What should we do LESS      │ (What should we offer that   │
│ than competition?)           │ NO ONE else does?)           │
│                              │                              │
│ - [Feature/practice 1]       │ - [Feature/practice 1]       │
│ - [Feature/practice 2]       │ - [Feature/practice 2]       │
└─────────────────────────────────────────────────────────────┘
```

---

## Real Example: GLP-1 App Differentiation

| Strategy | Competitors | Our Approach |
|----------|-------------|--------------|
| **Eliminate** | Calorie counting | Protein-only focus |
| **Eliminate** | Subscription fees | Free forever |
| **Reduce** | Complex food database | Simple, curated options |
| **Raise** | Generic nutrition advice | GLP-1-specific guidance |
| **Create** | Nothing | Direct product commerce |
| **Create** | Nothing | Medication timeline awareness |

**UVP**: "The only free app that helps GLP-1 users track protein and delivers products directly - because people on Ozempic don't need calorie counting, they need muscle preservation."

---

# Stage 6: Feasibility Check

## Purpose
Honestly assess whether YOU can build this, right now, with the right technology choices.

---

## Part A: Tech Stack Selection

### Why This Decision Matters

The wrong tech stack can:
- Double your development time
- Limit your platform reach
- Create maintenance nightmares
- Make hiring difficult later
- Force a complete rewrite

**Choose based on YOUR situation, not hype.**

---

### The Tech Stack Decision Framework

Answer these questions honestly:

#### 1. Platform Requirements

| Question | Impact |
|----------|--------|
| Which platforms must you support? | Determines native vs cross-platform |
| Is web a requirement? | Some frameworks handle web better |
| Desktop needed? | Narrows options significantly |
| Must they share codebase? | Rules out native development |

**Decision Matrix:**

| Platforms Needed | Best Options |
|------------------|--------------|
| iOS only | Swift/SwiftUI (native) |
| Android only | Kotlin/Jetpack Compose (native) |
| iOS + Android | Flutter, React Native, or Native |
| iOS + Android + Web | Flutter, React Native Web |
| All + Desktop | Flutter (best), Electron + React |

#### 2. Your Current Skills

| Your Background | Easiest Path |
|-----------------|--------------|
| **Web developer (JS/TS)** | React Native |
| **No mobile experience** | Flutter (easier learning curve) |
| **iOS developer (Swift)** | Native iOS, then add Android |
| **Android developer (Kotlin)** | Native Android, then add iOS |
| **Python/Backend only** | Flutter (Dart is approachable) |
| **Complete beginner** | Flutter (best docs, hot reload) |

**Critical Question:** Can you ship an MVP with this tech in 3 months?

#### 3. App Complexity Requirements

| App Type | Recommended Stack |
|----------|-------------------|
| **Simple CRUD app** | Any framework works |
| **Heavy animations/custom UI** | Flutter (best), Native |
| **Complex native features** | Native, or Flutter with plugins |
| **Real-time/chat** | Any (Firebase handles this) |
| **AR/VR/Camera heavy** | Native (best), Flutter (good) |
| **Offline-first** | Flutter, Native |
| **Payment processing** | Any (Stripe SDK available everywhere) |
| **Healthcare/HIPAA** | Any (compliance is about backend) |

#### 4. Performance Requirements

| Requirement | Recommendation |
|-------------|----------------|
| **Must feel "native"** | Native or Flutter |
| **Heavy animations (60fps)** | Flutter or Native |
| **Large lists/data** | Flutter or Native |
| **Gaming/graphics** | Native with game engine |
| **Standard business app** | Any framework fine |

#### 5. Long-term Considerations

| Factor | Flutter | React Native | Native |
|--------|---------|--------------|--------|
| **Hiring pool** | Growing | Large | Largest |
| **Job market** | Hot | Stable | Always needed |
| **Corporate adoption** | Rising fast | Established | Standard |
| **Google/Apple support** | Google backs it | Community + Meta | First-party |
| **Breaking changes** | Occasional | Frequent | Platform-tied |
| **Long-term viability** | Strong | Strong | Guaranteed |

---

### AI Prompt: Tech Stack Selection

#### Prompt 14: Tech Stack Recommendation

```
Help me choose the right tech stack for my mobile app.

MY SITUATION:
- App concept: [DESCRIBE YOUR APP]
- Target platforms: [iOS / Android / Web / Desktop]
- My background: [YOUR DEVELOPMENT EXPERIENCE]
- Time to MVP: [TARGET TIMELINE]
- Budget: [$ AVAILABLE]
- Team: [SOLO / SMALL TEAM / WILL HIRE]

APP REQUIREMENTS:
- Native features needed: [Camera, GPS, Bluetooth, Push notifications, etc.]
- Offline capability: [Required / Nice to have / Not needed]
- Performance sensitivity: [High / Medium / Low]
- UI complexity: [Custom animations / Standard UI / Simple forms]
- Backend: [Firebase / Supabase / Custom / Not decided]

MY CONSTRAINTS:
- Must ship in [X] months
- Skill gaps I have: [LIST THEM]
- Technologies I refuse to use: [IF ANY]

Based on this, recommend:
1. Your top tech stack recommendation with reasoning
2. A backup option if my first choice doesn't work
3. What I should learn first before starting
4. Realistic timeline assessment with this stack
5. Potential pitfalls to watch for

Be direct. Tell me if my timeline or expectations are unrealistic.
```

#### Prompt 15: Tech Stack Comparison

```
Compare these tech stacks for my specific use case:

OPTIONS I'M CONSIDERING:
- Option A: [e.g., Flutter + Firebase]
- Option B: [e.g., React Native + Supabase]
- Option C: [e.g., Native Swift/Kotlin]

MY APP: [BRIEF DESCRIPTION]
MY SKILLS: [YOUR BACKGROUND]
MY TIMELINE: [TARGET]

For each option, give me:
1. Time to MVP (realistic)
2. Learning curve for ME specifically
3. Biggest risks/challenges
4. Long-term maintenance burden
5. Cost implications
6. Deal-breakers I should know about

End with a clear recommendation and your confidence level.
```

---

### Flutter vs React Native vs Native: Honest Comparison

#### Choose Flutter When:
- ✅ You want one codebase for iOS + Android + Web
- ✅ You value beautiful, custom UI
- ✅ You're learning mobile development fresh
- ✅ You want fast iteration (hot reload is amazing)
- ✅ You prefer strongly-typed languages (Dart)
- ✅ Google ecosystem alignment (Firebase, Material)

#### Choose React Native When:
- ✅ You're already a JavaScript/TypeScript developer
- ✅ Your team knows React
- ✅ You need to share code with a React web app
- ✅ You want access to the npm ecosystem
- ✅ You're hiring from a web developer pool

#### Choose Native (Swift/Kotlin) When:
- ✅ Performance is absolutely critical (games, AR)
- ✅ You need cutting-edge platform features immediately
- ✅ You're building for only one platform
- ✅ You have budget for two development tracks
- ✅ You're building for enterprise with native requirements
- ✅ Long-term maintenance by platform specialists

---

### The Solo Developer Recommendation

If you're a **solo developer building an MVP**, here's the honest truth:

| Situation | Recommendation | Why |
|-----------|----------------|-----|
| **No mobile experience** | **Flutter** | Fastest to productivity, best docs |
| **JS/React background** | React Native or Flutter | RN if deadline tight, Flutter if time to learn |
| **Backend developer** | **Flutter** | Dart is easy to pick up |
| **iOS developer wanting Android** | **Flutter** | Faster than learning Kotlin |
| **Android developer wanting iOS** | **Flutter** | Faster than learning Swift |

**The uncomfortable truth:** For most apps, the tech stack matters less than shipping. Pick something and commit.

---

### Tech Stack Red Flags

🚩 **Avoid if you see these patterns:**

| Red Flag | Why It's Dangerous |
|----------|-------------------|
| "Let's use microservices for MVP" | Over-engineering |
| "We need Kubernetes from day 1" | Premature scaling |
| "Native for both platforms" (solo dev) | You'll never ship |
| "Let's build our own auth" | Security nightmare |
| "We'll migrate to X later" | You probably won't |
| "This new framework looks cool" | Immature ecosystem |

---

### Tech Stack Decision Checklist

Before committing, verify:

```
MUST HAVE:
- [ ] I can build an MVP in 3 months with this stack
- [ ] Tutorials and documentation are abundant
- [ ] The framework is actively maintained
- [ ] Required native features have plugins/packages
- [ ] I can find answers when stuck (Stack Overflow, Discord, etc.)

NICE TO HAVE:
- [ ] I've built a small test project with it
- [ ] I know someone who can help if I get stuck
- [ ] Job opportunities exist if I want to pivot
- [ ] The community is welcoming to beginners

DEAL BREAKERS:
- [ ] No recent updates (abandoned project)
- [ ] Critical features require native code I can't write
- [ ] Locked into a vendor with no exit path
- [ ] Licensing issues for commercial use
```

---

## Part B: Complexity Classification

### Why This Matters

Your app's complexity determines how much architecture you need. This affects:
- How AI should generate code
- Whether abstractions are appropriate
- Testing requirements
- File structure decisions

**Classify before you start coding.** This goes into your CLAUDE.md.

---

### The Three Complexity Levels

```
┌─────────────────────────────────────────────────────────────────┐
│  🟢 SIMPLE                                                      │
│                                                                 │
│  Characteristics:                                               │
│  • Single user or simple auth                                   │
│  • Local storage or basic cloud (Firebase)                      │
│  • No compliance requirements                                   │
│  • No offline/sync requirements                                 │
│  • Straightforward CRUD operations                              │
│                                                                 │
│  Examples: Todo app, personal tracker, portfolio, notes app,    │
│  habit tracker, simple game, recipe book                        │
│                                                                 │
│  Architecture: Concrete classes only                            │
│  • Screen → Provider → Service (3 layers max)                   │
│  • No interfaces or abstract classes                            │
│  • No repository pattern needed                                 │
│  • Maximum 3-4 files per feature                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🟡 MODERATE                                                    │
│                                                                 │
│  Characteristics:                                               │
│  • Multi-user with authentication                               │
│  • Data relationships between entities                          │
│  • Some offline capability needed                               │
│  • Unit testing important for business logic                    │
│  • May need mock data for development                           │
│                                                                 │
│  Examples: Social app, booking system, team collaboration,      │
│  e-commerce, content management, scheduling app                 │
│                                                                 │
│  Architecture: Selective abstractions                           │
│  • Screen → Provider → Repository → DataSource                  │
│  • Abstract data sources for testing                            │
│  • Interfaces only where you'll have 2+ implementations         │
│  • Repository pattern for data access                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🔴 COMPLEX                                                     │
│                                                                 │
│  Characteristics:                                               │
│  • Compliance requirements (HIPAA, GDPR, PCI, SOC2)             │
│  • Audit trails required                                        │
│  • Multiple data sources with sync                              │
│  • Platform-specific implementations                            │
│  • Extensive test coverage for certification                    │
│  • Security-critical operations                                 │
│                                                                 │
│  Examples: Healthcare apps, financial apps, enterprise tools,   │
│  apps handling children's data, legal/compliance tools          │
│                                                                 │
│  Architecture: Justified abstractions                           │
│  • Abstract data sources (Firestore, local cache, mock)         │
│  • Abstract auth providers (multiple auth methods)              │
│  • Audit logging interfaces                                     │
│  • Platform service abstractions                                │
│  • Full repository pattern                                      │
│  • Each abstraction must be documented with WHY                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Classification Decision Tree

Answer these questions in order. Stop at the first "Yes":

```
1. Does your app handle protected data?
   • Health information (HIPAA)
   • Financial data (PCI-DSS)
   • Children's data (COPPA)
   • EU personal data (GDPR)
   
   → YES = 🔴 COMPLEX
   → NO = Continue...

2. Do you need audit trails for compliance or legal reasons?
   
   → YES = 🔴 COMPLEX
   → NO = Continue...

3. Do you need certification or third-party security audits?
   
   → YES = 🔴 COMPLEX
   → NO = Continue...

4. Do you need offline mode with cloud sync?
   
   → YES = 🟡 MODERATE (minimum)
   → NO = Continue...

5. Will you have multiple data sources? (local + cloud + external API)
   
   → YES = 🟡 MODERATE
   → NO = Continue...

6. Do you need extensive unit testing for business logic?
   
   → YES = 🟡 MODERATE
   → NO = Continue...

7. Is this a multi-user app with complex data relationships?
   
   → YES = 🟡 MODERATE
   → NO = 🟢 SIMPLE
```

---

### Prompt 16: Complexity Classification

```
Help me classify my app's complexity level.

My app: [DESCRIBE YOUR APP]

It will handle these types of data: [LIST DATA TYPES]

Compliance/regulatory requirements: [HIPAA/GDPR/PCI/NONE/UNSURE]

Please classify as:
- 🟢 SIMPLE (concrete classes only, no abstractions)
- 🟡 MODERATE (selective abstractions for testing)
- 🔴 COMPLEX (justified abstractions for compliance/scale)

Explain your reasoning and what this means for my architecture.
```

---

### What Your Classification Means

| Level | AI Behavior | Abstractions | Testing |
|-------|-------------|--------------|---------|
| 🟢 Simple | "Never create interfaces" | None | Basic widget tests |
| 🟡 Moderate | "Abstract only data sources" | DataSource interfaces | Unit + widget tests |
| 🔴 Complex | "Document each abstraction" | Full patterns allowed | Comprehensive suite |

### Record Your Classification

```markdown
## My App Classification

**App Name**: _______________
**Classification**: 🟢 / 🟡 / 🔴

**Reasoning**:
- [ ] Handles protected data: Yes / No
- [ ] Requires audit trails: Yes / No
- [ ] Needs compliance certification: Yes / No
- [ ] Requires offline sync: Yes / No
- [ ] Multiple data sources: Yes / No
- [ ] Complex data relationships: Yes / No

**Architecture implications**:
_________________________________
```

**This classification goes into your CLAUDE.md and architecture.md files.**

---

## Part C: Technical Feasibility Assessment

### Prompt 17: Technical Feasibility Assessment

```
For my app concept [DESCRIBE IT], assess technical feasibility.

Consider:
1. What are the core technical components needed?
2. Which require specialized expertise?
3. What third-party services/APIs are required?
4. What are the biggest technical risks?
5. What's a realistic development timeline for MVP?

Be honest about difficulty. I'm a [DESCRIBE YOUR SKILL LEVEL] developer.
```

### Prompt 18: Resource Reality Check

```
Help me create a realistic resource assessment for building [APP CONCEPT].

I have:
- Development time available: [X hours/week]
- Budget: [$X]
- Technical skills: [DESCRIBE]
- Domain expertise: [DESCRIBE]
- Network/connections: [DESCRIBE]

Tell me honestly:
1. Can I build an MVP with these resources?
2. What would I need to outsource?
3. What are the must-have vs. nice-to-have features?
4. What's a realistic timeline?
5. What could go wrong?
```

### Prompt 19: Go/No-Go Decision Framework

```
Based on everything we've discussed about [APP CONCEPT], help me make a Go/No-Go decision.

Create a scorecard:

OPPORTUNITY FACTORS (1-10):
- Problem severity: 
- Market size:
- Competition weakness:
- Differentiation strength:
- Timing:

FEASIBILITY FACTORS (1-10):
- Technical complexity:
- Resource match:
- Domain expertise:
- Speed to market:
- Risk level:

Calculate an overall score and give me a clear recommendation:
- Strong Go (score > 70)
- Conditional Go (score 50-70) with specific conditions
- No-Go (score < 50) with explanation

Be honest. I'd rather kill a bad idea now than waste months building it.
```

---

## Personal Feasibility Checklist

| Factor | Question | Your Answer |
|--------|----------|-------------|
| **Skills** | Can I build the core MVP myself? | |
| **Time** | Can I dedicate 10+ hours/week for 3+ months? | |
| **Money** | Can I cover hosting/services for 12 months? | |
| **Domain** | Do I deeply understand the problem? | |
| **Access** | Can I reach potential users for feedback? | |
| **Motivation** | Will I still care about this in 6 months? | |
| **Competition** | Can I ship before market conditions change? | |

---

## Go/No-Go Decision Matrix

### 🟢 GO Signals
- [ ] Problem is severe and frequent
- [ ] Market is large enough ($1B+ TAM)
- [ ] Clear differentiation exists
- [ ] You have domain expertise
- [ ] Technical requirements match your skills
- [ ] You can reach target users
- [ ] Timeline is realistic

### 🔴 NO-GO Signals
- [ ] Problem is "nice to have" not "must solve"
- [ ] Market is too small or shrinking
- [ ] Well-funded competitors dominate
- [ ] You don't understand the users
- [ ] Technical requirements exceed your abilities
- [ ] No path to reaching customers
- [ ] Would take 2+ years to build MVP

### 🟡 CONDITIONAL GO (Pivot Needed)
- [ ] Good problem, wrong solution → Reconsider approach
- [ ] Good solution, wrong audience → Find better niche
- [ ] Good concept, wrong timing → Wait or find partner
- [ ] Good idea, wrong founder → Partner or license

---

# Final Output: Validated Concept Document

After completing all 6 stages, compile this document:

```markdown
# Validated Concept: [APP NAME]

## Executive Summary
[2-3 sentences describing the opportunity]

## Problem Statement
[Clear articulation of the pain point]

## Target User
[Specific description of primary user]

## Market Opportunity
- TAM: $[X]
- SAM: $[X]
- SOM Year 1: $[X]
- Growth Rate: [X]%

## Competitive Landscape
[Top 3 competitors and their weaknesses]

## Our Differentiation
[Unique Value Proposition - one sentence]

## Key Gaps We Fill
1. [Gap 1]
2. [Gap 2]
3. [Gap 3]

## Feasibility Assessment
- Technical Complexity: [Low/Medium/High]
- Time to MVP: [X weeks/months]
- Required Budget: $[X]
- Key Risks: [List]

## Go/No-Go Decision
[✅ GO | 🟡 CONDITIONAL | ❌ NO-GO]

## Conditions/Next Steps
[If conditional, what needs to happen]
[If go, what's the first action]

---
*Document created: [DATE]*
*Decision made: [DATE]*
```

---

# Appendix: Quick Reference Prompts

## The Essential 7 Prompts

If you're short on time, use these 7 prompts in sequence:

### 1. Problem Validation
```
I'm considering building an app for [AUDIENCE] that solves [PROBLEM]. 
Before I invest time, help me validate this is worth solving.
Ask me 5 tough questions about this problem, then assess if it's worth pursuing.
```

### 2. Competitor Scan
```
What apps/tools currently exist for [PROBLEM]? 
List the top 5 with pricing, ratings, and main complaints from users.
Be thorough - I need to know what I'm up against.
```

### 3. Gap Identification
```
Based on the competitors for [PROBLEM], what's missing?
What do users consistently complain about?
Where is the white space I could fill?
```

### 4. Market Reality
```
How big is the market for [SOLUTION]?
Give me realistic numbers for TAM/SAM/SOM.
Is this market growing or shrinking? Cite sources.
```

### 5. Go/No-Go
```
I'm a [SKILL LEVEL] developer with [X hours/week] and $[BUDGET].
Based on everything we discussed about [APP CONCEPT], should I build this?
Give me a clear YES, NO, or MAYBE with specific reasoning.
```

### 6. Tech Stack Selection (After GO Decision)
```
Help me choose the right tech stack for [APP NAME].

My situation:
- Platforms needed: [iOS / Android / Web]
- My background: [YOUR EXPERIENCE - e.g., "web developer", "backend only", "complete beginner"]
- Timeline: [MONTHS TO MVP]
- Team: [Solo / Small team]

App needs:
- Native features: [Camera, GPS, Bluetooth, etc.]
- Offline capability: [Yes/No]
- UI complexity: [Custom animations / Standard / Simple]

Compare Flutter vs React Native vs Native for MY specific situation.
Give me a clear recommendation with reasoning.
Be honest if my timeline is unrealistic with any option.
```

### 7. Vision Mockups (After Tech Stack Decision)
```
I've decided to build [APP NAME] using [TECH STACK].

Before I write any code, generate mockups for:
1. Dashboard/Home screen with key metrics and navigation
2. Primary feature flow (list → detail → action → success)
3. Empty states for main screens (new user experience)
4. Settings/profile screen

Style: [Modern minimal / Professional / Playful]
Platform: [iOS / Android / Web]
Similar apps for reference: [APPS YOU LIKE]

Use realistic data and consistent styling throughout.
This will be my visual reference and motivation throughout development.
```

---

# Stage 7: App Vision Mockups

## Purpose

Before writing a single line of code, **see your app**. This isn't about pixel-perfect design—it's about:

1. **Motivation** - Having a visual reference keeps you going during hard debugging sessions
2. **Alignment** - Ensuring you and AI share the same mental model
3. **Decisions** - Forcing you to think through user flows before implementation
4. **Consistency** - Establishing visual patterns before code creates them ad-hoc

> "I can't tell you how many times I've looked at my mockups at 2am debugging Firebase rules and thought 'THIS is what I'm building.' It keeps you going." — Every solo developer ever

---

## What to Mock Up

### Core Screens (Required)

At minimum, create mockups for:

| Screen | Why It Matters |
|--------|----------------|
| **Home/Dashboard** | The first thing users see - sets the tone |
| **Primary Action Flow** | The main thing your app does (3-5 screens) |
| **Empty States** | What users see before they have data |
| **Settings/Profile** | Often forgotten, but needed early |
| **Onboarding** | First impression screens |

### User Flows (Recommended)

Mock up the complete flow for your top 3 user journeys:

```
Example: NurseOS Patient Management Flow
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Shift   │ →  │ Patient  │ →  │  Task    │ →  │  Task    │
│  List    │    │  List    │    │  Detail  │    │ Complete │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## AI Prompts: App Vision Mockups

### Prompt 20: Complete App Mockup Suite

```
I'm building [APP NAME] - [ONE LINE DESCRIPTION].

Target users: [WHO]
Primary use case: [WHAT THEY DO]
Platform: [iOS/Android/Web]
Style preference: [Modern minimal / Professional / Playful / etc.]

Generate React/HTML mockups for my core screens:

1. HOME/DASHBOARD
   - What data is shown
   - Primary actions available
   - Navigation elements

2. [PRIMARY FEATURE] FLOW
   - List view
   - Detail view
   - Action/edit view
   - Confirmation/success view

3. EMPTY STATES
   - Empty dashboard (new user)
   - Empty list (no items yet)
   - Error state
   - Loading state

4. SETTINGS/PROFILE
   - User preferences
   - Account management

5. ONBOARDING (if applicable)
   - Welcome screen
   - Key feature highlights
   - Setup steps

For each screen:
- Use consistent colors, spacing, typography
- Include realistic placeholder data
- Show all interactive elements
- Make it feel like a real app, not a wireframe

Start with the dashboard/home screen and I'll provide feedback before continuing.
```

### Prompt 21: Single Screen Deep Dive

```
Create a detailed mockup for my [SCREEN NAME] screen.

Context:
- App: [APP NAME]
- This screen's purpose: [WHAT IT DOES]
- User arrives here from: [PREVIOUS SCREEN]
- User goes next to: [NEXT SCREENS]

Data to display:
- [List the data elements]

Actions available:
- [List user actions]

States to show:
- Default (with data)
- Empty (no data)
- Loading
- Error

Match my app's style:
- Primary color: [COLOR]
- Style: [STYLE DESCRIPTION]
- Similar apps for reference: [APPS]

Generate a React artifact with realistic data and all interactive elements visible.
```

### Prompt 22: User Flow Visualization

```
Create a connected mockup flow for [USER JOURNEY NAME].

The flow:
1. User starts at: [SCREEN]
2. User wants to: [GOAL]
3. Steps involved:
   - Step 1: [ACTION] → [RESULT]
   - Step 2: [ACTION] → [RESULT]
   - Step 3: [ACTION] → [RESULT]
4. Success state: [WHAT USER SEES]

Generate mockups for each step, showing:
- What the user sees
- What they tap/click
- What happens next
- Success/error states

Make each screen feel connected - same styling, clear progression.
```

### Prompt 23: Design System Extraction

```
Based on the mockups we've created for [APP NAME], extract a design system:

1. COLORS
   - Primary, secondary colors used
   - Semantic colors (success, error, warning)
   - Background and surface colors
   - Text colors

2. TYPOGRAPHY
   - Heading sizes used
   - Body text sizes
   - Font weights

3. SPACING
   - Padding patterns used
   - Margin patterns used
   - Gap sizes

4. COMPONENTS
   - Cards (how they look)
   - Buttons (variants)
   - Input fields
   - List items

Format this as a design_system.md reference I can use during development.
```

---

## Mockup Best Practices

### DO ✅

| Practice | Why |
|----------|-----|
| Use realistic data | "John Smith, 45, Diabetes" not "User 1" |
| Show all states | Empty, loading, error, success |
| Include navigation | How do users move between screens? |
| Match platform conventions | iOS ≠ Android ≠ Web patterns |
| Keep mockups accessible | Save them where you'll see them |
| Iterate before coding | Cheaper to change mockups than code |

### DON'T ❌

| Anti-Pattern | Why It Hurts |
|--------------|--------------|
| Skip empty states | You'll forget them during dev |
| Use lorem ipsum | Can't evaluate if layout works |
| Ignore error states | They happen more than you think |
| Make pixel-perfect art | You'll waste time on details that change |
| Create once and forget | Mockups should evolve with understanding |

---

## Where to Store Mockups

```
your-app/
├── .context/
│   └── mockups/                 # Reference mockups
│       ├── dashboard.png        # Screenshot exports
│       ├── patient_flow.png
│       ├── empty_states.png
│       └── mockup_notes.md      # What each mockup represents
├── docs/
│   └── app_vision.md            # Written description + mockup links
```

### mockup_notes.md Template

```markdown
# App Mockups Reference

## Last Updated: [DATE]

## Dashboard
![Dashboard](./dashboard.png)
- Primary KPIs at top
- Quick action buttons
- Recent activity list
- Navigation at bottom

## Patient Flow
![Patient Flow](./patient_flow.png)
- List → Detail → Edit → Save
- Swipe actions on list items
- FAB for new patient

## Empty States
![Empty States](./empty_states.png)
- Friendly illustration
- Clear CTA to add first item
- No dead ends

## Design Decisions
- Using card-based layout throughout
- Bottom navigation (iOS/Android)
- Blue primary color = trust/healthcare
- Large touch targets for clinical use
```

---

## When to Create New Mockups

### Always Mock Up First

| Situation | Why |
|-----------|-----|
| **New feature screen** | Align vision before implementing |
| **Complex user flow** | Work out the steps visually |
| **Major redesign** | See the change before committing |
| **User feedback incorporation** | Validate the fix before building |

### Quick Mockup Triggers

During development, request a mockup when:

```
🚩 "I'm not sure how this should look"
🚩 "There are multiple ways to lay this out"
🚩 "This involves 3+ screens working together"
🚩 "I'm adding a feature users requested"
🚩 "I've been coding for hours and lost the vision"
```

### Mockup Refresh Prompts

```
I've been building [APP NAME] and need to refresh my visual reference.

Current state:
- Features completed: [LIST]
- Features in progress: [LIST]
- Features planned: [LIST]

Generate updated mockups showing:
1. Current home screen with real feature set
2. [FEATURE IN PROGRESS] screens
3. How [PLANNED FEATURE] would integrate

Use consistent styling with what we established earlier.
```

---

## Motivational Mockup Practice

### The "Vision Board" Technique

Create a single combined mockup showing your app's best screens:

```
Generate a "vision board" mockup for [APP NAME] showing:
- 4-6 key screens in a grid layout
- The screens that best represent the app's value
- Polished, realistic data
- The kind of image I'd show investors or put on a landing page

This is my motivation reference for late-night coding sessions.
```

### Save Your Vision

1. **Export mockups as images** - Keep them visible
2. **Set as desktop background** - Constant reminder
3. **Print and post** - Physical motivation
4. **Share with accountability partner** - External commitment

> Your mockups are a promise to yourself about what you're building. Look at them when you're stuck.

---

## Quick Reference Prompts

### 6. App Vision Mockup (Add to Essential Prompts)
```
I've decided to build [APP NAME]. Before I write any code, generate mockups for:

1. Dashboard/Home screen
2. Primary feature flow (list → detail → action)
3. Empty states for main screens
4. Settings screen

Style: [Modern/Professional/Playful]
Platform: [iOS/Android/Web]

Use realistic data and consistent styling. This will be my visual reference throughout development.
```

---

# Next Steps After "GO" Decision

Once you've validated your concept:

1. **Complete Stage 7 mockups** - Visualize your app before coding
2. **Create your `.context/` folder** with strategic documents
3. **Write your `CLAUDE.md`** with development instructions
4. **Save mockups to `.context/mockups/`** for ongoing reference
5. **Define your MVP features** (maximum 3 core features)
6. **Set up your development environment**
7. **Continue to the Context Files Guide**

→ See: `Context Files Guide` for setting up AI documentation

---

*This guide is part of The Vibe Coding Blueprint*
*Created from real app development experience with NurseOS and GLP-1 Protein Tracker*
