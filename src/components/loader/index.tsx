const Loader = ({ type }: { type: 'horizontal' | 'vertical' }) => {
  if (type === 'vertical') {
    return (
      <div className="loader absolute top-0 left-0 h-[400vh] w-screen">
        <div className="loader__bar h-[33.333%] w-full rounded-tl-full rounded-tr-full bg-gradient-to-r from-secondary to-primary" />
        <div className="loader__bar h-[33.333%] w-full bg-gradient-to-r from-secondary to-primary" />
        <div className="loader__bar h-[33.333%] w-full rounded-br-full rounded-bl-full bg-gradient-to-r from-secondary to-primary" />
      </div>
    );
  }
  return (
    <div className="loader absolute top-0 left-0 h-screen w-[200vw]">
      <div className="loader__bar h-full w-full rounded-full bg-gradient-to-r from-secondary to-primary" />
    </div>
  );
};

export default Loader;
