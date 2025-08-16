'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaSpinner } from 'react-icons/fa';

// Button loader for form submissions and actions
export const ButtonLoader = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <motion.div 
    className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <FaSpinner className="w-full h-full text-current" />
  </motion.div>
);

// Simple animated code icon loader for page transitions
export const SimpleCodeLoader = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-glow"
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            rotate: [0, 360, 720]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            animate={{ 
              rotate: [-360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaCode className="text-3xl text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Default export to satisfy TypeScript module requirements
const LoadingComponents = {};
export default LoadingComponents;
