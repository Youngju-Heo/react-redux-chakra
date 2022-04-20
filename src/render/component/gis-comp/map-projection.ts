//
// 프로젝트에서 사용하는 EPSG 타입을 상수로 정의
export type EpsgType = "EPSG:4326" | "EPSG:5179" | "EPSG:5181";

export class MapProjection {
  // UTM-K, EPSG:5179
  public static baroResolution = [
    1954.597389, 977.2986945, 488.64934725, 244.324673625, 122.1623368125, 61.08116840625, 30.540584203125,
    15.2702921015625, 7.63514605078125, 3.817573025390625, 1.908786512695313, 0.954393256347656, 0.477196628173828,
    0.238598314086914,
  ];
  public static baroExtent = [-200000.0, -28024123.62];
  public static baroProj =
    "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";

  // baro emap, UTM-K, EPSG:5179
  public static baroHdResolution = [
    2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255,
  ];
  public static baroHdExtent = [-200000.0, -3015.4524155292, 3803015.45241553, 4000000.0];
  public static baroHdProj =
    "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";

  // kakao map, 세계측지계 200000, 500000: EPSG:5181
  public static kakaoResolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
  public static kakaoExtent = [-30000, -60000, 700000, 819486];
  // public static kakaoExtent = [-30000, -60000, 777525, 819486];
  public static kakaoProj =
    "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
}
