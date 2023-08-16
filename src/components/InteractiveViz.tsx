import React from "react";
import { countItems, filterItems, shuffleArray } from "../helpers.ts";

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
      geoIdRegion: -1,
      geoKey: "b",
      tagId: -1,
      lang: "en",
      infoText: null
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
    const counts_geo = countItems(items, this.state.schema, this.state.geoKey);
    const counts_mos = countItems(items, this.state.schema, "d");

    return(
      <div>
        <div id="top-bar">
        </div>
        <div id="header">
          <a href="/" className="logo-wrapper">
            <img
              src="63bedaaa7558520164484a7d_logo.svg"
              loading="lazy"
              alt="Ukrainian Warchive"
              className="logo-light"/>
          </a>
          <div className="link-group">
            <span>
              <a href={this.state.lang === "en" ? "https://www.warchive.com.ua/en/about-en" :
                "https://www.warchive.com.ua/about"} target="_blank" rel="noreferrer"
              >{ this.state.lang === "en" ? "about" : "про проєкт" }</a></span>&#8729;
            <span>
              <a href={this.state.lang === "en" ? "https://www.warchive.com.ua/en/updates" :
                "https://www.warchive.com.ua/updates"} target="_blank" rel="noreferrer"
              >{ this.state.lang === "en" ? "updates" : "новини" }</a></span>&#8729;
            <span>
              <a href="https://www.instagram.com/warchiveua/" target="_blank" rel="noreferrer"
              >{ this.state.lang === "en" ? "instagram" : "інстаграм" }</a></span> &#8729;
            <span onClick={() => {
              this.modifyState("lang", this.state.lang === "en" ? "ua" : "en"); 
            }}>
              <a>{ this.state.lang === "en" ? "укр" : "en" }</a> 
            </span>
          </div>
        </div>

        <div id="interactive-viz">
          <Map
            geo={ this.state.geo }
            geoId={ this.state.geoId }
            geoIdRegion={ this.state.geoIdRegion }
            geoKey={ this.state.geoKey }
            geoCounts= { counts_geo }
            modifyState={ this.modifyState.bind(this) }
            modifyFilter={ this.modifyFilter.bind(this) }
            lang={ this.state.lang }
          />
          <Timeline
            schema= { this.state.schema }
            tagId={ this.state.tagId }
            timeKey={ "d" }
            tlCounts= { counts_mos }
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
            lang={ this.state.lang }
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
            lang={ this.state.lang }
          />
        </div>

        <div id="footer">
          <span id="footer-left">
            { this.state.lang === "en" ? "Site built by the" : "Від" } <b><a
              href="https://distantviewing.org"
              target="_blank"
              rel="noreferrer"
              style={{color: "black", fontStyle: "bold", textDecoration: "none"}}> Distant Viewing Lab</a></b>
          </span>
          <span id="footer-center">
          </span>
          <span id="footer-right">
            <b> { this.state.lang === "en" ? "Warning:" : "Попередження:" } </b>
            { this.state.lang === "en" ?
              "Some of the images are graphic in nature and might be disturbing to some viewers." :
              "Деякі зображення мають графічний характер і можуть викликати занепокоєння у деяких глядачів"}
          </span>
        </div>
      </div>
    );
  }
}

export default InteractiveViz;
