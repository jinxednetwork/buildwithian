import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink } from "lucide-react"
import workshops from "@/data/workshops.json"

export function WorkshopsSection() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-500 text-white"
      case "Coming Soon":
        return "bg-blue-500 text-white"
      case "Sold Out":
        return "bg-red-500 text-white"
      default:
        return ""
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming Workshops
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn with me through hands-on workshops covering design, entrepreneurship, and creative technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <Card key={workshop.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${getStatusColor(workshop.status)}`}
                    >
                      {workshop.status}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(workshop.date)}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-electric-yellow transition-colors">
                    {workshop.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {workshop.description}
                  </p>
                  {workshop.registrationLink && workshop.registrationLink !== "#" && (
                    <Button 
                      className="w-full bg-electric-yellow text-black hover:bg-electric-yellow/90"
                      asChild
                    >
                      <a 
                        href={workshop.registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <span>Register Now</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {workshop.status === "Coming Soon" && (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      disabled
                    >
                      Coming Soon
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