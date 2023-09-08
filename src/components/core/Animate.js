import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

const Animate = ({ animation = "fade-up", children, className }) => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      delay: 100,
    });
  }, []);

  return (
    <div
       className={className}
      data-aos={animation} //Here you can use any of the AOS animations
    >
      {children}
    </div>
  );
};

export default Animate;
