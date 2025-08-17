import { Metadata } from "next";
import './globals.css';
import NavBar from "./(components)/NavBar";
import Footer from "./(components)/Footer";
import ScrollProgress from "./(components)/ScrollProgress";
import FloatingActions from "./(components)/FloatingActions";
import CursorFollower from "./(components)/CursorFollower";
import ParticleBackground from "./(components)/ParticleBackground";

export const metadata: Metadata = {
  title: "Abdelfattah Berkach - Software Engineer & Developer",
  description: "Professional software engineer specializing in system programming, full-stack development, and modern web technologies. Graduate of 1337 Coding School with expertise in C/C++, React, Next.js, and Docker.",
  keywords: [
    "Abdelfattah Berkach", "software engineer", "web developer", "system programming", 
    "full-stack developer", "1337 School", "42 Network", "C++", "React", "Next.js", 
    "TypeScript", "Docker", "PostgreSQL", "Morocco developer", "portfolio"
  ],
  authors: [{ name: "Abdelfattah Berkach", url: "https://github.com/aberkach" }],
  creator: "Abdelfattah Berkach",
  publisher: "Abdelfattah Berkach",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Abdelfattah Berkach - Software Engineer & Developer",
    description: "Professional software engineer with expertise in system programming, full-stack development, and modern web technologies. Available for freelance and collaboration.",
    type: "website",
    locale: "en_US",
    siteName: "Abdelfattah Berkach Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelfattah Berkach - Software Engineer",
    description: "Professional software engineer specializing in system programming and full-stack development",
  },
  verification: {
    google: "your-google-verification-code", // Add your actual verification code
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
