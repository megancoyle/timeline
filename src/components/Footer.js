import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import "./Footer.css";
import useTimelineContext from "../hooks/useTimelineContext";

const Footer = () => {
  const { zoomIn, zoomOut } = useTimelineContext();

  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    zoomOut();
  };

  return (
    <footer>
      <IconButton
        aria-label="zoom out"
        className="footer-button"
        onClick={handleZoomOut}
        title="Zoom Out">
        <IndeterminateCheckBoxIcon />
      </IconButton>
      <IconButton
        aria-label="zoom in"
        className="footer-button"
        onClick={handleZoomIn}
        title="Zoom In">
        <AddBoxIcon />
      </IconButton>
    </footer>
  );
};

export default Footer;
