// Custom hook for page leave detection
// This can be reused across different components that need page leave detection

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to detect when user leaves the page after performing a specific action
 * @param {boolean} actionPerformed - Whether the tracked action was performed
 * @param {string} redirectPath - Path to redirect to when page leave is detected
 * @param {number} detectionDelay - Delay in ms before checking for page leave (default: 1000)
 */
export const usePageLeaveDetection = (
  actionPerformed, 
  redirectPath, 
  detectionDelay = 1000
) => {
  const navigate = useNavigate();
  const actionPerformedRef = useRef(false);

  // Update ref whenever actionPerformed changes
  useEffect(() => {
    actionPerformedRef.current = actionPerformed;
  }, [actionPerformed]);

  useEffect(() => {
    let timeoutId;

    // Handle visibility change (when user switches tabs/apps)
    const handleVisibilityChange = () => {
      if (document.hidden && actionPerformedRef.current) {
        timeoutId = setTimeout(() => {
          navigate(redirectPath);
        }, detectionDelay);
      } else if (!document.hidden && timeoutId) {
        // Clear timeout if user comes back quickly
        clearTimeout(timeoutId);
      }
    };

    // Handle page hide event (more reliable than beforeunload)
    const handlePageHide = () => {
      if (actionPerformedRef.current) {
        navigate(redirectPath);
      }
    };

    // Handle window blur (when window loses focus)
    const handleBlur = () => {
      if (actionPerformedRef.current) {
        timeoutId = setTimeout(() => {
          if (document.hidden || !document.hasFocus()) {
            navigate(redirectPath);
          }
        }, detectionDelay * 2); // Longer delay for blur to avoid false positives
      }
    };

    // Handle window focus (clear timeout if user comes back)
    const handleFocus = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [navigate, redirectPath, detectionDelay]);

  return {
    // Return any utility functions if needed
    resetAction: () => actionPerformedRef.current = false
  };
};