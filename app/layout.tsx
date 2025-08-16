import { Metadata } from "next";
import './globals.css';
import NavBar from "./(components)/NavBar";
import Footer from "./(components)/Footer";
import ScrollProgress from "./(components)/ScrollProgress";
import FloatingActions from "./(components)/FloatingActions";
import CursorFollower from "./(components)/CursorFollower";
import ParticleBackground from "./(components)/ParticleBackground";

export const metadata: Metadata = {
  title: "Abdelfattah Berkach - Software Engineer",
  description: "Experienced software engineer specializing in system programming and full-stack development. Graduate of 1337 Coding School with expertise in C/C++, React, and modern web technologies.",
  keywords: ["software engineer", "web development", "system programming", "full-stack", "1337", "C++", "React", "Next.js", "portfolio"],
  authors: [{ name: "Abdelfattah Berkach" }],
  openGraph: {
    title: "Abdelfattah Berkach - Software Engineer",
    description: "Professional software engineer with expertise in system programming and full-stack development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen animated-bg page-transition">
        <ScrollProgress />
        <ParticleBackground />
        <CursorFollower />
        
        {/* Floating background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="floating-bg floating-element absolute top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="floating-bg floating-element absolute top-40 right-20 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
          <div className="floating-bg floating-element absolute bottom-20 left-1/3 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <NavBar />
          <main>
            {children}
          </main>
          <Footer />
        </div>
        
        {/* UI Enhancement Components */}
        <FloatingActions />
      </body>
    </html>
  );
}
