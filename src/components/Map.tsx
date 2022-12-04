import React from "react";
import PropTypes from "prop-types";

import "./Map.css";

function Map(props) {
  
  const geo = props.geo[props.geoKey];
  const gi = props.geoId;
  const geoFill = props.geoFill;

  const trans = gi >= 0 ? geo.geo[gi].transform : geo.transform;
  if (gi >= 0) { geoFill[gi] = "#d79921"; }

  const country = props.geo["countries"].geo.map( (val, i) => {
    return (
      <path d={val.path} key={i} />
    );
  });

  const regions = geo.geo.map( (val, i) => {
    return (
      <path
        d={val.path}
        key={i}
        fill={ props.geoFill[i] }
        onClick={() => {
          props.modifyFilter(props.geoKey, gi === i ? null : [i + 1]);
          props.modifyState("geoId", gi === i ? -1 : i);
        }}
      />
    );
  });

  return(
    <div id="panel-map">
      <svg
        viewBox={ geo.viewbox }
        preserveAspectRatio="xMidYMid"
        id="map"
        xmlns="http://www.w3.org/2000/svg">
        <g
          stroke="#bbb"
          strokeWidth="0.5"
          style={{transform: trans, transition: "1s ease-in-out"}}>
          <g stroke="black" fill="#ece6d7" strokeWidth="0.1" id="country">
            { country }
          </g>
          <g id="region">
            { regions }
          </g>
        </g>
      </svg>
      <div id="panel-timeline-button">
        <span>
          <span className='button-group'>
            <button
              id="-1"
              onClick={() => {
                props.modifyState("geoKey", "a");
                props.modifyState("geoId", -1);
                props.modifyFilter("a", null);
                props.modifyFilter("b", null);
              }}>
              OBLASTS
            </button>
            <button
              id="-1"
              onClick={() => {
                props.modifyState("geoKey", "b");
                props.modifyState("geoId", -1);
                props.modifyFilter("a", null);
                props.modifyFilter("b", null);
              }}>
              RAIONS
            </button>
          </span>
        </span>
      </div>
    </div>
  );
}

Map.propTypes = {
  geo: PropTypes.object.isRequired,
  geoId: PropTypes.number.isRequired,
  geoKey: PropTypes.string.isRequired,
  geoFill: PropTypes.array.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired
};

export default Map;
