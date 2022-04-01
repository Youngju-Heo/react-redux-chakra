import BaseLayer from "ol/layer/Base";
import { BaroTileMap } from "./baro-tile-map";
import { KakaoTileMap } from "./kakao-tile-map";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { BackgroundMapType } from "../../common/domain/gis-common";

/**
 * 배경지도 생성 클래스
 * @param t 배경지도 형식 값
 * @return 생성된 기본 배경지도 레이어
 */
export const makeBackgroundLayer = (t: BackgroundMapType): BaseLayer => {
  if (t === "baro") {
    return new BaroTileMap();
  } else if (t === "kakao") {
    return new KakaoTileMap();
  } else if (t === "skyview") {
    return new KakaoTileMap("/dms-gis-proxy/http/map{0}.daumcdn.net/map_skyview/L{1}/{2}/{3}.jpg?v=160114");
  } else if (t === "hybrid") {
    return new LayerGroup({
      layers: [
        new KakaoTileMap("/dms-gis-proxy/http/map{0}.daumcdn.net/map_skyview/L{1}/{2}/{3}.jpg?v=160114"),
        new KakaoTileMap("/dms-gis-proxy/http/map{0}.daumcdn.net/map_hybrid/2203tof/L{1}/{2}/{3}.png"),
      ],
    });
  } else {
    return new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });
  }
};
