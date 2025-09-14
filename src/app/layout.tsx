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
  title: "Ian Almeida - Designer, Indie-Hacker, Builder",
  description: "Personal website of Ian Almeida - Designer, Indie-Hacker, and Builder of Cool Sh*t from Mumbai. Co-founder opportunities, workshops, and speaking engagements available.",
  keywords: ["Ian Almeida", "Designer", "Indie Hacker", "Mumbai", "Entrepreneur", "Speaker", "Co-founder", "Workshops", "AI", "Creative Technology"],
  authors: [{ name: "Ian Almeida" }],
  creator: "Ian Almeida",
  openGraph: {
    title: "Ian Almeida - Designer, Indie-Hacker, Builder",
    description: "Creative technologist from Mumbai building ventures at the intersection of design, AI, and content.",
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
    title: "Ian Almeida - Designer, Indie-Hacker, Builder",
    description: "Creative technologist from Mumbai building ventures at the intersection of design, AI, and content.",
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
          defaultTheme="system"
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
