import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Users, FileText, Palette, Briefcase } from "lucide-react"
import freeResources from "@/data/free-resources.json"

export function FreeResourcesSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Design Templates":
        return <Palette className="h-4 w-4" />
      case "Business Tools":
        return <Briefcase className="h-4 w-4" />
      case "Learning Resources":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design Templates":
        return "bg-purple-500 text-white"
      case "Business Tools":
        return "bg-blue-500 text-white"
      case "Learning Resources":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // Group resources by category
  const resourcesByCategory = freeResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = []
    }
    acc[resource.category].push(resource)
    return acc
  }, {} as Record<string, typeof freeResources>)

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-electric-yellow text-black">
            Free Resources
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tools & Templates for Builders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything I&apos;ve learned building multiple companies, distilled into actionable resources. 
            Downloaded by 10,000+ entrepreneurs worldwide.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(resourcesByCategory).map(([category, resources]) => (
            <div key={category} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-2xl font-bold">{category}</h3>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* Resources Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg leading-tight group-hover:text-electric-yellow transition-colors">
                            {resource.title}
                          </CardTitle>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{resource.downloadCount}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="w-fit text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {resource.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Download Button */}
                        <Button 
                          className="w-full bg-electric-yellow text-black hover:bg-electric-yellow/90"
                          asChild
                        >
                          <a 
                            href={resource.downloadLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2"
                          >
                            <Download className="h-4 w-4" />
                            <span>Get Free Access</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              Want more resources like these?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Join the newsletter to get new templates, tools, and insights delivered weekly.
            </p>
            <Button 
              variant="outline" 
              className="hover:bg-electric-yellow hover:text-black"
              asChild
            >
              <a href="#newsletter">
                Join the Newsletter
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}