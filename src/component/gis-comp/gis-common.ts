/* eslint-disable no-console */
import { Geometry } from "ol/geom";
import { Feature, Map, View } from "ol";
import { GeoJSON } from "ol/format";
import * as OlControl from "ol/control";
import * as proj from "ol/proj";

export type BackgroundMapType = "none" | "baro" | "kakao" | "skyview" | "hybrid";
export const DefaultLocation = [129.36115, 35.58273]; // [126.8915302, 37.4858711];
export const DefaultProjection = "EPSG:5179";

let ViewCenter = [129.36115, 35.58273];
let ViewRange = [127.8684, 35.0073, 130.8178, 36.1804];

export interface GisViewPosition {
  center: number[];
  zoom?: number;
}

export interface GisViewExtent {
  center: number[];
  centerSrc: number[];
  rect: number[];
  zoom: number;
}

export const GetViewCenter = (): number[] => {
  return proj.fromLonLat([ViewCenter[0], ViewCenter[1]], DefaultProjection);
};

export const GetViewRange = (): number[] => {
  const p1 = proj.fromLonLat([ViewRange[0], ViewRange[1]], DefaultProjection);
  const p2 = proj.fromLonLat([ViewRange[2], ViewRange[3]], DefaultProjection);

  return p1.concat(p2);
};

export const SetViewCenter = (center: number[]) => {
  ViewCenter = center;
};

export const SetViewRange = (range: number[]) => {
  ViewRange = range;
};

export const ReadFeatureFromGeoJSON = (
  featureProjection: string,
  dataProjection: string,
  src: Record<string, unknown>
): Feature<Geometry>[] => {
  try {
    if (src && src.features && Array.isArray(src.features) && src.features.length > 0) {
      const reader = new GeoJSON({
        featureProjection: featureProjection,
        dataProjection: dataProjection,
      });

      if (reader) {
        return reader.readFeatures(src);
      }
    }
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const NewGisMap = (
  targetName: string,
  projection?: string,
  center?: number[],
  zoom?: number,
  minZoom?: number,
  maxZoom?: number
): Map => {
  console.log(`GetViewRange: ${GetViewRange()}`);

  return new Map({
    target: targetName,
    layers: [
      // new BaroTileMap(),
    ],
    view: new View({
      projection: projection || DefaultProjection,
      center: proj.fromLonLat(center || DefaultLocation, projection),
      // extent: GetViewRange(),
      zoom: zoom || 18,
      maxZoom: maxZoom || 20,
      minZoom: minZoom || 10,
    }),
    controls: OlControl.defaults({
      zoom: false,
    }),
  });
};
