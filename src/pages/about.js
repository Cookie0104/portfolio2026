import styles from "../css/about.module.scss";
import { useState } from "react";
import useScreenWidth from "../component/function/screenwidth";
import ABOUT from "../content/ABOUT.json";
import Lottie from "lottie-react";
import animation1 from "../img/lottie/animation1.json";
import animation2 from "../img/lottie/animation2.json";
import animation3 from "../img/lottie/animation3.json";
import { useLanguage } from "../component/function/languageContext";


const About = ({ id }) => {
  const { language } = useLanguage();
  const lang = language === "English" ? "en" : "ch";
  const [currentImg, setCurrentImg] = useState(animation1); // 預設圖
  const width = useScreenWidth();
  function swithch2(event) {
    const target = event.target;
    const parentElement = target.parentElement;

    // 取得 target 是第幾個子元素
    const index = Array.from(parentElement.children).indexOf(target);

    // const relativeLeft = targetRect.left - parentRect.left;
    const switchBtn = document.querySelector("#switchButton");

    if (index === 1) {
      setCurrentImg(animation2);
      document.querySelector("#code").classList.add(`${styles.blue}`);
      document.querySelector("#design").classList.remove(`${styles.blue}`);
      document.querySelector("#drum").classList.remove(`${styles.blue}`);
    } else if (index === 0) {
      setCurrentImg(animation1);
      document.querySelector("#design").classList.add(`${styles.blue}`);
      document.querySelector("#code").classList.remove(`${styles.blue}`);
      document.querySelector("#drum").classList.remove(`${styles.blue}`);
    } else {
      setCurrentImg(animation3);
      document.querySelector("#drum").classList.add(`${styles.blue}`);
      document.querySelector("#code").classList.remove(`${styles.blue}`);
      document.querySelector("#design").classList.remove(`${styles.blue}`);
    }
  }
  return (
    <div id={id} className={styles.aboutOuter}>
      <div className={styles.picAndNameOuter}>
        <div className={styles.picture}>
          <Lottie animationData={currentImg} loop={true} />
        </div>
        <div>
          <div className={styles.name}>
            {language === "English" ? "Hi, I'm Emily." : "嗨，我是 Emily。"}
          </div>
          <div className={styles.role}>
            {language === "English" ? "I " : "我喜歡"}
            <span id="design" className={styles.blue} onClick={swithch2}>
              {language === "English" ? "design experiences" : "設計體驗"}
            </span>
            {language === "English" ? ", " : "、"}
            <span id="code" onClick={swithch2}>
              {language === "English" ? "code ideas" : "將想法寫成程式"}
            </span>
            {language === "English" ? ", and " : "，並"}
            <span id="drum" onClick={swithch2}>
              {language === "English" ? "keep the beat" : "在節奏中找尋自我"}
            </span>
            {language === "English" ? "." : "。"}
          </div>
        </div>
      </div>
      <div>
        {ABOUT.map((ABOUT) => {
          return <div className={styles.aboutContent}>{ABOUT[`content-${lang}`]}</div>;
        })}
      </div>
    </div>
  );
};

export default About;
