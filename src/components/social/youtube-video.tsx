import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, ThumbsUp, ExternalLink, Youtube } from "lucide-react"
import youtubeVideo from "@/data/youtube-video.json"

export function YouTubeVideo() {
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const formatDuration = (duration: string) => {
    // Convert PT15M32S to 15:32
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return "0:00"
    
    const hours = parseInt(match[1] || "0")
    const minutes = parseInt(match[2] || "0")
    const seconds = parseInt(match[3] || "0")
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-red-600">
            <Youtube className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Latest Video</h3>
            <p className="text-sm text-muted-foreground">@buildwithIan</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="hover:bg-electric-yellow hover:text-black"
        >
          <a 
            href={youtubeVideo.channelUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <span>Subscribe</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>

      {/* Video Card */}
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Video Embed */}
        <CardContent className="p-0">
          <div className="aspect-video relative">
            <iframe
              src={`${youtubeVideo.embedUrl}?rel=0&modestbranding=1`}
              title={youtubeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </CardContent>

        {/* Video Info */}
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-base leading-tight">
              {youtubeVideo.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {youtubeVideo.description}
            </p>
          </div>

          {/* Video Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatCount(youtubeVideo.viewCount)} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{formatCount(youtubeVideo.likeCount)} likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Play className="h-4 w-4" />
              <span>{formatDuration(youtubeVideo.duration)}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {formatDate(youtubeVideo.publishedAt)}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-2">
            <Button 
              className="flex-1 bg-electric-yellow text-black hover:bg-electric-yellow/90"
              asChild
            >
              <a 
                href={youtubeVideo.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <Youtube className="h-4 w-4" />
                <span>Watch on YouTube</span>
              </a>
            </Button>
            <Button 
              variant="outline"
              asChild
              className="hover:bg-electric-yellow hover:text-black"
            >
              <a 
                href={youtubeVideo.channelUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Subscribe
              </a>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Channel CTA */}
      <div className="text-center pt-2">
        <Button 
          variant="ghost" 
          asChild
          className="text-electric-yellow hover:bg-electric-yellow hover:text-black"
        >
          <a 
            href={youtubeVideo.channelUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View all videos on YouTube →
          </a>
        </Button>
      </div>
    </div>
  )
}