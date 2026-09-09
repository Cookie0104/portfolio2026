import { useLanguage } from "./languageContext";
import styles from "../../css/language.module.scss";

const ChooseLanguage2 = ({ setLanguageList,onClick }) => {
  const { setLanguage } = useLanguage();
  const changeLanguage = (e) => {
    const targetLanguage = e.currentTarget.dataset.value;
    setLanguage(targetLanguage);
    setLanguageList(false);
  };

  return (
    <div onClick={onClick} className={styles.mask}>
      <div className={styles.languageListOuter2}>
        <div onClick={changeLanguage} data-value="Chinese">
          中文
        </div>
        <div onClick={changeLanguage} data-value="English">
          English
        </div>
      </div>
    </div>
  );
};

export default ChooseLanguage2;
