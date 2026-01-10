import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Landing } from "./pages/Landing";
import { Main } from "./pages/Main";

function App() {
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);
  const [animateToMain, setAnimateToMain] = useState(false);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    if (prevPath === "/" && currentPath === "/main") {
      setAnimateToMain(true);
    } else {
      setAnimateToMain(false);
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className={
          animateToMain ? "page-transition animate-blur-in" : undefined
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

