import { Badge } from "@/components/ui/badge"
import { InstagramFeed } from "@/components/social/instagram-feed"
import { LinkedInFeed } from "@/components/social/linkedin-feed"
import { YouTubeVideo } from "@/components/social/youtube-video"
import { Rss } from "lucide-react"

export function SocialFeedsSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-electric-yellow text-black">
            <Rss className="h-3 w-3 mr-1" />
            Live Feed
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What I'm Sharing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow my journey across platforms - from design insights on Instagram to business thoughts on LinkedIn, 
            plus deep dives on YouTube.
          </p>
        </div>

        {/* Social Feeds Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Instagram Feed */}
          <div className="lg:col-span-1">
            <InstagramFeed />
          </div>

          {/* YouTube Video - Featured */}
          <div className="lg:col-span-1">
            <YouTubeVideo />
          </div>

          {/* LinkedIn Posts */}
          <div className="lg:col-span-1">
            <LinkedInFeed />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-4">
          <h3 className="text-2xl font-semibold">
            Want to stay updated?
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Follow me on your favorite platform or join the newsletter for weekly insights 
            on building, designing, and scaling creative ventures.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/buildwithian/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              @buildwithian
            </a>
            <a
              href="https://www.linkedin.com/in/ianalmeida/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              Ian Almeida
            </a>
            <a
              href="https://www.youtube.com/@buildwithIan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              @buildwithIan
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}