import BaseLayer from "ol/layer/Base";
import { TileMapBaro } from "./tile-map-baro";
import { TileMapKakao } from "./tile-map-kakao";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { BackgroundMapType } from "./gis-common";

/**
 * 배경지도 생성 클래스
 * @param t 배경지도 형식 값
 * @return 생성된 기본 배경지도 레이어
 */
export const makeBackgroundLayer = (t: BackgroundMapType): BaseLayer => {
  if (t === "baro") {
    return new TileMapBaro();
  } else if (t === "kakao") {
    return new TileMapKakao("/dms-gis-proxy/http/map{0}.daumcdn.net/map_2d_hd/2203tof/L{1}/{2}/{3}.png");
  } else if (t === "skyview") {
    return new TileMapKakao("/dms-gis-proxy/http/map{0}.daumcdn.net/map_skyview/L{1}/{2}/{3}.jpg?v=160114");
  } else if (t === "hybrid") {
    return new LayerGroup({
      layers: [
        new TileMapKakao("/dms-gis-proxy/http/map{0}.daumcdn.net/map_skyview/L{1}/{2}/{3}.jpg?v=160114"),
        new TileMapKakao("/dms-gis-proxy/http/map{0}.daumcdn.net/map_hybrid/2203tof/L{1}/{2}/{3}.png"),
      ],
    });
  } else {
    return new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });
  }
};
