import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "@/constants";

interface IProps {
  userName: string | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProtectedRoutes: React.FC<IProps> = ({ userName, setIsModalOpen, children }) => {
  const { home } = ROUTES;
  useEffect(() => {
    if (!userName) setIsModalOpen(true);
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
