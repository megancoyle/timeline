import { createContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import timelineItems from "../data/timelineItems";
import { getEndDate, getStartDate } from "../helpers/getDates";
import { assignLanes } from "../helpers/formatItems";

const TimelineContext = createContext();

const TimelineProvider = ({ children }) => {
  const [items, setItems] = useState(timelineItems);
  const [endDate, setEndDate] = useState(getEndDate(items));
  const [startDate, setStartDate] = useState(getStartDate(items));
  const differenceInDays = moment(endDate).diff(moment(startDate), "days");
  const lanes = assignLanes(items);
  const height = lanes.length;
  const width = Math.max(0, differenceInDays + 1);

  const addItem = (item) => {
    const index = items[items.length - 1].id + 1;
    item.id = index;
    const updatedItems = [...items, item];
    setItems(updatedItems);
  };

  const editItem = (id, item) => {
    const index = items.findIndex((e) => e.id === id);
    const updatedItems = [...items];
    updatedItems[index] = item;
    setItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = [...items];
    setItems(updatedItems.filter((item) => item.id !== id));
  };

  const zoomIn = () => {
    const newStartDate = moment(startDate).add(10, "days");
    const newEndDate = moment(endDate).subtract(10, "days");
    const differenceInDays = moment(newEndDate).diff(moment(newStartDate), "days");

    if (differenceInDays > 0) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  };

  const zoomOut = () => {
    setStartDate(moment(startDate).subtract(10, "days"));
    setEndDate(moment(endDate).add(10, "days"));
  };

  const context = {
    addItem,
    editItem,
    endDate,
    height,
    items,
    lanes,
    removeItem,
    startDate,
    width,
    zoomIn,
    zoomOut,
  };

  return <TimelineContext.Provider value={context}>{children}</TimelineContext.Provider>;
};

export { TimelineContext, TimelineProvider };

TimelineProvider.propTypes = {
  children: PropTypes.object,
};
