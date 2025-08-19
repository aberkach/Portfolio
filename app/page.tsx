'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { 
  FaRocket, FaClock, FaStar, FaComments, FaGraduationCap, 
  FaTrophy, FaCog, FaGlobe, FaTools, FaMapMarkerAlt, FaBriefcase,
  FaDownload 
} from 'react-icons/fa';
import { SimpleCodeLoader, ButtonLoader } from './(components)/Loading';
import { useSimulatedLoading, useAsyncLoading } from './(components)/LoadingHelpers';

export default function Home() {
  const containerRef = useRef(null);
  const isInitialLoading = useSimulatedLoading(800); // Same as other pages
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isProjectTransitioning, setIsProjectTransitioning] = useState(false);
  const { isLoading: isViewingProject, execute: executeViewProject } = useAsyncLoading();
  const { isLoading: isNavigating, execute: executeNavigation } = useAsyncLoading();
  const { isLoading: isDownloading, execute: executeDownload } = useAsyncLoading();

  // Loading animation
  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const projects = [
    {
      id: 1,
      title: "ft_transcendence",
      description: "Enterprise-grade real-time multiplayer gaming platform with OAuth authentication, WebSocket communication, and comprehensive user management system.",
      tech: ["Next.js", "React", "WebSockets", "OAuth", "PostgreSQL", "Docker", "TypeScript"],
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      category: "Full-Stack",
      status: "Completed",
      year: "2024",
      image: "/transcendence.jpg",
      features: ["Real-time multiplayer", "OAuth integration", "User management", "WebSocket communication"],
      github: "https://github.com/aberkach/ft_transcendence",
      demo: "#"
    },
    {
      id: 2,
      title: "ft_irc",
      description: "High-performance IRC server implementation from scratch, supporting concurrent connections, channel management, and real-time messaging protocols.",
      tech: ["C++", "Network Programming", "Multi-threading", "Socket Programming", "IRC Protocol"],
      gradient: "from-green-400 via-blue-500 to-purple-600",
      category: "System Programming",
      status: "Completed",
      year: "2024",
      image: "/ft_irc.jpg",
      features: ["Concurrent connections", "Channel management", "IRC protocol", "Multi-threading"],
      github: "https://github.com/aberkach/ft_irc",
      demo: "#"
    },
    {
      id: 3,
      title: "cub3d",
      description: "Advanced 3D graphics engine with raycasting algorithm, texture mapping, and collision detection. Inspired by classic Wolfenstein 3D architecture.",
      tech: ["C", "Raycasting", "Computer Graphics", "Algorithm Optimization", "Memory Management"],
      gradient: "from-orange-400 via-red-500 to-pink-500",
      category: "Graphics Programming",
      status: "Completed",
      year: "2023",
      image: "/cub3d.png",
      features: ["3D raycasting", "Texture mapping", "Collision detection", "Graphics optimization"],
      github: "https://github.com/aberkach/cub3d",
      demo: "#"
    },
    {
      id: 4,
      title: "philosophers",
      description: "Multi-threaded simulation solving the dining philosophers problem with mutex synchronization and deadlock prevention algorithms.",
      tech: ["C", "Threading", "Mutex", "Synchronization", "Algorithms"],
      gradient: "from-purple-400 via-pink-500 to-red-500",
      category: "System Programming",
      status: "Completed",
      year: "2023",
      image: "/Dining-Philosophers-Problem.png",
      features: ["Thread synchronization", "Deadlock prevention", "Resource management", "Performance optimization"],
      github: "https://github.com/aberkach/philosophers",
      demo: "#"
    },
    {
      id: 5,
      title: "minishell",
      description: "Custom shell implementation with command parsing, pipe handling, environment variables, and built-in commands support.",
      tech: ["C", "System Calls", "Process Management", "Parsing", "Shell Programming"],
      gradient: "from-teal-400 via-cyan-500 to-blue-600",
      category: "System Programming",
      status: "Completed",
      year: "2023",
      image: "/minishell.jpeg",
      features: ["Command parsing", "Pipe implementation", "Environment variables", "Built-in commands"],
      github: "https://github.com/aberkach/minishell",
      demo: "#"
    },
    {
      id: 6,
      title: "Inception",
      description: "Containerized web infrastructure using Docker. Multi-service architecture with Nginx, WordPress, MariaDB, and custom configurations.",
      tech: ["Docker", "Docker Compose", "Nginx", "MariaDB", "WordPress"],
      gradient: "from-emerald-400 via-cyan-500 to-blue-600",
      category: "DevOps",
      status: "Completed",
      year: "2023",
      image: "/inception.png",
      features: ["Docker containers", "Multi-service architecture", "Nginx configuration", "Database management"],
      github: "https://github.com/aberkach/Inception",
      demo: "#"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setIsProjectTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
      setIsProjectTransitioning(false);
    }, 200);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setIsProjectTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
      setIsProjectTransitioning(false);
    }, 200);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setIsProjectTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsProjectTransitioning(false);
    }, 200);
    setIsAutoPlaying(false);
  };

  const handleDownloadCV = async () => {
    const downloadCV = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = '/abdelfattah_berkach_CV.pdf';
      link.download = 'Abdelfattah_Berkach_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return 'CV downloaded successfully!';
    };

    try {
      await executeDownload(downloadCV);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleNavigation = async (url: string) => {
    const navigate = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      window.location.href = url;
      return 'Navigation completed!';
    };

    try {
      await executeNavigation(navigate);
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const handleViewProject = async (url: string) => {
    const viewProject = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      window.open(url, '_blank');
      return 'Project opened successfully!';
    };

    try {
      await executeViewProject(viewProject);
    } catch (error) {
      console.error('Failed to open project:', error);
    }
  };

  return (
    <>
      <SimpleCodeLoader isLoading={isInitialLoading} />
      <div className="min-h-screen stable-layout">
        {/* Main Content */}
        <motion.div 
          ref={containerRef}
          className="min-h-screen relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        {/* Hero Section */}
        <motion.div 
          className="min-h-screen flex flex-col justify-center text-center hero-section stable-layout relative" 
          variants={itemVariants}
        >
          {/* Floating elements */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-xl"
              animate={{
                y: [0, 15, 0],
                x: [0, -15, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-full blur-xl"
              animate={{
                y: [0, -10, 0],
                x: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </motion.div>

          <motion.div className="mb-8 relative z-10">
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-3 glass-effect border border-primary-500/30 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(14, 165, 233, 0.5)" }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-primary-400 font-medium tracking-wide uppercase text-sm">
                Available for Opportunities
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl xl:text-8xl font-bold text-textPrimary mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <motion.span 
                className="gradient-text animate-shimmer bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-[length:200%_100%] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Abdelfattah
              </motion.span>
              <br />
              <motion.span 
                className="gradient-text bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Berkach
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-textSecondary font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Software Engineer crafting{" "}
              <motion.span 
                className="text-primary-400 font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                robust systems
              </motion.span>
              {" "}& scalable solutions
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <motion.p 
              className="text-2xl lg:text-3xl text-textSecondary mb-6 font-light"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Building robust systems & scalable solutions
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4 text-sm text-textMuted"
              variants={itemVariants}
            >
              <span className="px-3 py-1 glass-effect border border-primary-500/20 rounded-full">
                <FaGraduationCap className="inline-block mr-2" /> 1337 Coding School Graduate
              </span>
              <span className="px-3 py-1 glass-effect border border-secondary-500/20 rounded-full">
                <FaMapMarkerAlt className="inline-block mr-2" /> Taza, Morocco
              </span>
              <span className="px-3 py-1 glass-effect border border-accent-500/20 rounded-full">
                <FaBriefcase className="inline-block mr-2" /> Available for Opportunities
              </span>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-lg text-textMuted max-w-4xl mx-auto leading-relaxed mb-12"
            variants={itemVariants}
          >
            Specialized in <span className="text-primary-400 font-semibold">system programming</span> and <span className="text-secondary-400 font-semibold">full-stack development</span>. 
            Experienced in building high-performance applications, from low-level C/C++ systems to modern web platforms. 
            Passionate about clean code, scalable architecture, and innovative problem-solving.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => handleNavigation('/projects')}
              disabled={isNavigating}
              className="group btn-primary btn-enhanced text-lg px-12 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover relative overflow-hidden min-h-[56px]"
              whileHover={!isNavigating ? { 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px rgba(14, 165, 233, 0.4)"
              } : {}}
              whileTap={!isNavigating ? { scale: 0.95 } : {}}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <div className="relative z-10 flex items-center gap-3">
                {isNavigating ? (
                  <>
                    <ButtonLoader size="sm" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Explore My Work</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => handleNavigation('/contact')}
              disabled={isNavigating}
              className="group btn-secondary btn-enhanced text-textPrimary py-4 px-12 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover relative overflow-hidden border border-primary-500/30 min-h-[56px]"
              whileHover={!isNavigating ? { 
                scale: 1.05, 
                y: -5,
                borderColor: "rgba(14, 165, 233, 0.6)",
                backgroundColor: "rgba(14, 165, 233, 0.1)"
              } : {}}
              whileTap={!isNavigating ? { scale: 0.95 } : {}}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <div className="relative z-10 flex items-center gap-3">
                {isNavigating ? (
                  <>
                    <ButtonLoader size="sm" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Let&apos;s Connect</span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaComments className="text-lg" />
                    </motion.span>
                  </>
                )}
              </div>
            </motion.button>
            
            <motion.button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="group btn-secondary btn-enhanced text-textPrimary py-4 px-12 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 tooltip disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover relative overflow-hidden border border-accent-500/30 min-h-[56px]"
              data-tooltip="Download my CV"
              whileHover={!isDownloading ? { 
                scale: 1.05, 
                y: -5,
                borderColor: "rgba(139, 92, 246, 0.6)",
                backgroundColor: "rgba(139, 92, 246, 0.1)"
              } : {}}
              whileTap={!isDownloading ? { scale: 0.95 } : {}}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <div className="relative z-10 flex items-center gap-3">
                {isDownloading ? (
                  <>
                    <ButtonLoader size="sm" />
                    <span>Preparing...</span>
                  </>
                ) : (
                  <>
                    <span>Download CV</span>
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaDownload />
                    </motion.span>
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Skills Preview */}
        <motion.div className="py-20" variants={itemVariants}>
          <motion.h2 
            className="text-4xl font-bold text-textPrimary text-center mb-16"
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
          >
            Technical <span className="gradient-text">Expertise</span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* System Programming */}
            <motion.div
              className="glass-effect gradient-border-animated card-premium p-8 rounded-3xl group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(14, 165, 233, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-6">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center magnetic-hover"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <FaCog className="text-2xl text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-textPrimary mb-2 gradient-text">System Programming</h3>
                <p className="text-textSecondary text-sm">Low-level programming & optimization</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['C', 'C++', 'Linux', 'Algorithms'].map((tech, index) => (
                  <motion.span 
                    key={tech} 
                    className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs border border-primary-500/30 cursor-pointer tooltip magnetic-hover stagger-item"
                    data-tooltip={`Expert in ${tech}`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Web Development */}
            <motion.div
              className="glass-effect gradient-border-animated card-premium p-8 rounded-3xl group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-6">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center magnetic-hover"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <FaGlobe className="text-2xl text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-textPrimary mb-2 gradient-text">Web Development</h3>
                <p className="text-textSecondary text-sm">Modern full-stack solutions</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech, index) => (
                  <motion.span 
                    key={tech} 
                    className="px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-xs border border-secondary-500/30 cursor-pointer tooltip magnetic-hover stagger-item"
                    data-tooltip={`Proficient in ${tech}`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* DevOps & Tools */}
            <motion.div
              className="glass-effect gradient-border-animated card-premium p-8 rounded-3xl group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(16, 185, 129, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-6">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center magnetic-hover"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <FaTools className="text-2xl text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-textPrimary mb-2 gradient-text">DevOps & Tools</h3>
                <p className="text-textSecondary text-sm">Development & deployment tools</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Docker', 'Git', 'PostgreSQL', 'Shell'].map((tech, index) => (
                  <motion.span 
                    key={tech} 
                    className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-xs border border-accent-500/30 cursor-pointer tooltip magnetic-hover stagger-item"
                    data-tooltip={`Experienced with ${tech}`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Professional Stats */}
        <motion.div 
          className="py-20"
          variants={itemVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {[
              { number: "15+", label: "Projects Completed", IconComponent: FaRocket, color: "from-blue-500 to-purple-600" },
              { number: "3", label: "Years Experience", IconComponent: FaClock, color: "from-purple-500 to-pink-600" },
              { number: "100%", label: "Client Satisfaction", IconComponent: FaStar, color: "from-green-500 to-teal-600" },
              { number: "24/7", label: "Support Available", IconComponent: FaComments, color: "from-orange-500 to-red-600" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-premium glass-morphism gradient-border-animated p-6 rounded-3xl text-center magnetic-hover stagger-item group"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: "0 25px 50px rgba(14, 165, 233, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 400, delay: index * 0.1 }}
              >
                <motion.div 
                  className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center magnetic-hover`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <stat.IconComponent className="text-white text-xl" />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-textPrimary mb-2 gradient-text shimmer-text"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-textSecondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Projects Carousel */}
        <motion.div 
          variants={itemVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true, amount: 0.2 }}
          className="py-20"
        >
          <motion.h2 
            className="text-4xl font-bold text-textPrimary text-center mb-16 gradient-text shimmer-text"
            variants={itemVariants}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          
          {/* Carousel Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-3xl">
              <motion.div 
                className="flex transition-transform duration-500 ease-in-out"
                animate={{ x: `${-currentSlide * 100}%` }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {projects.map((project, index) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className="card-premium glass-morphism gradient-border-animated rounded-3xl overflow-hidden magnetic-hover group h-[600px] relative stagger-item"
                      whileHover={{ 
                        y: -15,
                        scale: 1.02,
                        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)"
                      }}
                      transition={{ type: "spring", stiffness: 400, delay: index * 0.1 }}
                    >
                      {/* Project Header */}
                      <motion.div 
                        className="h-64 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-3xl font-bold text-white text-glow mb-2">
                                {project.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-white/80">
                                <span className="px-3 py-1 bg-white/20 rounded-full">{project.category}</span>
                                <span>{project.year}</span>
                                <span className="px-3 py-1 bg-green-500/50 rounded-full">{project.status}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => handleViewProject(project.github)}
                                disabled={isViewingProject}
                                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isViewingProject ? { scale: 1.1, rotate: 15 } : {}}
                                whileTap={!isViewingProject ? { scale: 0.9 } : {}}
                              >
                                {isViewingProject ? (
                                  <ButtonLoader size="sm" />
                                ) : (
                                  <Github size={18} className="text-white" />
                                )}
                              </motion.button>
                              <motion.button
                                onClick={() => handleViewProject(project.demo)}
                                disabled={isViewingProject}
                                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isViewingProject ? { scale: 1.1, rotate: 15 } : {}}
                                whileTap={!isViewingProject ? { scale: 0.9 } : {}}
                              >
                                {isViewingProject ? (
                                  <ButtonLoader size="sm" />
                                ) : (
                                  <ExternalLink size={18} className="text-white" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                          
                          {/* Progress indicator */}
                          <div className="w-full bg-white/20 rounded-full h-1">
                            <motion.div 
                              className="bg-white h-1 rounded-full"
                              style={{ width: "100%" }}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                        
                        {/* Animated background pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"]
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            backgroundImage: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                            backgroundSize: "20px 20px"
                          }}
                        />
                      </motion.div>

                      {/* Project Content */}
                      <div className="p-8 h-[336px] flex flex-col">
                        <p className="text-textSecondary leading-relaxed mb-6 flex-grow">
                          {project.description}
                        </p>
                        
                        {/* Key Features */}
                        <div className="mb-6">
                          <h4 className="text-textPrimary font-semibold mb-3 text-sm uppercase tracking-wide">Key Features</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {project.features.map((feature, featureIndex) => (
                              <motion.div
                                key={feature}
                                className="flex items-center gap-2 text-sm text-textSecondary"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.1 }}
                              >
                                <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                                <span>{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 5).map((techItem, techIndex) => (
                              <motion.span 
                                key={techItem} 
                                className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300"
                                whileHover={{ scale: 1.1, y: -2 }}
                                transition={{ delay: techIndex * 0.05 }}
                              >
                                {techItem}
                              </motion.span>
                            ))}
                            {project.tech.length > 5 && (
                              <span className="px-3 py-1 bg-textMuted/20 text-textMuted rounded-full text-xs">
                                +{project.tech.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Project Footer */}
                        <motion.div 
                          className="flex justify-between items-center pt-4 border-t border-primary-500/20 mt-auto"
                          whileHover={{ borderColor: "rgba(14, 165, 233, 0.4)" }}
                        >
                          <div className="flex items-center gap-2 text-xs text-textMuted">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>{project.status}</span>
                          </div>
                          <motion.button
                            className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-2"
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Details
                            <span>→</span>
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              disabled={isProjectTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-morphism border border-primary-500/30 rounded-full flex items-center justify-center text-textPrimary hover:border-primary-400/50 hover:bg-primary-500/10 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover btn-icon"
              whileHover={!isProjectTransitioning ? { scale: 1.15, x: -4 } : {}}
              whileTap={!isProjectTransitioning ? { scale: 0.9 } : {}}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {isProjectTransitioning ? (
                <ButtonLoader size="sm" />
              ) : (
                <ChevronLeft size={24} />
              )}
            </motion.button>

            <motion.button
              onClick={nextSlide}
              disabled={isProjectTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-morphism border border-primary-500/30 rounded-full flex items-center justify-center text-textPrimary hover:border-primary-400/50 hover:bg-primary-500/10 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover btn-icon"
              whileHover={!isProjectTransitioning ? { scale: 1.15, x: 4 } : {}}
              whileTap={!isProjectTransitioning ? { scale: 0.9 } : {}}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {isProjectTransitioning ? (
                <ButtonLoader size="sm" />
              ) : (
                <ChevronRight size={24} />
              )}
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isProjectTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 scale-125 shadow-glow' 
                      : 'bg-textMuted/30 hover:bg-textMuted/50 hover:scale-110'
                  }`}
                  whileHover={!isProjectTransitioning ? { scale: 1.2 } : {}}
                  whileTap={!isProjectTransitioning ? { scale: 0.9 } : {}}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-4">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  isAutoPlaying 
                    ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30' 
                    : 'bg-textMuted/20 text-textMuted border border-textMuted/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'} Slideshow
              </motion.button>
            </div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.a 
              href="/projects" 
              className="btn-primary magnetic-hover stagger-item inline-flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>Explore All Projects</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Professional Achievements */}
        <motion.div 
          className="py-20"
          variants={itemVariants}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-textPrimary text-center mb-16 gradient-text shimmer-text"
            variants={itemVariants}
          >
            Professional <span className="gradient-text">Highlights</span>
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {/* Education */}
            <motion.div 
              className="card-premium glass-morphism gradient-border-animated p-8 rounded-3xl magnetic-hover stagger-item"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                boxShadow: "0 30px 60px rgba(14, 165, 233, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 magnetic-hover">
                  <FaGraduationCap className="text-xl text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">1337 Coding School</h3>
                  <p className="text-primary-400 font-medium mb-2">Software Engineering Program</p>
                  <p className="text-textSecondary text-sm leading-relaxed">
                    Intensive peer-to-peer learning program focused on problem-solving, algorithms, 
                    and modern software development practices. Completed rigorous curriculum including 
                    system programming, web development, and computer graphics.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-xs">
                      2022-2024
                    </span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
                      Top Performer
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications/Skills */}
            <motion.div 
              className="card-premium glass-morphism gradient-border-animated p-8 rounded-3xl magnetic-hover stagger-item"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                boxShadow: "0 30px 60px rgba(139, 92, 246, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 magnetic-hover">
                  <FaTrophy className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">Core Competencies</h3>
                  <p className="text-secondary-400 font-medium mb-2">Professional Development</p>
                  <ul className="text-textSecondary text-sm leading-relaxed space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                      Advanced C/C++ Programming & Memory Management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                      Full-Stack Web Development (React/Next.js)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                      System Architecture & Performance Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                      Agile Development & Team Collaboration
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
      </div>
    </>
  );
}
