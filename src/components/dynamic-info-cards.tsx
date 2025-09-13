"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, Rocket, ExternalLink, Clock, MapPin, Mic } from "lucide-react"
import currentLearning from "@/data/current-learning.json"
import activeProjects from "@/data/active-projects-status.json"
import workshops from "@/data/workshops.json"

export function DynamicInfoCards() {
  // Get the next upcoming workshop
  const nextWorkshop = workshops
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .find(workshop => new Date(workshop.date) > new Date())

  // Get most active learning item
  const currentlyLearning = currentLearning
    .filter(item => item.status === "active")
    .sort((a, b) => b.progress - a.progress)[0]

  // Get most recent project update
  const recentProject = activeProjects
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())[0]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "scaling":
        return "bg-green-500 text-white"
      case "developing":
      case "finishing":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Active Projects Card */}
      {recentProject && (
        <Card className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Rocket className="h-4 w-4 text-electric-yellow" />
              <CardTitle className="text-base font-semibold">Active Projects</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{recentProject.projectName}</span>
                <Badge className={`text-xs ${getStatusColor(recentProject.status)}`}>
                  {recentProject.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{recentProject.currentFocus}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{recentProject.progress}%</span>
                </div>
                <Progress value={recentProject.progress} className="h-1" />
              </div>
              <p className="text-xs text-muted-foreground">
                Target: {recentProject.milestone}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Currently Learning Card */}
      {currentlyLearning && (
        <Card className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-electric-yellow" />
              <CardTitle className="text-base font-semibold">Currently Learning</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">{currentlyLearning.title}</h4>
              <p className="text-xs text-muted-foreground">{currentlyLearning.description}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{currentlyLearning.progress}%</span>
                </div>
                <Progress value={currentlyLearning.progress} className="h-1" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{currentlyLearning.platform}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{currentlyLearning.timeline}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Workshop Card */}
      {nextWorkshop && (
        <Card className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-electric-yellow" />
              <CardTitle className="text-base font-semibold">Next Workshop</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="font-medium text-sm leading-tight">{nextWorkshop.title}</h4>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(nextWorkshop.date)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{nextWorkshop.description}</p>
              {nextWorkshop.registrationLink && nextWorkshop.registrationLink !== "#" && (
                <Button 
                  size="sm" 
                  className="w-full h-8 text-xs bg-electric-yellow text-black hover:bg-electric-yellow/90 font-medium"
                  asChild
                >
                  <a 
                    href={nextWorkshop.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1"
                  >
                    <span>Enroll Now</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Speaking Availability Card */}
      <Card className="group hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Mic className="h-4 w-4 text-electric-yellow" />
            <CardTitle className="text-base font-semibold">Speaking</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Available for Events</span>
                <Badge className="text-xs bg-green-500 text-white">Open</Badge>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Global (Virtual/In-person)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Topics: Design Systems, AI in Creative Work, Indie Entrepreneurship
            </p>
            <Button 
              size="sm" 
              variant="outline"
              className="w-full h-8 text-xs hover:bg-electric-yellow hover:text-black font-medium"
              asChild
            >
              <a href="#speaker">
                Book Me to Speak
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}