import logoImg from "public/logo.svg";
import logoWithTextImg from "public/logo_with_text.svg";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export function Logo({ className = "", withText = false }: LogoProps) {
  return (
    <div className={`${className}`}>
      <img src={withText ? logoWithTextImg : logoImg} alt="Logo" />
    </div>
  );
}

export default Logo;
