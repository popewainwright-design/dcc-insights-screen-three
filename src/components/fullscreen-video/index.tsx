import Icons from '../icons';

const FullscreenVideo = ({
  videoSrc,
  setPlay,
  play,
  videoRef,

  handleClick,
}: {
  videoSrc: string;
  setPlay: (play: boolean) => void;
  play: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleClick: () => void;
}) => {
  return (
    <>
      <button
        className="bg-none p-0 hover:border-none hover:bg-transparent focus:border-none focus:bg-transparent"
        onClick={() => setPlay(!play)}
      >
        <video ref={videoRef} src={videoSrc} autoPlay loop className="h-screen w-screen object-cover" />
        {!play && (
          <Icons
            type="play"
            customClass="absolute inset-0 left-[calc(50%-2.5vw)] top-[calc(50%-2.5vw)] h-[5vw] w-[5vw] fade-in duration-750 ease-in-out"
          />
        )}
      </button>
      <div
        className="absolute bottom-[1vw] left-[1vw] h-[3vw] w-[3vw] bg-transparent p-0 hover:border-none hover:bg-transparent focus:border-none focus:bg-transparent"
        role="button"
        onClick={() => {
          handleClick();
        }}
      >
        <Icons type="home" />
      </div>
    </>
  );
};

export default FullscreenVideo;
