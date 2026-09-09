// component/FadeInSection.js
import { useRef, useState, useEffect } from "react";
import styles from "../../css/fade.module.scss";

const FadeInSection = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.fadeInSection} ${isVisible ? styles.isVisible : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
