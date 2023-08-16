import React from "react";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import { getFillColor } from "../helpers.ts";

import "rc-slider/assets/index.css";
import "./Timeline.css";

const intrange = function(a,b,c,d) { d=[]; c=b-a+1; while(c--){ d[c]=b--; } return d;};

function Timeline(props) {

  const tlFill = getFillColor(props.tlCounts);
  const tk = props.timeKey;
  const schema = props.schema;

  const boxes = schema[tk]["values"].map( (val, i) => {
    const fcolor = tlFill[i];
    const fopacity = (fcolor === "#fff") ? "0%" : "100%" ;
    const swidth = (fcolor === "#fff") ? 0 : 0.01 ;

    return(
      <rect
        key={ i }
        x={ i - 1.5 }
        y={ 0.2 }
        width={ 1 }
        height={ 0.8 }
        fill={ fcolor }
        fillOpacity={ fopacity }
        stroke={ "black" }
        strokeWidth={ swidth }
      />
    );
  });

  const defaultValue = [0, 24];
  const onRangeChange = (e) => {
    props.modifyFilter("d", intrange(e[0] + 1, e[1] + 1));
  };
  const onAfterChange = null;
  const marks = 
  { 
    0: "2022/01",
    3: "2022/04",
    6: "2022/07",
    9: "2022/10",
    12: "2023/01",
    15: "2023/04",
    18: "2023/07",
    21: "2023/10",
    24: "2024/01"
  };

  return(
    <div id="panel-timeline">
      <svg
        viewBox="0 0 24 1"
        preserveAspectRatio="none"
        id="timeline"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="panel-timeline-boxes">
          { boxes }
        </g>
      </svg>
      <div className="slider-container">
        <Slider
          range
          allowCross={true}
          onChange={ onRangeChange } 
          defaultValue={ defaultValue }
          min={0}
          max={24}
          marks={ marks }
          onAfterChange={onAfterChange}
          tipFormatter={(value) => `${value}!`}
          trackStyle={[{
            backgroundColor: "black",
          }]}
          handleStyle={[
            {
              borderColor: "black",
              backgroundColor: "#F2BE00",
            },
            {
              borderColor: "black",
              backgroundColor: "#F2BE00",
            },
          ]} 
          activeDotStyle={{
            borderColor: "black",
          }}
        />
      </div>
    </div>
  );
}

Timeline.propTypes = {
  schema: PropTypes.object.isRequired,
  tagId: PropTypes.number.isRequired,
  timeKey: PropTypes.string.isRequired,
  tlCounts: PropTypes.array.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired
};

export default Timeline;
