'use client';
import { useState, useEffect } from 'react';

// Async operation wrapper with loading
export const useAsyncLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (asyncFunction: () => Promise<unknown>) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFunction();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    execute,
    clearError: () => setError(null)
  };
};

// Simulate loading for development/demo purposes
export const useSimulatedLoading = (duration = 2000) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Return true only after hydration to avoid mismatch
  return isHydrated && isLoading;
};
