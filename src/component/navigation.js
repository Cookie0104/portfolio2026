import { Link, useLocation } from "react-router-dom";
import styles from "../css/navigation.module.scss";
import Ham from "./ham";
import LanguageToggle from "../component/function/languageToggle";
import useScreenWidth from "./function/screenwidth";
import { useLanguage } from "./function/languageContext";

const TABS = [
  { path: "/", en: "About", ch: "關於我" },
  { path: "/resume", en: "Résumé", ch: "我的履歷" },
  { path: "/works", en: "Works", ch: "專案介紹" },
  { path: "/gallery", en: "Gallery", ch: "作品展間" },
  { path: "/contact", en: "Contact", ch: "留個言吧" }
];

const Navigation = () => {
  const { language } = useLanguage();
  const width = useScreenWidth();
  const location = useLocation();

  const isTabActive = (path) => {
    if (path === "/works") {
      return location.pathname === "/works" || location.pathname.startsWith("/works/");
    }
    return location.pathname === path;
  };

  return (
    <div className={styles.header}>
      <div className={styles.navigationBar}>
        <div>
          {width <= 800 && <Ham />}
          <Link to="/" className={styles.homeLinkArea}>
            <div className={styles.name}>
              Emily
              <span className={styles.eq} aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
            <div className={styles.title}>UI/UX Designer</div>
          </Link>
        </div>
        {width > 800 && (
          <div className={styles.menu}>
            {TABS.map((tab) => (
              <div key={tab.path}>
                <Link
                  to={tab.path}
                  className={isTabActive(tab.path) ? styles.active : ""}
                >
                  {language === "English" ? tab.en : tab.ch}
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className={styles.buttonArea}>
          {width > 800 && <LanguageToggle />}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
