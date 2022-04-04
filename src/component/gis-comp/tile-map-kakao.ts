import TileLayer from "ol/layer/Tile";
import { MapProjection } from "./map-projection";
import { XYZ } from "ol/source";
import { Projection } from "ol/proj";
import TileGrid from "ol/tilegrid/TileGrid";
import * as Utility from "../../common/utilities";

/**
 * 카카오 타일맵 지도 객체
 * @class TileMapKakao
 * @extends {TileLayer}
 * @description:
 *   reqPath 값에 따라 다른 지도를 호출 할 수 있음.
 *   * 다음 카카오의 위성지도 사진: "/dms-gis-proxy/http/map{0}.daumcdn.net/map_skyview/L{1}/{2}/{3}.jpg?v=160114"
 *   * 다음 카카오의 하이브리드 라벨지도: "dms-gis-proxy/http/map{0}.daumcdn.net/map_hybrid/2203tof/L{1}/{2}/{3}.png"
 */
export class TileMapKakao extends TileLayer<XYZ> {
  constructor(private readonly sourcePath?: string) {
    super({
      source: new XYZ({
        projection: new Projection({
          code: "EPSG:5181",
          // extent 설정하면 울릉도와 독도를 볼 수 없음.
          // extent: MapProjection.kakaoExtent, //as OlExtent.Extent,
          units: "m",
        }),
        tilePixelRatio: 2,
        tileGrid: new TileGrid({
          origin: [MapProjection.kakaoExtent[0], MapProjection.kakaoExtent[1]],
          resolutions: MapProjection.kakaoResolutions,
        }),
        tileUrlFunction: (tileCoord) => {
          if (tileCoord === null) return undefined;
          const s = Math.floor(Math.random() * 4); // 0 ~ 3
          const z = MapProjection.kakaoResolutions.length - tileCoord[0];
          const x = tileCoord[1];
          const y = -tileCoord[2] - 1;
          const srcPath = sourcePath || "/dms-gis-proxy/http/map{0}.daumcdn.net/map_2d_hd/2012tlq/L{1}/{2}/{3}.png";
          return Utility.FormatString(srcPath, s.toString(10), z.toString(10), y.toString(10), x.toString(10));
        },
        crossOrigin: "anonymous",
      }),
      visible: true,
    });
  }
}
