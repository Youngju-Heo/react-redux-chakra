/* eslint-disable no-console */
import React from "react";
import { LeftSide, MainFrame, MainStatus, RightSide, VertMenuItem } from "./component/main-frame";
import { MainBody } from "./component/main-frame/main-body";
import { MdOutlineMap, MdOutlineNoteAlt, MdOutlineListAlt, MdLayers } from "react-icons/md";
import { useAppSelector } from "./store/hooks";
import { Location } from "history";
import { Processing } from "./component/processing";
import { selectStatus, updateStatus } from "./store/status/status-slice";

export const App = (): JSX.Element => {
  const location = useAppSelector((state) => state.router.location) as Location;
  const status = useAppSelector(selectStatus);
  if (location.pathname !== status) {
    console.log("location", location);
    updateStatus(location.pathname);
  }
  console.log(location, status);

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
          <Processing />
        </MainBody>
        <MainStatus />
      </RightSide>
    </MainFrame>
  );
};
