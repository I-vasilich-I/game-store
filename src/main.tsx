import "./styles/main.scss";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import useAppSelector from "./redux/hooks/useAppSelector";
import { ROUTES } from "./constants";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import HomePage from "./components/homePage/homePage";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import ProductsPage from "./components/productsPage/productsPage";
import AuthForm from "./components/authForm/authForm";
import Modal from "./elements/modal/modal";

const AppContainer = (): JSX.Element => {
  const { home, products, about, profile } = ROUTES;
  const { isModalOpen } = useAppSelector((state) => state.MODAL);

  return (
    <StrictMode>
      <Router>
        <ErrorBoundary>
          <Modal isModalOpen={isModalOpen}>
            <AuthForm />
          </Modal>
          <Header />
          <main>
            <Switch>
              <Route exact path={home}>
                <HomePage />
              </Route>
              <ProtectedRoutes>
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
              </ProtectedRoutes>
              <Redirect to={home} />
            </Switch>
          </main>
          <Footer />
        </ErrorBoundary>
      </Router>
    </StrictMode>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("app")
);
