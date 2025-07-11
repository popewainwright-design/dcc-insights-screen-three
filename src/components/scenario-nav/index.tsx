import { ScreenProps, ScreenNav } from '../../lib/global-services';
import Icons from '../icons';
import { motion } from 'motion/react';
import Loader from '../loader';
import { useState } from 'react';

const ScenarioNav = ({ current, setCurrent, setScreen, slides }: ScreenProps) => {
  const [homeLoadOut, setHomeLoadOut] = useState(false);
  const [indexLoadOut, setIndexLoadOut] = useState(false);
  return (
    <>
      <div className="controls absolute right-0 bottom-0 left-0 z-10 flex w-full bg-[#002752] p-[1vw] text-white">
        <div className="flex w-full items-center justify-between gap-[1vw]">
          <div className="nav-menu flex items-center gap-[2vw]">
            <BackHome setScreen={setScreen} setHomeLoadOut={setHomeLoadOut} />
            <ScenarioIndex setScreen={setScreen} setIndexLoadOut={setIndexLoadOut} />
            <SlideCount current={current} count={slides} />
            <PrevButton current={current} slides={slides} setCurrent={setCurrent} />
            <NextButton current={current} slides={slides} setCurrent={setCurrent} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-[1vw]">
          <div className="nav-menu flex items-center gap-[2vw]">
            <PrevButton current={current} slides={slides} setCurrent={setCurrent} />
            <NextButton current={current} slides={slides} setCurrent={setCurrent} />
            <SlideCount current={current} count={slides} />
            <ScenarioIndex setScreen={setScreen} setIndexLoadOut={setIndexLoadOut} />
            <BackHome setScreen={setScreen} setHomeLoadOut={setHomeLoadOut} />
          </div>
        </div>
      </div>
      {homeLoadOut && (
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

      {indexLoadOut && (
        <motion.div
          initial={{ left: '-200vw' }}
          animate={{ left: '-25%' }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 z-10 h-full w-full"
          style={{ pointerEvents: 'none' }}
        >
          <Loader type="horizontal" />
        </motion.div>
      )}
    </>
  );
};

export default ScenarioNav;

const BackHome = ({
  setScreen,
  setHomeLoadOut,
}: {
  setScreen: (nav: ScreenNav) => void;
  setHomeLoadOut: (homeLoadOut: boolean) => void;
}) => {
  return (
    <div
      className="h-[3vw] w-[3vw]"
      onClick={() => {
        setHomeLoadOut(true);
        setTimeout(() => {
          setScreen({ screen: 'dashboard' });
        }, 750);
      }}
    >
      <Icons type="home" />
    </div>
  );
};

const ScenarioIndex = ({
  setScreen,
  setIndexLoadOut,
}: {
  setScreen: (nav: ScreenNav) => void;
  setIndexLoadOut: (indexLoadOut: boolean) => void;
}) => {
  return (
    <div
      className="h-[3vw] w-[3vw]"
      onClick={() => {
        setIndexLoadOut(true);
        setTimeout(() => {
          setScreen({ screen: 'scenario-index' } as ScreenNav);
        }, 750);
      }}
    >
      <Icons type="dashboard" />
    </div>
  );
};

const SlideCount = ({ current, count }: { current: number; count: number }) => {
  return (
    <div className="min-w-[5vw] text-center text-[1.5vw] leading-[1.5vw] font-bold">
      {current + 1} / {count}
    </div>
  );
};

const NextButton = ({
  current,
  slides,
  setCurrent,
}: {
  current: number;
  slides: number;
  setCurrent: (current: number) => void;
}) => {
  return (
    <div
      className="h-[3vw] w-[3vw] bg-transparent outline-none hover:border-0 focus:outline-none"
      onClick={() => {
        const newCurrent = current + 1;
        setCurrent(newCurrent);
        slides === newCurrent ? setCurrent(0) : setCurrent(newCurrent);
      }}
    >
      <Icons type="next" />
    </div>
  );
};

const PrevButton = ({
  current,
  slides,
  setCurrent,
}: {
  current: number;
  slides: number;
  setCurrent: (current: number) => void;
}) => {
  return (
    <div
      className="h-[3vw] w-[3vw] rotate-180 bg-transparent outline-none hover:border-0 focus:outline-none"
      role="button"
      onClick={() => {
        const newCurrent = current - 1;
        setCurrent(newCurrent);
        newCurrent === -1 ? setCurrent(slides - 1) : setCurrent(newCurrent);
      }}
    >
      <Icons type="prev" />
    </div>
  );
};
