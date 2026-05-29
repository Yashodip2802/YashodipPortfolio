import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 400); // Reduced transition delay
      }
    });
  }, [isLoaded]);

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          YS
        </a>
      </div>
      <div className="loading-screen" style={{ backgroundColor: "#050810", transition: "opacity 0.5s ease" }}>
        {/* Progress bar loader removed, keeping clean transition overlay */}
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  // Instantly dispatch 100% to skip artificial countdown delays
  setLoading(100);

  function loaded() {
    return new Promise<number>((resolve) => {
      setLoading(100);
      resolve(100);
    });
  }

  function clear() {
    setLoading(100);
  }

  return { loaded, percent: 100, clear };
};
