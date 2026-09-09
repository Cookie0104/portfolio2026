import styles from "../css/about.module.scss";
import DesignImg from "../img/img-design.svg";
import CodeImg from "../img/img-code.svg";
import DrumImg from "../img/img-drum.svg";
import { useState } from "react";
import useScreenWidth from "../component/function/screenwidth";
import ABOUT from "../content/ABOUT.json";
import Lottie from "lottie-react";
import animation1 from "../img/lottie/animation1.json";
import animation2 from "../img/lottie/animation2.json";
import animation3 from "../img/lottie/animation3.json";

const About = ({ id }) => {
  const [currentImg, setCurrentImg] = useState(animation1); // 預設太陽圖
  const width = useScreenWidth();

  function swithch(event) {
    const target = event.target;
    const parentElement = target.parentElement;
    const targetRect = target.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();

    // 取得 target 是第幾個子元素
    const index = Array.from(parentElement.children).indexOf(target);

    const relativeLeft = targetRect.left - parentRect.left;
    const switchBtn = document.querySelector("#switchButton");
    if (index === 1) {
      //夕陽 工程師
      switchBtn.style.setProperty("--after-left", `${relativeLeft - 8}px`);
      switchBtn.style.setProperty("--before-left", `${relativeLeft - 8}px`);
      switchBtn.style.setProperty("--before-start", `#EB9591`);
      switchBtn.style.setProperty("--before-end", `#F7AFAB`);
      switchBtn.style.setProperty("--after-start", `#F4924D`);
      switchBtn.style.setProperty("--after-end", `#EDA3BD`);
      switchBtn.style.setProperty("--bg-start", `#C0B8FF`);
      switchBtn.style.setProperty("--bg-end", `#F3E5FF`);
      switchBtn.style.setProperty("--status1", `none`);
      switchBtn.style.setProperty("--status2", `block`);
      switchBtn.style.setProperty("--status3", `none`);
      setCurrentImg(animation2);
      document.querySelector("#code").classList.add(`${styles.blue}`);
      document.querySelector("#design").classList.remove(`${styles.blue}`);
      document.querySelector("#drum").classList.remove(`${styles.blue}`);
    } else if (index === 0) {
      //太陽 設計師
      switchBtn.style.setProperty("--after-left", `${relativeLeft}px`);
      switchBtn.style.setProperty("--before-left", `${relativeLeft}px`);
      switchBtn.style.setProperty("--before-start", `#FFD255`);
      switchBtn.style.setProperty("--before-end", `#FFD255`);
      switchBtn.style.setProperty("--after-start", `#FFC025`);
      switchBtn.style.setProperty("--after-end", `#FFED7C`);
      switchBtn.style.setProperty("--bg-start", `#EDFEFF`);
      switchBtn.style.setProperty("--bg-end", `#CFF3FF`);
      switchBtn.style.setProperty("--status1", `block`);
      switchBtn.style.setProperty("--status2", `none`);
      switchBtn.style.setProperty("--status3", `none`);
      setCurrentImg(animation1);
      document.querySelector("#design").classList.add(`${styles.blue}`);
      document.querySelector("#code").classList.remove(`${styles.blue}`);
      document.querySelector("#drum").classList.remove(`${styles.blue}`);
    } else {
      //月亮 鼓手
      switchBtn.style.setProperty("--after-left", `${relativeLeft}px`);
      switchBtn.style.setProperty("--before-left", `${relativeLeft}px`);
      switchBtn.style.setProperty("--before-start", `#CEE5FF`);
      switchBtn.style.setProperty("--before-end", `#F1F9FF`);
      switchBtn.style.setProperty("--after-start", `#D6E9FF`);
      switchBtn.style.setProperty("--after-end", `#CDE4FF`);
      switchBtn.style.setProperty("--bg-start", `#577EB5`);
      switchBtn.style.setProperty("--bg-end", `#AFCAFF`);
      switchBtn.style.setProperty("--status1", `none`);
      switchBtn.style.setProperty("--status2", `none`);
      switchBtn.style.setProperty("--status3", `block`);
      setCurrentImg(animation3);
      document.querySelector("#drum").classList.add(`${styles.blue}`);
      document.querySelector("#code").classList.remove(`${styles.blue}`);
      document.querySelector("#design").classList.remove(`${styles.blue}`);
    }
  }
  function swithch2(event) {
    const target = event.target;
    const parentElement = target.parentElement;

    // 取得 target 是第幾個子元素
    const index = Array.from(parentElement.children).indexOf(target);

    // const relativeLeft = targetRect.left - parentRect.left;
    const switchBtn = document.querySelector("#switchButton");
    if (width > 800) {
      if (index === 1) {
        //夕陽 工程師
        // switchBtn.style.setProperty("--after-left", `32px`);
        // switchBtn.style.setProperty("--before-left", `32px`);
        // switchBtn.style.setProperty("--before-start", `#EB9591`);
        // switchBtn.style.setProperty("--before-end", `#F7AFAB`);
        // switchBtn.style.setProperty("--after-start", `#F4924D`);
        // switchBtn.style.setProperty("--after-end", `#EDA3BD`);
        // switchBtn.style.setProperty("--bg-start", `#C0B8FF`);
        // switchBtn.style.setProperty("--bg-end", `#F3E5FF`);
        // switchBtn.style.setProperty("--status1", `none`);
        // switchBtn.style.setProperty("--status2", `block`);
        // switchBtn.style.setProperty("--status3", `none`);
        setCurrentImg(animation2);
        document.querySelector("#code").classList.add(`${styles.blue}`);
        document.querySelector("#design").classList.remove(`${styles.blue}`);
        document.querySelector("#drum").classList.remove(`${styles.blue}`);
      } else if (index === 0) {
        //太陽 設計師
        // switchBtn.style.setProperty("--after-left", `0px`);
        // switchBtn.style.setProperty("--before-left", `0px`);
        // switchBtn.style.setProperty("--before-start", `#FFD255`);
        // switchBtn.style.setProperty("--before-end", `#FFD255`);
        // switchBtn.style.setProperty("--after-start", `#FFC025`);
        // switchBtn.style.setProperty("--after-end", `#FFED7C`);
        // switchBtn.style.setProperty("--bg-start", `#EDFEFF`);
        // switchBtn.style.setProperty("--bg-end", `#CFF3FF`);
        // switchBtn.style.setProperty("--status1", `block`);
        // switchBtn.style.setProperty("--status2", `none`);
        // switchBtn.style.setProperty("--status3", `none`);
        setCurrentImg(animation1);
        document.querySelector("#design").classList.add(`${styles.blue}`);
        document.querySelector("#code").classList.remove(`${styles.blue}`);
        document.querySelector("#drum").classList.remove(`${styles.blue}`);
      } else {
        //月亮 鼓手
        // switchBtn.style.setProperty("--after-left", `62px`);
        // switchBtn.style.setProperty("--before-left", `62px`);
        // switchBtn.style.setProperty("--before-start", `#CEE5FF`);
        // switchBtn.style.setProperty("--before-end", `#F1F9FF`);
        // switchBtn.style.setProperty("--after-start", `#D6E9FF`);
        // switchBtn.style.setProperty("--after-end", `#CDE4FF`);
        // switchBtn.style.setProperty("--bg-start", `#577EB5`);
        // switchBtn.style.setProperty("--bg-end", `#AFCAFF`);
        // switchBtn.style.setProperty("--status1", `none`);
        // switchBtn.style.setProperty("--status2", `none`);
        // switchBtn.style.setProperty("--status3", `block`);
        setCurrentImg(animation3);
        document.querySelector("#drum").classList.add(`${styles.blue}`);
        document.querySelector("#code").classList.remove(`${styles.blue}`);
        document.querySelector("#design").classList.remove(`${styles.blue}`);
      }
    } else {
      if (index === 1) {
        //夕陽 工程師
        setCurrentImg(CodeImg);
        document.querySelector("#code").classList.add(`${styles.blue}`);
        document.querySelector("#design").classList.remove(`${styles.blue}`);
        document.querySelector("#drum").classList.remove(`${styles.blue}`);
      } else if (index === 0) {
        //太陽 設計師
        setCurrentImg(DesignImg);
        document.querySelector("#design").classList.add(`${styles.blue}`);
        document.querySelector("#code").classList.remove(`${styles.blue}`);
        document.querySelector("#drum").classList.remove(`${styles.blue}`);
      } else {
        //月亮 鼓手
        setCurrentImg(DrumImg);
        document.querySelector("#drum").classList.add(`${styles.blue}`);
        document.querySelector("#code").classList.remove(`${styles.blue}`);
        document.querySelector("#design").classList.remove(`${styles.blue}`);
      }
    }
  }
  return (
    <div id={id} className={styles.aboutOuter}>
      <div className={styles.picAndNameOuter}>
        <div className={styles.picture}>
          <Lottie animationData={currentImg} loop={true} />
          {/* <div id="switchButton" className={styles.switchButton}>
            <div
              onClick={swithch}
              className={`${styles.switchClickArea} ${styles.switchDay}`}
            ></div>
            <div
              onClick={swithch}
              className={`${styles.switchClickArea}`}
            ></div>
            <div
              onClick={swithch}
              className={`${styles.switchClickArea}`}
            ></div>
          </div> */}
        </div>
        <div>
          <div className={styles.name}>Hi, I'm Emily.</div>
          <div className={styles.role}>
            I{" "}
            <span id="design" className={styles.blue} onClick={swithch2}>
              design experiences
            </span>
            ,{" "}
            <span id="code" onClick={swithch2}>
              code ideas
            </span>
            , and{" "}
            <span id="drum" onClick={swithch2}>
              {" "}
              keep the beat
            </span>
            .
          </div>
        </div>
      </div>
      <div>
        {/* {width <= 800 && (
          <div className={styles.picture2}>
            <img src={currentImg} alt="it's me" />
          </div>
        )} */}

        {ABOUT.map((ABOUT) => {
          return <div className={styles.aboutContent}>{ABOUT.content}</div>;
        })}
      </div>
    </div>
  );
};

export default About;
