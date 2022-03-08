/* eslint-disable no-console */
import React from "react";
import { VStack, Center, Icon, Box } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { IconType } from "react-icons";
import { Location } from "history";
// import { updateStatus } from "../../store/status/status-slice";

interface VertMenuItemProps {
  icon?: IconType;
  caption?: string;
  to?: string;
}

export const VertMenuItem = (props: VertMenuItemProps): JSX.Element => {
  const menuLocation = useAppSelector((state) => state.router.location) as Location;
  return (
    <VStack
      py={2}
      _hover={{ color: "white" }}
      color={menuLocation.pathname === props.to ? "white" : undefined}
      rounded={5}
      bg={menuLocation.pathname === props.to ? "#3080d0" : undefined}
    >
      <Link to={props.to || "/"}>
        <Box cursor="pointer">
          <Center>
            <Icon as={props.icon ? props.icon : MdErrorOutline} boxSize={6} />
          </Center>
          <Center fontSize="sm" marginTop={0}>
            {props.caption ? props.caption : "이름없음"}
          </Center>
        </Box>
      </Link>
    </VStack>
  );
};
