/* eslint-disable no-console */
import React from "react";
import { Flex, Center, Spacer } from "@chakra-ui/react";
import { TimeWidget } from "../time-widget";
import { RootState } from "../../store";
import { connect } from "react-redux";
import { StatusState } from "../../store/status/status-slice";
import { FormatNumber, FormatNumberArray } from "../../common/utilities";

interface MainStatusProps {
  status?: StatusState;
}

const MainStatus = (props: MainStatusProps): JSX.Element => {
  const message = props.status?.message || "";
  const view = props?.status?.view || { center: [0, 0], zoom: 0 };

  const showMessage = `[${FormatNumberArray(view?.center || [0, 0], 6)}, ${FormatNumber(view?.zoom, 4)}]`;

  return (
    <Flex p={2} h={10} w="100%" bg="rgba(13,16,31,.3)">
      <Center>{`${showMessage} ${message}`}</Center>
      <Spacer />
      <Center>
        <TimeWidget />
      </Center>
    </Flex>
  );
};

const mapStateToProps = (state: RootState) => ({
  status: state.status,
});

export default connect(mapStateToProps)(MainStatus);
