import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FramesWithin - AI-Powered Color Grading & Content Optimization",
  description: "Craft viral videos with AI-powered color grading, palette extraction, and content optimization suggestions. Perfect for creators and video editors.",
  keywords: ["color grading", "AI", "video editing", "palette extraction", "content optimization", "creators"],
  authors: [{ name: "FramesWithin" }],
  openGraph: {
    title: "FramesWithin - AI-Powered Color Grading",
    description: "Craft viral videos with AI-powered color grading and content optimization",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
