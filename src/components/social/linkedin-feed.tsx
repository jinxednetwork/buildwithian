"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, ExternalLink, Linkedin } from "lucide-react"
import linkedinPosts from "@/data/linkedin-posts.json"

export function LinkedInFeed() {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())

  const toggleExpanded = (postId: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const formatEngagement = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return `${Math.floor(diffInHours / 168)}w ago`
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-600">
            <Linkedin className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">LinkedIn Posts</h3>
            <p className="text-sm text-muted-foreground">Latest thoughts</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="hover:bg-electric-yellow hover:text-black"
        >
          <a 
            href="https://www.linkedin.com/in/ianalmeida/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <span>Connect</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {linkedinPosts.slice(0, 3).map((post) => {
          const isExpanded = expandedPosts.has(post.id)
          const shouldTruncate = post.content.length > 150
          const displayContent = isExpanded ? post.fullContent : post.content

          return (
            <Card key={post.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/assets/profile.jpg" alt="Ian Almeida" />
                    <AvatarFallback className="bg-electric-yellow text-black font-semibold">
                      IA
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{post.author.name}</h4>
                        <p className="text-xs text-muted-foreground">{post.author.title}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <Linkedin className="h-3 w-3 mr-1" />
                        Post
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Post Content */}
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {shouldTruncate && !isExpanded 
                      ? displayContent.substring(0, 150) + "..."
                      : displayContent
                    }
                  </p>
                  
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpanded(post.id)}
                      className="text-electric-yellow hover:underline text-sm font-medium"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{formatEngagement(post.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="h-4 w-4" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="hover:bg-electric-yellow hover:text-black"
                  >
                    <a 
                      href={post.postUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1"
                    >
                      <span>View</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* View More */}
      <div className="text-center pt-2">
        <Button 
          variant="ghost" 
          asChild
          className="text-electric-yellow hover:bg-electric-yellow hover:text-black"
        >
          <a 
            href="https://www.linkedin.com/in/ianalmeida/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View all posts on LinkedIn →
          </a>
        </Button>
      </div>
    </div>
  )
}