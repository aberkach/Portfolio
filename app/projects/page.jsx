'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaDownload, FaSearch } from 'react-icons/fa';
import { ButtonLoader, SimpleCodeLoader } from '../(components)/Loading';
import { useAsyncLoading, useSimulatedLoading } from '../(components)/LoadingHelpers';

export default function ProjectsPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const { isLoading: isDownloading, execute: executeDownload } = useAsyncLoading();
    
    // Add page loading state
    const pageLoading = useSimulatedLoading(800);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const projects = [
        {
            id: 1,
            title: "ft_transcendence",
            description: "Real-time multiplayer ping pong game with modern web technologies. Features include OAuth authentication, live chat, game spectating, and tournament system.",
            technologies: ["Next.js", "React", "WebSockets", "OAuth", "PostgreSQL", "Docker"],
            image: "/transcendence.jpg",
            liveLink: null,
            githubLink: "https://github.com/aberkach/ft_transcendence",
            gradient: "from-blue-500 via-purple-500 to-pink-500",
            category: "Web Development"
        },
        {
            id: 2,
            title: "ft_irc",
            description: "IRC server implementation in C++ following RFC standards. Supports multiple channels, private messaging, operator commands, and file transfers.",
            technologies: ["C++", "Socket Programming", "IRC Protocol", "Multi-threading"],
            image: "/ft_irc.jpg",
            liveLink: null,
            githubLink: "https://github.com/aberkach/ft_irc",
            gradient: "from-green-400 via-teal-500 to-blue-600",
            category: "System Programming"
        },
        {
            id: 3,
            title: "cub3d",
            description: "3D raycasting game engine inspired by Wolfenstein 3D. Built from scratch in C with custom graphics rendering and collision detection.",
            technologies: ["C", "MinilibX", "Raycasting", "Graphics Programming"],
            image: "/cub3d.png",
            liveLink: null,
            githubLink: "https://github.com/aberkach/cub3d",
            gradient: "from-orange-400 via-red-500 to-pink-500",
            category: "Graphics Programming"
        },
        {
            id: 4,
            title: "minishell",
            description: "Unix shell implementation with command parsing, environment variables, pipes, redirections, and built-in commands like cd, pwd, echo.",
            technologies: ["C", "Unix Systems", "Process Management", "Parsing"],
            image: "/minishell.jpeg",
            liveLink: null,
            githubLink: "https://github.com/aberkach/minishell",
            gradient: "from-cyan-400 via-blue-500 to-purple-600",
            category: "System Programming"
        },
        {
            id: 5,
            title: "philosophers",
            description: "Solution to the dining philosophers problem demonstrating concurrent programming concepts with threads and mutexes to avoid deadlocks.",
            technologies: ["C", "Threading", "Mutexes", "Synchronization"],
            image: "/Dining-Philosophers-Problem.png",
            liveLink: null,
            githubLink: "https://github.com/aberkach/philosophers",
            gradient: "from-indigo-400 via-purple-500 to-pink-500",
            category: "Concurrency"
        },
        {
            id: 6,
            title: "Inception",
            description: "Containerized web infrastructure using Docker. Multi-service architecture with Nginx, WordPress, MariaDB, and custom configurations.",
            technologies: ["Docker", "Docker Compose", "Nginx", "MariaDB", "WordPress"],
            image: "/inception.png",
            liveLink: null,
            githubLink: "https://github.com/aberkach/Inception",
            gradient: "from-emerald-400 via-cyan-500 to-blue-600",
            category: "DevOps"
        }
    ];

    const categories = ["All", "Web Development", "System Programming", "Graphics Programming", "Concurrency", "DevOps"];
    const [selectedCategory, setSelectedCategory] = React.useState("All");

    const filteredProjects = selectedCategory === "All" 
        ? projects 
        : projects.filter(project => project.category === selectedCategory);

    const handleDownloadCV = async () => {
        const downloadCV = async () => {
            // Simulate download preparation
            await new Promise(resolve => setTimeout(resolve, 1500));
            
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

    return (
        <>
            <SimpleCodeLoader isLoading={pageLoading} />
            <motion.div 
                ref={containerRef}
                className="min-h-screen px-6 py-12 relative overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
            {/* Animated Background Elements */}
            <motion.div 
                className="absolute inset-0 opacity-20"
                style={{ y: backgroundY }}
            >
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
            </motion.div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-16"
                    style={{ y }}
                    variants={itemVariants}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-6xl font-bold text-textPrimary mb-6">
                        My <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-2xl text-textSecondary max-w-2xl mx-auto leading-relaxed">
                        Key projects from my 1337 School journey showcasing system programming and software engineering skills
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    variants={itemVariants}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-primary-500 text-white'
                                    : 'glass-effect text-textSecondary hover:text-textPrimary border border-primary-500/20 hover:border-primary-400/40'
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, amount: 0.2 }}
                    layout
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div 
                            key={project.id} 
                            className="glass-effect gradient-border rounded-3xl p-6 card-hover group"
                            variants={itemVariants}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ 
                                y: -15, 
                                scale: 1.03,
                                rotateX: 8,
                                boxShadow: "0 30px 60px rgba(14, 165, 233, 0.3)"
                            }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300,
                                layout: { duration: 0.4 }
                            }}
                            style={{ 
                                transformStyle: "preserve-3d",
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            {/* Project Image */}
                            <motion.div 
                                className="w-full h-60 rounded-2xl mb-6 relative overflow-hidden group/image"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:brightness-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover/image:from-black/30 transition-all duration-300"></div>
                                
                                {/* Status Badge */}
                                <motion.div
                                    className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium z-10 flex items-center gap-2"
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    {project.status}
                                </motion.div>
                                
                                {/* Category Badge */}
                                <motion.div
                                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium z-10"
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(14, 165, 233, 0.8)" }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    {project.category}
                                </motion.div>
                                
                                {/* Project Title Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 z-10">
                                    <motion.h3 
                                        className="text-white text-xl font-bold text-glow mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    <motion.div 
                                        className="text-white/80 text-sm flex items-center gap-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                    >
                                        <span>{project.year || '2024'}</span>
                                        <span>•</span>
                                        <span>{project.technologies?.length || 0} Technologies</span>
                                    </motion.div>
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
                            <motion.div
                                className="space-y-4"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h2 className="text-2xl font-bold text-textPrimary group-hover:text-glow transition-all duration-300">
                                    {project.title}
                                </h2>
                                <p className="text-textSecondary leading-relaxed group-hover:text-textPrimary transition-colors duration-300">
                                    {project.description}
                                </p>
                                
                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {(project.technologies || []).map((tech, techIndex) => (
                                        <motion.span 
                                            key={tech} 
                                            className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            transition={{ delay: techIndex * 0.05 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                                
                                {/* Links */}
                                <div className="flex gap-4 pt-4">
                                    <motion.a 
                                        href={project.githubLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex-1 glass-effect text-textPrimary py-3 px-4 rounded-2xl font-medium text-center border border-primary-500/20 hover:border-primary-400/50 transition-all duration-300 group/link flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaGithub className="group-hover/link:text-glow transition-all duration-300" />
                                        <span className="group-hover/link:text-glow transition-all duration-300">
                                            GitHub
                                        </span>
                                    </motion.a>
                                    {project.liveLink && (
                                        <motion.a 
                                            href={project.liveLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex-1 btn-primary py-3 px-4 rounded-2xl font-medium text-center flex items-center justify-center gap-2"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FaExternalLinkAlt />
                                            Live Demo
                                        </motion.a>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-6xl mb-4 text-primary-500">
                            <FaSearch />
                        </div>
                        <h3 className="text-2xl font-bold text-textPrimary mb-2">No Projects Found</h3>
                        <p className="text-textSecondary">Try selecting a different category.</p>
                    </motion.div>
                )}

                {/* Call to Action */}
                <motion.div 
                    className="text-center mt-20"
                    variants={itemVariants}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                >
                    <motion.p 
                        className="text-textSecondary mb-8 text-lg"
                        variants={itemVariants}
                    >
                        Interested in collaborating or learning more about my work?
                    </motion.p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.a 
                            href="/contact" 
                            className="btn-primary py-4 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            Get In Touch
                        </motion.a>
                        
                        <motion.a 
                            href="https://github.com/aberkach" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-effect text-textPrimary py-4 px-8 rounded-2xl font-semibold border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300 flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <FaGithub />
                            View GitHub Profile
                        </motion.a>

                        <motion.button
                            onClick={handleDownloadCV}
                            disabled={isDownloading}
                            className="glass-effect text-textPrimary py-4 px-8 rounded-2xl font-semibold border border-accent-500/30 hover:border-accent-400/50 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={!isDownloading ? { scale: 1.05, y: -5 } : {}}
                            whileTap={!isDownloading ? { scale: 0.95 } : {}}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            {isDownloading ? (
                                <>
                                    <ButtonLoader size="sm" />
                                    Preparing Download...
                                </>
                            ) : (
                                <>
                                    <FaDownload />
                                    Download CV
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
        </>
    );
}
