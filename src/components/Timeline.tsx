import React from "react";
import PropTypes from "prop-types";
import { getFillColor } from "../helpers.ts";

import "./Timeline.css";


function Timeline(props) {

  const tlFill = getFillColor(props.tlCounts);
  const key1 = props.tlColKey;
  const key2 = props.tlRowKey;
  const schema = props.schema;

  const ncol = schema[key1]["values"].length;
  const nrow = schema[key2]["values"].length;

  const boxes = schema[key2]["values"].map( (val, i) => {
    const row = schema[key1]["values"].map( (val2, j) => {
      if (props.tlCounts[i * ncol + j] === 0) return(null);

      return(
        <rect
          key={ j }
          x={ 8 + (j / ncol) * 39 }
          y={ 1 + (i / nrow) * 13 }
          width={ (1 / ncol) * 42 }
          height={ (1 / nrow) * 13 }
          fill={ tlFill[i * ncol + j] }
        />
      );
    });

    return(
      <g
        key={i}
        className="panel-timeline-row"
        onClick={() => {
          props.modifyFilter(key2, props.tagId === i ? null : [i]);
          props.modifyState("tagId", props.tagId === i ? -1 : i);
        }}
      >
        { row }
      </g>
    );
  });

  const xlabs = schema[key1]["labels"].map( (val, i) => {
    return(
      <text
        key={ i }
        x={ 8 + (i / ncol) * 39 }
        y={ 15.5 }
        textAnchor="middle"
        fontSize={ 0.8 }
      > {val}
      </text>
    );
  });

  const ylabs = schema[key2]["values"].map( (val, i) => {
    return(
      <text
        key={ i }
        x={ 8 }
        y={ 1 + ((i + 0.5) / nrow) * 13 }
        textAnchor="end"
        fontSize={ 0.7 }
      > {val}
      </text>
    );
  });

  const xlabLines = schema[key1]["labels"].map( (val, i) => {
    if (val === "") return(null);

    return(
      <line
        key={ i }
        x1={ 8 + (i / ncol) * 39 }
        y1={ 14 }
        x2={ 8 + (i / ncol) * 39 }
        y2={ 3 }
        style={{
          "stroke": "rgb(0,0,0)",
          "strokeWidth": "0.05",
          "strokeLinecap": "round",
          "strokeDasharray": "0.2,0.2"
        }}
      />
    );
  });

  return(
    <div id="panel-timeline">
      <svg
        viewBox="0 0 50 18"
        preserveAspectRatio="none"
        id="timeline"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="panel-timeline-boxes">
          { boxes }
        </g>
        { xlabs }
        { ylabs }
        { xlabLines }
        <line
          x1="8"
          y1="14"
          x2="47"
          y2="14"
          style={{ "stroke": "rgb(0,0,0)", "strokeWidth": "0.2"}}
        />
      </svg>
    </div>
  );
}

Timeline.propTypes = {
  schema: PropTypes.object.isRequired,
  tagId: PropTypes.number.isRequired,
  tlColKey: PropTypes.string.isRequired,
  tlRowKey: PropTypes.string.isRequired,
  tlCounts: PropTypes.array.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired
};

export default Timeline;
