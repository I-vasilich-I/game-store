import { Component, ErrorInfo, ReactNode } from "react";
import { NavigateFunction, Params } from "react-router-dom";
import withRouter from "./withRouter";
import { ROUTES } from "../../constants";
import Alert from "../../elements/alert/alert";

interface AppState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}

const { errorFallback } = ROUTES;

class ErrorBoundary extends Component<IProps, AppState> {
  ["constructor"]: typeof ErrorBoundary;

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.props.router.navigate(errorFallback);
        window.location.reload();
      }, 5000);
      return <Alert type="error" />;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
