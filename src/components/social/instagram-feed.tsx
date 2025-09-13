import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Instagram } from "lucide-react"
import instagramPosts from "@/data/instagram-posts.json"

export function InstagramFeed() {
  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}k`
    }
    return likes.toString()
  }

  const formatCaption = (caption: string, maxLength: number = 60) => {
    if (caption.length <= maxLength) return caption
    return caption.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
            <Instagram className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">@buildwithian</h3>
            <p className="text-sm text-muted-foreground">Latest posts</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="hover:bg-electric-yellow hover:text-black"
        >
          <a 
            href="https://www.instagram.com/buildwithian/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <span>Follow</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {instagramPosts.slice(0, 6).map((post) => (
          <Card key={post.id} className="group overflow-hidden hover:shadow-md transition-all duration-300">
            <CardContent className="p-0 relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={formatCaption(post.caption, 100)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center space-y-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm font-medium">{formatLikes(post.likes)}</span>
                    </div>
                    <p className="text-xs px-2 leading-relaxed">
                      {formatCaption(post.caption, 80)}
                    </p>
                  </div>
                </div>
              </div>

              {/* View on Instagram link */}
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={`View Instagram post: ${formatCaption(post.caption, 50)}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View More */}
      <div className="text-center pt-2">
        <Button 
          variant="ghost" 
          asChild
          className="text-electric-yellow hover:bg-electric-yellow hover:text-black"
        >
          <a 
            href="https://www.instagram.com/buildwithian/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View all posts on Instagram →
          </a>
        </Button>
      </div>
    </div>
  )
}