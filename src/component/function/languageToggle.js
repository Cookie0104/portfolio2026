import { useLanguage } from "./languageContext";
import styles from "../../css/language.module.scss";

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className={styles.langToggle}>
      <button
        type="button"
        className={language === "English" ? styles.langActive : styles.langBtn}
        onClick={() => changeLanguage("English")}
      >
        EN
      </button>
      <button
        type="button"
        className={language === "Chinese" ? styles.langActive : styles.langBtn}
        onClick={() => changeLanguage("Chinese")}
      >
        中
      </button>
    </div>
  );
};

export default LanguageToggle;
