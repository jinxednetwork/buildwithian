"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Users, TrendingUp, Zap } from "lucide-react"

export function NewsletterStrip() {
  return (
    <section className="py-16 px-4 bg-electric-yellow text-black">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-black text-white border-0 overflow-hidden">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4">
                <Zap className="h-8 w-8" />
              </div>
              <div className="absolute top-8 right-8">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="absolute bottom-4 left-1/4">
                <Users className="h-6 w-6" />
              </div>
            </div>

            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-6 w-6 text-electric-yellow" />
                      <span className="text-sm font-medium text-electric-yellow uppercase tracking-wider">
                        Newsletter
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Weekly Insights for Builders
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Get the tactics, tools, and mindsets I use to build and scale creative ventures. 
                      No fluff, just actionable insights every Thursday.
                    </p>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-electric-yellow" />
                      <span className="text-gray-300">2,400+ subscribers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-electric-yellow" />
                      <span className="text-gray-300">45% open rate</span>
                    </div>
                  </div>

                  {/* Value Props */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-electric-yellow rounded-full"></div>
                        <span className="text-gray-300">Design insights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-electric-yellow rounded-full"></div>
                        <span className="text-gray-300">Growth tactics</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-electric-yellow rounded-full"></div>
                        <span className="text-gray-300">AI tools</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-electric-yellow rounded-full"></div>
                        <span className="text-gray-300">Mumbai scene</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Join 2,400+ creative entrepreneurs
                        </label>
                        <div className="flex space-x-3">
                          <Input 
                            type="email" 
                            placeholder="your@email.com"
                            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-electric-yellow"
                          />
                          <Button 
                            size="lg"
                            className="bg-electric-yellow text-black hover:bg-electric-yellow/90 font-semibold px-8"
                          >
                            Subscribe
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        Free forever. Unsubscribe anytime. No spam, ever.
                      </p>
                    </div>
                  </div>

                  {/* Recent Topic Preview */}
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">Last week&apos;s topic:</p>
                    <p className="text-sm font-medium text-electric-yellow">
                      &ldquo;How I used AI to 10x my design workflow&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}