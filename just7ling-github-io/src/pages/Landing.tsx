import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./Landing.css";

import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const goto = useNavigate();
  return (
    <div
      id="entire"
      className=" 
        flex 
        justify-center items-center
        min-w-screen min-h-screen
      "
    >
      <div id="box">
        <div className="flex">
          <img
            src={viteLogo}
            onClick={() => goto("/main")}
            className="logo"
            alt="Vite logo"
          />
          <img
            src={reactLogo}
            onClick={() => goto("/main")}
            className="logo react"
            alt="React logo"
          />
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => goto("/main")}>count is 0</button>
          <div className="h-[3vh]"></div>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
};
