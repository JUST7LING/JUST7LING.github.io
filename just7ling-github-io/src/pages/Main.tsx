import Signature from '../assets/signature.svg';

export const Main = () => {
  return (
    <div
      className="
      bg-portfolio 
      min-h-screen min-w-screen 
      flex flex-col
    "
    >
      <header className="flex justify-start">
        <img src={Signature} className="w-[3vw]" />
      </header>
      <article
        className="
        font-pretendard font-bold text-9xl
        flex flex-col items-center justify-center
        "
      >
        <div className="w-[75vw] flex justify-start">HO!</div>
        <div className="w-[75vw] flex justify-end">HOORAY!</div>
      </article>
      <footer className="flex justify-end">
        <img src={Signature} className="w-[3vw]" />
      </footer>
    </div>
  );
};
