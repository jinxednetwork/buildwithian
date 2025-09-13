# Ian Almeida - Personal Website

A modern, mobile-first personal website showcasing Ian Almeida - Designer, Indie-Hacker, and Builder of Cool Sh*t from Mumbai.

## ✨ Features

- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Mobile-First Design**: Responsive bento grid layout optimized for all devices
- **Modern Typography**: Space Grotesk font for clean, professional appearance
- **Electric Yellow Accents**: Consistent brand color throughout the design
- **ShadCN UI Components**: Polished, accessible component library
- **Dynamic Content**: JSON-based data structure for easy updates
- **SEO Optimized**: Meta tags, structured data, and Open Graph integration

## 🎯 Sections

- **Hero Section**: Left-right layout with profile info and dynamic status cards
  - Left: Name, tagline, avatar, intro, and social links
  - Right: Active projects, current learning, and next workshop
  - Bottom: Scrolling logo ticker carousel
- **Projects**: Main ventures (Jinxed Network, A Video Company, Bombay AI Company)
- **Side Quests**: Bento-style cards for experiments and micro-startups
- **Newsletter Strip**: Dedicated high-conversion newsletter signup section  
- **Free Resources**: Downloadable templates, tools, and guides
- **Workshops**: Upcoming events with registration links
- **Speaker Services**: Topics and booking for speaking engagements
- **Co-Founder Application**: Invitation for potential collaborators
- **Contact**: Multiple ways to get in touch
- **Footer**: Social links and credits

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with ShadCN UI components
- **Typography**: Space Grotesk from Google Fonts
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Language**: TypeScript

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add your profile image**:
   - Replace the placeholder instructions in `README_PROFILE_IMAGE.md`
   - Add your photo as `public/assets/profile.jpg`
   - Recommended: 400x400px, optimized for web

3. **Update content**:
   - Edit JSON files in `src/data/` to customize:
     - `projects.json` - Your main ventures
     - `side-quests.json` - Experiments and side projects
     - `workshops.json` - Upcoming events
     - `social-links.json` - Social media profiles
     - `current-learning.json` - What you're studying
     - `active-projects-status.json` - Live project updates
     - `free-resources.json` - Downloadable resources
     - `company-logos.json` - Logo ticker content

4. **Customize branding**:
   - Update colors in `src/app/globals.css`
   - Modify metadata in `src/app/layout.tsx`
   - Adjust structured data in `src/components/structured-data.tsx`

5. **Run development server**:
   ```bash
   npm run dev
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 Customization

### Content Updates
All content is managed through JSON files in `src/data/`:
- **projects.json**: Main business ventures
- **side-quests.json**: Side projects and experiments  
- **workshops.json**: Speaking engagements and events
- **social-links.json**: Social media profiles

### Styling
- **Colors**: Modify CSS variables in `src/app/globals.css`
- **Components**: All sections are in `src/components/sections/`
- **Theme**: Dark/light mode configured in `src/components/theme-provider.tsx`

### External Integrations
Update the following links in components:
- **Newsletter**: Tally.so form in hero section
- **Booking**: Cal.com link in contact section  
- **Applications**: Tally.so forms for co-founder and speaker inquiries

## 🎨 Brand Guidelines

- **Primary Color**: Black (#000000)
- **Secondary Color**: White (#FFFFFF) 
- **Accent Color**: Electric Yellow (#FFFF00)
- **Typography**: Space Grotesk for all text
- **Style**: Clean, modern, indie-hacker aesthetic

## 📱 Mobile Optimization

The website is built mobile-first with:
- Responsive bento grid layouts
- Touch-friendly interactive elements
- Optimized typography scaling
- Smooth transitions and hover states

## 🔍 SEO Features

- Comprehensive meta tags
- Open Graph and Twitter Card data
- Structured data (JSON-LD) for rich snippets
- Semantic HTML structure
- Performance optimized

## 📧 Contact Integration

The website includes multiple contact methods:
- Direct email links
- Cal.com booking integration
- Social media profiles
- Tally.so forms for applications

## 🚢 Deployment

Ready for deployment on:
- **Vercel** (recommended)
- **Netlify** 
- **AWS**
- Any static hosting service

Built with Next.js App Router for optimal performance and SEO.

---

**Built with ❤️ in Mumbai**
