import { content } from '../../lib/data/content';
import Loader from '../../components/loader';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { LongVideoProps, playLongVideo, redirectToDashboard } from './services';
import { visibilityChanges } from '../../components/dashboard-link/services';
import FullscreenVideo from '../../components/fullscreen-video';

const LongVideo = ({ setScreen, dataRef }: LongVideoProps) => {
  const [play, setPlay] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc =
    'longVideo' in content[dataRef as keyof typeof content]
      ? (content[dataRef as keyof typeof content] as { longVideo: string }).longVideo
      : undefined;

  useEffect(() => {
    playLongVideo({ videoRef, play } as LongVideoProps);
  }, [play, videoRef]);

  useEffect(() => {
    visibilityChanges(videoRef);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <FullscreenVideo
        videoSrc={videoSrc}
        setPlay={setPlay}
        play={play}
        videoRef={videoRef}
        handleClick={() => redirectToDashboard({ setScreen, setShowLoader, setPlay } as LongVideoProps)}
      />
      {showLoader && (
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
      <motion.div
        initial={{ left: '-25%' }}
        animate={{ left: '200vw' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 z-10 h-full w-full"
        style={{ pointerEvents: 'none' }}
      >
        <Loader type="horizontal" />
      </motion.div>
    </div>
  );
};

export default LongVideo;
