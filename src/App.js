import { useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Grid,
  theme,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { DatePicker } from "./components/DatePicker";
import { Settings } from "./components/Settings";
import { Today } from "./components/Today";

export const currencyCode = {
  gbp: { symbol: "£", subunit: "p", id: 1, name: "gbp" },
  usd: { symbol: "$", subunit: "¢", id: 2, name: "usd" },
  eur: { symbol: "€", subunit: "c", id: 3, name: "eur" },
};

export const mode = { day: "day", week: "week" };

function App() {
  //grab defaults from local storage
  const date = new Date();
  console.log(date);
  console.log(format(date, "yyyy-MM-dd"));
  const [selectedDate, setSelectedDate] = useState(format(date, "yyyy-MM-dd"));
  const [currency, setCurrency] = useState(currencyCode.gbp);
  const [savingMode, setSavingMode] = useState(mode.day);
  const [reversed, setReversed] = useState(false);

  const handleCurrencyChange = (newSymbol) => {
    setCurrency(currencyCode[`${newSymbol}`]);
  };

  const handleSavingMode = (newSavingMode) => setSavingMode(newSavingMode);

  const handleReversed = () => setReversed(!reversed);

  const handleDatePicker = (newDate) => setSelectedDate(newDate);

  return (
    <ChakraProvider theme={theme}>
      <Box height="100vh" textAlign="center" fontSize="xl">
        <HStack spacing={8} justifyContent={"flex-end"} p={[4, 4, 4, 4]}>
          <ColorModeSwitcher />
          <Settings
            handleCurrencyChange={handleCurrencyChange}
            currentCurrency={currency}
            currentSavingMode={savingMode}
            handleSavingMode={handleSavingMode}
            reversed={reversed}
            handleReversed={handleReversed}
          />
        </HStack>
        <Grid p={3}>
          <VStack spacing={8}>
            <Box h="10em" w="10em" bg="teal.500">
              <FormControl>
                <FormLabel htmlFor="pick-selected-date">
                  Choose selected date
                </FormLabel>
                <DatePicker
                  id="pick-selected-date"
                  selectedDate={selectedDate}
                  onChange={(cng) => console.log(cng)}
                  inline={false}
                />
              </FormControl>
              <Text>{selectedDate}</Text>
            </Box>
            <Today
              currencySymbol={currency}
              selectedDate={selectedDate}
              savingMode={savingMode}
              reversed={reversed}
            />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
