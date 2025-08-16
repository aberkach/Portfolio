'use client';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/aberkach',
      icon: '🐙',
      color: 'hover:text-textPrimary'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/abdelfattah-berkach',
      icon: '💼',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      href: 'mailto:berkachfatah@gmail.com',
      icon: '📧',
      color: 'hover:text-accent-400'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'CV', href: '/abdelfattah_berkach_CV.pdf' }
  ];

  return (
    <motion.footer 
      className="relative mt-20 py-16 px-6 glass-effect border-t border-primary-500/20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">AB</span>
              </div>
              <h3 className="text-2xl font-bold gradient-text">Abdelfattah Berkach</h3>
            </motion.div>
            
            <p className="text-textSecondary leading-relaxed mb-6 max-w-md">
              Software Engineer passionate about building innovative solutions. 
              Specialized in system programming and full-stack development with 
              a focus on performance and user experience.
            </p>
            
            <motion.div 
              className="flex gap-4"
              variants={containerVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 glass-effect rounded-2xl flex items-center justify-center text-textMuted transition-all duration-300 border border-primary-500/20 hover:border-primary-400/50 ${social.color} group`}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    boxShadow: "0 10px 25px rgba(14, 165, 233, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-textPrimary mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-textSecondary hover:text-textPrimary transition-all duration-300 flex items-center gap-2 group"
                    whileHover={{ x: 5, color: "#0ea5e9" }}
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-textPrimary mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-textSecondary">
                <span className="text-lg">📍</span>
                <span>Taza, Morocco</span>
              </div>
              <div className="flex items-center gap-3 text-textSecondary">
                <span className="text-lg">📧</span>
                <a 
                  href="mailto:berkachfatah@gmail.com"
                  className="hover:text-textPrimary transition-colors"
                >
                  berkachfatah@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-textSecondary">
                <span className="text-lg">🌐</span>
                <span>Available for opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-primary-500/20 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <motion.p 
            className="text-textMuted text-sm"
            whileHover={{ scale: 1.02 }}
          >
            © {currentYear} Abdelfattah Berkach. Built with Next.js & Framer Motion.
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-4 text-sm text-textMuted"
            variants={containerVariants}
          >
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Available for work
            </motion.span>
            <span>•</span>
            <motion.a
              href="/contact"
              className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Let&apos;s connect
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
