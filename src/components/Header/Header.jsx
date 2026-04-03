import logo from "../../assets/images/logo.png"

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <h2 className="header__register"> <a href="/register" className="header__link">
        Register
      </a></h2>
    </header>
  );
}
