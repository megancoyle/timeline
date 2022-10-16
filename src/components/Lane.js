import PropTypes from "prop-types";
import TimelineItem from "./TimelineItem";

const Lane = ({ items, lane }) => {
  return (
    <>
      {items.map((item) => {
        return <TimelineItem key={item.id} lane={lane} item={item} />;
      })}
    </>
  );
};

export default Lane;

Lane.propTypes = {
  items: PropTypes.array,
  lane: PropTypes.number,
};
