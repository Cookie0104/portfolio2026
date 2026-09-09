import styles from "../css/footer.module.scss";
import Instagram from "../img/ig.svg";
import Linkedin from "../img/Linkedin.svg";
const Footer = () => {
  return (
    <div className={styles.footerOuter}>
      <div className={styles.linkOuter}>
        <a
          href="https://www.instagram.com/slothw.design/?igsh=bDNoZGlsYTJsam9m&utm_source=qr#"
          rel="noreferrer"
          target="_blank"
        >
          <img src={Instagram} alt="ig" />
        </a>
        <a
          href="https://www.linkedin.com/in/minanw/"
          rel="noreferrer"
          target="_blank"
        >
          <img src={Linkedin} alt="Linkedin" />
        </a>
      </div>
      <div className={styles.copyright}>2025 © Emily Design</div>
    </div>
  );
};

export default Footer;
