import { ScreenProps } from '../../lib/global-services';
import { content } from '../../lib/data/content';
import { useState } from 'react';
import { motion } from 'motion/react';
import Loader from '../../components/loader';
import { redirectToDashboard, ScenarioIndexDataProps } from './services';
import Icons from '../../components/icons';

const ScenarioIndex = ({ setScreen, dataRef, setCurrentScenario }: ScreenProps) => {
  const data = content[dataRef as keyof typeof content];
  const { title, thumbs, slug } = data as ScenarioIndexDataProps;
  const [animateLoader, setAnimateLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleClick = (thumb: ScenarioIndexDataProps['thumbs'][number]) => {
    setAnimateLoader(true);
    setTimeout(() => {
      setScreen({ screen: 'scenario' });
      setCurrentScenario(thumb.index);
    }, 500);
  };

  return (
    <div className="scenario-index relative h-full w-full p-[5vw]">
      <header className="mb-[7vh] flex flex-col gap-[1vh] font-bold uppercase">
        <h1 className="text-[2.5vw] leading-[2.5vw]">Scenario</h1>
        <h2 className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-[2.5vw] leading-[2.5vw] text-transparent">
          {title}
        </h2>
      </header>
      <div className={`grid grid-rows-4 gap-[2vw] ${thumbs.length > 4 ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {thumbs.map((thumb: ScenarioIndexDataProps['thumbs'][number]) => (
          <div key={`thumb-${thumb.title}`} onClick={() => handleClick(thumb)} className="mb-[6vh]">
            <div className="relative aspect-[16/7] h-full w-full overflow-hidden">
              {thumb.type === 'video' ? (
                <video
                  src={`assets/images/${slug}/thumbs/video-${thumb.index + 1}.mp4`}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={`assets/images/${slug}/thumbs/image-${thumb.index + 1}.png`}
                  alt={thumb.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <p className="mt-[1vh] text-[1.31vw] leading-[1.1] font-bold text-white uppercase">{thumb.title}</p>
          </div>
        ))}
      </div>
      {/* Initial loader */}

      <motion.div
        initial={{ left: '-25%' }}
        animate={{ left: '200vw' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 z-10 h-full w-full"
        style={{ pointerEvents: 'none' }}
      >
        <Loader type="horizontal" />
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
      <div
        className="absolute bottom-[1vw] left-[1vw] h-[3vw] w-[3vw] bg-transparent p-0 hover:border-none hover:bg-transparent focus:border-none focus:bg-transparent"
        role="button"
        onClick={() => {
          redirectToDashboard({ setScreen, setShowLoader } as ScreenProps);
        }}
      >
        <Icons type="home" />
      </div>
    </div>
  );
};

export default ScenarioIndex;
