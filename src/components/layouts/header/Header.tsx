import Logo from "src/components/common/logo/Logo.tsx";
import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`${className}`}>
      <Link to="/">
        <Logo withText={true} />
      </Link>
    </header>
  );
}

export default Header;
