import { ScreenProps } from '../../lib/global-services';

export type ScenarioIndexDataProps = {
  title: string;
  slides: number;
  thumbs: { index: number; title: string; type: string }[];
  slug: string;
};

export const redirectToDashboard = ({ setScreen, setShowLoader }: ScreenProps) => {
  setShowLoader(true);
  setTimeout(() => {
    setScreen({ screen: 'dashboard' });
  }, 750);
};
