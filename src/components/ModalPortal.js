import { useEffect } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  const mount = document.getElementById("modal-portal");
  const element = document.createElement("div");

  useEffect(() => {
    mount.appendChild(element);
    return () => {
      mount.removeChild(element);
    };
  }, [element, mount]);

  return createPortal(children, element);
};

export default ModalPortal;
