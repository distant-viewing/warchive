import React from "react";
import PropTypes from "prop-types";
import { getSizes } from "../helpers.ts";

import "./MapCircle.css";


function MapCircle(props) {
  const geoSize = getSizes(props.geoCounts);    

  const regions = props.geo.geo.map( (val, i) => {
    return (
      <g
        key={i}
        className="circle-container"
        onClick={() => {
          props.modifyFilter(props.geoKey, props.geoId === i ? null : [i + 1]);
          props.modifyState("geoId", props.geoId === i ? -1 : i);
        }}
      >
        <circle
          cx={val.x}
          cy={val.y}
          r={ geoSize[i] }
        />
        <text
          className="circle-label"
          x={ val.x }
          y={ val.y }
        >{ val.name }
        </text>
      </g>
    );
  });

  return regions;
}

MapCircle.propTypes = {
  geo: PropTypes.object.isRequired,
  geoId: PropTypes.number.isRequired,
  geoKey: PropTypes.string.isRequired,
  geoCounts: PropTypes.array.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired
};

export default MapCircle;
