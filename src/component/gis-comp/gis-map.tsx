/* eslint-disable no-console */
import React from "react";
import * as proj from "ol/proj";
import { Box } from "@chakra-ui/react";
import BaseLayer from "ol/layer/Base";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { GisInfoState, gisSetLocation } from "../../store/gisinfo/gis-info-slice";
import { statusMapLocation } from "../../store/status/status-slice";
import * as Utility from "../../common/utilities";

import "ol/ol.css";
import { makeBackgroundLayer } from "./background-builder";
import {
  DefaultEPSG,
  DefaultLocation,
  GisViewExtent,
  GisViewPosition,
  ReadFeatureFromGeoJSON,
} from "../../common/domain/gis-common";
import { useKeycloak } from "@react-keycloak/web";
import { DistrictLayer } from "./district-layer";
import VectorSource from "ol/source/Vector";
import { Geometry } from "ol/geom";
import { MapControl } from "./map-control";

interface GisMapProps {
  target?: string;
  minZoom?: number;
  maxZoom?: number;
  center?: number[];
  gisInfo?: GisInfoState;
  statusMapLocation: (pos: GisViewExtent) => void;
  gisSetLocation: (pos: GisViewPosition) => void;
}

const GisMap = (props: GisMapProps): JSX.Element => {
  const [mapObject, setMapObject] = React.useState<MapControl | null>(null);

  const [layers, setLayers] = React.useState<BaseLayer[]>([]);
  const { keycloak } = useKeycloak();

  const targetName = props.target || "map";

  React.useEffect((): void => {
    const map = new MapControl(targetName, DefaultEPSG, DefaultLocation);
    map.bindEvent();
    map.onMoveEnd = (srcMap): void => {
      if (srcMap) {
        const src = srcMap.getView().getCenter() || [0, 0];
        const loc = proj.toLonLat(src, DefaultEPSG);
        props.statusMapLocation({
          center: loc,
          centerSrc: src,
          rect: srcMap.getView().calculateExtent(),
          zoom: srcMap.getView().getZoom() || 0,
        });
      }
    };

    // map.onClick = (srcMap, coord): void => {
    //   if (srcMap) {
    //     props.gisSetLocation({
    //       center: proj.toLonLat(coord, DefaultEPSG),
    //     });
    //   }
    // };

    setMapObject(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const updateLayer = async (): Promise<void> => {
      const token = keycloak?.token || "";
      const response = await Utility.ExecuteRequest("/ds-system/api/v1/emd-layers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          areas: "31200",
        },
      });
      if (response && response.status == 200) {
        const features = ReadFeatureFromGeoJSON(DefaultEPSG, "EPSG:4326", response.data as Record<string, unknown>);
        const layers = new DistrictLayer();
        layers.setSource(new VectorSource<Geometry>({ features }));
        setLayers([makeBackgroundLayer(props.gisInfo?.background || "kakao"), layers]);
      }
    };

    updateLayer().catch((err) => {
      console.log(err);
    });
    // todo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gisInfo?.background]);

  React.useEffect(() => {
    if (mapObject) {
      mapObject.layers = layers;
    }
  }, [layers, mapObject]);

  React.useEffect(() => {
    if (mapObject) {
      mapObject.moveToLonLat(props.gisInfo?.gisPosition?.center || DefaultLocation);
    }
  }, [mapObject, props.gisInfo?.gisPosition]);

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
  gisInfo: state.gisInfo,
});

export default connect(mapStateToProps, { statusMapLocation, gisSetLocation })(GisMap);
