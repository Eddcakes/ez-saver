import React from "react";
import {
  IconButton,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Box,
  RadioGroup,
  Radio,
  Switch,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { CgExport } from "react-icons/cg";

import { currencyCode, mode } from "../App";

export function Settings({
  handleCurrencyChange,
  currentCurrency,
  currentSavingMode,
  handleSavingMode,
  reversed,
  handleReversed,
  ...props
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <IconButton
        size='md'
        fontSize='lg'
        aria-label={`Open settings menu`}
        variant='ghost'
        color='current'
        marginLeft='2'
        icon={<FaCog />}
        ref={btnRef}
        onClick={onOpen}
        {...props}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Settings</DrawerHeader>
            <DrawerBody>
              <Stack spacing='1em'>
                <Box>
                  <FormLabel htmlFor='currency'>Currency</FormLabel>
                  <RadioGroup
                    name='currency'
                    value={currentCurrency.name}
                    onChange={handleCurrencyChange}
                  >
                    <Stack spacing={5} direction='row'>
                      <Radio value={currencyCode.gbp.name}>
                        {currencyCode.gbp.symbol}
                      </Radio>
                      <Radio value={currencyCode.usd.name}>
                        {currencyCode.usd.symbol}
                      </Radio>
                      <Radio value={currencyCode.eur.name}>
                        {currencyCode.eur.symbol}
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box>
                  <FormLabel htmlFor='savingMode'>Saving mode</FormLabel>
                  <RadioGroup
                    name='savingMode'
                    value={currentSavingMode}
                    onChange={handleSavingMode}
                  >
                    <Stack spacing={5} direction='row'>
                      <Radio value={mode.day}>
                        1{currentCurrency.subunit} per {mode.day}
                      </Radio>
                      <Radio value={mode.week}>
                        {currentCurrency.symbol}1 per {mode.week}
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box>
                  <FormLabel htmlFor='reversed'>Reversed</FormLabel>
                  <Text fontSize='sm'>
                    Start the year off with the bigger deposits
                  </Text>
                  <Switch
                    id='reversed'
                    aria-label='reverse size of deposits'
                    isChecked={reversed}
                    onChange={handleReversed}
                    size='lg'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='complete-btn'>
                    Complete up to today
                  </FormLabel>
                  <Text fontSize='sm'>Complete all days up to today</Text>
                  <Button
                    id='complete-btn'
                    aria-label='export data'
                    disabled={true}
                  >
                    Check up to today
                  </Button>
                </Box>
                <Box>
                  <FormLabel htmlFor='export-btn'>Export data</FormLabel>
                  <Text fontSize='sm'>
                    Data can be exported as a json object
                  </Text>
                  <Button
                    id='export-btn'
                    aria-label='export data'
                    leftIcon={<CgExport />}
                    disabled={true}
                  >
                    Export
                  </Button>
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
