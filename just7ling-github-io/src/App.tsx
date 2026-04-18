import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Landing } from './pages/Landing';
import { Cushion } from './pages/demo/Cushion';
import { Main } from './pages/Main';

function App() {
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);
  const [animateToMain, setAnimateToMain] = useState(false);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    if (prevPath === '/' && currentPath === '/main') {
      setAnimateToMain(true);
    } else {
      setAnimateToMain(false);
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  return (
    <div className="overflow-hidden">
      <div
        className={
          animateToMain ? 'page-transition animate-blur-in' : undefined
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/cushion-generator" element={<Cushion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
