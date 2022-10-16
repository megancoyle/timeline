import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./Modal.css";
import Form from "./Form";
import useOutsideClick from "../hooks/useOutsideClick";
import useTimelineContext from "../hooks/useTimelineContext";
import { NEW_ITEM } from "../constants/constants";

const Modal = ({ coordinates, isShowing, item, onClose, type }) => {
  const { addItem, editItem, removeItem } = useTimelineContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const ref = useRef();
  const { left, top } = coordinates;
  const isNew = type === NEW_ITEM ? true : false;
  const isFormVisible = isNew || isUpdating;

  useOutsideClick(ref, () => {
    handleClose();
  });

  const handleClose = () => {
    setIsUpdating(false);
    onClose();
  };

  const handleAdd = (item) => {
    addItem(item);
    onClose();
  };

  const handleRemove = () => {
    setIsUpdating(false);
    removeItem(item.id);
    onClose();
  };

  const handleSave = (item) => {
    setIsUpdating(false);
    editItem(item.id, item);
    onClose();
  };

  const handleUpdate = (event) => {
    event.stopPropagation();
    setIsUpdating(true);
  };

  const handleUpdateOrAdd = isNew ? handleAdd : handleSave;

  if (!isShowing) {
    return null;
  }

  return (
    <div className="modal" ref={ref} style={{ left: `${left}px`, top: `${top}px` }}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-close-button">
            <IconButton
              aria-label="close modal"
              className="modal-button"
              onClick={handleClose}
              title="Close Modal">
              <CloseIcon />
            </IconButton>
          </div>
          {isNew ? null : (
            <IconButton
              aria-label="remove"
              className="modal-button"
              onClick={handleRemove}
              title="Remove">
              <DeleteIcon />
            </IconButton>
          )}
          {isUpdating || isNew ? null : (
            <IconButton
              aria-label="edit"
              className="modal-button"
              onClick={handleUpdate}
              title="Edit">
              <ModeEditIcon />
            </IconButton>
          )}
        </div>
        <div className="modal-body">
          {isFormVisible && <Form item={item} type={type} updateOrAddItem={handleUpdateOrAdd} />}
          {!isNew && !isUpdating && (
            <>
              <h1 className="modal-name">{item.name}</h1>
              <p className="modal-date">{`${moment(item.start).format("MMMM Do, YYYY")} - ${moment(
                item.end
              ).format("MMMM Do, YYYY")}`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  coordinates: PropTypes.object,
  isShowing: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
  type: PropTypes.string,
};
