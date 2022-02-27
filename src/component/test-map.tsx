import React from "react";
import { RMap, ROSM, RControl } from "rlayers";
import { fromLonLat } from "ol/proj";
import { Box, Button } from "@chakra-ui/react";
import LayerBaroMap from "./geoutil/layer-baro-map";

import "ol/ol.css";

const center = fromLonLat([126.99073201423084, 37.54854862300358]);
export const TestMap = () => {
  const [change, setChange] = React.useState(false);

  return (
    <Box width={"100%"} height={"100%"}>
      <RMap
        width={"100%"}
        height={"90%"}
        initial={{ center: center, zoom: 15 }}
        noDefaultControls
        minZoom={10}
        maxZoom={19}
      >
        <RControl.RZoomSlider />
        <RControl.RZoom />
        <RControl.RRotate />
        <RControl.RScaleLine />
        {change ? (
          <ROSM />
        ) : (
          <LayerBaroMap sourcePath={"https://tms-gis-tile.azurewebsites.net/api/v1/tile/{0}/{1}/{2}"} />
        )}
      </RMap>
      <Button onClick={() => setChange(!change)}>변경</Button>
    </Box>
  );
};
