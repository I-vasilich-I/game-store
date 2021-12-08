import "./styles/main.scss";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { ROUTES } from "./constants";
import useModalForm from "./hooks/useModalForm";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import HomePage from "./components/homePage/homePage";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import ProductsPage from "./components/productsPage/productsPage";
import ProfilePage from "./components/profilePage/profilePage";
import CartPage from "./components/cartPage/cartPage";
import Modal from "./elements/modal/modal";

const AppContainer = (): JSX.Element => {
  const { home, products, profile, cart } = ROUTES;
  const { isModalOpen, modalForm } = useModalForm();

  return (
    <StrictMode>
      <Router>
        <ErrorBoundary>
          <Modal isModalOpen={isModalOpen}>{modalForm}</Modal>
          <Header />
          <main>
            <Switch>
              <Route exact path={home}>
                <HomePage />
              </Route>
              <ProtectedRoutes>
                <Route exact path={products.base}>
                  <ProductsPage />
                </Route>
                <Route exact path={products.slug}>
                  <ProductsPage />
                </Route>
                <Route exact path={profile}>
                  <ProfilePage />
                </Route>
                <Route exact path={cart}>
                  <CartPage />
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
