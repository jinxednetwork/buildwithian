# V2 Home Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a V2 home page at `src/app/page-v2.tsx` with a bold, human Creator Hub design — split-panel hero, Build with Ian section, credibility bridge, programs, learning flywheel, proof, community, about, and final CTA.

**Architecture:** New page at `/page-v2.tsx` composed of standalone section components in `src/components/sections/v2/`. Reuses existing Sanity data fetchers. Static data for programs. CSS animation for the flywheel. Swap to `page.tsx` when ready.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, Space Grotesk font, shadcn/ui, existing Sanity data layer (`src/lib/sanity.ts`)

---

## Task 1: Split-Panel Hero

**Files:**
- Create: `src/components/sections/v2/hero-split.tsx`

**What it does:** Full-viewport section with two equal panels side by side. Left = "Build with Ian", right = "Learn with Ian". Each panel has a label, one-liner, and chevron. Clicking anchors to `#build` or `#learn`. `Ian Almeida` centered at the top as a thin name bar. Electric yellow border glow on hover per panel.

**Step 1: Create the component**

```tsx
// src/components/sections/v2/hero-split.tsx
"use client"

import { ChevronDown } from "lucide-react"

export function HeroSplit() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Name bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center items-center py-6">
        <span className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground">
          Ian Almeida
        </span>
      </div>

      {/* Split panels */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left — Build with Ian */}
        <button
          onClick={() => scrollTo("build")}
          className="group relative flex-1 flex flex-col items-center justify-center min-h-[50vh] md:min-h-screen px-8 py-20 border-b md:border-b-0 md:border-r border-border hover:border-[#FFFF00] transition-all duration-500 cursor-pointer text-left"
          style={{ outline: "none" }}
        >
          <div className="max-w-sm space-y-6">
            {/* Photo placeholder — replace src with real photo */}
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-8">
              <img
                src="/assets/profile.jpg"
                alt="Ian building"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-4">
                Build<br />with Ian
              </h2>
              <p className="text-muted-foreground text-lg">
                See what I&apos;m building, designing, and launching.
              </p>
            </div>
            <ChevronDown className="h-6 w-6 text-muted-foreground group-hover:text-[#FFFF00] transition-colors animate-bounce" />
          </div>
          {/* Yellow border glow on hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFFF00]/40 rounded-none transition-all duration-500 pointer-events-none" />
        </button>

        {/* Right — Learn with Ian */}
        <button
          onClick={() => scrollTo("learn")}
          className="group relative flex-1 flex flex-col items-center justify-center min-h-[50vh] md:min-h-screen px-8 py-20 hover:border-[#FFFF00] transition-all duration-500 cursor-pointer text-left bg-muted/20"
          style={{ outline: "none" }}
        >
          <div className="max-w-sm space-y-6">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-8 flex items-center justify-center">
              {/* Workshop visual placeholder */}
              <div className="text-6xl">🎓</div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-4">
                Learn<br />with Ian
              </h2>
              <p className="text-muted-foreground text-lg">
                Workshops, courses, and systems for designers, founders &amp; creators.
              </p>
            </div>
            <ChevronDown className="h-6 w-6 text-muted-foreground group-hover:text-[#FFFF00] transition-colors animate-bounce" />
          </div>
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFFF00]/40 rounded-none transition-all duration-500 pointer-events-none" />
        </button>
      </div>
    </section>
  )
}
```

**Step 2: Verify in browser**
- Both panels fill viewport height on desktop
- On mobile, panels stack vertically (50vh each)
- Hovering a panel shows yellow border glow
- Chevrons animate with bounce

**Step 3: Commit**
```bash
git add src/components/sections/v2/hero-split.tsx
git commit -m "feat: add V2 split-panel hero component"
```

---

## Task 2: Build with Ian Section

**Files:**
- Create: `src/components/sections/v2/build-section.tsx`

**What it does:** Masonry-style card grid of projects and side quests. One featured "Currently Building" card spans 2 columns. Category tags on each card. Reuses existing Sanity data via props.

**Step 1: Create the component**

