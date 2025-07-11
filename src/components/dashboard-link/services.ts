import { ScreenProps } from '../../lib/global-services';

export type DashboardLinkProps = {
  data?: {
    className?: string;
    imageUrl?: string;
    dataRef?: string;
    longVideo?: boolean;
    title?: string;
    type?: 'standard' | 'image' | 'video' | null;
    videoUrl?: string;
    setScreen?: (screen: ScreenProps) => void;
    setDataRef?: (dataRef: ScreenProps['dataRef']) => void;
  };
  className?: string;
  imageUrl?: string;
  dataRef?: string;
  longVideo?: boolean;
  title?: string;
  type?: 'standard' | 'image' | 'video' | null;
  videoUrl?: string;
  setScreen?: (screen: ScreenProps) => void;
  setDataRef?: (dataRef: ScreenProps['dataRef']) => void;
};

// Functions //

export const handleClick = (
  setScreen: (screen: ScreenProps) => void,
  dataRef: string,
  screen: string,
  isAccessScenario: boolean,
  setIsAccessScenario: (isAccessScenario: boolean) => void,
  setDataRef: (dataRef: ScreenProps['dataRef']) => void,
) => {
  setIsAccessScenario(!isAccessScenario);
  setTimeout(() => {
    setScreen({ screen: screen as ScreenProps['screen'], dataRef: dataRef as ScreenProps['dataRef'] });
    setDataRef(dataRef);
  }, 250);
};

export const videoLoader = (videoRef: React.RefObject<HTMLVideoElement>, type: string) => {
  const videoElement = videoRef.current;

  if (videoElement && type === 'video') {
    videoElement.playsInline = true;
    videoElement.muted = true;

    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video playback was prevented:', error);
      });
    }
  }

  return () => {
    if (videoElement) {
      videoElement.pause();
      videoElement.src = '';
      videoElement.load();
      videoElement.remove();
    }
  };
};

export const visibilityChanges = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const videoElement = videoRef.current;

  if (!videoElement) return;

  // Create intersection observer to handle video visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Video is visible, start playing
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn('Video playback was prevented:', error);
            });
          }
        } else {
          // Video is not visible, pause it
          videoElement.pause();
        }
      });
    },
    {
      root: null, // Use viewport as root
      threshold: 0.5, // 50% visibility threshold
    },
  );

  // Start observing the video element
  observer.observe(videoElement);

  // Cleanup observer
  return () => {
    observer.disconnect();
  };
};
