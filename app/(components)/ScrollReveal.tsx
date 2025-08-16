'use client';
import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-active');
            
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('scroll-reveal-active');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return ref;
};

// Enhanced scroll animations with different effects
export const ScrollReveal = ({ 
  children, 
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  distance = '30px',
  ...props 
}: {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: string;
  [key: string]: unknown;
}) => {
  const ref = useScrollAnimation();

  const getAnimationStyle = () => {
    const baseStyle = {
      opacity: 0,
      transition: `all ${duration}s ease-out ${delay}s`,
    };

    switch (animation) {
      case 'fadeUp':
        return { ...baseStyle, transform: `translateY(${distance})` };
      case 'fadeDown':
        return { ...baseStyle, transform: `translateY(-${distance})` };
      case 'fadeLeft':
        return { ...baseStyle, transform: `translateX(-${distance})` };
      case 'fadeRight':
        return { ...baseStyle, transform: `translateX(${distance})` };
      case 'scale':
        return { ...baseStyle, transform: 'scale(0.8)' };
      case 'rotate':
        return { ...baseStyle, transform: 'rotate(10deg) scale(0.8)' };
      default:
        return { ...baseStyle, transform: `translateY(${distance})` };
    }
  };

  return (
    <div
      ref={ref}
      style={getAnimationStyle()}
      className="scroll-reveal"
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
