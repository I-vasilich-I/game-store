import { IAuthForm } from "@/types";
import "./header.scss";
import Navbar from "./navbar/navbar";

const Header = ({ setIsModalOpen, setAuthFormType }: IAuthForm): JSX.Element => (
  <header className="header">
    <div className="wrapper wrapper__header">
      <h1>Game Store</h1>
      <Navbar setIsModalOpen={setIsModalOpen} setAuthFormType={setAuthFormType} />
    </div>
  </header>
);

export default Header;
