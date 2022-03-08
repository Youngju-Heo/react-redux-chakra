/* eslint-disable no-console */
import React from "react";
import { LeftSide, MainFrame, MainStatus, RightSide, VertMenuItem } from "./component/main-frame";
import { MainBody } from "./component/main-frame/main-body";
import { MdOutlineMap, MdOutlineNoteAlt, MdOutlineListAlt, MdLayers } from "react-icons/md";
import { useKeycloak } from "@react-keycloak/web";
import { MainMap } from "./component/main-map";
import { Box } from "@chakra-ui/react";

import "ol/ol.css";
export const App = (): JSX.Element => {
  const { keycloak } = useKeycloak();

  console.log(keycloak);
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
            <MainMap view={{ center: [126.89154003559742, 37.4858879791826], zoom: 15 }} />
          </Box>
        </MainBody>
        <MainStatus />
      </RightSide>
    </MainFrame>
  );
};
