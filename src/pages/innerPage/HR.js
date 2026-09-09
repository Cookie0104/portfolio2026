import Button from "../../component/button";
import ArrowIcon from "../../img/ic-arrow.svg";
import { useLanguage } from "../../component/function/languageContext";
import styles from "../../css/innerPage.module.scss";
import HRData from "../../content/HR.json";
import { Link } from "react-router-dom";
import useScreenWidth from "../../component/function/screenwidth";

const HR = () => {
  const width = useScreenWidth();
  const { language } = useLanguage();
  const buttonText = language === "English" ? "Back to List" : "返回選單";
  const projectIntro = HRData.find((item) => item.id === 1);
  const projectContent = HRData.find((item) => item.id === 2);
  const lang = language === "English" ? "en" : "ch";
  return (
    <>
      <Link className={styles.backToHome} to="/works">
        <Button
          name={buttonText}
          color="withoutOutline"
          size="small"
          icon={ArrowIcon}
          iconPosition="left"
        />
      </Link>
      {width <= 799 && (
        <div className={styles.projectTitleFixed}>
          {projectIntro[`title-${lang}`]}
        </div>
      )}
      <div className={styles.innerPageOuter}>
        <div className={styles.contentArea}>
          <div className={styles.leftArea}>
            {width >= 800 && (
              <div className={styles.projectTitle}>
                {projectIntro[`title-${lang}`]}
              </div>
            )}

            {/* Role */}
            <div>
              <div className={styles.smallTitle}>
                {language === "English" ? "Roles" : "負責角色"}
              </div>
              <div
                className={`${styles.flex} ${styles.gap8} ${styles.roleOuter} ${styles.wrap}`}
              >
                {projectIntro[`role-${lang}`].map((role, index) => (
                  <div className={styles.role} key={index}>
                    {role}
                  </div>
                ))}
              </div>
            </div>
            {/* Tools */}
            <div>
              <div className={styles.smallTitle}>
                {language === "English" ? "Tools" : "設計工具"}
              </div>
              <div
                className={`${styles.toolOuter} ${styles.flex} ${styles.gap8} ${styles.wrap}`}
              >
                {projectIntro.tool.map((tool, index) => (
                  <div className={styles.tool} key={index}>
                    {tool}
                    {index !== projectIntro.tool.length - 1 && (
                      <span className={styles.separator}>｜</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 右邊 */}
          <div className={styles.rightArea}>
            {/* 專案概述 */}
            <div>
              <h3>
                {lang == "en" ? "Overview" : "專案概述"}
              </h3>
              <div>{projectIntro[`introduction-${lang}`]}</div>
            </div>
            <div className={styles.mapOuter}>
              {projectContent[`content-${lang}`].map((section, index) => (
                <div key={index}>
                  {section.title && <h3>{section.title}</h3>}
                  {section.subtitle && <h4>{section.subtitle}</h4>}
                  {section.content &&
                    section.content.map((content, index) => (
                      <div key={index}>{content}</div>
                    ))}

                  {section.content2 && (
                    <div
                      className={`${styles.flex} ${styles.onlyColumn} ${styles.gap12}`}
                    >
                      {section.content2 &&
                        section.content2.map((content, index) => (
                          <li key={index}>{content}</li>
                        ))}
                    </div>
                  )}

                  {section.content3 &&
                    section.content3.map((content, index) => (
                      <div key={index}>{content}</div>
                    ))}
                  {section.image && (
                    <>
                      <img
                        src={require(`../../img/HR/${section.image}`)}
                        alt={section.title || "image"}
                      />
                      <div className={styles.imgWord}>{section.imageWord}</div>
                    </>
                  )}
                  {section.video && (
                    <>
                      <video controls width="100%">
                        <source
                          src={require(`../../img/HR/${section.video}`)}
                          type="video/mp4"
                        />
                      </video>
                      <div className={styles.imgWord}>{section.imageWord}</div>
                    </>
                  )}
                  {section["highlight-title"] && (
                    <div className={styles.highlight}>
                      {section["highlight-title"] && (
                        <h3 className={styles.highlightTitle}>
                          {section["highlight-title"]}
                        </h3>
                      )}
                      <div
                        className={`${styles.flex} ${styles.onlyColumn} ${styles.gap12}`}
                      >
                        {section["highlight-content"]?.map((content, index) => (
                          <li key={index}>{content}</li>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HR;
