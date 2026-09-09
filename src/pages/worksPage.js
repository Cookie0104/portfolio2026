import styles from "../css/global.module.scss";
import Works from "./works.js";
import FadeInSection from "../component/function/fade.js";

const WorksPage = () => {
  return (
    <div className={styles.app}>
      <div className={`${styles.contentOuter} ${styles.pageOuter}`}>
        <FadeInSection>
          <Works />
        </FadeInSection>
      </div>
    </div>
  );
};

export default WorksPage;
