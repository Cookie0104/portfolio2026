import styles from "../css/global.module.scss";
import GalleryPage from "./galleryPage.js";
import FadeInSection from "../component/function/fade.js";

const GalleryPageWrapper = () => {
  return (
    <div className={styles.app}>
      <div className={`${styles.contentOuter} ${styles.pageOuter}`}>
        <FadeInSection>
          <GalleryPage />
        </FadeInSection>
      </div>
    </div>
  );
};

export default GalleryPageWrapper;