```tsx
// src/components/sections/v2/build-section.tsx
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { Project, SideQuest } from "@/lib/sanity"

interface BuildSectionProps {
  projects: Project[]
  sideQuests: SideQuest[]
}

export function BuildSection({ projects, sideQuests }: BuildSectionProps) {
  const featuredProject = projects[0]
  const remainingProjects = projects.slice(1)

  return (
    <section id="build" className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#FFFF00] mb-4">
            Build with Ian
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            What I&apos;m working on
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured card — spans 2 cols */}
          {featuredProject && (
            <div className="md:col-span-2 group relative rounded-xl border border-border bg-card p-8 hover:border-[#FFFF00]/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <Badge className="bg-[#FFFF00] text-black text-xs">
                  Currently Building
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {featuredProject.tag}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold mb-3 group-hover:text-[#FFFF00] transition-colors">
                {featuredProject.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {featuredProject.description}
              </p>
              {featuredProject.link && featuredProject.link !== "#" && (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm text-[#FFFF00] hover:underline"
                >
                  View project <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}

          {/* Remaining project cards */}
          {remainingProjects.map((project) => (
            <div
              key={project._id}
              className="group relative rounded-xl border border-border bg-card p-6 hover:border-[#FFFF00]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="text-xs">
                  {project.tag}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-xs ${project.status === "Live" ? "bg-green-500 text-white" : ""}`}
                >
                  {project.status}
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#FFFF00] transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
          ))}

          {/* Side quest cards */}
          {sideQuests.slice(0, 3).map((quest) => (
            <div
              key={quest._id}
              className="group relative rounded-xl border border-border bg-card/50 p-6 hover:border-[#FFFF00]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-3">
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Side Quest
                </Badge>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[#FFFF00] transition-colors">
                {quest.title}
              </h3>
              <p className="text-sm text-muted-foreground">{quest.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**
- Featured card spans 2 columns on desktop
- Cards drop to full-width on mobile
- Yellow accent appears on hover

**Step 3: Commit**
```bash
git add src/components/sections/v2/build-section.tsx
git commit -m "feat: add V2 Build with Ian section"
```

---

## Task 3: Credibility Bridge Section

**Files:**
- Create: `src/components/sections/v2/credibility-bridge.tsx`

**What it does:** Full-width dark editorial section. Large left-aligned quote. Supporting bullet lines. Photo/collage on the right. Transitions into the Learn section with a closing line.

**Step 1: Create the component**

```tsx
// src/components/sections/v2/credibility-bridge.tsx
export function CredibilityBridge() {
  const lines = [
    "Built agencies and creative studios",
    "Launched products and brands",
    "Taught 100+ workshops across design, AI, and marketing",
    "Still building. Still experimenting.",
  ]

  return (
    <section className="py-24 px-4 md:px-8 bg-muted/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div className="space-y-10">
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              &ldquo;I&apos;ve been a freelancer, a designer, an entrepreneur — and I&apos;ve documented everything along the way.&rdquo;
            </blockquote>

            <ul className="space-y-3">
              {lines.map((line) => (
                <li key={line} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FFFF00] flex-shrink-0" />
                  <span className="text-lg">{line}</span>
                </li>
              ))}
            </ul>

            <p className="text-2xl font-semibold text-[#FFFF00]">
              Here&apos;s what I&apos;m teaching right now. ↓
            </p>
          </div>

          {/* Right — photo */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted">
              <img
                src="/assets/profile.jpg"
                alt="Ian at work"
                className="w-full h-full object-cover"
                style={{ filter: "sepia(10%) contrast(1.05)" }}
              />
            </div>
            {/* Grain overlay for warmth */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "150px 150px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**
- Quote is large and impactful on desktop
- Stacks to single column on mobile (text above photo)
- Closing yellow line is clearly a transition marker

**Step 3: Commit**
```bash
git add src/components/sections/v2/credibility-bridge.tsx
git commit -m "feat: add V2 credibility bridge section"
```

---

## Task 4: Programs Section

**Files:**
- Create: `src/components/sections/v2/programs-section.tsx`

**What it does:** Static programs data. Featured workshop card (full width, from Sanity) at the top. 3×2 grid of program cards with pill tags and yellow CTA button.

**Step 1: Create the component**

```tsx
// src/components/sections/v2/programs-section.tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar } from "lucide-react"
import type { Workshop } from "@/lib/sanity"

const PROGRAMS = [
  {
    id: "ai-for-designers",
    name: "AI for Designers",
    outcome: "Use AI to create ads, posters, and visual assets faster",
    includes: ["AI image workflows", "Prompt engineering", "Motion posters", "Creative automation"],
  },
  {
    id: "ai-agency",
    name: "Build & Launch an AI Agency",
    outcome: "Build an AI consulting or automation agency from scratch",
    includes: ["Service positioning", "Pricing", "Client acquisition", "AI workflows"],
  },
  {
    id: "ai-entrepreneurs",
    name: "AI for Entrepreneurs",
    outcome: "Use AI to launch products, brands, and tools",
    includes: ["Product ideation", "Marketing systems", "Automation", "Distribution"],
  },
  {
    id: "motion-posters",
    name: "Motion Graphic Posters",
    outcome: "Master nightlife and event marketing techniques",
    includes: ["Poster design", "Motion graphics", "Teaser videos", "Music-driven edits"],
  },
  {
    id: "website-60",
    name: "Build a Website in 60 Minutes",
    outcome: "Launch sites fast with AI + no code",
    includes: ["Lovable", "Webflow", "AI design", "Launch workflows"],
  },
  {
    id: "vibe-code",
    name: "Vibe Code Your App",
    outcome: "Turn ideas into working apps without being a developer",
    includes: ["Prompt engineering", "AI coding", "App launch strategies"],
  },
]

interface ProgramsSectionProps {
  nextWorkshop: Workshop | null
}

export function ProgramsSection({ nextWorkshop }: ProgramsSectionProps) {
  return (
    <section id="learn" className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#FFFF00] mb-4">
            Learn with Ian
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            The Programs
          </h2>
        </div>

        {/* Featured next workshop */}
        {nextWorkshop && (
          <div className="mb-10 rounded-xl border border-[#FFFF00]/40 bg-[#FFFF00]/5 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#FFFF00] text-black font-bold">
                    Next Live Workshop
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(nextWorkshop.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{nextWorkshop.title}</h3>
                <p className="text-muted-foreground max-w-xl">{nextWorkshop.description}</p>
              </div>
              {nextWorkshop.registrationLink && nextWorkshop.registrationLink !== "#" && (
                <Button
                  className="bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90 font-bold shrink-0"
                  asChild
                >
                  <a href={nextWorkshop.registrationLink} target="_blank" rel="noopener noreferrer">
                    Join the Workshop <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* 3x2 program grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="group rounded-xl border border-border bg-card p-6 hover:border-[#FFFF00]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#FFFF00] transition-colors">
                {program.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1">
                {program.outcome}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {program.includes.map((item) => (
                  <span
                    key={item}
                    className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full hover:bg-[#FFFF00] hover:text-black hover:border-[#FFFF00] transition-colors"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**
- Featured workshop card only renders when `nextWorkshop` is non-null
- 3×2 grid collapses to 1 column on mobile
- Pill tags wrap cleanly
- CTA buttons turn yellow on hover

**Step 3: Commit**
```bash
git add src/components/sections/v2/programs-section.tsx
git commit -m "feat: add V2 programs section with static data"
```

---

## Task 5: Learning Flywheel

**Files:**
- Create: `src/components/sections/v2/learning-flywheel.tsx`

**What it does:** Animated SVG/CSS flywheel with 3 nodes — Learn, Build, Connect — connected by rotating arrows. Electric yellow accent on connectors.

**Step 1: Create the component**

```tsx
// src/components/sections/v2/learning-flywheel.tsx
"use client"

export function LearningFlywheel() {
  const nodes = [
    {
      id: "learn",
      label: "Learn",
      description: "Live workshops & self-paced courses",
      angle: -90, // top
    },
    {
      id: "build",
      label: "Build",
      description: "Real projects & hands-on practice",
      angle: 30, // bottom right
    },
    {
      id: "connect",
      label: "Connect",
      description: "Community, cohorts & founder discussions",
      angle: 150, // bottom left
    },
  ]

  const cx = 200
  const cy = 200
  const r = 120

  const getPos = (angle: number) => ({
    x: cx + r * Math.cos((angle * Math.PI) / 180),
    y: cy + r * Math.sin((angle * Math.PI) / 180),
  })

  return (
    <section className="py-24 px-4 md:px-8 bg-muted/10 border-y border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#FFFF00] mb-4">
          How It Works
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          From theory to practice to community
        </h2>
        <p className="text-muted-foreground text-lg mb-16">
          — and back again.
        </p>

        <div className="relative flex justify-center">
          <svg
            viewBox="0 0 400 400"
            className="w-full max-w-md"
            style={{ overflow: "visible" }}
          >
            {/* Animated ring */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#FFFF00"
              strokeWidth="1"
              strokeDasharray="8 6"
              opacity="0.3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${cx} ${cy}`}
                to={`360 ${cx} ${cy}`}
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Connector lines */}
            {nodes.map((node, i) => {
              const next = nodes[(i + 1) % nodes.length]
              const from = getPos(node.angle)
              const to = getPos(next.angle)
              return (
                <line
                  key={node.id}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#FFFF00"
                  strokeWidth="1.5"
                  opacity="0.5"
                  strokeDasharray="4 4"
                />
              )
            })}

            {/* Node circles */}
            {nodes.map((node) => {
              const pos = getPos(node.angle)
              return (
                <g key={node.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={36}
                    fill="hsl(var(--card))"
                    stroke="#FFFF00"
                    strokeWidth="1.5"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="var(--font-space-grotesk, sans-serif)"
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Node descriptions below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {nodes.map((node) => (
            <div key={node.id} className="text-center">
              <h3 className="font-bold text-lg mb-1 text-[#FFFF00]">{node.label}</h3>
              <p className="text-sm text-muted-foreground">{node.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**
- SVG renders on page without overflow issues
- Dashed ring rotates continuously
- 3 nodes visible with labels
- Descriptions appear below on all screen sizes

**Step 3: Commit**
```bash
git add src/components/sections/v2/learning-flywheel.tsx
git commit -m "feat: add animated learning flywheel component"
```

---

## Task 6: Proof Section

**Files:**
- Create: `src/components/sections/v2/proof-section.tsx`

**What it does:** Big 3 metrics in electric yellow. Placeholder testimonial cards in a horizontal scroll row.

**Step 1: Create the component**

```tsx
// src/components/sections/v2/proof-section.tsx
const METRICS = [
  { value: "100+", label: "People Trained" },
  { value: "6", label: "Programs" },
  { value: "Real", label: "Projects Built" },
]

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Ian's workshop completely changed how I approach design with AI.",
    name: "Priya S.",
    role: "UX Designer",
  },
  {
    id: 2,
    quote: "I launched my first AI product 2 weeks after the course. Incredible.",
    name: "Rahul M.",
    role: "Entrepreneur",
  },
  {
    id: 3,
    quote: "The systems Ian teaches are practical, not theoretical. Big difference.",
    name: "Ananya K.",
    role: "Freelance Designer",
  },
  {
    id: 4,
    quote: "Best investment I've made in my creative career this year.",
    name: "Dev P.",
    role: "Agency Owner",
  },
]

export function ProofSection() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#FFFF00] mb-12 text-center">
          Proof
        </p>

        {/* Big metrics */}
        <div className="grid grid-cols-3 gap-8 mb-20 text-center">
          {METRICS.map((m) => (
            <div key={m.label}>
              <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#FFFF00] leading-none mb-2">
                {m.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials horizontal scroll */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="snap-start shrink-0 w-72 md:w-80 rounded-xl border border-border bg-card p-6"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**
- Metrics are large and bold on all screen widths
- Testimonial row scrolls horizontally on mobile
- Cards snap to position on scroll

**Step 3: Commit**
```bash
git add src/components/sections/v2/proof-section.tsx
git commit -m "feat: add V2 proof section with metrics and testimonials"
```

---

## Task 7: Community Section

**Files:**
- Create: `src/components/sections/v2/community-section.tsx`

**Step 1: Create the component**

```tsx
// src/components/sections/v2/community-section.tsx
import { Button } from "@/components/ui/button"

const BENEFITS = [
  "Weekly AI experiments and challenges",
  "Prompt libraries & workflow templates",
  "Founder and creator discussions",
  "Early access to tools and programs",
]

export function CommunitySection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-muted/20 border-y border-border">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#FFFF00] mb-4">
            Community
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Join a community of designers, founders, and creators using AI to build real things.
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FFFF00] flex-shrink-0" />
              <span className="text-muted-foreground">{b}</span>
            </li>
          ))}
        </ul>

        <Button className="bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90 font-bold px-8 py-6 text-base">
          Join the Community
        </Button>
      </div>
    </section>
  )
}
```

**Step 3: Commit**
```bash
git add src/components/sections/v2/community-section.tsx
git commit -m "feat: add V2 community section"
```

---

## Task 8: About Section

**Files:**
- Create: `src/components/sections/v2/about-section.tsx`

**Step 1: Create the component**

```tsx
// src/components/sections/v2/about-section.tsx
export function AboutSection() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="aspect-square rounded-xl overflow-hidden bg-muted max-w-sm mx-auto md:mx-0">
            <img
              src="/assets/profile.jpg"
              alt="Ian Almeida"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#FFFF00] mb-4">
                About
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Ian Almeida</h2>
              <p className="text-muted-foreground">Designer. Builder. AI Explorer.</p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Over the past decade I&apos;ve worked across design, creative direction, technology,
                marketing, and startups. I&apos;ve built agencies, launched products, directed creative
                for events and brands, and consulted with founders around the world.
              </p>
              <p>
                My work has helped brands sell out events, launch products, and scale their content.
                I&apos;ve been a freelancer, a creative director, a founder — and I&apos;ve documented
                everything along the way.
              </p>
              <p className="text-foreground font-semibold">
                Now I&apos;m sharing the exact systems behind it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 3: Commit**
```bash
git add src/components/sections/v2/about-section.tsx
git commit -m "feat: add V2 about section"
```

---

## Task 9: Final CTA Section

**Files:**
- Create: `src/components/sections/v2/final-cta.tsx`

**Step 1: Create the component**

```tsx
// src/components/sections/v2/final-cta.tsx
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="py-32 px-4 md:px-8 border-t border-border text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Start Building With AI Today
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90 font-bold px-8 py-6 text-base"
            onClick={() => document.getElementById("learn")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join a Workshop
          </Button>
          <Button
            variant="outline"
            className="hover:bg-[#FFFF00] hover:text-black hover:border-[#FFFF00] px-8 py-6 text-base"
          >
            Explore Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
```

> Note: Wrap `FinalCTA` in `"use client"` since it uses onClick.

**Step 3: Commit**
```bash
git add src/components/sections/v2/final-cta.tsx
git commit -m "feat: add V2 final CTA section"
```

---

## Task 10: Wire Up page-v2.tsx

**Files:**
- Create: `src/app/page-v2/page.tsx`

**What it does:** Server component that fetches all data and composes the V2 page from all section components.

**Step 1: Create the page**

```tsx
// src/app/page-v2/page.tsx
import { HeroSplit } from "@/components/sections/v2/hero-split"
import { BuildSection } from "@/components/sections/v2/build-section"
import { CredibilityBridge } from "@/components/sections/v2/credibility-bridge"
import { ProgramsSection } from "@/components/sections/v2/programs-section"
import { LearningFlywheel } from "@/components/sections/v2/learning-flywheel"
import { ProofSection } from "@/components/sections/v2/proof-section"
import { CommunitySection } from "@/components/sections/v2/community-section"
import { AboutSection } from "@/components/sections/v2/about-section"
import { FinalCTA } from "@/components/sections/v2/final-cta"
import {
  getProjectsWithFallback,
  getSideQuestsWithFallback,
  getWorkshopsWithFallback,
  getSocialLinksWithFallback,
} from "@/lib/sanity"

export default async function HomeV2() {
  const [projects, sideQuests, workshops] = await Promise.all([
    getProjectsWithFallback(),
    getSideQuestsWithFallback(),
    getWorkshopsWithFallback(),
  ])

  const nextWorkshop =
    workshops
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .find((w) => new Date(w.date) > new Date()) ?? null

  return (
    <div className="min-h-screen">
      <HeroSplit />
      <BuildSection projects={projects} sideQuests={sideQuests} />
      <CredibilityBridge />
      <ProgramsSection nextWorkshop={nextWorkshop} />
      <LearningFlywheel />
      <ProofSection />
      <CommunitySection />
      <AboutSection />
      <FinalCTA />
    </div>
  )
}
```

**Step 2: Run dev server and visit `/page-v2`**

```bash
npm run dev
# Visit http://localhost:3000/page-v2
```

Check:
- All sections render without errors
- No TypeScript errors in terminal
- Smooth scroll works between panels and sections
- Mobile layout is correct (stack panels, single column grids)

**Step 3: Final commit**
```bash
git add src/app/page-v2/
git commit -m "feat: wire up V2 home page at /page-v2"
```

---

## After All Tasks Complete

Run a final build check:
```bash
npm run build
```
Expected: Build completes with no errors. Then swap to production by renaming `page-v2/page.tsx` → `page.tsx` when ready.
