import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

export const VertMenu = (props: { children?: React.ReactNode }): JSX.Element => {
  return <PerfectScrollbar>{!props.children ? undefined : props.children}</PerfectScrollbar>;
};
