import { useEffect, useRef } from 'react';
import { ScreenNav } from '../../lib/global-services';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

interface InactivityTimerProps {
  setScreen: (nav: ScreenNav) => void;
}

const InactivityTimer = ({ setScreen }: InactivityTimerProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      // Start fade out animation
      if (fadeRef.current) {
        fadeRef.current.style.opacity = '1';
      }
      // Wait for fade animation to complete before changing screen
      setTimeout(() => {
        setScreen({ screen: 'screensaver' });
      }, 500); // Match the fade duration from CSS
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // Setup event listeners for user activity
    const handleActivity = () => {
      resetTimer();
      // Reset fade overlay opacity
      if (fadeRef.current) {
        fadeRef.current.style.opacity = '0';
      }
    };

    // Add listeners for various user interactions
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Start initial timer
    resetTimer();

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [setScreen]);

  return (
    <div
      ref={fadeRef}
      className="pointer-events-none fixed inset-0 z-50 bg-black opacity-0 transition-opacity duration-500"
    />
  );
};

export default InactivityTimer;
