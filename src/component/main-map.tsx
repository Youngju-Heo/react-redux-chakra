/* eslint-disable no-console */
import React from "react";
import { RMap, RControl, RInteraction, RLayerVector, RStyle, ROSM } from "rlayers";
import { RView } from "rlayers/RMap";
import { MapProjection } from "./geoutil/map-projection";
import { fromLonLat, toLonLat } from "ol/proj";
import { MapBrowserEvent, Map } from "ol";
import "./map-main.scss";
// import VectorSource from "ol/source/Vector";
// import { Geometry } from "ol/geom";
import {
  altShiftKeysOnly,
  platformModifierKeyOnly,
  shiftKeyOnly,
  altKeyOnly,
  never,
  doubleClick,
} from "ol/events/condition";

export interface MainMapProps {
  view: RView;
}

export const MainMap = (props: MainMapProps): JSX.Element => {
  const [view, setView] = React.useState<RView>({ center: fromLonLat(props.view.center, "EPSG:5179"), zoom: 15 });
  // const [selected, setSelected] = React.useState(false);

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
      <ROSM />

      <RLayerVector
        onChange={React.useCallback((e) => {
          console.log(e);
          // On every change, check if there is a feature covering the Eiffel Tower
          // const source = e.target as VectorSource<Geometry>;
          // if (source?.forEachFeatureAtCoordinateDirect)
          //   setSelected(source.forEachFeatureAtCoordinateDirect(TourEiffel, () => true));
        }, [])}
      >
        {/* This is the style used for the drawn polygons */}
        <RStyle.RStyle>
          <RStyle.RStroke color="#0000ff" width={3} />
          <RStyle.RFill color="rgba(0, 0, 0, 0.75)" />
        </RStyle.RStyle>

        <RInteraction.RDraw type={"LineString"} condition={shiftKeyOnly} freehandCondition={altShiftKeysOnly} />

        <RInteraction.RDraw type={"Circle"} condition={altKeyOnly} freehandCondition={never} />

        <RInteraction.RModify
          condition={platformModifierKeyOnly}
          deleteCondition={React.useCallback((e) => platformModifierKeyOnly(e) && doubleClick(e), [])}
        />
      </RLayerVector>
    </RMap>
  );
};
