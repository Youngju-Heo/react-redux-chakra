/* eslint-disable no-console */
import React from "react";
import { RMap, RControl } from "rlayers";
import { RView } from "rlayers/RMap";
import { MapProjection } from "./geoutil/map-projection";
import { fromLonLat, toLonLat } from "ol/proj";
import LayerBaroMap from "./geoutil/layer-baro-map";
import { MapBrowserEvent, Map } from "ol";

import "./map-main.scss";

export interface MainMapProps {
  view: RView;
}

export const MainMap = (props: MainMapProps): JSX.Element => {
  const [view, setView] = React.useState<RView>({ center: fromLonLat(props.view.center, "EPSG:5179"), zoom: 15 });

  return (
    <RMap
      className="map-main"
      initial={view}
      noDefaultControls
      minZoom={10}
      maxZoom={20}
      projection="EPSG:5179"
      extent={MapProjection.baroHdExtent}
      view={[view, setView]}
      onMoveEnd={(e: MapBrowserEvent<UIEvent>): boolean => {
        const map = e.map as Map;
        const view = map.getView();
        console.log("view", toLonLat(view.calculateExtent(), "EPSG:5179"));
        console.log(new Date(), map);
        return false;
      }}
    >
      <RControl.RScaleLine />
      <LayerBaroMap sourcePath={"https://tms-gis-tile.azurewebsites.net/api/v1/tile/{0}/{1}/{2}"} />
    </RMap>
  );
};
