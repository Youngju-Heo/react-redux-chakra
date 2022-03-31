/* eslint-disable no-console */
import React from "react";
import { Map as OlMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import * as proj from "ol/proj";
import * as OlControl from "ol/control";
import { Box } from "@chakra-ui/react";
import { BaroTileSource } from "./baro-tile-map";

import "ol/ol.css";
import BaseLayer from "ol/layer/Base";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { GisViewPosition } from "../../store/gisinfo/gis-info-slice";

interface GisMapProps {
  target?: string;
  minZoom?: number;
  maxZoom?: number;
  center?: number[];
  gisPosition?: GisViewPosition;
}

const defaultLocation = [126.8915302, 37.4858711];
const defaultEPSG = "EPSG:5179";

const GisMap = (props: GisMapProps): JSX.Element => {
  const [mapObject, setMapObject] = React.useState<OlMap | null>(null);

  const [layers, setLayers] = React.useState<BaseLayer[]>([]);

  const targetName = props.target || "map";
  const center = props.center || defaultLocation;

  React.useEffect((): void => {
    const map = new OlMap({
      target: targetName,
      layers: [
        // new BaroTileMap(),
      ],
      view: new View({
        projection: defaultEPSG,
        center: proj.fromLonLat(center, defaultEPSG),
        zoom: 19,
        maxZoom: props.maxZoom || 20,
        minZoom: props.minZoom || 10,
      }),
      controls: OlControl.defaults({
        zoom: false,
      }),
    });
    setMapObject(map);
    setLayers([
      new TileLayer({
        preload: Infinity,
        source: new BaroTileSource(),
      }),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (mapObject) {
      mapObject.setLayers(layers);
    }
  }, [layers, mapObject]);

  React.useEffect(() => {
    console.log(props.gisPosition);
    if (mapObject) {
      mapObject.getView().animate({
        center: proj.fromLonLat(props.gisPosition?.center || defaultLocation, defaultEPSG),
        zoom: props.gisPosition?.zoom || 0,
        duration: 100,
      });
    }
  }, [mapObject, props.gisPosition]);

  if (!mapObject) {
    // eslint-disable-next-line no-console
    console.log("mapObject is null");
  }

  return (
    <Box w="100%" h="100%">
      <Box id={targetName} position="absolute" left={0} top={0} right={0} bottom={0} zIndex={0} />
    </Box>
  );
};
const mapStateToProps = (state: RootState) => ({
  gisPosition: state.gisInfo.gisPosition,
});

export default connect(mapStateToProps)(GisMap);
