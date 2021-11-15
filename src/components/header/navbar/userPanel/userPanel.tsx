import "./userPanel.scss";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SignedOutUserPanel from "./SignedOutUserPanel/SignedOutUserPanel";
import SignedInUserPanel from "./signedInUserPanel/signedInUserPanel";

const UserPanel = (): JSX.Element => {
  const { userName } = useAppSelector((state) => state.USER);

  return !userName ? <SignedOutUserPanel /> : <SignedInUserPanel />;
};

export default UserPanel;
