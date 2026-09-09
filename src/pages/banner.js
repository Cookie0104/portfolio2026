import { useRef } from "react";
import styles from "../css/banner.module.scss";
import DraggablePoint from "../component/function/draggable";
import DraggablePoint2 from "../component/function/draggable2";
import CanvasTool from "../component/function/canvasTool";
import useScreenWidth from "../component/function/screenwidth";
import { useLanguage } from "../component/function/languageContext";

const Banner = () => {
  const width = useScreenWidth();
  const { language } = useLanguage();
  const outerRef = useRef(null);
  const coordRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPx = e.clientX - rect.left;
    const yPx = e.clientY - rect.top;
    const x = (xPx / rect.width) * 100;
    const y = (yPx / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--mx-px", `${xPx}px`);
    el.style.setProperty("--my-px", `${yPx}px`);
    if (coordRef.current) {
      coordRef.current.textContent = `X ${Math.round(xPx)}  Y ${Math.round(yPx)}`;
    }
  };

  const handleMouseLeave = () => {
    const el = outerRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `40%`);
  };

  return (
    <div
      id="homePage"
      ref={outerRef}
      onMouseMove={width > 500 ? handleMouseMove : undefined}
      onMouseLeave={width > 500 ? handleMouseLeave : undefined}
      className={width > 500 ? styles.aboutOuter : styles.aboutOuterPhone}
    >
      {width > 500 && (
        <>
          <div className={styles.guideH} aria-hidden="true"></div>
          <div className={styles.guideV} aria-hidden="true"></div>
          <div className={styles.coordTag} ref={coordRef} aria-hidden="true">
            X 0  Y 0
          </div>
          <CanvasTool />
        </>
      )}

      <div className={styles.draggableouter}>
        {width > 500 && <DraggablePoint />}
        {width <= 500 && <DraggablePoint2 />}
      </div>

      <div className={styles.tagline}>
        {language === "English"
          ? "Good design finds the inner rhythm."
          : "好的設計，把複雜點成了順暢的節奏。"}
      </div>
      <div className={styles.heroSub}>
        {language === "English"
          ? "Designing clear and intuitive interfaces to deliver seamlessly structured user experiences."
          : "UI/UX 設計師，以清晰傳遞體驗，做清楚易懂的介面。"}
      </div>

      <span></span>
    </div>
  );
};

export default Banner;
