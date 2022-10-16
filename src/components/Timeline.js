import "./Timeline.css";
import useTimelineContext from "../hooks/useTimelineContext";
import Header from "./Header";
import Footer from "./Footer";
import Lane from "./Lane";
import { DEFAULT_HEIGHT } from "../constants/constants";

const Timeline = () => {
  const { height, lanes, width } = useTimelineContext();
  const lines = [...Array(width)];

  // setting a default height ensures the grid doesn't disappear as elements are
  // deleted from the timeline
  const gridHeight = height < DEFAULT_HEIGHT ? DEFAULT_HEIGHT : height;

  return (
    <>
      <Header />
      <main>
        <div
          className="timeline"
          style={{
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${gridHeight}, 3rem)`,
          }}>
          {lanes.map((lane, index) => {
            return <Lane items={lane} key={index} lane={index} />;
          })}
          {lines.map((item, index) => {
            return (
              <div
                className="timeline-line"
                key={index}
                style={{
                  gridColumnStart: index + 1,
                  gridRowEnd: gridHeight + 1,
                  gridRowStart: 1,
                }}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Timeline;
