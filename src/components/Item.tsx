import React from "react";
import PropTypes from "prop-types";

import "./Item.css";

function Item(props) {

  if (!props.itemData)
  {
    return(<div id="panel-image-popup" className="hidden"></div>);
  }

  return(
    <div id="panel-image-popup">
      <button
        id="-1"
        onClick={() => { props.modifyItem(null); }}
      >X</button>
      <div>
        <img
          src={"img/med/" + props.itemData.filename}
          className="large-image"
        />
        <div style={{padding: "12px"}}>
          <ul style={{listStyleType: "none"}}>
            {
              Object.entries(props.itemData).map(([k,v]) => {
                return(<li key={k}><b>{k}:</b> {v}</li>);
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  modifyItem: PropTypes.func.isRequired,
  itemData: PropTypes.object
};

export default Item;
