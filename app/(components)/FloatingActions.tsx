'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Download, Github, Sparkles } from 'lucide-react';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration check
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHydrated]);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const actions = [
    {
      icon: MessageCircle,
      label: 'Contact',
      href: '/contact',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Download,
      label: 'CV',
      href: '/abdelfattah_berkach_CV.pdf',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/aberkach',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Floating Action Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex flex-col gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, staggerChildren: 0.05 }}
          >
            {actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.a
                  key={action.label}
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  className={`w-14 h-14 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 tooltip`}
                  data-tooltip={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Sparkles size={20} />
        </motion.div>
      </motion.button>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="absolute -top-20 left-0 w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
