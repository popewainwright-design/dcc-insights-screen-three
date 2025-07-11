import Icons from '../icons';

interface DashboardMultiscreenProps {
  children: React.ReactNode;
  setViewInitalScreen: (view: 'prev' | 'next' | null) => void;
  viewInitalScreen: 'prev' | 'next' | null;
}

const DashboardMultiscreen = ({ children, setViewInitalScreen, viewInitalScreen }: DashboardMultiscreenProps) => {
  const handleViewInitalScreen = (direction: 'prev' | 'next') => {
    setViewInitalScreen(direction);
  };

  return (
    <div className="relative h-full w-screen overflow-hidden">
      <div
        className={`absolute top-0 left-0 z-10 h-screen w-[3.5vw] rotate-180 overflow-hidden px-[0.5vw] hover:bg-transparent active:bg-transparent ${viewInitalScreen === 'prev' ? 'opacity-[0.2]' : ''}`}
        onClick={() => handleViewInitalScreen('prev')}
        role="button"
        tabIndex={0}
      >
        <Icons type="next" customClass="relative left-[-0.5vw]" />
      </div>
      <div
        className={`dashboard-multiscreen flex h-full w-[200vw] overflow-hidden transition-all duration-300 ${
          viewInitalScreen === 'prev' ? 'translate-x-[0vw]' : viewInitalScreen === 'next' ? 'translate-x-[-100vw]' : ''
        }`}
      >
        {children}
      </div>
      <div
        className={`absolute top-0 right-0 z-10 h-screen w-[3.5vw] px-[0.5vw] hover:bg-transparent active:bg-transparent ${
          viewInitalScreen === 'next' ? 'opacity-[0.2]' : ''
        }`}
        onClick={() => handleViewInitalScreen('next')}
        role="button"
        tabIndex={0}
      >
        <Icons type="next" customClass="relative left-[-0.5vw]" />
      </div>
    </div>
  );
};

export default DashboardMultiscreen;
