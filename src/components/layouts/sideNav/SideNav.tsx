import styles from "./SideNav.module.scss";
import mediationIcon from "public/assets/icons/meditation.svg";
import musculationIcon from "public/assets/icons/musculation.svg";
import natationIcon from "public/assets/icons/natation.svg";
import veloIcon from "public/assets/icons/velo.svg";
import { Link } from "react-router-dom";

interface SideNavProps {
  className?: string;
}

export function SideNav({ className = "" }: SideNavProps) {
  return (
    <aside className={`${className} ${styles.Component}`}>
      <main className={styles.Nav}>
        <Link to="#" className={styles.NavItem}>
          <img src={mediationIcon} alt="Icon de Médiation" />
        </Link>
        <Link to="#" className={styles.NavItem}>
          <img src={natationIcon} alt="Icon de Natation" />
        </Link>
        <Link to="#" className={styles.NavItem}>
          <img src={veloIcon} alt="Icon de vélo" />
        </Link>
        <Link to="#" className={styles.NavItem}>
          <img src={musculationIcon} alt="Icon de Musculation" />
        </Link>
      </main>
      <footer className={styles.Footer}>
        <div className={styles.Copyright}></div>
      </footer>
    </aside>
  );
}

export default SideNav;
