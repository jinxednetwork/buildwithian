import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import projects from "@/data/projects.json"

export function ProjectsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Current Ventures
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building at the intersection of creativity, technology, and entrepreneurship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-electric-yellow transition-colors">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {project.tag}
                      </Badge>
                      <Badge 
                        variant={project.status === "Live" ? "default" : "secondary"}
                        className={project.status === "Live" ? "bg-green-500 text-white" : ""}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  {project.link && project.link !== "#" && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      asChild
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="hover:bg-electric-yellow hover:text-black">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}