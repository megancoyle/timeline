import { useState } from "react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Header.css";
import Modal from "./Modal";
import ModalPortal from "./ModalPortal";
import useModal from "../hooks/useModal";
import { NEW_ITEM } from "../constants/constants";

const Header = () => {
  const [coordinates, setCoordinates] = useState({});
  const { isShowing, toggle } = useModal();

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setCoordinates({
      left: rect.x,
      top: rect.y + window.scrollY + 40,
    });
    toggle();
  };

  const handleClose = () => {
    toggle();
  };

  return (
    <header>
      <Button
        aria-label="create new item"
        className="header-button"
        onClick={handleClick}
        startIcon={<AddCircleIcon />}
        title="Create New Item"
        variant="outlined">
        Create
      </Button>
      <h1 className="header-title">Timeline</h1>
      <ModalPortal>
        <Modal
          coordinates={coordinates}
          isShowing={isShowing}
          item={{}} // pass an empty object for creating new items and set type to new
          onClose={handleClose}
          type={NEW_ITEM}
        />
      </ModalPortal>
    </header>
  );
};

export default Header;
