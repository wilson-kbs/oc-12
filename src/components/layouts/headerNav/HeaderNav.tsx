import styles from "./HeaderNav.module.scss";
import content from "src/data/contents/headerNav.json";
import { Link } from "react-router-dom";

interface HeaderNavProps {
  className?: string;
}

function HeaderNav({ className = "" }: HeaderNavProps) {
  return (
    <nav className={`${styles.Component} ${className}`}>
      <ul className={styles.Component__list}>
        {Object.entries(content.links).map(([key, item]) => (
          <li key={key} className={styles.Component__item}>
            <Link className={styles.Component__item_link} to={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HeaderNav;
