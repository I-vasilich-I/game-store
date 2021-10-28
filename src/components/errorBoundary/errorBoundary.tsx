import { Component, ErrorInfo } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
import Alert from "../../elements/alert/alert";

interface AppState {
  hasError: boolean;
}

const { errorFallback } = ROUTES;

class ErrorBoundary extends Component<RouteComponentProps, AppState> {
  ["constructor"]: typeof ErrorBoundary;

  constructor(props: RouteComponentProps) {
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
        this.props.history.push(errorFallback);
        window.location.reload();
      }, 5000);
      return <Alert type="error" />;
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
