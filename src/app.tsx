import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  useColorMode,
  useToast,
  Button,
} from '@chakra-ui/react';
import moment from 'moment';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { Counter } from './component/counter';

export const App = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();

  return (
    <Stack spacing={6}>
      <HStack>
        <IconButton
          aria-label="테마적용"
          size="sm"
          icon={colorMode === 'dark' ? <MdLightMode size="24px" /> : <MdDarkMode size="24px" />}
          onClick={() => toggleColorMode()}
        />
      </HStack>
      <Heading as="h1">리엑트와 TypeScript 앱 {moment(new Date()).format('YYYY-MM-DD ddd HH:mm:ss')}</Heading>
      <Counter />

      <br />
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>첫번째 항목의 내용</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>두번째 항목의 내용</AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Image objectFit="contain" boxSize="200px" src="assets/images/image.jpg" />
      <Button
        onClick={() =>
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            position: 'bottom-left',
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>
    </Stack>
  );
};
