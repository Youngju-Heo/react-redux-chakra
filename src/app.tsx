import React from "react";
import { LeftSide, MainFrame, MainStatus, RightSide, VertMenuItem } from "./component/main-frame";
import { MainBody } from "./component/main-frame/main-body";
import { Box } from "@chakra-ui/react";
import { MdOutlineMap, MdOutlineNoteAlt, MdOutlineListAlt, MdLayers, MdMic } from "react-icons/md";

export const App = (): JSX.Element => {
  return (
    <MainFrame>
      <LeftSide>
        <VertMenuItem caption="지도보기" icon={MdOutlineMap} to="/" />
        <VertMenuItem caption="정책설정" icon={MdOutlineNoteAlt} to="/add" />
        <VertMenuItem caption="결과조회" icon={MdOutlineListAlt} to="/search" />
        <VertMenuItem caption="레이어관리" icon={MdLayers} to="/layer" />
        <VertMenuItem caption="통합 방송" icon={MdMic} to="/broadcast" />
      </LeftSide>
      <RightSide>
        <MainBody>
          <Box>body</Box>
        </MainBody>
        <MainStatus>{"status"}</MainStatus>
      </RightSide>
    </MainFrame>
  );
};
