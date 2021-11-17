/* eslint-disable no-console */
import React from "react";
import { VStack, Center, Icon } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";
import { menuPush } from "../../store/menu/menu-slice";
import { useAppSelector } from "../../store/hooks";
import { IconType } from "react-icons";

interface VertMenuItemProps {
  icon?: IconType;
  caption?: string;
  to?: string;
}

export const VertMenuItem = (props: VertMenuItemProps): JSX.Element => {
  const menuLocation = useAppSelector((state) => state.menu.location);
  return (
    <VStack
      p={0}
      py={2}
      onClick={() => menuPush(props.to ? props.to : "")}
      _hover={{ color: "white" }}
      color={menuLocation.path === props.to ? "white" : undefined}
      rounded={5}
      cursor="pointer"
      bg={menuLocation.path === props.to ? "#3080d0" : undefined}
    >
      <Icon as={props.icon ? props.icon : MdErrorOutline} boxSize={6} />
      <Center fontSize="sm" marginTop={0}>
        {props.caption ? props.caption : "이름없음"}
      </Center>
    </VStack>
  );
};
