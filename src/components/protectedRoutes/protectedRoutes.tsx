import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/store/modal/modalSlice";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { ROUTES } from "@/constants";

const ProtectedRoutes = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userName } = useAppSelector((state) => state.USER);
  const location = useLocation();
  const { home } = ROUTES;

  useEffect(() => {
    if (!userName) {
      dispatch(openModal());
    }
  }, []);

  if (!userName) {
    return <Navigate to={home} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
