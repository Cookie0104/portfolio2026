import { useContext } from "react";
import styles from "../css/ham.module.scss";
import { SideMenuContext } from "./function/sideMenuContext";

const Ham = () => {
  //   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  //   const clickHandle = () => {
  //     document.getElementById("hamburger").classList.toggle(styles["is-active"]);
  //     setIsSideMenuOpen(!isSideMenuOpen);
  //   };
  const { isSideMenuOpen, setIsSideMenuOpen } = useContext(SideMenuContext);
  return (
    <div
      onClick={() => {
        setIsSideMenuOpen(!isSideMenuOpen);
      }}
    >
      <div
        className={`${styles.hamburger} ${
          isSideMenuOpen ? styles["is-active"] : ""
        }`}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
    </div>
  );
};

export default Ham;
