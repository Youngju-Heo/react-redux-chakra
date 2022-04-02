import { Map, View } from "ol";
import * as proj from "ol/proj";
import { NewGisMap } from "../../common/domain/gis-common";
import BaseLayer from "ol/layer/Base";
import { AnchorIconType, LayerAnchorLabel } from "./layer-anchor-label";

export class MapControl {
  private readonly map: Map;
  private readonly projection: string;
  private readonly anchorLayer: LayerAnchorLabel;

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
    this.map = NewGisMap(targetName, projection, center, zoom, minZoom, maxZoom);
    this.projection = this.view.getProjection().getCode();
    this.anchorLayer = new LayerAnchorLabel();
    this.bindEvent();
  }

  private bindEvent() {
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
   * @param icon 표출할 아이콘의 종류(값이 없을 경우 표출하지 않음)
   * @param name 표출할 아이콘의 이름(값이 없을 경우 표출하지 않음)
   */
  moveToLonLat(center: number[], zoom?: number, icon: AnchorIconType = "none", name?: string) {
    const pos = proj.fromLonLat(center, this.projection);
    this.moveTo(pos, zoom, icon, name);
  }

  /**
   * 설정한 projection 좌표계 위치로 이동
   * @param center 이동할 좌표
   * @param zoom 이동할 줌(생략시 현재 줌 유지)
   * @param icon 표출할 아이콘의 종류(값이 없을 경우 표출하지 않음)
   * @param name 표출할 아이콘의 이름(값이 없을 경우 표출하지 않음)
   */
  moveTo(center: number[], zoom?: number, icon: AnchorIconType = "none", name?: string) {
    this.view.animate({
      center: center,
      zoom: zoom,
      duration: 100,
    });
    if ((icon && icon !== "none") || name) {
      this.anchorLayer.setPosition({ pos: center, name: name, icon: icon });
    }
  }

  set layers(layers: BaseLayer[]) {
    this.map.setLayers(layers.concat(this.anchorLayer));
  }

  get view(): View {
    return this.map.getView();
  }
}
