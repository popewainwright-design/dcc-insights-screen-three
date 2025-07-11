export type ScreenNav = {
  screen: 'screensaver' | 'dashboard' | 'long-video' | 'scenario-index' | 'scenario' | string;
  dataRef?: string;
  [key: string]: any;
  showLoader?: boolean;
  setShowLoader?: (showLoader: boolean) => void;
  homeLoadOut?: boolean;
  setHomeLoadOut?: (homeLoadOut: boolean) => void;
  indexLoadOut?: boolean;
  setIndexLoadOut?: (indexLoadOut: boolean) => void;
};

export type ScreenProps = {
  screen?: ScreenNav['screen'];
  dataRef?: string;
  setScreen?: (nav: ScreenNav) => void;
  setDataRef?: (dataRef: string) => void;
  setCurrentScenario?: (currentScenario: number) => void;
  currentScenario?: number;
  setCurrent?: (current: number) => void;
  current?: number;
  count?: number;
  slides?: number;
  setShowLoader?: (showLoader: boolean) => void;
  viewInitalScreen?: 'prev' | 'next' | null;
  setViewInitalScreen?: (view: 'prev' | 'next' | null) => void;
};
