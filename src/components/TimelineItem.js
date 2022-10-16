import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./TimelineItem.css";
import useTimelineContext from "../hooks/useTimelineContext";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalPortal from "./ModalPortal";
import { EXISTING_ITEM, MODAL_HEIGHT, MODAL_WIDTH } from "../constants/constants";

const TimelineItem = ({ item, lane }) => {
  const [coordinates, setCoordinates] = useState({});
  const { isShowing, toggle } = useModal();
  const { startDate, endDate } = useTimelineContext();
  const itemLength = moment(startDate).isAfter(item.start)
    ? moment(item.end).diff(moment(startDate), "days") + 1
    : moment(item.end).diff(moment(item.start), "days") + 1;
  const itemStartingPoint = moment(startDate).isAfter(item.start)
    ? 1
    : moment(item.start).diff(moment(startDate), "days") + 1;

  if (moment(startDate).isAfter(item.end) || moment(endDate).isBefore(item.start)) {
    return null;
  }

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    // position the modal based on where the timeline item is located within the window
    // (i.e. if it's close to the bottom of the page, modal will open above timeline item)
    const leftCoordinate =
      window.innerWidth - MODAL_WIDTH <= rect.x ? rect.x - MODAL_WIDTH : rect.x;
    const topCoordinate =
      window.innerHeight - MODAL_HEIGHT <= rect.y
        ? rect.y + window.scrollY - 140
        : rect.y + window.scrollY + 40;
    setCoordinates({
      left: leftCoordinate,
      top: topCoordinate,
    });
    toggle();
  };

  const handleClose = () => {
    toggle();
  };

  return (
    <>
      <div
        className="timeline-item"
        onClick={handleClick}
        style={{
          gridColumnEnd: `span ${itemLength}`,
          gridColumnStart: itemStartingPoint,
          gridRowStart: lane + 1,
        }}
        title={item.name}>
        <p className="timeline-item-name">{item.name}</p>
      </div>
      <ModalPortal>
        <Modal
          coordinates={coordinates}
          isShowing={isShowing}
          item={item}
          onClose={handleClose}
          type={EXISTING_ITEM}
        />
      </ModalPortal>
    </>
  );
};

export default TimelineItem;

TimelineItem.propTypes = {
  item: PropTypes.object.isRequired,
  lane: PropTypes.number.isRequired,
};
