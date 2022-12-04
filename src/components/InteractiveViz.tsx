import React from "react";
import { countItems, filterItems, getFillColor } from "../helpers.ts";

import Item     from "./Item.tsx";
import Map      from "./Map.tsx";
import Results  from "./Results.tsx";
import Search   from "./Search.tsx";
import Timeline from "./Timeline.tsx";

import "./InteractiveViz.css";


class InteractiveViz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geo: null,
      items: null,
      schema: null,
      itemData: null,
      filters: {},
      resultIndex: 0,
      itemId: -1,
      geoId: -1,
      geoKey: "a"
    };
  }

  loadJSON(path: string, kn: string) {
    fetch(path).then(r => { return r.json(); }).then(
      r => { this.setState({ [kn]: r }); }
    );
  }

  componentDidMount() {
    this.loadJSON("./data/geo.json", "geo");
    this.loadJSON("./data/items.json", "items");
    this.loadJSON("./data/schema.json", "schema");
  }

  modifyState(key: string, val: unknown) {
    this.setState({ [key]: val }); 
  }

  modifyItem(id: string) {
    if (id == null) {
      this.setState({ itemData: null });  
    } else {
      this.loadJSON(
        "./data/items/" + id + ".json",
        "itemData"
      );
    }
  }

  modifyFilter(key: string, value: Array) {
    const filters = this.state.filters;
    if (value == null) { delete filters[key]; } else { filters[key] = value; }
    this.setState({ filters: filters });
  }

  render() {

    if (!this.state.geo | !this.state.items | !this.state.schema) {
      return <span></span>;
    }

    const items = filterItems(this.state.items, this.state.filters);
    const itemId = this.state.itemId;
    const counts = countItems(items, this.state.schema);
    const geoFill = getFillColor(counts[this.state.geoKey]);

    return(
      <div id="interactive-viz">
        <Map
          geo={ this.state.geo }
          geoId={ this.state.geoId }
          geoKey={ this.state.geoKey }
          geoFill= { geoFill }
          modifyState={ this.modifyState.bind(this) }
          modifyFilter={ this.modifyFilter.bind(this) }
        />
        <Timeline
        />
        <Search
          items={ items }
          resultIndex={ this.state.resultIndex }
          modifyState={ this.modifyState.bind(this) }
        />
        <Results
          items={ items }
          resultIndex={ this.state.resultIndex }
          modifyItem={ this.modifyItem.bind(this) }
        />
        <Item
          item={ itemId >= 0 ? items[itemId] : null }
          itemData={ this.state.itemData }
          modifyItem={ this.modifyItem.bind(this) }
        />
      </div>
    );
  }
}

export default InteractiveViz;
