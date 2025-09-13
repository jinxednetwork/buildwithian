import { HeroSection } from "@/components/sections/hero"
import { SocialFeedsSection } from "@/components/sections/social-feeds"
import { ProjectsSection } from "@/components/sections/projects"
import { SideQuestsSection } from "@/components/sections/side-quests"
import { NewsletterStrip } from "@/components/sections/newsletter-strip"
import { FreeResourcesSection } from "@/components/sections/free-resources"
import { WorkshopsSection } from "@/components/sections/workshops"
import { SpeakerSection } from "@/components/sections/speaker"
import { CofounderSection } from "@/components/sections/cofounder"
import { ContactSection, Footer } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WorkshopsSection />
      <FreeResourcesSection />
      <NewsletterStrip />
      <ProjectsSection />
      <SideQuestsSection />
      <SpeakerSection />
      <CofounderSection />
      <SocialFeedsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}