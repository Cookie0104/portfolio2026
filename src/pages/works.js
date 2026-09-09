import { useState } from "react";
import styles from "../css/work.module.scss";
import { Link } from "react-router-dom";
import { useLanguage } from "../component/function/languageContext";
import FadeInSection from "../component/function/fade.js";
import useScreenWidth from "../component/function/screenwidth";
import WORK from "../content/WORK.json";

import UCBimg from "../img/UCBimg.png";
import UCBimgPhone from "../img/UCBimg-phone.png";
import HRimg from "../img/HRimg.png";
import HRimgPhone from "../img/HRimg-phone.png";
import XDCimg from "../img/XDCimg.png";
import XDCimgPhone from "../img/XDCimg-phone.png";
import PriceAlertimg from "../img/PriceAlertimg.png";
import PriceAlertimgPhone from "../img/PriceAlertimg-phone.png";

const IMAGES = {
  UCB: { desktop: UCBimg, mobile: UCBimgPhone },
  HR: { desktop: HRimg, mobile: HRimgPhone },
  XDC: { desktop: XDCimg, mobile: XDCimgPhone },
  PriceAlert: { desktop: PriceAlertimg, mobile: PriceAlertimgPhone },
};

const CATEGORIES = [
  { key: "all", en: "All", ch: "全部" },
  { key: "app", en: "app", ch: "App" },
  { key: "ux", en: "UX", ch: "UX" },
  { key: "web", en: "Website", ch: "內容設計" },
  
];

const WorkRow = ({ data, lang, width }) => {
  if (data.placeholder) {
    return (
      <div className={`${styles.workOuter} ${styles.isPlaceholder}`}>
        <div className={styles.imgOuter}>
          <div className={styles.placeholderThumb}>
            <span>+</span>
          </div>
        </div>
        <div className={styles.wordOuter}>
          <h1 className={styles.placeholderTitle}>
            {lang === "en" ? "Next project" : "下一個作品"}
          </h1>
          <h2>{lang === "en" ? "Coming soon" : "整理中，敬請期待"}</h2>
        </div>
      </div>
    );
  }

  const images = IMAGES[data.image];

  return (
    <Link to={data.link}>
      <div className={styles.workOuter}>
        <div className={styles.imgOuter}>
          <img src={width > 500 ? images.desktop : images.mobile} alt={data[`title-${lang}`]} />
        </div>
        <div className={styles.wordOuter}>
          <h1>{data[`title-${lang}`]}</h1>
          <h2>{data[`subtitle-${lang}`]}</h2>
        </div>
      </div>
    </Link>
  );
};

const Works = ({ id }) => {
  const { language } = useLanguage();
  const lang = language === "English" ? "en" : "ch";
  const width = useScreenWidth();
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all" ? WORK : WORK.filter((item) => item.category === activeTab);

  return (
    <div id={id} className={styles.worksOuter}>
      <div className={styles.title}>
        {language === "English" ? "My Selected Works" : "精選專案"}
      </div>

      <div className={styles.tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={activeTab === cat.key ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(cat.key)}
          >
            {lang === "en" ? cat.en : cat.ch}
          </button>
        ))}
      </div>

      <div className={styles.workFlexArea}>
        {filtered.map((item) => (
          <FadeInSection key={item.id}>
            <WorkRow data={item} lang={lang} width={width} />
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default Works;
