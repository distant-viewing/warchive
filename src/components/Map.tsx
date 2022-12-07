import React from "react";
import PropTypes from "prop-types";
import { getFillColor, getSizes } from "../helpers.ts";

import "./Map.css";

function Map(props) {
  
  const geo = props.geo[props.geoKey];
  const gi = props.geoId;
  const trans = gi >= 0 ? geo.geo[gi].transform : geo.transform;

  const country = props.geo["countries"].geo.map( (val, i) => {
    return (
      <path d={val.path} key={i} />
    );
  });


  let regions = null;

  if (geo.type === "polygon")
  {
    const geoFill = getFillColor(props.geoCounts);    

    regions = geo.geo.map( (val, i) => {
      return (
        <path
          d={val.path}
          key={i}
          fill={ geoFill[i] }
          onClick={() => {
            props.modifyFilter(props.geoKey, gi === i ? null : [i + 1]);
            props.modifyState("geoId", gi === i ? -1 : i);
          }}
        />
      );
    });
  }
  if (geo.type === "point")
  {
    const geoSize = getSizes(props.geoCounts);    

    regions = geo.geo.map( (val, i) => {
      return (
        <circle
          key={i}
          cx={val.x}
          cy={val.y}
          r={ geoSize[i] }
          stroke="black"
          strokeWidth="1"
          fill="#61747555"
          onClick={() => {
            props.modifyFilter(props.geoKey, gi === i ? null : [i + 1]);
            props.modifyState("geoId", gi === i ? -1 : i);
          }}/>
      );
    });
  }

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
                props.modifyFilter("c", null);
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
                props.modifyFilter("c", null);
              }}>
              RAIONS
            </button>
            <button
              id="-1"
              onClick={() => {
                props.modifyState("geoKey", "c");
                props.modifyState("geoId", -1);
                props.modifyFilter("a", null);
                props.modifyFilter("b", null);
                props.modifyFilter("c", null);
              }}>
              CITIES
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
  geoCounts: PropTypes.array.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired
};

export default Map;
