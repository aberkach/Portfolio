'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa'

function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    closeMenu();
  };

  return (
    <motion.nav 
      className='h-16 glass-effect border-b border-primary-500/20 flex justify-center items-center sticky top-0 z-50'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
        <div className='max-w-6xl w-full px-6 flex justify-between items-center'>
            {/* Logo */}
            <motion.div 
              className='text-2xl font-bold'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                <button 
                  className="cursor-pointer group flex items-center gap-2"
                  onClick={() => navigateTo('/')}
                >
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AB</span>
                    </div>
                    <span className="gradient-text group-hover:text-glow transition-all duration-300 font-bold text-lg">
                        Abdelfattah Berkach
                    </span>
                </button>
            </motion.div>
            
            {/* Desktop Navigation Links */}
            <div className='hidden md:flex items-center space-x-8'>
                {[
                  { name: 'Home', path: '/', IconComponent: FaHome },
                  { name: 'About', path: '/about', IconComponent: FaUser },
                  { name: 'Projects', path: '/projects', IconComponent: FaProjectDiagram },
                  { name: 'Contact', path: '/contact', IconComponent: FaEnvelope }
                ].map((item) => (
                  <motion.button 
                    key={item.name}
                    onClick={() => navigateTo(item.path)}
                    className="text-textSecondary hover:text-textPrimary transition-all duration-300 cursor-pointer relative group flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-500/10"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.IconComponent className="text-sm" />
                    <span className="font-medium">{item.name}</span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary opacity-0 group-hover:opacity-100"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
                
                {/* CTA Button */}
                <motion.a
                  href="/contact"
                  className="btn-primary px-6 py-2 rounded-xl font-medium text-sm ml-4"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s Talk
                </motion.a>
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button 
              onClick={toggleMenu}
              className='md:hidden text-textPrimary hover:text-primary-400 transition-colors focus:outline-none relative'
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
                <motion.svg 
                  className='w-6 h-6' 
                  fill='none' 
                  stroke='currentColor' 
                  viewBox='0 0 24 24'
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.path 
                          key="close"
                          strokeLinecap='round' 
                          strokeLinejoin='round' 
                          strokeWidth={2} 
                          d='M6 18L18 6M6 6l12 12'
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          exit={{ pathLength: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      ) : (
                        <motion.g key="menu">
                          <motion.path 
                            strokeLinecap='round' 
                            strokeLinejoin='round' 
                            strokeWidth={2} 
                            d='M4 6h16'
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          />
                          <motion.path 
                            strokeLinecap='round' 
                            strokeLinejoin='round' 
                            strokeWidth={2} 
                            d='M4 12h16'
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          />
                          <motion.path 
                            strokeLinecap='round' 
                            strokeLinejoin='round' 
                            strokeWidth={2} 
                            d='M4 18h16'
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          />
                        </motion.g>
                      )}
                    </AnimatePresence>
                </motion.svg>
            </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute top-16 left-0 w-full glass-effect border-b border-primary-500/20 md:hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About', path: '/about' },
                  { name: 'Projects', path: '/projects' },
                  { name: 'Contact', path: '/contact' }
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => navigateTo(item.path)}
                    className="block w-full text-left text-textSecondary hover:text-textPrimary transition-all duration-300 py-3 cursor-pointer rounded-lg hover:bg-surface/50 px-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 8,
                      backgroundColor: "rgba(14, 165, 233, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative">
                      {item.name}
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.nav>
  )
}

export default NavBar
