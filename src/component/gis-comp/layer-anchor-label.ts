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

export class LayerAnchorLabel extends VectorLayer<VectorSource<Geometry>> {
  static images: { [key: string]: { icon: Icon; offset: number } } = {
    pin: {
      icon: new Icon({
        anchor: [0.5, 1.0],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "assets/images/pin.png",
      }),
      offset: 8,
    },
    point: {
      icon: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "assets/images/point.png",
      }),
      offset: 24,
    },
    camera: {
      icon: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "assets/images/camera.png",
      }),
      offset: 24,
    },
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
          const icon = feature.get("icon") as AnchorIconType;
          if (icon) {
            const img = LayerAnchorLabel.images[icon];
            style.setImage(img.icon);
            style.getText().setOffsetY(img.offset);
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
    this.clearPosition();

    const source = this.getSource();
    if (source) {
      if (Array.isArray(pos)) {
        if (pos.length > 0) {
          source.addFeatures(
            pos.map(
              (p) =>
                new Feature({
                  geometry: new Point(p.pos),
                  name: p.name,
                  icon: p.icon,
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
