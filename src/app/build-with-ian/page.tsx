import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Build with Ian - AI Agent Community Waitlist",
  description: "Join the exclusive community where I teach AI and building AI Agents. Learn to build intelligent automation, chatbots, and AI-powered tools.",
  keywords: ["AI Agents", "AI Community", "Learn AI", "Build AI", "Ian Almeida", "AI Education", "Machine Learning"],
  openGraph: {
    title: "Build with Ian - AI Agent Community Waitlist",
    description: "Join the exclusive community where I teach AI and building AI Agents. Learn to build intelligent automation, chatbots, and AI-powered tools.",
    url: "https://ianalmeida.com/build-with-ian",
    images: [
      {
        url: "/assets/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Build with Ian - AI Agent Community",
      },
    ],
  },
};


export default function BuildWithIanPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6">
          🚀 Coming Soon
        </Badge>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Build with <span className="text-electric-yellow">Ian</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Join the exclusive community where I teach AI and building AI Agents.
          Learn to create intelligent automation, chatbots, and AI-powered tools
          that actually work.
        </p>

        {/* Waitlist Form */}
        <Card className="p-8 max-w-md mx-auto mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Join the Waitlist</h3>
            <p className="text-muted-foreground">
              Be the first to know when we launch and get exclusive early access.
            </p>

            <form className="space-y-4" action="#" method="POST">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
                required
              />
              <Input
                type="text"
                placeholder="Your name"
                className="w-full"
                required
              />
              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="text-sm text-muted-foreground">
              💌 No spam, just exclusive updates and early access
            </p>
          </div>
        </Card>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Limited Spots Available
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Early Access Perks
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Direct Access to Ian
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Limited to 50 founding members • Launching Q2 2025
        </p>
      </div>
    </div>
  );
}