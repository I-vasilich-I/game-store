import { useEffect, useState } from "react";

interface IProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const useAlert = (): IProps => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!showAlert) {
      return undefined;
    }

    const timerId = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timerId);
  }, [showAlert, setShowAlert]);

  return { showAlert, setShowAlert };
};

export default useAlert;
