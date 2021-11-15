import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/store/modal/modalSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { ROUTES } from "@/constants";

const ProtectedRoutes: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { userName } = useAppSelector((state) => state.USER);
  const { home } = ROUTES;

  useEffect(() => {
    if (!userName) {
      dispatch(openModal());
    }
  }, []);

  return (
    <Route
      render={({ location }) =>
        userName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: home,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoutes;
