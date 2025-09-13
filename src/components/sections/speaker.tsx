import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Users, Lightbulb, Zap } from "lucide-react"

export function SpeakerSection() {
  const topics = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Design Systems",
      description: "Building scalable design foundations for growing teams"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Indie Entrepreneurship",
      description: "From idea to execution: the solo founder's journey"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Creative Leadership",
      description: "Leading design teams and fostering innovation"
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: "AI in Creative Work",
      description: "Integrating artificial intelligence into design workflows"
    }
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-electric-yellow text-black">
            Available for Speaking
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hire Me as a Speaker
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bringing insights on design, entrepreneurship, and creative technology to conferences, 
            workshops, and corporate events worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {topics.map((topic, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-electric-yellow text-black group-hover:scale-110 transition-transform">
                    {topic.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-electric-yellow transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">
              Ready to bring fresh perspectives to your event?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Available for keynotes, workshops, panels, and corporate training sessions.
            </p>
          </div>
          
          <Button 
            size="lg"
            className="bg-electric-yellow text-black hover:bg-electric-yellow/90 text-lg px-8 py-6 h-auto"
            asChild
          >
            <a 
              href="https://tally.so/r/speaker-inquiry" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Book Me to Speak
            </a>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Response within 24 hours • Global availability • Custom topics available
          </p>
        </div>
      </div>
    </section>
  )
}