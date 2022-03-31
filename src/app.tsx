/* eslint-disable no-console */
import React from "react";
import { LeftSide, MainFrame, MainStatus, RightSide, VertMenuItem } from "./component/main-frame";
import { MainBody } from "./component/main-frame/main-body";
import { MdOutlineMap, MdOutlineNoteAlt, MdOutlineListAlt, MdLayers } from "react-icons/md";
import { Box } from "@chakra-ui/react";

import "ol/ol.css";
import GisMap from "./component/gis-comp/gis-map";
import { RootState } from "./store";
import { connect } from "react-redux";
import { gisSetLocation, GisViewPosition } from "./store/gisinfo/gis-info-slice";

interface AppProps {
  location?: Location;
  gisSetLocation: (position: GisViewPosition) => void;
}

const App = (props: AppProps): JSX.Element => {
  React.useEffect(() => {
    props.gisSetLocation({
      center: [126.8915302, 37.4858711],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location]);

  return (
    <MainFrame>
      <LeftSide>
        <VertMenuItem caption="지도보기" icon={MdOutlineMap} to="/" />
        <VertMenuItem caption="정책설정" icon={MdOutlineNoteAlt} to="/add" />
        <VertMenuItem caption="결과조회" icon={MdOutlineListAlt} to="/search" />
        <VertMenuItem caption="레이어관리" icon={MdLayers} to="/layer" />
      </LeftSide>
      <RightSide>
        <MainBody>
          <Box position="relative" h="100%" w="100%">
            {/*<MainMap view={{ center: [126.89154003559742, 37.4858879791826], zoom: 15 }} />*/}
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

export default connect(mapStateToProps, { gisSetLocation })(App);
