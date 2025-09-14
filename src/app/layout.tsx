import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";
import { Navigation } from "@/components/navigation";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ian Almeida - Designer, Indie-Hacker & AI Builder from Mumbai",
    template: "%s | Ian Almeida"
  },
  description: "Creative technologist from Mumbai building AI-powered ventures. Designer, indie-hacker, and entrepreneur offering co-founder opportunities, AI workshops, and speaking engagements. Join 2400+ entrepreneurs following my journey.",
  keywords: ["Ian Almeida", "Designer Mumbai", "AI Builder", "Indie Hacker India", "Creative Technologist", "Entrepreneur Mumbai", "AI Workshops", "Co-founder Opportunities", "Speaking Engagements", "Creative Technology", "Design Systems", "Jinxed Network"],
  authors: [{ name: "Ian Almeida" }],
  creator: "Ian Almeida",
  openGraph: {
    title: "Ian Almeida - Designer, Indie-Hacker & AI Builder from Mumbai",
    description: "Creative technologist from Mumbai building AI-powered ventures. Designer, indie-hacker, and entrepreneur offering co-founder opportunities, AI workshops, and speaking engagements.",
    url: "https://ianalmeida.com",
    siteName: "Ian Almeida",
    images: [
      {
        url: "/assets/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ian Almeida - Designer, Indie-Hacker, Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Almeida - Designer, Indie-Hacker & AI Builder from Mumbai",
    description: "Creative technologist from Mumbai building AI-powered ventures. Designer, indie-hacker, and entrepreneur offering co-founder opportunities, AI workshops, and speaking engagements.",
    images: ["/assets/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
