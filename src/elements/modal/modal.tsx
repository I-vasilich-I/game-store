import "./modal.scss";
import ReactDOM from "react-dom";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import closeSVG from "images/clear.svg";
import Alert from "../alert/alert";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ isModalOpen, setIsModalOpen, children }) => {
  if (!isModalOpen) return null;

  const portal = document.getElementById("portal");

  if (!portal) {
    return null;
  }

  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleTabKey = (e: KeyboardEvent) => {
    const focusableModalElements = modalRef?.current?.querySelectorAll<HTMLElement>(
      "a[href], button, textarea, input, select"
    );
    if (!focusableModalElements?.length) return;

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
    setIsModalOpen(false);
  };

  const keyListenersMap = new Map([
    ["Esc", onModalClose],
    ["Escape", onModalClose],
    ["Tab", handleTabKey],
  ]);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { onModalClose, setError });
    }
    return child;
  });

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      const listener = keyListenersMap.get(e.key);
      return listener?.(e);
    };

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 10000);
  }, [error]);

  return ReactDOM.createPortal(
    <div className="modal__container" role="dialog" aria-modal="true">
      <div className="modal" ref={modalRef}>
        <button type="button" className="modal__close" onClick={onModalClose}>
          <img src={closeSVG} alt="close" width="24" height="24" />
        </button>
        {childrenWithProps}
      </div>
      {error ? <Alert type="error" message={error} /> : null}
    </div>,
    portal
  );
};

export default Modal;
