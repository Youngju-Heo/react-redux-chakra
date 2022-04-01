/* eslint-disable no-console */
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry, Point } from "ol/geom";
import { Feature } from "ol";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";

export type AnchorIconType = "none" | "pin" | "point" | "camera";

export interface PositionInfo {
  pos: number[];
  name?: string;
  icon?: AnchorIconType;
}

export class AnchorLayer extends VectorLayer<VectorSource<Geometry>> {
  static images: { [key: string]: Icon } = {
    pin: new Icon({
      anchor: [0.5, 1.0],
      scale: 0.7,
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "assets/images/pin.png",
    }),
    point: new Icon({
      anchor: [0.5, 0.5],
      scale: 0.6,
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "assets/images/point.png",
    }),
    camera: new Icon({
      anchor: [0.5, 0.5],
      scale: 0.7,
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "assets/images/camera.png",
    }),
  };
  constructor() {
    super({
      source: new VectorSource<Geometry>({
        wrapX: false,
        features: [],
      }),
      style: (feature) => {
        if (feature) {
          const style = this.baseStyle;
          style.getText().setText(feature.get("name") || "");
          console.log("icon", feature.get("icon"));
          if (feature.get("icon")) {
            const icon = feature.get("icon") as AnchorIconType;
            style.setImage(AnchorLayer.images[icon]);
          }
          return style;
        }
        return this.baseStyle;
      },
    });
  }

  clearPosition() {
    this.getSource()?.clear();
  }

  setPosition(pos: PositionInfo | PositionInfo[]) {
    const source = this.getSource();
    if (source) {
      source.clear();
      if (Array.isArray(pos)) {
        if (pos.length > 0) {
          source.addFeatures(
            pos.map(
              (p) =>
                new Feature({
                  geometry: new Point(p.pos),
                  name: p.name,
                  icon: p.icon as string,
                })
            )
          );
        }
      } else {
        const point = new Point(pos.pos);
        const feature = new Feature({
          geometry: point,
          name: pos.name,
          icon: pos.icon,
        });
        source.addFeature(feature);
      }
    }
  }

  private baseStyle = new Style({
    text: new Text({
      offsetY: 20,
      font: "10pt 'Noto Sans KR', sans-serif",
      fill: new Fill({ color: "#fff" }),
      stroke: new Stroke({ color: "#000", width: 4 }),
      text: "",
    }),
  });
}
