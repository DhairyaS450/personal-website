import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { ContentProvider } from "@/contexts/ContentContext";
import { ChatbotProvider } from "@/contexts/ChatbotContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import CustomCursor from "@/components/CustomCursor";
import ChatbotWrapper from "@/components/ChatbotWrapper";

export const metadata: Metadata = {
  title: "Dhairya Shah | Personal Website",
  description: "Personal website and portfolio showcasing projects and skills",
  keywords: ["developer", "portfolio", "web development", "next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ContentProvider>
            <ChatbotProvider>
              <AnimatedBackground />
              <CustomCursor />
              <div className="flex flex-col min-h-screen content-layer">
                <Navbar />
                <main className="flex-grow pt-24">{children}</main>
                <Footer />
              </div>
              <ChatbotWrapper />
            </ChatbotProvider>
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
