"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ContactPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(''), 5000);
        }, 1000);
    };

    return (
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
            </motion.div>
            
            <div className="max-w-6xl mx-auto relative z-10">
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
                        Get In <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-2xl text-textSecondary max-w-2xl mx-auto leading-relaxed">
                        Let's collaborate and bring your ideas to life. I'm always open to discussing new opportunities and exciting projects.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid lg:grid-cols-2 gap-12"
                    variants={containerVariants}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Contact Form */}
                    <motion.div 
                        className="glass-effect gradient-border p-8 rounded-3xl card-hover"
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.01,
                            y: -5,
                            boxShadow: "0 25px 50px rgba(14, 165, 233, 0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h2 className="text-3xl font-bold text-textPrimary mb-6">
                            <span className="gradient-text">Send a Message</span>
                        </h2>
                        
                        {submitStatus === 'success' && (
                            <motion.div 
                                className="mb-6 p-4 bg-accent-500/20 border border-accent-500/50 rounded-2xl"
                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <p className="text-textPrimary flex items-center">
                                    <span className="mr-3 text-2xl">✅</span>
                                    Thank you for your message! I'll get back to you within 24 hours.
                                </p>
                            </motion.div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <motion.div 
                                    variants={itemVariants}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-textSecondary mb-2 font-medium" htmlFor="name">
                                        Name *
                                    </label>
                                    <motion.input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 glass-effect border border-primary-500/20 rounded-2xl text-textPrimary placeholder-textMuted focus:outline-none focus:border-primary-400 transition-all duration-300"
                                        placeholder="Your Name"
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>
                                
                                <motion.div 
                                    variants={itemVariants}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: 20 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-textSecondary mb-2 font-medium" htmlFor="email">
                                        Email *
                                    </label>
                                    <motion.input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 glass-effect border border-primary-500/20 rounded-2xl text-textPrimary placeholder-textMuted focus:outline-none focus:border-primary-400 transition-all duration-300"
                                        placeholder="your.email@example.com"
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>
                            </div>
                            
                            <motion.div 
                                variants={itemVariants}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                viewport={{ once: true }}
                            >
                                <label className="block text-textSecondary mb-2 font-medium" htmlFor="subject">
                                    Subject *
                                </label>
                                <motion.input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 glass-effect border border-primary-500/20 rounded-2xl text-textPrimary placeholder-textMuted focus:outline-none focus:border-primary-400 transition-all duration-300"
                                    placeholder="Project Discussion"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>
                            
                            <motion.div 
                                variants={itemVariants}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                viewport={{ once: true }}
                            >
                                <label className="block text-textSecondary mb-2 font-medium" htmlFor="message">
                                    Message *
                                </label>
                                <motion.textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 glass-effect border border-primary-500/20 rounded-2xl text-textPrimary placeholder-textMuted focus:outline-none focus:border-primary-400 transition-all duration-300 resize-none"
                                    placeholder="Tell me about your project or idea..."
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>
                            
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary py-4 px-6 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                variants={itemVariants}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <div className="spinner mr-3"></div>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Message'
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div 
                        className="space-y-6"
                        variants={containerVariants}
                    >
                        {/* Direct Contact */}
                        <motion.div 
                            className="glass-effect gradient-border p-6 rounded-3xl card-hover"
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                y: -5,
                                boxShadow: "0 20px 40px rgba(14, 165, 233, 0.2)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-2xl font-bold text-textPrimary mb-4">
                                <span className="gradient-text">Direct Contact</span>
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { icon: '📧', label: 'Email', value: 'berkachfatah@gmail.com', href: 'mailto:berkachfatah@gmail.com' },
                                    { icon: '📱', label: 'Phone', value: '+212 6 23 07 43 15', href: 'tel:+212623074315' },
                                    { icon: '📍', label: 'Location', value: 'Taza, Morocco', href: null }
                                ].map((contact, index) => (
                                    <motion.div 
                                        key={contact.label}
                                        className="flex items-center text-textSecondary hover:text-textPrimary transition-colors group"
                                        whileInView={{ opacity: 1, x: 0 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="mr-4 text-2xl group-hover:scale-110 transition-transform">{contact.icon}</span>
                                        <div>
                                            <div className="font-medium text-textMuted text-sm">{contact.label}</div>
                                            {contact.href ? (
                                                <a href={contact.href} className="font-semibold">
                                                    {contact.value}
                                                </a>
                                            ) : (
                                                <span className="font-semibold">{contact.value}</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div 
                            className="glass-effect gradient-border p-6 rounded-3xl card-hover"
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                y: -5,
                                boxShadow: "0 20px 40px rgba(217, 70, 239, 0.2)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-2xl font-bold text-textPrimary mb-4">
                                <span className="gradient-text">Connect Online</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: '🐙', name: 'GitHub', href: 'https://github.com/aberkach' },
                                    { icon: '💼', name: 'LinkedIn', href: 'https://linkedin.com/in/abdelfattah-berkach' }
                                ].map((social, index) => (
                                    <motion.a 
                                        key={social.name}
                                        href={social.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center p-4 glass-effect rounded-2xl text-textSecondary hover:text-textPrimary border border-primary-500/20 hover:border-primary-400/50 transition-all duration-300 group"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="mr-3 text-2xl group-hover:scale-110 transition-transform">{social.icon}</span>
                                        <span className="font-semibold">{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability */}
                        <motion.div 
                            className="glass-effect gradient-border p-6 rounded-3xl card-hover"
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                y: -5,
                                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-2xl font-bold text-textPrimary mb-4">
                                <span className="gradient-text">Availability</span>
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { icon: '🟢', text: 'Available for freelance projects', status: 'Available' },
                                    { icon: '🤝', text: 'Open to collaboration', status: 'Open' },
                                    { icon: '⏰', text: 'Response time: 24 hours', status: '24h' }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={item.text}
                                        className="flex items-center text-textSecondary hover:text-textPrimary transition-colors group"
                                        whileInView={{ opacity: 1, x: 0 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="mr-3 text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                        <span className="font-medium">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div 
                    className="mt-20"
                    variants={itemVariants}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-textPrimary mb-8 text-center">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "What technologies do you specialize in?",
                                answer: "I specialize in C/C++ for system programming, React/Next.js for web development, and have experience with Docker, PostgreSQL, and various other modern technologies."
                            },
                            {
                                question: "Are you available for remote work?",
                                answer: "Yes, I'm available for both remote and on-site work. I'm experienced with remote collaboration tools and agile development practices."
                            },
                            {
                                question: "What's your preferred project type?",
                                answer: "I enjoy working on challenging system-level projects, web applications, and anything that involves problem-solving and learning new technologies."
                            },
                            {
                                question: "How do you approach new projects?",
                                answer: "I start by understanding requirements, then plan the architecture, set up development environment, and follow agile practices with regular communication and updates."
                            }
                        ].map((faq, index) => (
                            <motion.div 
                                key={faq.question}
                                className="glass-effect gradient-border p-6 rounded-3xl card-hover"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ 
                                    scale: 1.02,
                                    y: -5,
                                    boxShadow: "0 20px 40px rgba(14, 165, 233, 0.1)"
                                }}
                            >
                                <h3 className="text-lg font-bold text-textPrimary mb-3">{faq.question}</h3>
                                <p className="text-textSecondary leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
