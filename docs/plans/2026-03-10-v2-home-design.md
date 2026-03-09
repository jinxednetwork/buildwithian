# V2 Home Page Design

**Date:** 2026-03-10
**Status:** Approved
**Approach:** Creator Hub (Option B) — personal identity + commerce in one page

---

## Vision

Bold and Human. Big type, real photography, electric yellow accents on dark background. Feels like a magazine cover crossed with a creator's studio. The page is Ian's home base — part personal story, part learning ecosystem.

---

## Page Structure

### Section 1 — Hero (Full Viewport, Split Panel)

Two equal panels side by side, full viewport height.

**Left Panel — "Build with Ian"**
- Ian's photo: candid, working, tools visible (not a headshot)
- Label: `Build with Ian` in large bold type
- One-liner: "See what I'm building, designing, and launching"
- Chevron pointing down
- Hover: electric yellow border/glow on panel edge
- Anchors to `#build`

**Right Panel — "Learn with Ian"**
- Workshop/program visual
- Label: `Learn with Ian` in large bold type
- One-liner: "Workshops, courses, and systems for designers, founders & creators"
- Chevron pointing down
- Hover: electric yellow border/glow on panel edge
- Anchors to `#learn`

**Center:** `Ian Almeida` name either overlapping at the center seam or pinned as a top nav bar.

---

### Section 2 — Build with Ian (`#build`)

Ian's personal/creative side. Studio energy, not portfolio polish.

**Layout:** Asymmetric grid with masonry-style cards.

**Cards:**
- Current projects (from existing data)
- Side quests / experiments
- "Currently building" featured card — spans 2 columns, highlighted
- Each card: category tag (Product / Design / Agency / Content), title, 1-line description

**Tone:** Raw, maker energy. Cards feel like sticky notes on a studio wall.

---

### Section 3 — Credibility Bridge

Transitions from Build → Learn. Full-width editorial statement.

**Headline (large, left-aligned):**
> "I've been a freelancer, a designer, an entrepreneur — and I've documented everything along the way."

**Supporting lines (short, stacked):**
- Built agencies and creative studios
- Launched products and brands
- Taught 100+ workshops across design, AI, and marketing
- Still building, still experimenting

**Visual:** Ian's photo or work collage on the right. Slight film grain/texture overlay for warmth. Dark background.

**Transition line into programs:**
> "Here's what I'm teaching right now."

---

### Section 4 — Programs (`#learn`)

**Layout:** Featured card (next live workshop) full width at top — date badge, urgency treatment. Then 3×2 grid of program cards below.

**Program cards:**
- AI for Designers
- Build & Launch an AI Agency
- AI for Entrepreneurs
- Motion Graphic Posters
- Build a Website in 60 Minutes
- Vibe Code Your App

**Each card:**
- Program name (bold, large)
- One outcome line (muted text)
- 3–4 includes as small tag/pill chips
- Electric yellow CTA button ("Join" or "Learn More")
- Hover: card lifts, yellow accent border

**Programs data:**
| Program | Outcome | Includes |
|---|---|---|
| AI for Designers | Create ads, posters, visual assets faster | AI image workflows, prompt engineering, motion posters, creative automation |
| Build & Launch an AI Agency | Build an AI consulting/automation agency | Service positioning, pricing, client acquisition, AI workflows |
| AI for Entrepreneurs | Launch products, brands, and tools with AI | Product ideation, marketing systems, automation, distribution |
| Motion Graphic Posters | Nightlife and event marketing techniques | Poster design, motion graphics, teaser videos, music-driven edits |
| Build a Website in 60 Minutes | Launch sites fast with AI + no code | Lovable, Webflow, AI design, launch workflows |
| Vibe Code Your App | Build working apps without being a developer | Prompt engineering, AI coding, app launch strategies |

---

### Section 5 — The Learning Flywheel

A visual circular diagram — SVG or CSS animated — showing the 3-node learning cycle.

```
        Learn
       ↙     ↘
Connect  →  Build
```

**Nodes:**
- **Learn** — Live workshops, self-paced courses (theory → frameworks)
- **Build** — Projects, assignments, real output (practical → results)
- **Connect** — Community, cohorts, founder discussions (people → momentum)

**Visual:** Animated arrows between nodes pulse/rotate slowly. Electric yellow on connecting lines. Dark background. Each node: icon + label + 1-line description.

**Section headline:** "From theory to practice to community — and back again."

---

### Section 6 — Proof

**Top zone:** 3 big metrics in electric yellow
- `100+` People Trained
- `6` Programs
- Real Projects Built

**Bottom zone:** Horizontal scroll of testimonial cards or workshop photo thumbnails.

---

### Section 7 — Community

Full-width dark card.

**Headline:** "Join a community of designers, founders, and creators using AI to build real things."

**4 bullet benefits:**
- Weekly experiments
- Prompt libraries & AI workflows
- Founder discussions
- Early access to tools

**Single CTA button:** Join the Community

---

### Section 8 — About Ian

Two-column layout. Photo left, text right.

**Headline:** `Ian Almeida — Designer. Builder. AI Explorer.`

**Body:** Short, conversational paragraphs covering design, creative direction, technology, marketing, startups. Ends with: "Now I'm sharing the exact systems behind it."

---

### Section 9 — Final CTA

Full-width dark section. Minimal.

**Headline:** "Start Building With AI Today"

**Two buttons:**
- "Join a Workshop" (electric yellow)
- "Explore Courses" (ghost/outline)

---

## Design System

- **Background:** Dark (existing dark mode default)
- **Accent:** Electric yellow (`#FFFF00`) — used sparingly: hover states, CTAs, metrics, flywheel lines
- **Typography:** Space Grotesk (existing) — hero labels extra bold, body warm and readable
- **Photography:** Real, candid, working shots — no stock imagery
- **Cards:** Slight lift on hover, minimal borders, dark surface
- **Animations:** Subtle — flywheel rotation, card hover lift, panel hover glow

---

## The Bigger Play

This page is the top of the Ian Almeida ecosystem funnel:

```
Free content (Build with Ian section)
↓
Workshops (₹1k – ₹5k)
↓
Courses (₹5k – ₹25k)
↓
Community (₹1k–₹2k/month)
↓
Consulting / programs (₹1L+)
```

---

## Implementation Notes

- Build as `src/app/page-v2.tsx` initially, swap to `page.tsx` when ready
- Reuse existing data fetching from Sanity (`getWorkshopsWithFallback`, etc.)
- Flywheel: build as a dedicated `<LearningFlywheel />` component using CSS animation
- Programs: static data to start, migrate to Sanity later
- Hero split panels: CSS grid, full viewport, smooth anchor scroll behavior
