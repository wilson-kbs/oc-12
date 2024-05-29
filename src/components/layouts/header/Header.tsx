import styles from "./Header.module.scss";
import Logo from "src/components/common/logo/Logo.tsx";
import { Link } from "react-router-dom";
import HeaderNav from "src/components/layouts/headerNav/HeaderNav.tsx";

interface HeaderProps {
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`${styles.Component} ${className}`}>
      <Link to="/">
        <Logo withText={true} />
      </Link>
      <HeaderNav className={styles.Nav} />
    </header>
  );
}

export default Header;
