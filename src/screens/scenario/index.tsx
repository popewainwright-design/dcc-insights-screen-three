import { ScreenProps } from '../../lib/global-services';
import { content } from '../../lib/data/content';
import { motion } from 'motion/react';
import Loader from '../../components/loader';
import ScenarioNav from '../../components/scenario-nav';
import { PanInfo } from 'framer-motion';
import FullscreenVideo from '../../components/fullscreen-video';
import { useEffect, useRef, useState } from 'react';
import { LongVideoProps, playLongVideo } from '../long-video/services';

const Scenario = ({ dataRef, current, setCurrentScenario, setScreen }: ScreenProps) => {
  const data = content[dataRef as keyof typeof content];
  if (!('slug' in data) || !('slides' in data)) return null;
  const { slides, slug, videoIndex } = data;

  const [play, setPlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 && current < slides - 1) {
      const newCurrent = current + 1;
      setCurrentScenario(newCurrent);
    } else if (info.offset.x > 50 && current > 0) {
      const newCurrent = current - 1;
      setCurrentScenario(newCurrent);
    }
  };

  useEffect(() => {
    playLongVideo({ videoRef, play } as LongVideoProps);
  }, [play, videoRef]);

  return (
    <div className="scenario relative h-full w-full">
      {videoIndex === current ? (
        <FullscreenVideo
          videoSrc={`assets/images/${slug}/video-${videoIndex + 1}.mp4`}
          setPlay={setPlay}
          play={play}
          videoRef={videoRef}
          handleClick={() => setPlay(!play)}
        />
      ) : (
        <motion.img
          // drag="x"
          // dragConstraints={{ left: 0, right: 0 }}
          onPan={handleDragEnd}
          src={`assets/images/${slug}/image-${current + 1}.png`}
          alt={`Slide ${current + 1}`}
          loading="eager"
          className="relative z-10 h-full w-full object-cover"
        />
      )}
      {videoIndex !== current && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-10 h-full w-full bg-transparent"
        />
      )}
      <ScenarioNav current={current} setCurrent={setCurrentScenario} setScreen={setScreen} slides={slides} />
      <motion.div
        initial={{ top: '-150vh' }}
        animate={{ top: '300vh' }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.25 }}
        className="absolute bottom-0 left-0 z-20 h-full w-full"
        style={{ pointerEvents: 'none' }}
      >
        <Loader type="vertical" />
      </motion.div>
    </div>
  );
};

export default Scenario;
