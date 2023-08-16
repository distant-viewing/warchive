import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import "./Search.css";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "25px",
    height: "25px",
    boxShadow: state.isFocused ? null : null,
    cursor: "pointer",
  }),

  option: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: "25px",
    padding: "0 0.5vw"
  }),

  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    height: "25px",
  }),

};

function Search(props) {

  let image_header = (props.lang === "en" ? "No results found." : "Немає результатів." );
  if (props.items.length)
  {
    const num_start = props.resultIndex + 1;
    let num_end = num_start + 20 - 1;
    num_end = (num_end > props.items.length) ? props.items.length : num_end;
    if (props.lang === "en")
    {
      image_header = `Results ${num_start}–${num_end} of ${props.items.length}`;      
    } else {
      image_header = `Результати ${num_start}–${num_end} з ${props.items.length}`;            
    }
  }

  const creator = props.schema[props.creatorKey].values;

  const creatorOptions = creator.slice(1).map( (val, i) => {
    return({"value": i + 1, "label": val});
  });

  return(
    <div id="panel-search">
      <Select
        options={ creatorOptions }
        styles={ customStyles }
        className="react-select-container react-select-container-creator"
        classNamePrefix="react-select"
        isClearable={ true }
        placeholder={props.lang === "en" ? "Select Creator" : "иберіть творця"}
        onChange={(e) => props.modifyFilter(props.creatorKey, e ? [e.value] : null)}
      />
      <span id="search">
        { image_header }
        <span className="button-group">
          <button
            id="-1"
            disabled={props.resultIndex == 0 ? true : ""}
            onClick={() => { props.modifyState("resultIndex", props.resultIndex - 20); }}
          >
            &lt;
          </button>
          <button
            id="-1"
            disabled={props.resultIndex + 20 < props.items.length ? "" : true}
            onClick={() => { props.modifyState("resultIndex", props.resultIndex + 20); }}
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
  modifyFilter: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};

export default Search;
