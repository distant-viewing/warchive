import React from "react";
import { countItems, countItems2, filterItems, shuffleArray } from "../helpers.ts";

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
      geoKey: "a",
      tagId: -1
    };
  }

  loadJSON(path: string, kn: string, shuffle: bool) {
    fetch(path).then(r => { return r.json(); }).then(
      r => {
        if (shuffle) { r = shuffleArray(r); }
        this.setState({ [kn]: r });
      }
    );
  }

  componentDidMount() {
    this.loadJSON("./data/geo.json", "geo", false);
    this.loadJSON("./data/items.json", "items", true);
    this.loadJSON("./data/schema.json", "schema", false);
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
    this.setState({ filters: filters, resultIndex: 0, itemId: -1 });
  }

  render() {

    if (!this.state.geo | !this.state.items | !this.state.schema) {
      return <span></span>;
    }

    const items = filterItems(this.state.items, this.state.filters);
    const itemId = this.state.itemId;
    const counts = countItems(items, this.state.schema, this.state.geoKey);
    const count2 = countItems2(items, this.state.schema, "d", "f");

    return(
      <div id="interactive-viz">
        <Map
          geo={ this.state.geo }
          geoId={ this.state.geoId }
          geoKey={ this.state.geoKey }
          geoCounts= { counts }
          modifyState={ this.modifyState.bind(this) }
          modifyFilter={ this.modifyFilter.bind(this) }
        />
        <Timeline
          schema= { this.state.schema }
          tagId={ this.state.tagId }
          tlColKey={ "d" }
          tlRowKey={ "f" }
          tlCounts= { count2 }
          modifyState={ this.modifyState.bind(this) }
          modifyFilter={ this.modifyFilter.bind(this) }
        />
        <Search
          items={ items }
          schema= { this.state.schema }
          tagKey={ "f" }
          creatorKey={ "e" }
          resultIndex={ this.state.resultIndex }
          modifyState={ this.modifyState.bind(this) }
          modifyFilter={ this.modifyFilter.bind(this) }
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
