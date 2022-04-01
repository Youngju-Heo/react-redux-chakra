import { Map, View } from "ol";
import * as proj from "ol/proj";
import { NewMap } from "../../common/domain/gis-common";
import BaseLayer from "ol/layer/Base";
import { AnchorLayer } from "./anchor-layer";

export class MapControl {
  private readonly map: Map;
  private readonly projection: string;
  private readonly anchorLayer: AnchorLayer;
  public onClick?: (src: Map, coord: number[], pnt: number[]) => void;
  public onMoveEnd?: (src: Map) => void;
  constructor(
    targetName: string,
    projection?: string,
    center?: number[],
    zoom?: number,
    minZoom?: number,
    maxZoom?: number
  ) {
    this.map = NewMap(targetName, projection, center, zoom, minZoom, maxZoom);
    this.projection = this.view.getProjection().getCode();
    this.anchorLayer = new AnchorLayer();
  }

  bindEvent() {
    this.map.on("click", (e) => {
      if (this.onClick && e && e.map) {
        this.onClick(this.map, e.map.getEventCoordinate(e.originalEvent), e.map.getEventPixel(e.originalEvent));
      }
    });

    this.map.on("moveend", (e) => {
      if (this.onMoveEnd && e && e.map) {
        this.onMoveEnd(e.map);
      }
    });
  }

  /**
   * EPSG:4326 좌표계 위치로 이동
   * @param center 이동할 좌표
   * @param zoom 이동할 줌(생략시 현재 줌 유지)
   */
  moveToLonLat(center: number[], zoom?: number) {
    const pos = proj.fromLonLat(center, this.projection);
    this.moveTo(pos, zoom);
  }

  /**
   * 설정한 projection 좌표계 위치로 이동
   * @param center 이동할 좌표
   * @param zoom 이동할 줌(생략시 현재 줌 유지)
   */
  moveTo(center: number[], zoom?: number) {
    this.view.animate({
      center: center,
      zoom: zoom,
      duration: 100,
    });
    this.anchorLayer.setPosition({ pos: center, name: "센터 포지션", icon: "pin" });
  }

  set layers(layers: BaseLayer[]) {
    this.map.setLayers(layers.concat(this.anchorLayer));
  }

  get view(): View {
    return this.map.getView();
  }
}
