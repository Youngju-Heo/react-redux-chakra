/* eslint-disable no-console */
import React from "react";
import { LeftSide, MainFrame, MainStatus, RightSide, VertMenuItem } from "./component/main-frame";
import { MainBody } from "./component/main-frame/main-body";
import { MdOutlineMap, MdOutlineNoteAlt, MdOutlineListAlt, MdLayers } from "react-icons/md";
import { Box, useColorMode } from "@chakra-ui/react";
import GisMap from "./component/gis-comp/gis-map";
import { RootState } from "./store";
import { connect } from "react-redux";
import { gisSetBackground, gisSetLocation } from "./store/gisinfo/gis-info-slice";
import { BackgroundMapType, GisViewPosition } from "./component/gis-comp/gis-common";

import "ol/ol.css";

interface AppProps {
  location?: Location;
  gisSetLocation: (position: GisViewPosition) => void;
  gisSetBackground: (background: BackgroundMapType) => void;
}

const App = (props: AppProps): JSX.Element => {
  const { setColorMode } = useColorMode();
  setColorMode("dark");
  React.useEffect(() => {
    if (props.location?.pathname === "/") {
      props.gisSetBackground("baro");
      props.gisSetLocation({
        center: [126.89154, 37.48591],
      });
    } else if (props.location?.pathname === "/search") {
      props.gisSetBackground("skyview");
    } else if (props.location?.pathname === "/add") {
      props.gisSetBackground("hybrid");
    } else {
      props.gisSetBackground("kakao");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location]);

  return (
    <MainFrame>
      <LeftSide>
        <VertMenuItem caption="바로 e맵" icon={MdOutlineMap} to="/" />
        <VertMenuItem caption="하이브리드" icon={MdOutlineNoteAlt} to="/add" />
        <VertMenuItem caption="스카이뷰" icon={MdOutlineListAlt} to="/search" />
        <VertMenuItem caption="일반지도" icon={MdLayers} to="/layer" />
      </LeftSide>
      <RightSide>
        <MainBody>
          <Box position="relative" h="100%" w="100%">
            <GisMap />
          </Box>
        </MainBody>
        <MainStatus />
      </RightSide>
    </MainFrame>
  );
};

const mapStateToProps = (state: RootState) => ({
  location: state.router.location,
});

export default connect(mapStateToProps, { gisSetLocation, gisSetBackground })(App);
