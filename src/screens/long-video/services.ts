import { ScreenNav } from '../../lib/global-services';

export type LongVideoProps = {
  setScreen: (nav: ScreenNav) => void;
  dataRef?: string;
  videoRef?: React.RefObject<HTMLVideoElement>;
  play?: boolean;
  setShowLoader?: (showLoader: boolean) => void;
  setPlay?: (play: boolean) => void;
};

export const playLongVideo = ({ videoRef, play }: LongVideoProps) => {
  if (videoRef?.current) {
    play ? videoRef.current.play() : videoRef.current.pause();
  }
};

export const redirectToDashboard = ({ setScreen, setShowLoader, setPlay }: LongVideoProps) => {
  setPlay(false);
  setShowLoader(true);
  setTimeout(() => {
    setScreen({ screen: 'dashboard' });
  }, 750);
};
