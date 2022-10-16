import { useContext } from "react";
import { TimelineContext } from "../contexts/TimelineContext";

const useTimelineContext = () => {
  return useContext(TimelineContext);
};

export default useTimelineContext;
