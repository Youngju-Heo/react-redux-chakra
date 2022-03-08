import React from "react";
import { RMap, ROSM, RControl } from "rlayers";
import { Box, Button } from "@chakra-ui/react";
import LayerBaroMap from "./geoutil/layer-baro-map";
import { MapProjection } from "./geoutil/map-projection";
import { FormatNumber, FormatNumberArray } from "../common/utilities";
import { fromLonLat, toLonLat } from "ol/proj";

import "ol/ol.css";

import "./test-map.scss";
import { Route, Switch } from "react-router";
import { history } from "../store";

/**
 * TestMap: 샘플로 만든 지도자료임<br/>
 *
 * RMap 에서 사용하는 기본 좌표는 EPSG:3857 임.
 * 만약 다른 좌표계로 변경 할 경우에는 projection 및 extent 모두 변경해야 함.
 */
export const TestMap = () => {
  const [useOsm, setUseOsm] = React.useState(false);
  const [view, setView] = React.useState({
    center: fromLonLat([126.89154003559742, 37.4858879791826], "EPSG:5179"), // [946207.4373761236, 1943137.661562117],
    zoom: 15,
  });

  const epsg4326Center = toLonLat(view.center, "EPSG:5179");

  return (
    <Box position="relative" width="100%" height="100%">
      <Box position="absolute" left={0} right={0} top={0} bottom="50px">
        <RMap
          width={"100%"}
          height={"100%"}
          initial={{ center: view.center, zoom: 15 }}
          noDefaultControls
          minZoom={10}
          maxZoom={20}
          projection="EPSG:5179"
          extent={MapProjection.baroHdExtent}
          view={[view, setView]}
        >
          {/*<RControl.RZoomSlider />*/}
          {/*<RControl.RZoom />*/}
          <RControl.RScaleLine />
          {useOsm ? (
            <ROSM />
          ) : (
            <LayerBaroMap sourcePath={"https://tms-gis-tile.azurewebsites.net/api/v1/tile/{0}/{1}/{2}"} />
          )}
        </RMap>
      </Box>
      <Box position="absolute" left={0} right={0} bottom={0} height="50px">
        <Button onClick={() => setUseOsm(!useOsm)} size="sm" w="200px">
          {useOsm ? "바로 e맵" : "오픈스트리트 맵"}으로 변경
        </Button>
        &nbsp; center point: [{FormatNumberArray(epsg4326Center, 4)}], zoom:
        {FormatNumber(view.zoom, 4)}
      </Box>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Box position="absolute" top="3px" right="20px">
              Home
            </Box>
          )}
        />
        <Route
          render={() => (
            <Box position="absolute" left={0} top={0}>
              {history.location.pathname}
            </Box>
          )}
        />
      </Switch>
    </Box>
  );
};
