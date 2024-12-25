import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export function Header() {
  return (
    <header className="flex w-full justify-around bg-zinc-300 items-center max-sm:text-sm">
      <Link to="/">
        <img src={Logo} alt="Logo da página" className="size-16" />
      </Link>
      <nav className="flex items-center gap-3">
        <Link to="/" className="hover:text-blue-800">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-800">
          Sobre
        </Link>
        <Link to="/contact" className="hover:text-blue-800">
          Contato
        </Link>
      </nav>
    </header>
  );
}
