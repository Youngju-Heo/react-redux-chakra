/* eslint-disable no-console */
import React from "react";
import { LeftSide, MainFrame, MainStatus, RightSide, VertMenuItem } from "./component/main-frame";
import { MainBody } from "./component/main-frame/main-body";
import { MdOutlineMap, MdOutlineNoteAlt, MdOutlineListAlt, MdLayers } from "react-icons/md";
import { TestMap } from "./component/test-map";
import { useKeycloak } from "@react-keycloak/web";

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
          <TestMap />
        </MainBody>
        <MainStatus />
      </RightSide>
    </MainFrame>
  );
};
