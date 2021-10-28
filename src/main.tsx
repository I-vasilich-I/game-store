import "./styles/main.scss";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "./constants";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const AppContainer = (): JSX.Element => {
  const { home, products, about, signin, signup } = ROUTES;

  return (
    <StrictMode>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path={home}>
              <p>You are on Home page</p>
            </Route>
            <Route exact path={products}>
              <p>You are on Products page</p>
            </Route>
            <Route exact path={about}>
              <p>You are on About page</p>
            </Route>
            <Route exact path={signin}>
              <p>You are on Sign In page</p>
            </Route>
            <Route exact path={signup}>
              <p>You are on Sign Up page</p>
            </Route>
            <Redirect to={home} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </StrictMode>
  );
};

ReactDOM.render(<AppContainer />, document.getElementById("app"));
