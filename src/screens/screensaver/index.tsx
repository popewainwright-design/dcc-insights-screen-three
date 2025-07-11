import { SCREEN_SAVER_VIDEO_URL } from '../../lib/constants';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Loader from '../../components/loader';
import { ScreenProps, ScreenNav } from '../../lib/global-services';
import { visibilityChanges } from '../../components/dashboard-link/services';

const ScreenSaver = ({ setScreen }: { setScreen: (nav: ScreenNav) => void }) => {
  const [showTouchNote, setShowTouchNote] = useState(false);
  const [animateLoader, setAnimateLoader] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTouchNote(true), 5500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setAnimateLoader(true);
    setTimeout(() => {
      setScreen({ screen: 'dashboard' });
    }, 750);
  };

  useEffect(() => {
    visibilityChanges(videoRef);
  }, []);

  return (
    <div className="screensaver h-full w-full" onClick={handleClick}>
      <video autoPlay loop muted className="h-full w-full object-cover" ref={videoRef}>
        <source src={SCREEN_SAVER_VIDEO_URL} type="video/mp4" />
      </video>
      <motion.div
        className="touch-note absolute right-0 bottom-[4.8%] left-0 flex flex-col items-center justify-center text-3xl tracking-wide uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: showTouchNote ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-white">Touch to begin</p>
        <IoIosArrowDropdown className="mt-2 h-[2vw] w-[2vw] animate-bounce" />
      </motion.div>
      {animateLoader && (
        <motion.div
          initial={{ top: '-400vh' }}
          animate={{ top: '-150vh' }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 z-10 h-full w-full"
          style={{ pointerEvents: 'none' }}
        >
          <Loader type="vertical" />
        </motion.div>
      )}
    </div>
  );
};

export default ScreenSaver;
