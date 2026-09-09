import { useLanguage } from "../function/languageContext";
import styles from "../../css/language.module.scss";

const ChooseLanguage = ({ setLanguageList , isActive}) => {
  const { changeLanguage } = useLanguage();
  const change = (e) =>{
    const targetLanguage = e.currentTarget.dataset.value;
    changeLanguage(targetLanguage);
    setLanguageList(false);
  }

  return (
    <div className={`${styles.languageListOuter} ${isActive ? styles.active : ""}`}>
      <div onClick={change} data-value="Chinese">中文</div>
      <div onClick={change} data-value="English">English</div>
    </div>
  );
};

export default ChooseLanguage;
