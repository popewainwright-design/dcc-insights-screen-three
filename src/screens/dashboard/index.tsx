import { data, data2 } from '../../lib/data/dashboard';
import { ScreenProps } from '../../lib/global-services';
import DashboardLink from '../../components/dashboard-link';
import Loader from '../../components/loader';
import { motion } from 'motion/react';
import { useState } from 'react';
import { DashboardLinkProps } from '../../components/dashboard-link/services';
import DashboardMultiscreen from '../../components/dashboard-multiscreen';

const Dashboard = ({ setScreen, setDataRef, setViewInitalScreen, viewInitalScreen }: ScreenProps) => {
  const [showLoader, setShowLoader] = useState(false);
  const [animateLoader, setAnimateLoader] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);
  const multiscreen = true;
  const gridClass =
    ' relative grid h-full w-screen grid-cols-5 grid-rows-3 gap-x-[1.5vw] gap-y-[1.5vw] overflow-hidden p-[5vw]';

  const handleLinkClick = (linkData: DashboardLinkProps, index: number) => {
    setCurrentScenario(index);
    setTimeout(() => {
      setShowLoader(true);
      setAnimateLoader(true);
    }, 250);

    setTimeout(() => {
      setAnimateLoader(false);
      setShowLoader(false);
      setScreen({ screen: linkData.longVideo ? 'long-video' : 'scenario-index', dataRef: linkData.dataRef });
      setDataRef(linkData.dataRef);
    }, 1000);
  };

  return (
    <div className={`dashboard ${!multiscreen ? gridClass : 'relative h-full w-screen overflow-hidden'}`}>
      <DashboardMultiscreen setViewInitalScreen={setViewInitalScreen} viewInitalScreen={viewInitalScreen}>
        <div className={`dashboard-single-screen${gridClass} w-screen`}>
          {data.map((item, index) => (
            <DashboardLink
              key={index}
              data={item as DashboardLinkProps}
              onLinkClick={(linkData) => handleLinkClick(linkData, index)}
              index={index}
              currentScenario={currentScenario}
            />
          ))}
        </div>
        <div className={`dashboard-single-screen${gridClass} w-screen`}>
          {data2.map((item, index) => (
            <DashboardLink
              key={index}
              data={item as DashboardLinkProps}
              onLinkClick={(linkData) => handleLinkClick(linkData, index)}
              index={index}
              currentScenario={currentScenario}
            />
          ))}
        </div>
      </DashboardMultiscreen>
      {showLoader && (
        <motion.div
          initial={{ left: '-200vw' }}
          animate={animateLoader ? { left: '-25%' } : { left: '-200vw' }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 z-10 h-full w-full"
          style={{ pointerEvents: 'none' }}
        >
          <Loader type="horizontal" />
        </motion.div>
      )}
      <motion.div
        initial={{ top: '-150vh' }}
        animate={{ top: '300vh' }}
        transition={{ duration: 0.75, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 z-10 h-full w-full"
        style={{ pointerEvents: 'none' }}
      >
        <Loader type="vertical" />
      </motion.div>
    </div>
  );
};

export default Dashboard;
