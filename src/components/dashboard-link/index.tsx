import { cn } from '../../lib/utils';
import { DashboardLinkProps, videoLoader, visibilityChanges } from './services';
import Icons from '../icons';
import { useRef, useEffect } from 'react';

// Extend DashboardLinkProps to accept onLinkClick
interface DashboardLinkWithClickProps extends DashboardLinkProps {
  onLinkClick?: (data: DashboardLinkProps & { isAccessScenario: boolean }) => void;
  currentScenario?: number;
  index?: number;
}

const DashboardLink = ({ data, onLinkClick, index, currentScenario }: DashboardLinkWithClickProps) => {
  const { title, className, type, imageUrl, videoUrl, longVideo } = data;
  const isAccessScenario = index === currentScenario;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoLoader(videoRef, type);
  }, [type, videoUrl]);

  useEffect(() => {
    visibilityChanges(videoRef);
  }, []);

  if (type === 'image') {
    return (
      <div className={cn('dashboard-link__image', className)}>
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" loading="eager" />
      </div>
    );
  }
  if (type === 'video') {
    return (
      <div className={cn('dashboard-link__video', className)}>
        <video
          src={videoUrl}
          aria-label={title}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          ref={videoRef}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'dashboard-link relative bg-gradient-to-r from-secondary to-primary py-[2vw] pr-[1vw] pl-[2vw]',
        className,
      )}
      onClick={() => {
        onLinkClick && onLinkClick({ ...data, isAccessScenario });
      }}
    >
      <div className="relative pt-[20%]">
        {longVideo && <Icons type="play" />}
        <DashboardLinkSwitch isAccessScenario={isAccessScenario} />
        <p className="mt-[2vh] text-[1.31vw] leading-[1.1] font-bold uppercase">{title}</p>
      </div>
    </div>
  );
};
export default DashboardLink;

const DashboardLinkSwitch = ({ isAccessScenario }: { isAccessScenario: boolean }) => {
  const activeClass = isAccessScenario ? 'after:left-[calc(100%-2.2vw)]' : 'after:left-0';
  return (
    <button
      className={cn(
        'dashboard-link__switch-button transition-background relative h-[2.2vw] w-[4.5vw] rounded-[3vw] border-none bg-white duration-200 after:absolute after:top-0 after:left-0 after:h-[2.2vw] after:w-[2.2vw] after:rounded-[3vw] after:bg-tertiary after:transition-all after:content-[""] focus:outline-none',
        activeClass,
      )}
    >
      <span className="sr-only">Access Scenario</span>
    </button>
  );
};
