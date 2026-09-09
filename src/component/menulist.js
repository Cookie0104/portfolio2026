import styles from "../css/menulist.module.scss";
import useScreenWidth from "./function/screenwidth";
import { useContext } from "react";
import { SideMenuContext } from "./function/sideMenuContext";
import LanguageToggle from "../component/function/languageToggle";
import { useLanguage } from "./function/languageContext";
import { Link, useLocation } from "react-router-dom";

const TABS = [
  { path: "/", en: "About", ch: "關於我" },
  { path: "/works", en: "Works", ch: "參與專案" },
  { path: "/gallery", en: "Gallery", ch: "平面設計" },
  { path: "/contact", en: "Contact", ch: "留個言吧" },
  { path: "/resume", en: "Résumé", ch: "履歷" },
];

const Menulist = () => {
  const { language } = useLanguage();
  const { isSideMenuOpen, setIsSideMenuOpen } = useContext(SideMenuContext);
  const width = useScreenWidth();
  const location = useLocation();

  const isTabActive = (path) => {
    if (path === "/works") {
      return location.pathname === "/works" || location.pathname.startsWith("/works/");
    }
    return location.pathname === path;
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.overlayBackground)) {
      setIsSideMenuOpen(false);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`${styles.overlayBackground} ${
        isSideMenuOpen ? styles["is-active"] : styles["is-inactive"]
      }`}
    >
      <div className={styles.menulist}>
        <div className={styles.flex}>
          {TABS.map((tab) => (
            <div key={tab.path}>
              <Link
                to={tab.path}
                onClick={() => setIsSideMenuOpen(false)}
                className={isTabActive(tab.path) ? styles.active : ""}
              >
                {language === "English" ? tab.en : tab.ch}
              </Link>
            </div>
          ))}
        </div>
        {width <= 800 && <LanguageToggle />}
      </div>
    </div>
  );
};

export default Menulist;
