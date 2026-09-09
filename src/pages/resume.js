import styles from "../css/resume.module.scss";
import { useLanguage } from "../component/function/languageContext";
import LinkIcon from "../img/ic-link.svg";
import RESUME from "../content/RESUME.json";

const RESUME_FILE_ID = "1PVpQwvZ-H4qss995RIqOrRnZ3O-PHK6E";
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

const SectionLabel = ({ index, children }) => (
  <div className={styles.sectionLabel}>
    <span className={styles.sectionIndex}>{index}</span>
    {children}
  </div>
);

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Resume = () => {
  const { language } = useLanguage();
  const lang = language === "English" ? "en" : "ch";
  const isCurrent = (period) => /present|至今|now/i.test(period);

  return (
    <div className={styles.resumeOuter}>
      <div className={styles.resumeInner}>
        <div className={styles.topBar}>
          <div className={styles.pageTitle}>
            {language === "English" ? "Résumé" : "我的履歷"}
          </div>
          <a
            className={styles.downloadBtn}
            href={RESUME_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LinkIcon} alt="" />
            {language === "English" ? "Download PDF" : "下載 PDF"}
          </a>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.badge}>{getInitials(RESUME.name)}</div>
            <div className={styles.name}>{RESUME.name}</div>
            <div className={styles.roleLine}>{RESUME[`role-${lang}`]}</div>
            <div className={styles.years}>{RESUME[`years-${lang}`]}</div>

            <div className={styles.tagStack}>
              {RESUME[`tags-${lang}`].map((tag, i) => (
                <div key={i} className={styles.sideTag}>
                  {tag}
                </div>
              ))}
            </div>

            <div className={styles.sidebarDivider}></div>

            <div className={styles.sideSectionLabel}>
              {language === "English" ? "Skills" : "技能"}
            </div>
            {RESUME.skills.map((skill, i) => (
              <div key={i} className={styles.skillBlock}>
                <div className={styles.skillCategory}>
                  {skill[`category-${lang}`]}
                </div>
                <div className={styles.tagRow}>
                  {skill.items.map((item, j) => (
                    <span key={j} className={styles.tag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          <main className={styles.main}>
            <section className={styles.section}>
              <SectionLabel index="01">
                {language === "English" ? "Summary" : "個人簡介"}
              </SectionLabel>
              {RESUME[`summary-${lang}`].map((p, i) => (
                <p key={i} className={styles.paragraph}>
                  {p}
                </p>
              ))}
            </section>

            <section className={styles.section}>
              <SectionLabel index="02">
                {language === "English" ? "Experience" : "工作經歷"}
              </SectionLabel>

              <div className={styles.timeline}>
                {RESUME.experience.map((exp, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.expHeader}>
                      <div>
                        <div className={styles.expCompany}>{exp.company}</div>
                        <div className={styles.expRole}>{exp.role}</div>
                      </div>
                      <div className={styles.expPeriod}>
                        {exp[`period-${lang}`]}
                        {isCurrent(exp[`period-${lang}`]) && (
                          <span className={styles.liveDot} aria-hidden="true"></span>
                        )}
                      </div>
                    </div>
                    <ul className={styles.bulletList}>
                      {exp[`bullets-${lang}`].map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                    {exp[`projects-${lang}`].length > 0 && (
                      <div className={styles.projectsRow}>
                        <span className={styles.projectsLabel}>
                          {language === "English"
                            ? "Key Projects"
                            : "主要代表專案"}
                        </span>
                        <div className={styles.tagRow}>
                          {exp[`projects-${lang}`].map((p, j) => (
                            <span key={j} className={styles.tag}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <SectionLabel index="03">
                {language === "English" ? "Awards" : "其他"}
              </SectionLabel>
              <ul className={styles.awardList}>
                {RESUME[`awards-${lang}`].map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Resume;
