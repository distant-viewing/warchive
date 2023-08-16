import React from "react";
import PropTypes from "prop-types";

import "./Results.css";


function Results(props) {

  const images = props.items.slice(
    props.resultIndex, props.resultIndex + 20
  ).map( (val, i) => {
    return (
      <div
        key={i}
        className="image-container"
        onClick={() => { props.modifyItem(val.id); }}
      >
        <img
          src={"img/thb/" + val.fn}
          className="image"
        />
      </div>
    );
  });

  return(
    <div id="panel-results">
      <div id="panel-results-flex">
        { images }
      </div>
    </div>
  );
}

Results.propTypes = {
  resultIndex: PropTypes.number.isRequired,
  modifyItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

export default Results;
