/* eslint-disable no-console */
import React from "react";
import * as proj from "ol/proj";
import { Map } from "ol";
import BaseLayer from "ol/layer/Base";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { gisSetLocation } from "../../store/gisinfo/gis-info-slice";
import { statusMapLocation } from "../../store/status/status-slice";
import { makeBackgroundLayer } from "./background-builder";
import { DefaultProjection, DefaultLocation, GisViewExtent, GisViewPosition, BackgroundMapType } from "./gis-common";
import { MapControl } from "./map-control";

import "ol/ol.css";

interface GisMapProps {
  target?: string;
  minZoom?: number;
  maxZoom?: number;
  center?: number[];
  moveTo?: { center: number[]; zoom: number };
  background?: BackgroundMapType;
  statusMapLocation: (pos: GisViewExtent) => void;
  gisSetLocation: (pos: GisViewPosition) => void;
}

const GisMap = (props: GisMapProps): JSX.Element => {
  const [mapObject, setMapObject] = React.useState<MapControl | null>(null);

  const [layers, setLayers] = React.useState<BaseLayer[]>([]);
  // const { keycloak } = useKeycloak();

  const targetName = props.target || "map";

  React.useEffect((): void => {
    // initialize routine: map initialize
    // 새로운 맵을 생성하고, 이벤트를 등록한다

    const map = new MapControl(targetName, DefaultProjection, DefaultLocation);

    map.onMoveEnd = (srcMap: Map): void => {
      if (srcMap) {
        const src = srcMap.getView().getCenter() || [0, 0];
        const loc = proj.toLonLat(src, DefaultProjection);

        props.statusMapLocation({
          center: loc,
          centerSrc: src,
          rect: srcMap.getView().calculateExtent(),
          zoom: srcMap.getView().getZoom() || 0,
        });
      }
    };

    map.onClick = (srcMap: Map, coord: number[]): void => {
      if (srcMap) {
        props.gisSetLocation({
          center: proj.toLonLat(coord, DefaultProjection),
        });
      }
    };

    setMapObject(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // layer 변경되는 경우 적용하는 hook 으로 새로운 layer 배열을 생성한다.
    const updateLayer = async (): Promise<void> => {
      setLayers([makeBackgroundLayer(props.background || "kakao")]);
    };

    updateLayer().catch((err) => {
      console.error(err);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.background]);

  React.useEffect(() => {
    // 맵이 새로 생성되었거나, 레이어가 변경되었을 경우 새로 적용한다.

    if (mapObject) {
      mapObject.layers = layers;
    }
  }, [layers, mapObject]);

  React.useEffect(() => {
    if (mapObject) {
      mapObject.moveToLonLat(props.moveTo?.center || DefaultLocation, undefined, "pin");
    }
  }, [mapObject, props.moveTo]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id={targetName} style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 0 }} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  moveTo: state.gisInfo.moveTo,
  background: state.gisInfo.background,
});

export default connect(mapStateToProps, { statusMapLocation, gisSetLocation })(GisMap);
