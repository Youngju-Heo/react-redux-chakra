/* eslint-disable no-console */
import React from "react";
import RLayerRaster, { RLayerRasterProps } from "rlayers/layer/RLayerRaster";
import { Tile as LayerTile } from "ol/layer";
import { default as SourceWMTS } from "ol/source/WMTS";
import WmtsTileGrid from "ol/tilegrid/WMTS";
import * as proj from "ol/proj";
import { RContextType } from "rlayers";
import { ImageTile, Tile } from "ol";
import { MapProjection } from "./map-projection";
import { FormatString } from "../../common/utilities";

export interface LayerBaroEMapProps extends RLayerRasterProps {
  sourcePath?: string;
}

export default class LayerBaroMap extends RLayerRaster<LayerBaroEMapProps> {
  ol: LayerTile<SourceWMTS>;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  source: SourceWMTS | undefined = undefined;

  constructor(props: Readonly<LayerBaroEMapProps>, context: React.Context<RContextType>) {
    super(props, context);

    this.ol = new LayerTile<SourceWMTS>({ source: undefined });

    this.createSource().catch((err) => {
      console.error(err);
    });
  }

  createSource(): Promise<void> {
    return new Promise((resolve) => {
      this.source = new SourceWMTS({
        projection: new proj.Projection({
          code: "EPSG:5179",
        }),
        tileGrid: new WmtsTileGrid({
          extent: MapProjection.baroHdExtent,
          origin: [-200000.0, 4000000.0],
          tileSize: 256,
          matrixIds: ["L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18"],
          resolutions: MapProjection.baroHdResolution,
        }),
        tilePixelRatio: 2,
        layer: "korean_map",
        style: "korean",
        format: "image/png",
        matrixSet: "korean",
        url: "/emaphd",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tileLoadFunction: (tile: Tile, _: string) => {
          // console.log("src", tile['tileCoord'])
          const imageTile = tile as ImageTile;
          const z = imageTile["tileCoord"][0] + 5;
          const y = imageTile["tileCoord"][1];
          const x = imageTile["tileCoord"][2];
          const srcPath = this.props.sourcePath || "/emaphd/{0}/{1}/{2}.png";

          const zLabel = srcPath.startsWith("https") ? z.toString(10) : z < 9 ? "L0" + z : "L" + z;
          (imageTile.getImage() as HTMLImageElement).src = FormatString(
            srcPath,
            zLabel,
            y.toString(10),
            x.toString(10)
          );
        },
        crossOrigin: "anonymous",
        wrapX: false,
      });

      this.ol.setSource(this.source);
      this.eventSources = [this.ol, this.source];

      resolve();
    });
  }

  refresh(prevProps?: LayerBaroEMapProps): void {
    this.createSource().then(() => {
      super.refresh(prevProps as LayerBaroEMapProps);
    });
  }
}