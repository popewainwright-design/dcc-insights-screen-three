import { useState } from 'react';
import ScreenSaver from './screens/screensaver';
import Dashboard from './screens/dashboard';
import { ScreenProps, ScreenNav } from './lib/global-services';
import LongVideo from './screens/long-video';
import Scenario from './screens/scenario';
import ScenarioIndex from './screens/scenario-index';
import InactivityTimer from './components/inactivity-timer';

function App() {
  const [screen, setScreen] = useState<ScreenNav>({ screen: 'screensaver' });
  const [dataRef, setDataRef] = useState<ScreenProps['dataRef']>('macroTrends');
  const [viewInitalScreen, setViewInitalScreen] = useState<'prev' | 'next' | null>('prev');
  const [currentScenario, setCurrentScenario] = useState(0);
  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      {screen.screen === 'screensaver' && <ScreenSaver setScreen={setScreen} />}
      {screen.screen === 'dashboard' && (
        <Dashboard
          setScreen={setScreen}
          setDataRef={setDataRef}
          setViewInitalScreen={setViewInitalScreen}
          viewInitalScreen={viewInitalScreen}
        />
      )}
      {screen.screen === 'scenario-index' && (
        <ScenarioIndex setScreen={setScreen} dataRef={dataRef} setCurrentScenario={setCurrentScenario} />
      )}
      {screen.screen === 'long-video' && <LongVideo setScreen={setScreen} dataRef={dataRef} />}
      {screen.screen === 'scenario' && (
        <Scenario
          setScreen={setScreen}
          dataRef={dataRef}
          current={currentScenario}
          setCurrentScenario={setCurrentScenario}
        />
      )}
      {screen.screen !== 'screensaver' && <InactivityTimer setScreen={setScreen} />}
    </div>
  );
}

export default App;
