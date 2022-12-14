import React from "react";
import Select from "react-select";
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

  const tag = props.schema[props.tagKey].values;
  const creator = props.schema[props.creatorKey].values;

  const tagOptions = tag.slice(1).map( (val, i) => {
    return({"value": i, "label": val});
  });
  const creatorOptions = creator.slice(1).map( (val, i) => {
    return({"value": i, "label": val});
  });

  return(
    <div id="panel-image-header">
      <Select
        options={ creatorOptions }
        className="react-select-container react-select-container-creator"
        classNamePrefix="react-select"
        isClearable={ true }
        placeholder="Select Creator"
        onChange={(e) => props.modifyFilter(props.creatorKey, e ? [e.value] : null)}
      />
      <Select
        options={ tagOptions }
        className="react-select-container react-select-container-tag"
        classNamePrefix="react-select"
        isClearable={ true }
        placeholder="Select Tag"
        onChange={(e) => props.modifyFilter(props.tagKey, e ? [e.value] : null)}
      />
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
  items: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
  tagKey: PropTypes.string.isRequired,
  creatorKey: PropTypes.string.isRequired,
  resultIndex: PropTypes.number.isRequired,
  modifyState: PropTypes.func.isRequired,
  modifyFilter: PropTypes.func.isRequired
};

export default Search;
