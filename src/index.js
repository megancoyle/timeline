import React from "react";
import { render } from "react-dom";
import "./index.css";
import { TimelineProvider } from "./contexts/TimelineContext";
import Timeline from "./components/Timeline";

const App = () => {
  return (
    <section className="app">
      <TimelineProvider>
        <Timeline />
      </TimelineProvider>
    </section>
  );
};

render(<App />, document.getElementById("root"));
