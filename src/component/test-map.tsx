/* eslint-disable no-console */
import React from "react";
import { RMap, ROSM, RControl } from "rlayers";
import { Box, Button } from "@chakra-ui/react";
import LayerBaroMap from "./geoutil/layer-baro-map";
import proj4 from "proj4";
import { MapProjection } from "./geoutil/map-projection";
import "ol/ol.css";
import { FormatNumber } from "../common/utilities";

/**
 * TestMap: 샘플로 만든 지도자료임<br/>
 *
 * RMap 에서 사용하는 기본 좌표는 EPSG:3857 임.
 * 만약 다른 좌표계로 변경 할 경우에는 projection 및 extent 모두 변경해야 함.
 */
export const TestMap = () => {
  const [useOsm, setUseOsm] = React.useState(false);
  const [view, setView] = React.useState({
    center: proj4("EPSG:4326", "EPSG:5179").forward([126.89154003559742, 37.4858879791826]), // [946207.4373761236, 1943137.661562117],
    zoom: 15,
  });

  const epsg4326Center = proj4("EPSG:5179", "EPSG:4326", view.center);

  return (
    <Box width={"100%"} height={"100%"}>
      <RMap
        width={"100%"}
        height={"90%"}
        initial={{ center: view.center, zoom: 15 }}
        noDefaultControls
        minZoom={10}
        maxZoom={20}
        projection="EPSG:5179"
        extent={MapProjection.baroHdExtent}
        view={[view, setView]}
      >
        <RControl.RZoomSlider />
        <RControl.RZoom />
        <RControl.RRotate />
        <RControl.RScaleLine />
        {useOsm ? (
          <ROSM />
        ) : (
          <LayerBaroMap sourcePath={"https://tms-gis-tile.azurewebsites.net/api/v1/tile/{0}/{1}/{2}"} />
        )}
      </RMap>
      <Button onClick={() => setUseOsm(!useOsm)} size="sm" w="200px">
        {useOsm ? "바로 e맵" : "오픈스트리트 맵"}으로 변경
      </Button>
      &nbsp; center point: {FormatNumber(epsg4326Center[0], 6)}, {FormatNumber(epsg4326Center[1], 6)}, zoom:
      {FormatNumber(view.zoom, 4)}
    </Box>
  );
};
