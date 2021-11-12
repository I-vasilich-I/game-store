import "./header.scss";
import Navbar from "./navbar/navbar";

const Header = (): JSX.Element => (
  <header className="header">
    <div className="wrapper wrapper__header">
      <h1>Game Store</h1>
      <Navbar />
    </div>
  </header>
);

export default Header;
