import React from "react";
import PropTypes from "prop-types";
import { getFillColor } from "../helpers.ts";

import "./MapPolygon.css";

function MapPolygon(props) {
  const geoFill = getFillColor(props.geoCounts);    

  const regions = props.geo.geo.map( (val, i) => {
    return (
      <g
        key={i}
        className="polygon-container"
        onClick={() => {
          props.modifyFilter(props.geoKey, props.geoId === i ? null : [i + 1]);
          props.modifyState("geoId", props.geoId === i ? -1 : i);
        }}
      >
        <path
          d={val.path}
          fill={ geoFill[i + 1] }
        />
        <text
          className="polygon-label"
          x={ val.cx }
          y={ val.cy }
        >{ val.name }
        </text>
        <use href="#one" />
      </g>
    );
  });

  return regions;
}

MapPolygon.propTypes = {
  geo: PropTypes.object.isRequired,
  geoId: PropTypes.number.isRequired,
  geoKey: PropTypes.string.isRequired,
  geoCounts: PropTypes.array.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired
};

export default MapPolygon;
