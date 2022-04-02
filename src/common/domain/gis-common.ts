/* eslint-disable no-console */
import { Geometry } from "ol/geom";
import { Feature, Map as OlMap, Map, View } from "ol";
import { GeoJSON } from "ol/format";
import * as OlControl from "ol/control";
import * as proj from "ol/proj";

export type BackgroundMapType = "none" | "baro" | "kakao" | "skyview" | "hybrid";
export const DefaultLocation = [126.8915302, 37.4858711];
export const DefaultProjection = "EPSG:5179";

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
  return new OlMap({
    target: targetName,
    layers: [
      // new BaroTileMap(),
    ],
    view: new View({
      projection: projection || DefaultProjection,
      center: proj.fromLonLat(center || DefaultLocation, projection),
      zoom: zoom || 18,
      maxZoom: maxZoom || 20,
      minZoom: minZoom || 10,
    }),
    controls: OlControl.defaults({
      zoom: false,
    }),
  });
};
