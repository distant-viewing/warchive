import React from "react";
import PropTypes from "prop-types";

import MapPolygon from "./MapPolygon.tsx";
import MapPolygonClick from "./MapPolygonClick.tsx";
import MapCircle from "./MapCircle.tsx";

import "./Map.css";


function Map(props) {
  
  const geo = props.geo[props.geoKey];
  const geo_click = props.geo["a"];
  const gir = props.geoIdRegion;
  const trans = gir >= 0 ? geo_click.geo[gir].transform : geo_click.transform;

  const country = props.geo["countries"].geo.map( (val, i) => {
    return (
      <path d={val.path} key={i} fill={val.fill} />
    );
  });

  const regions_click = (
    <MapPolygonClick
      geo={ geo_click }
      geoIdRegion={ props.geoIdRegion }
      geoKey={ props.geoKey }
      modifyFilter={ props.modifyFilter }
      modifyState={ props.modifyState }  
      lang={ props.lang }      
    />
  ); 

  let regions_color = null;

  if (geo.type === "polygon")
  {
    regions_color = (
      <MapPolygon
        geo={ geo }
        geoId={ props.geoId }
        geoKey={ props.geoKey }
        geoCounts={ props.geoCounts }
        modifyFilter={ props.modifyFilter }
        modifyState={ props.modifyState }   
        lang={ props.lang }     
      />
    );
  }
  if (geo.type === "point")
  {
    regions_color = (
      <MapCircle
        geo={ geo }
        geoId={ props.geoId }
        geoKey={ props.geoKey }
        geoCounts={ props.geoCounts }
        modifyFilter={ props.modifyFilter }
        modifyState={ props.modifyState }  
        lang={ props.lang }      
      />
    );
  }

  let back_button = null;
  if (gir >= 0)
  {
    back_button = (
      <button
        id="-1"
        onClick={() => {
          props.modifyState("geoId", -1);
          props.modifyState("geoIdRegion", -1);
          props.modifyFilter("a", null);
          props.modifyFilter("b", null);
          props.modifyFilter("c", null);
        }}>
        &larr;
      </button>
    );
  }

  let button_caption = "CITIES";
  if ((props.geoKey !== "b") & (props.lang === "en")) { button_caption = "RAIONS"; }
  if ((props.geoKey === "b") & (props.lang !== "en")) { button_caption = "МІСТА"; }
  if ((props.geoKey !== "b") & (props.lang !== "en")) { button_caption = "РАЙОНИ"; }

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
            { regions_color }
          </g>
          <g id="region">
            { regions_click }
          </g>
        </g>
      </svg>
      <div id="panel-map-button">
        <span>
          <span className='button-group'>
            <button
              id="-1"
              onClick={() => {
                props.modifyState("geoKey", props.geoKey === "b" ? "c" : "b" );
                props.modifyState("geoId", -1);
                props.modifyFilter("a", null);
                props.modifyFilter("b", null);
                props.modifyFilter("c", null);
              }}>
              { button_caption }
            </button>
            { back_button }
          </span>
        </span>
      </div>
    </div>
  );
}

Map.propTypes = {
  geo: PropTypes.object.isRequired,
  geoId: PropTypes.number.isRequired,
  geoIdRegion: PropTypes.number.isRequired,
  geoKey: PropTypes.string.isRequired,
  geoCounts: PropTypes.array.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};

export default Map;
