import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./Form.css";
import { NEW_ITEM } from "../constants/constants";

// Form for adding new items or updating existing items
const Form = ({ item, type, updateOrAddItem }) => {
  const today = new Date().toISOString().substring(0, 10);
  const initialFormState = {
    id: null,
    name: "",
    start: today,
    end: today,
  };
  const isNew = type === NEW_ITEM;
  const formState = isNew ? useState(initialFormState) : useState(item);
  const [updateItem, setUpdateItem] = formState;
  const buttonText = isNew ? "Add" : "Update";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateItem({ ...updateItem, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (updateItem.name !== "") {
      updateOrAddItem(updateItem);
    }
  };

  return (
    <form className="form" onSubmit={handleUpdate}>
      <input
        autoComplete="off"
        className="form-input-name"
        name="name"
        onChange={handleInputChange}
        placeholder="Add a name..."
        type="text"
        value={updateItem.name}
      />
      <label htmlFor="start" className="form-label">
        Start Date
      </label>
      <input
        className="form-input"
        name="start"
        onChange={handleInputChange}
        type="date"
        value={updateItem.start}
      />
      <label htmlFor="end" className="form-label">
        End Date
      </label>
      <input
        className="form-input"
        onChange={handleInputChange}
        name="end"
        type="date"
        value={updateItem.end}
      />
      <div className="form-actions">
        <Button
          arial-label={`${buttonText} Item`}
          className="form-button"
          onClick={handleUpdate}
          title={`${buttonText} Item`}
          type="submit"
          variant="contained">
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default Form;

Form.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  updateOrAddItem: PropTypes.func.isRequired,
};
