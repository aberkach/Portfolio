'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
    FaLightbulb, 
    FaHandshake, 
    FaBookOpen, 
    FaBullseye, 
    FaRocket, 
    FaAward, 
    FaSeedling, 
    FaLaptopCode, 
    FaPalette, 
    FaCog 
} from 'react-icons/fa';
import { SimpleCodeLoader } from '../(components)/Loading';
import { useSimulatedLoading } from '../(components)/LoadingHelpers';

const AboutPage = () => {
    const containerRef = useRef(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const isInitialLoading = useSimulatedLoading(1000); // Simulate loading for 1s
    
    // Only initialize scroll-based animations after hydration
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Hydration check
    useEffect(() => {
        setIsHydrated(true);
    }, []);

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

    return (
        <>
            <SimpleCodeLoader isLoading={isInitialLoading} />
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
                style={isHydrated ? { y: backgroundY } : {}}
            >
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            </motion.div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-16" 
                    variants={itemVariants}
                    style={isHydrated ? { y } : {}}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-6xl font-bold text-textPrimary mb-6">
                        About <span className="gradient-text">Me</span>
                    </h1>
                    <p className="text-2xl text-textSecondary max-w-2xl mx-auto leading-relaxed">
                        1337 School student passionate about system programming and web development
                    </p>
                </motion.div>

                {/* Main Content */}
                <motion.div 
                    className="grid md:grid-cols-2 gap-12 mb-16" 
                    variants={itemVariants}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Personal Story */}
                    <motion.div 
                        className="glass-effect gradient-border p-8 rounded-3xl card-hover"
                        whileHover={{ 
                            scale: 1.02,
                            y: -5,
                            boxShadow: "0 25px 50px rgba(14, 165, 233, 0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="text-3xl font-bold text-textPrimary mb-6">
                            <span className="gradient-text">My Journey</span>
                        </h2>
                        <div className="space-y-4 text-textSecondary leading-relaxed">
                            <motion.p
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -20 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Born and raised in Morocco, I'm a student of 1337 Coding School (part of 42 Network), where I developed 
                                a strong foundation in system programming, algorithms, and collaborative software development. 
                                My journey at 1337 taught me not just technical skills, but also problem-solving, peer learning, 
                                and the importance of clean, efficient code.
                            </motion.p>
                            <motion.p
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -20 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                As a software developer, I specialize in system-level programming with C/C++, web development 
                                with modern JavaScript frameworks, and creating robust full-stack applications. I'm passionate 
                                about building scalable solutions and exploring the intersection of low-level programming and 
                                modern web technologies.
                            </motion.p>
                            <motion.p
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -20 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                            >
                                The peer-to-peer learning environment at 1337 shaped my collaborative approach to development. 
                                I believe in clean code, thorough testing, and the power of technology to solve complex problems. 
                                Whether it's implementing a real-time multiplayer game or building a containerized microservice, 
                                I approach each challenge with curiosity and determination.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Key Stats */}
                    <div className="space-y-6">
                        <motion.div 
                            className="glass-effect gradient-border p-6 rounded-3xl card-hover"
                            whileHover={{ 
                                scale: 1.02,
                                y: -5,
                                boxShadow: "0 20px 40px rgba(14, 165, 233, 0.2)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-xl font-bold text-textPrimary mb-4">
                                <span className="gradient-text">Quick Facts</span>
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Education', value: '1337 Coding School (42 Network)' },
                                    { label: 'Focus', value: 'System Programming & Full-Stack' },
                                    { label: 'Languages', value: 'Arabic, French, English' },
                                    { label: 'Experience', value: '2+ Years Programming' },
                                    { label: 'Location', value: 'Taza, Morocco' }
                                ].map((fact, index) => (
                                    <motion.div 
                                        key={fact.label}
                                        className="flex justify-between"
                                        whileInView={{ opacity: 1, x: 0 }}
                                        initial={{ opacity: 0, x: 20 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="text-textMuted">{fact.label}</span>
                                        <span className="text-textPrimary font-medium">{fact.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            className="glass-effect gradient-border p-6 rounded-3xl card-hover"
                            whileHover={{ 
                                scale: 1.02,
                                y: -5,
                                boxShadow: "0 20px 40px rgba(217, 70, 239, 0.2)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-xl font-bold text-textPrimary mb-4">
                                <span className="gradient-text">Core Values</span>
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { icon: <FaLightbulb className="text-yellow-400" />, text: 'Innovation & Creativity' },
                                    { icon: <FaHandshake className="text-blue-400" />, text: 'Collaboration & Communication' },
                                    { icon: <FaBookOpen className="text-green-400" />, text: 'Continuous Learning' },
                                    { icon: <FaBullseye className="text-red-400" />, text: 'Quality & Attention to Detail' }
                                ].map((value, index) => (
                                    <motion.div 
                                        key={value.text}
                                        className="flex items-center text-textSecondary hover:text-textPrimary transition-colors cursor-default"
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05, x: 5 }}
                                    >
                                        <span className="mr-3 text-lg flex-shrink-0">{value.icon}</span>
                                        <span>{value.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Professional Experience */}
                <motion.div 
                    className="mb-16"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-4xl font-bold text-textPrimary mb-8 text-center">
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                    <div className="space-y-8">
                        {[
                            {
                                title: 'Software Engineer Intern',
                                company: 'Data Up Consulting, Casablanca, Morocco',
                                period: '2025 - Present',
                                description: [
                                    'Working on enterprise-level software solutions and data management systems',
                                    'Collaborating with senior developers on complex technical challenges',
                                    'Applying system programming knowledge to real-world business problems',
                                    'Gaining experience in professional software development practices'
                                ]
                            },
                            {
                                title: 'Graduate Software Developer',
                                company: '1337 School (42 Network)',
                                period: '2024 - Present',
                                description: [
                                    'Successfully completed the intensive Common Core curriculum at 1337 Coding School',
                                    'Developed complex system-level applications using C/C++ with focus on performance optimization',
                                    'Built full-stack web applications including real-time multiplayer games and IRC servers',
                                    'Implemented containerized applications using Docker and modern DevOps practices',
                                    'Collaborated on peer-to-peer projects using Git and agile development methodologies'
                                ]
                            },
                            {
                                title: 'Computer Science Student',
                                company: '1337 School, Khouribga, Morocco',
                                period: '2022 - 2024',
                                description: [
                                    'Intensive peer-to-peer learning program with project-based curriculum',
                                    'Mastered C/C++ programming, Unix/Linux systems, algorithms, and data structures',
                                    'Specialized in graphics programming, network programming, and web development',
                                    'Built collaborative projects including multiplayer games, servers, and containerized applications',
                                    'Developed strong problem-solving skills and attention to code quality'
                                ]
                            }
                        ].map((experience, index) => (
                            <motion.div 
                                key={experience.title}
                                className="glass-effect gradient-border p-8 rounded-3xl card-hover"
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ 
                                    scale: 1.01,
                                    y: -5,
                                    boxShadow: "0 25px 50px rgba(14, 165, 233, 0.2)"
                                }}
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-textPrimary">{experience.title}</h3>
                                        <p className="text-textSecondary">{experience.company}</p>
                                    </div>
                                    <span className="text-primary-400 font-medium bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/30">
                                        {experience.period}
                                    </span>
                                </div>
                                {experience.description.length > 0 && (
                                    <ul className="text-textSecondary space-y-2">
                                        {experience.description.map((desc, descIndex) => (
                                            <motion.li 
                                                key={descIndex}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                initial={{ opacity: 0, x: -20 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (index * 0.2) + (descIndex * 0.1) }}
                                                className="hover:text-textPrimary transition-colors"
                                            >
                                                • {desc}
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div 
                    className="mb-16"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 className="text-4xl font-bold text-textPrimary mb-8 text-center">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'System Programming',
                                icon: <FaLaptopCode className="text-blue-400" />,
                                skills: ['C', 'C++', 'Unix/Linux', 'Make', 'Shell Scripting', 'Git'],
                                color: 'primary'
                            },
                            {
                                title: 'Frontend',
                                icon: <FaPalette className="text-purple-400" />,
                                skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
                                color: 'secondary'
                            },
                            {
                                title: 'Backend & Tools',
                                icon: <FaCog className="text-green-400" />,
                                skills: ['Node.js', 'Docker', 'PostgreSQL', 'REST APIs', 'Nginx', 'Linux'],
                                color: 'accent'
                            }
                        ].map((category, categoryIndex) => (
                            <motion.div 
                                key={category.title}
                                className="glass-effect gradient-border p-6 rounded-3xl card-hover"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.2 }}
                                whileHover={{ 
                                    scale: 1.02,
                                    y: -5,
                                    boxShadow: `0 25px 50px rgba(${category.color === 'primary' ? '14, 165, 233' : category.color === 'secondary' ? '217, 70, 239' : '16, 185, 129'}, 0.2)`
                                }}
                            >
                                <h3 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
                                    {category.icon}
                                    <span className="gradient-text">{category.title}</span>
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div 
                                            key={skill} 
                                            className="glass-effect p-3 rounded-2xl border border-primary-500/20 hover:border-primary-400/40 transition-all duration-300 text-center"
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.05) }}
                                            whileHover={{ 
                                                scale: 1.05, 
                                                backgroundColor: "rgba(14, 165, 233, 0.1)",
                                                y: -2
                                            }}
                                        >
                                            <span className="text-textPrimary font-medium text-sm">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Education */}
                <motion.div 
                    className="mb-16"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-4xl font-bold text-textPrimary mb-8 text-center">
                        <span className="gradient-text">Education</span>
                    </h2>
                    <motion.div 
                        className="glass-effect gradient-border p-8 rounded-3xl card-hover"
                        whileHover={{ 
                            scale: 1.01,
                            y: -5,
                            boxShadow: "0 25px 50px rgba(14, 165, 233, 0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-textPrimary">1337 Coding School (42 Network)</h3>
                                <p className="text-textSecondary text-lg">System Programming & Software Engineering</p>
                            </div>
                            <span className="text-primary-400 font-medium bg-primary-500/10 px-4 py-2 rounded-full border border-primary-500/30">
                                2022 - 2024
                            </span>
                        </div>
                        <div className="text-textSecondary space-y-3 leading-relaxed">
                            {[
                                'Intensive peer-to-peer learning program with project-based curriculum',
                                'Specialization in C/C++ programming, Unix systems, algorithms, and data structures',
                                'Advanced projects: Real-time multiplayer games, IRC servers, graphics programming with raycasting',
                                'Collaborative development using Git, code reviews, and agile methodologies'
                            ].map((point, index) => (
                                <motion.p 
                                    key={index}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:text-textPrimary transition-colors"
                                >
                                    • {point}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Personal Values */}
                <motion.div 
                    className="text-center"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-4xl font-bold text-textPrimary mb-8">
                        What <span className="gradient-text">Drives Me</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <FaRocket className="text-blue-400" />,
                                title: 'Innovation',
                                description: 'Always pushing boundaries and exploring new technologies to create better solutions.'
                            },
                            {
                                icon: <FaAward className="text-yellow-400" />,
                                title: 'Quality',
                                description: 'Committed to writing clean, efficient code and delivering exceptional user experiences.'
                            },
                            {
                                icon: <FaSeedling className="text-green-400" />,
                                title: 'Growth',
                                description: 'Continuously learning and adapting to stay at the forefront of technology.'
                            }
                        ].map((value, index) => (
                            <motion.div 
                                key={value.title}
                                className="glass-effect gradient-border p-8 rounded-3xl card-hover text-center"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ 
                                    scale: 1.05,
                                    y: -10,
                                    boxShadow: "0 25px 50px rgba(14, 165, 233, 0.2)"
                                }}
                            >
                                <motion.div 
                                    className="text-5xl mb-4 flex justify-center"
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {value.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold text-textPrimary mb-2">
                                    <span className="gradient-text">{value.title}</span>
                                </h3>
                                <p className="text-textSecondary leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
        </>
    );
}

export default AboutPage;
