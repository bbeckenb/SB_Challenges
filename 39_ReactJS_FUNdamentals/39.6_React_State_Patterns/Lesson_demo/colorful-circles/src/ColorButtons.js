import React from "react";
import "./ColorButtons.css";

/** Renders button for each color option.
 *
 * Props:
 * - options: array of colors
 */

function ColorButtons(props) {
  return (
    <div>
      {props.options.map(color => (
        <button
          className="ColorButtons-button"
          style={{ backgroundColor: color }}
          onClick={() => props.addCircle(color)}
          key={color}
        >
          {color}
        </button>
      ))}
    </div>
  );
}

ColorButtons.defaultProps = {
  options: ["aquamarine", "aqua", "darksalmon", "honeydew"]
};

export default ColorButtons;
