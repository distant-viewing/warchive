import React from "react";
import PropTypes from "prop-types";

import "./Search.css";


function Search(props) {

  let image_header = "No results found.";
  if (props.items.length)
  {
    const num_start = props.resultIndex + 1;
    let num_end = num_start + 25 - 1;
    num_end = (num_end > props.items.length) ? props.items.length : num_end;
    image_header = `Results ${num_start}-${num_end} of ${props.items.length}`;
  }

  return(
    <div id="panel-image-header">
      <span id="image-header">
        { image_header }
        <span className='button-group'>
          <button
            id="-1"
            disabled={props.resultIndex == 0 ? true : ""}
            onClick={() => { props.modifyState("resultIndex", props.resultIndex - 25); }}
          >
            &lt;
          </button>
          <button
            id="-1"
            disabled={props.resultIndex + 25 < props.items.length ? "" : true}
            onClick={() => { props.modifyState("resultIndex", props.resultIndex + 25); }}
          >
            &gt;
          </button>
        </span>
      </span>
    </div>
  );
}

Search.propTypes = {
  resultIndex: PropTypes.number.isRequired,
  modifyState: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

export default Search;
