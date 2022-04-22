import "./styles/main.scss";
import { createRoot } from "react-dom/client";
import { lazy, StrictMode, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { ROUTES } from "./constants";
import useModalForm from "./hooks/useModalForm";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HomePage from "./components/homePage/homePage";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import Modal from "./elements/modal/modal";
import Spinner from "./elements/spinner/spinner";

const ProductsPage = lazy(() => import("./components/productsPage/productsPage"));
const ProfilePage = lazy(() => import("./components/profilePage/profilePage"));
const CartPage = lazy(() => import("./components/cartPage/cartPage"));

const AppContainer = (): JSX.Element => {
  const { home, products, profile, cart } = ROUTES;
  const { isModalOpen, modalForm } = useModalForm();

  return (
    <StrictMode>
      <Router>
        <ErrorBoundary>
          <Modal isModalOpen={isModalOpen}>{modalForm}</Modal>
          <Header />
          <Suspense fallback={<Spinner isOn />}>
            <main>
              <Routes>
                <Route path={home} element={<HomePage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path={products.base} element={<ProductsPage />} />
                  <Route path={products.slug} element={<ProductsPage />} />
                  <Route path={profile} element={<ProfilePage />} />
                  <Route path={cart} element={<CartPage />} />
                </Route>
                <Route path="*" element={<Navigate to={home} replace />} />
              </Routes>
            </main>
          </Suspense>
          <Footer />
        </ErrorBoundary>
      </Router>
    </StrictMode>
  );
};

const container = document.getElementById("app");
const root = createRoot(container || document.body);
root.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
