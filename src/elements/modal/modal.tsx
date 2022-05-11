import "./modal.scss";
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setAlert, setError, setModalType } from "@/redux/store/modal/modalSlice";
import { AppDispatch } from "@/redux/store/store";
import useAppSelector from "@/redux/hooks/useAppSelector";
import onCloseModal from "@/redux/thunk/modalThunk/modalThunk";
import closeSVG from "images/clear.svg";
import Alert from "../alert/alert";

interface IProps {
  isModalOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ isModalOpen, children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, alert, modalType } = useAppSelector((state) => state.MODAL);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleTabKey = (e: KeyboardEvent) => {
    const focusableModalElements = modalRef?.current?.querySelectorAll<HTMLElement>(
      "a[href], button, textarea, input, select"
    );

    if (!focusableModalElements?.length) {
      return;
    }

    const { length } = focusableModalElements;
    const firstElement = focusableModalElements[0];
    const lastElement = focusableModalElements[length - 1];
    const isAnotherModalElement = Boolean(
      [...focusableModalElements].slice(1, length - 1).find((elem) => elem === e.target)
    );

    if (!e.shiftKey && document.activeElement !== firstElement && !isAnotherModalElement) {
      firstElement.focus();
      e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement && !isAnotherModalElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const onModalClose = () => {
    if (modalType === "confirm") {
      dispatch(setModalType("product"));
      return;
    }

    dispatch(onCloseModal());
  };

  const keyListenersMap = new Map([
    ["Esc", onModalClose],
    ["Escape", onModalClose],
    ["Tab", handleTabKey],
  ]);

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      const listener = keyListenersMap.get(e.key);
      return listener?.(e);
    };

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  useEffect(() => {
    if (!error) {
      return undefined;
    }

    const timer = setTimeout(() => {
      dispatch(setError(""));
    }, 10000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (!alert) {
      return undefined;
    }

    const timer = setTimeout(() => {
      dispatch(setAlert(""));
      dispatch(onCloseModal());
    }, 2000);

    return () => clearTimeout(timer);
  }, [alert]);

  if (!isModalOpen) {
    return null;
  }

  const portal = document.getElementById("portal");

  if (!portal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal__container" role="dialog" aria-modal="true">
      <div className="modal" ref={modalRef}>
        <button type="button" className="modal__close" onClick={onModalClose}>
          <img src={closeSVG} alt="close" width="24" height="24" />
        </button>
        {children}
      </div>
      {error ? <Alert type="error" message={error} /> : null}
      {alert ? <Alert type="info" message={alert} /> : null}
    </div>,
    portal
  );
};

export default Modal;
