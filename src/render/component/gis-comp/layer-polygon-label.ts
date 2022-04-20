import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry, Point } from "ol/geom";
import { Fill, Stroke, Style, Text } from "ol/style";
import { Feature } from "ol";

export class LayerPolygonLabel extends VectorLayer<VectorSource<Geometry>> {
  constructor() {
    super({
      source: new VectorSource<Geometry>({
        wrapX: false,
        features: [],
      }),
      style: (feature) => {
        this.baseStyle.getText().setText(`${feature.get("name") || ""}`);
        return this.baseStyle;
      },
    });

    this.getSource()?.addFeature(new Feature<Geometry>(new Point([0, 0])));
  }

  private baseStyle = new Style({
    // fill: new Fill({
    //   color: "rgba(255, 255, 0, 0.08)",
    // }),
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    text: new Text({
      font: "11pt 'Noto Sans KR', sans-serif",
      fill: new Fill({ color: "#ff0" }),
      stroke: new Stroke({ color: "#000", width: 4 }),
      text: "",
    }),
  });
}
