import { useState } from "react";
import styles from "../css/gallery.module.scss";
import { useLanguage } from "../component/function/languageContext";
import GALLERY from "../content/GALLERY.json";
import { createPortal } from "react-dom";

const CATEGORIES = [
  { key: "all", en: "All", ch: "全部" },
  { key: "UI/UX", en: "UI/UX", ch: "UI/UX" },
  { key: "graphic", en: "Graphic", ch: "平面設計" },
  { key: "product", en: "Other", ch: "其他" },
];

const GalleryPage = () => {
  const { language } = useLanguage();
  const lang = language === "English" ? "en" : "ch";
  const [activeTab, setActiveTab] = useState("all");
  const [openProject, setOpenProject] = useState(null);

  const filtered =
    activeTab === "all"
      ? GALLERY
      : GALLERY.filter((item) => item.category === activeTab);

  return (
    <>
    <div className={styles.galleryOuter}>
      <div className={styles.title}>
        {language === "English" ? "Gallery" : "作品展間"}
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

      <div className={styles.grid}>
        {filtered.map((project, index) => (
          <button
            className={styles.tile}
            key={project.id}
            style={{ "--delay": `${index * 0.05}s` }}
            onClick={() => setOpenProject(project)}
          >
            <span className={styles.index}>
              {String(project.id).padStart(2, "0")}
            </span>
            {project.images.length > 1 && (
              <span className={styles.stackCount}>
                {project.images.length} {lang === "en" ? "shots" : "張"}
              </span>
            )}
            <span className={styles.corner + " " + styles.cTL}></span>
            <span className={styles.corner + " " + styles.cTR}></span>
            <span className={styles.corner + " " + styles.cBL}></span>
            <span className={styles.corner + " " + styles.cBR}></span>
            <img
              src={require(`../img/Gallery/${project.images[0]}`)}
              alt={project[`title-${lang}`]}
            />
            <div className={styles.tileFooter}>
              <span className={styles.tileCaption}>
                {project[`title-${lang}`]}
              </span>
              <span className={styles.tileTag}>{project.category}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
      {openProject &&
              createPortal(
                <div
                  className={styles.lightbox}
                  onClick={() => setOpenProject(null)}
                >
                  <div
                    className={styles.lightboxPanel}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={styles.lightboxHeader}>
                      <span>{openProject[`title-${lang}`]}</span>
                      <button
                        className={styles.lightboxClose}
                        onClick={() => setOpenProject(null)}
                      >
                        ✕
                      </button>
                    </div>
                    <div className={styles.lightboxScroll}>
                      {openProject.images.map((img, i) => (
                        <img
                          key={i}
                          src={require(`../img/Gallery/${img}`)}
                          alt={`${openProject[`title-${lang}`]} ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>,
                document.body
              )}
    </>
  );
};

export default GalleryPage;
