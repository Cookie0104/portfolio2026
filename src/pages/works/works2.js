import HRimg from "../../img/HRimg.png";
import HRimgPhone from "../../img/HRimg-phone.png";
import styles from "../../css/work.module.scss";
import useScreenWidth from "../../component/function/screenwidth";
import WORK from "../../content/WORK.json";
import { useLanguage } from "../../component/function/languageContext";
const Work2 = () => {
  const { language } = useLanguage();
  const lang = language === "English" ? "en" : "ch";
  const width = useScreenWidth();
  const workData = WORK.find((item) => item.id === 2);
  return (
    <div className={styles.workOuter}>
      <div className={styles.imgOuter}>
        {width > 500 && <img src={HRimg} alt="" />}
        {width <= 500 && <img src={HRimgPhone} alt="" />}
      </div>
      {width <= 500 && (
        <div className={styles.wordOuter}>
          <h1>{workData[`title-${lang}`]}</h1>
          <h2>{workData[`subtitle-${lang}`]}</h2>
        </div>
      )}
    </div>
  );
};

export default Work2;
