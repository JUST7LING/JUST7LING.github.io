import Signature from '../assets/signature.svg';

export const Main = () => {
  return (
    <div
      className="
      bg-portfolio 
      min-h-screen min-w-screen 
      p-[3vw]
      flex flex-col gap-[8vh]
    "
    >
      <header className="flex justify-start">
        <img src={Signature} className="w-[3vw]" />
      </header>

      <article
        className="
        font-pretendard font-semibold text-9xl
        flex flex-col items-center justify-center 
        "
      >
        <div className="w-[75vw] flex justify-start">Hello, I'm</div>
        <div className="w-[75vw] flex justify-end">Lee JooYoung!</div>
      </article>
      <section className="flex justify-center gap-[10vw]">
        <img src={Signature} className="w-[8vw]" />
        <img src={Signature} className="w-[8vw]" />
        <img src={Signature} className="w-[8vw]" />
        <img src={Signature} className="w-[8vw]" />
      </section>

      <footer className="flex flex-col justify-end items-end">
        <img src={Signature} className="w-[3vw]" />
      </footer>
    </div>
  );
};
