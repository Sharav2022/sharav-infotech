import React, { useEffect, useState } from "react";

const useIsMobile = ({ breakpoint = 480 }) => {
  const [width, setWidth] = useState(breakpoint);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    let portrait = window.matchMedia("(orientation: portrait)");

    portrait.addEventListener("change", function (e) {
      if (e.matches) {
        // Portrait mode
        setIsMobile(true);
      } else {
        // Landscape
        setIsMobile(false);
      }
    });

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setIsMobile(width <= breakpoint);
  }, [width]);

  return isMobile;
};

export default useIsMobile;
