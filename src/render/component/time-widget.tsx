import React from "react";
import moment from "moment";
import { Box } from "@chakra-ui/react";

interface TimeWidgetState {
  timeValue: number;
}

export const TimeWidget = (): JSX.Element => {
  const [state, setState] = React.useState({ timeValue: 0 } as TimeWidgetState);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setState({
        ...state,
        timeValue: Date.now(),
      });
      clearTimeout(timerId);
    }, 1000);
  }, [state]);

  return <Box> {moment(new Date()).format("YYYY년 M월 D일 dddd A h:mm:ss")}</Box>;
};
