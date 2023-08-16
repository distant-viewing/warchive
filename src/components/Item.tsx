import React from "react";
import PropTypes from "prop-types";

import "./Item.css";

function Item(props) {

  if (!props.itemData)
  {
    return(<div id="panel-image-popup" className="hidden"></div>);
  }

  return(
    <div id="panel-item">
      <button
        id="-1"
        onClick={() => { props.modifyItem(null); }}
      >X</button>
      <div>
        <img
          src={"img/med/" + props.itemData.filename}
          className="large-image"
        />
        <div className="item-text">
          <p>
            {
              props.itemData.caption
            }
          </p>
          <p style={{paddingTop: "24px", paddingLeft: "24px", paddingRight: "24px"}}>
            <b>{ props.itemData.creator }</b>, { props.itemData.date }, { props.itemData.location }
          </p>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  modifyItem: PropTypes.func.isRequired,
  itemData: PropTypes.object,
  lang: PropTypes.string.isRequired
};

export default Item;
