import { ComponentType } from "react";
import { NavigateFunction, Params, useLocation, useNavigate, useParams } from "react-router-dom";

interface WithRouterProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}

// TODO set return type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function withRouter<T extends WithRouterProps = WithRouterProps>(Component: ComponentType<T>) {
  const displayName = Component.displayName || Component.name || "Component";

  const ComponentWithRouterProp = (props: Omit<T, keyof WithRouterProps>) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...(props as T)} router={{ location, navigate, params }} />;
  };

  ComponentWithRouterProp.displayName = `withRouter(${displayName})`;

  return ComponentWithRouterProp;
}

export default withRouter;
