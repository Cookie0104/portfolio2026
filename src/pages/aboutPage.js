import styles from "../css/global.module.scss";
import Banner from "./banner.js";
import About from "./about.js";
import FadeInSection from "../component/function/fade.js";

const AboutPage = () => {
  return (
    <div className={styles.app}>
      <FadeInSection>
        <Banner />
      </FadeInSection>
      <div className={styles.contentOuter}>
        <FadeInSection>
          <About />
        </FadeInSection>
      </div>
    </div>
  );
};

export default AboutPage;
