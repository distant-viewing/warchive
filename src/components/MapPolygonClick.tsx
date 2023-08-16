import React from "react";
import PropTypes from "prop-types";

import "./MapPolygonClick.css";

function MapPolygonClick(props) {

  const regions = props.geo.geo.map( (val, i) => {
    return (
      <g
        key={i}
        className="polygon-container-click"
        onClick={() => {
          props.modifyFilter("a", props.geoIdRegion === i ? null : [i + 1]);
          props.modifyState("geoIdRegion", props.geoIdRegion === i ? -1 : i);
        }}
      >
        <path
          d={val.path}
          fillOpacity= "0%"
          pointerEvents={ (props.geoIdRegion === i) ? "none" : "auto" }
        />
        <text
          className="polygon-label"
          x={ val.cx }
          y={ val.cy }
        >{ props.lang === "en" ? val.name : val.name_ua }
        </text>
        <use href="#one" />
      </g>
    );
  });

  return regions;
}

MapPolygonClick.propTypes = {
  geo: PropTypes.object.isRequired,
  geoIdRegion: PropTypes.number.isRequired,
  geoKey: PropTypes.string.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};

export default MapPolygonClick;
