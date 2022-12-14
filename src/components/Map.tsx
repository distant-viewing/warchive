import React from "react";
import PropTypes from "prop-types";

import MapPolygon from "./MapPolygon.tsx";
import MapCircle from "./MapCircle.tsx";

import "./Map.css";


function Map(props) {
  
  const geo = props.geo[props.geoKey];
  const gi = props.geoId;
  const trans = gi >= 0 ? geo.geo[gi].transform : geo.transform;

  const country = props.geo["countries"].geo.map( (val, i) => {
    return (
      <path d={val.path} key={i} fill={val.fill} />
    );
  });

  let regions = null;

  if (geo.type === "polygon")
  {
    regions = (
      <MapPolygon
        geo={ geo }
        geoId={ props.geoId }
        geoKey={ props.geoKey }
        geoCounts={ props.geoCounts }
        modifyFilter={ props.modifyFilter }
        modifyState={ props.modifyState }        
      />
    );
  }
  if (geo.type === "point")
  {
    regions = (
      <MapCircle
        geo={ geo }
        geoId={ props.geoId }
        geoKey={ props.geoKey }
        geoCounts={ props.geoCounts }
        modifyFilter={ props.modifyFilter }
        modifyState={ props.modifyState }        
      />
    );
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
          id="map-group"
          style={{transform: trans}}>
          <g id="country">
            { country }
          </g>
          <g id="region">
            { regions }
          </g>
        </g>
      </svg>
      <div id="panel-map-button">
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
