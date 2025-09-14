import { Button } from "@/components/ui/button"
import { Calendar, Mail, MessageCircle } from "lucide-react"
import { Linkedin, Instagram, Youtube } from "lucide-react"
import socialLinks from "@/data/social-links.json"

export function ContactSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Book a Call Section */}
        <div className="text-center mb-20">
          <div className="space-y-6">
            <Calendar className="h-16 w-16 mx-auto text-electric-yellow" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Book a Call
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project or idea worth talking about? Let&apos;s discuss how we can work together 
              to bring your vision to life.
            </p>
            
            <div className="space-y-4">
              <Button 
                size="lg"
                className="bg-electric-yellow text-black hover:bg-electric-yellow/90 text-lg px-8 py-6 h-auto"
                asChild
              >
                <a 
                  href="https://cal.com/ian-almeida" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Schedule a Call</span>
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground">
                30-minute slots available • Response within 24 hours • Global time zones supported
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold mb-8">
            Prefer to reach out differently?
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 hover:bg-electric-yellow hover:text-black"
              asChild
            >
              <a href="mailto:ian@jinxednetwork.com">
                <Mail className="h-4 w-4" />
                <span>Send an Email</span>
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 hover:bg-electric-yellow hover:text-black"
              asChild
            >
              <a 
                href="https://linkedin.com/in/ianalmeida" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>LinkedIn Message</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold mb-1">Ian Almeida</p>
            <p className="text-muted-foreground">
              Designer, Indie-Hacker, Builder from Mumbai
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Button 
                key={social.name} 
                variant="ghost" 
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

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Built with Next.js & ShadCN UI
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Ian Almeida. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}