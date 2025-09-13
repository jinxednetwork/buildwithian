"use client"

import { useEffect, useRef } from "react"
import companyLogos from "@/data/company-logos.json"

interface LogoTickerProps {
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export function LogoTicker({ 
  speed = 30, 
  direction = "left", 
  pauseOnHover = true 
}: LogoTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    const tickerContent = ticker.querySelector('.ticker-content') as HTMLElement
    if (!tickerContent) return

    // Duplicate content for seamless loop
    const originalContent = tickerContent.innerHTML
    tickerContent.innerHTML = originalContent + originalContent

    // Calculate animation duration based on content width and speed
    const contentWidth = tickerContent.scrollWidth / 2
    const duration = contentWidth / speed

    tickerContent.style.animationDuration = `${duration}s`
  }, [speed])

  return (
    <div className="w-full overflow-hidden bg-muted/30 py-4 border-y border-border">
      <div 
        ref={tickerRef}
        className={`ticker ${pauseOnHover ? 'group' : ''}`}
      >
        <div 
          className={`ticker-content flex items-center gap-8 ${
            direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
          } ${pauseOnHover ? 'group-hover:animation-play-state-paused' : ''}`}
        >
          {companyLogos.map((company, index) => (
            <div
              key={`${company.id}-${index}`}
              className="flex-shrink-0 h-8 w-24 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              title={company.name}
            >
              {/* For now using text, but you can replace with actual logo images */}
              <div className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {company.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Add CSS animations to globals.css
export const tickerStyles = `
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes scroll-right {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .animate-scroll-left {
    animation: scroll-left var(--duration, 30s) linear infinite;
  }

  .animate-scroll-right {
    animation: scroll-right var(--duration, 30s) linear infinite;
  }

  .ticker:hover .ticker-content {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-scroll-left,
    .animate-scroll-right {
      animation: none;
    }
  }
`