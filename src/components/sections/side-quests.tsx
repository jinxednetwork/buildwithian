import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import sideQuests from "@/data/side-quests.json"

export function SideQuestsSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500 text-white"
      case "Paused":
        return "bg-yellow-500 text-black"
      case "Archived":
        return "bg-gray-500 text-white"
      default:
        return ""
    }
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Side Quests
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experiments, micro-startups, and creative explorations that fuel curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sideQuests.map((quest, index) => (
            <Card 
              key={quest.id} 
              className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                index % 2 === 0 ? "sm:col-span-1" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <CardTitle className="text-lg leading-tight group-hover:text-electric-yellow transition-colors">
                    {quest.title}
                  </CardTitle>
                  <Badge 
                    variant="secondary"
                    className={`text-xs w-fit ${getStatusColor(quest.status)}`}
                  >
                    {quest.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {quest.description}
                  </p>
                  {quest.link && quest.link !== "#" && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      asChild
                      className="w-full justify-start p-0 h-auto text-electric-yellow hover:text-electric-yellow/80"
                    >
                      <a 
                        href={quest.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1"
                      >
                        <span className="text-xs">Explore</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}