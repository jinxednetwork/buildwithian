"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Build with Ian",
    href: "/build-with-ian",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-background">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="font-bold text-xl hover:text-electric-yellow transition-colors"
          >
            Ian Almeida
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-electric-yellow",
                  pathname === item.href
                    ? "text-electric-yellow"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}