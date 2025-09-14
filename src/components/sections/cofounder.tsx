import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Rocket, Handshake, Target } from "lucide-react"

export function CofounderSection() {
  const qualities = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Execution-focused",
      description: "You turn ideas into reality with speed and precision"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Growth-minded", 
      description: "Ambitious about building something meaningful and scalable"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative",
      description: "Strong communicator who thrives in partnership dynamics"
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Complementary skills",
      description: "Brings technical, business, or domain expertise I lack"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I&apos;m always looking for exceptional co-founders to build the next generation of creative tech companies.
            If you&apos;re driven, skilled, and ready to create something extraordinary, let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {qualities.map((quality, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-electric-yellow text-black group-hover:scale-110 transition-transform">
                    {quality.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-electric-yellow transition-colors">
                      {quality.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {quality.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold">
              What I Bring to the Table
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                "Design & UX Leadership",
                "Brand Strategy",
                "Content Creation",
                "Mumbai Network",
                "Previous Exits",
                "AI/Tech Expertise",
                "Growth Hacking",
                "Product Vision"
              ].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-electric-yellow hover:text-black transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              Ready to Change the Game?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Applications reviewed weekly. Serious inquiries only – let&apos;s build something that matters.
            </p>
            
            <Button 
              size="lg"
              className="bg-electric-yellow text-black hover:bg-electric-yellow/90 text-lg px-8 py-6 h-auto"
              asChild
            >
              <a 
                href="https://tally.so/r/cofounder-application" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Apply to Build with Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}