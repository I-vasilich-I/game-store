import "./styles/main.scss";
import ReactDOM from "react-dom";
import { StrictMode, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "./constants";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import HomePage from "./components/homePage/homePage";
import ProductsPage from "./components/productsPage/productsPage";
import AuthForm from "./components/authForm/authForm";
import Modal from "./elements/modal/modal";
import { AuthFormTypes } from "./types";

const AppContainer = (): JSX.Element => {
  const { home, products, about, profile } = ROUTES;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authFormType, setAuthFormType] = useState<AuthFormTypes>("signin");
  const user = localStorage.getItem("userName") || null;
  const [userName, setUserName] = useState<string | null>(user);

  useEffect(() => {
    console.log(userName);
  }, [userName]);

  return (
    <StrictMode>
      <Router>
        <ErrorBoundary>
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
            <AuthForm type={authFormType} setUserName={setUserName} />
          </Modal>
          <Header
            setIsModalOpen={setIsModalOpen}
            setAuthFormType={setAuthFormType}
            user={userName}
            setUserName={setUserName}
          />
          <main>
            <Switch>
              <Route exact path={home}>
                <HomePage />
              </Route>
              <Route exact path={products.base}>
                <p>You are on Products page</p>
              </Route>
              <Route exact path={products.slug}>
                <ProductsPage />
              </Route>
              <Route exact path={about}>
                <p>You are on About page</p>
              </Route>
              <Route exact path={profile}>
                <p>You are on Profile page</p>
              </Route>
              <Redirect to={home} />
            </Switch>
          </main>
          <Footer />
        </ErrorBoundary>
      </Router>
    </StrictMode>
  );
};

ReactDOM.render(<AppContainer />, document.getElementById("app"));
