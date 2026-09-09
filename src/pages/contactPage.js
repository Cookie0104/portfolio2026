import styles from "../css/global.module.scss";
import Contact from "./contact.js";
import FadeInSection from "../component/function/fade.js";

const ContactPage = () => {
  return (
    <div className={styles.app}>
      <div className={`${styles.contentOuter} ${styles.pageOuter}`}>
        <FadeInSection>
          <Contact />
        </FadeInSection>
      </div>
    </div>
  );
};

export default ContactPage;
