"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DynamicInfoCards } from "@/components/dynamic-info-cards"
import { LogoTicker } from "@/components/logo-ticker"
import { Linkedin, Instagram, Youtube } from "lucide-react"
import socialLinks from "@/data/social-links.json"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 py-16 relative">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-10">
        <ThemeToggle />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Side - Main Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Avatar */}
            <div className="flex justify-center lg:justify-start">
              <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-electric-yellow">
                <AvatarImage src="/assets/profile.jpg" alt="Ian Almeida" />
                <AvatarFallback className="text-2xl lg:text-4xl font-bold bg-electric-yellow text-black">
                  IA
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name and Tagline */}
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Ian Almeida
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
                Designer. Indie-Hacker. Builder of Cool Sh*t.
              </p>
            </div>

            {/* Brief Intro */}
            <div className="text-center lg:text-left">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl lg:max-w-none">
                Creative technologist from Mumbai, building ventures at the intersection of design, AI, and content. 
                Currently scaling three companies while helping other entrepreneurs bring their ideas to life.
              </p>
            </div>

            {/* Logo Ticker */}
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <p className="text-xs text-muted-foreground">
                  Trusted by companies and communities worldwide
                </p>
              </div>
              <LogoTicker />
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social) => (
                <Button 
                  key={social.name} 
                  variant="outline" 
                  size="icon" 
                  asChild
                  className="hover:bg-electric-yellow hover:text-black transition-colors"
                >
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon === "linkedin" && <Linkedin className="h-5 w-5" />}
                    {social.icon === "instagram" && <Instagram className="h-5 w-5" />}
                    {social.icon === "youtube" && <Youtube className="h-5 w-5" />}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Side - Dynamic Info Cards */}
          <div className="lg:pl-8">
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
                  What I&apos;m up to right now
                </h2>
              </div>
              <DynamicInfoCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}