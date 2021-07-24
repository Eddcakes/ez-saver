import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react";
import { format, isSameMonth, isToday, parseISO, startOfMonth } from "date-fns";
import { MdToday } from "react-icons/md";

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
  const [selectedDate, setSelectedDate] = useState(format(date, "yyyy-MM-dd"));
  const [calendarView, setCalendarView] = useState(
    startOfMonth(new Date(selectedDate))
  );
  const [currency, setCurrency] = useState(
    JSON.parse(localStorage.getItem("ezCurrency")) || currencyCode.gbp
  );
  const [savingMode, setSavingMode] = useState(
    localStorage.getItem("ezSavingMode") || mode.day
  );
  const [reversed, setReversed] = useState(
    JSON.parse(localStorage.getItem("ezReversed")) ?? false
  );

  const handleCurrencyChange = (newSymbol) => {
    setCurrency(currencyCode[`${newSymbol}`]);
  };
  const handleSavingMode = (newSavingMode) => setSavingMode(newSavingMode);

  const handleReversed = () => setReversed(!reversed);

  const handleDatePicker = (newDate) => {
    const nextDate = new Date(newDate);
    setSelectedDate(format(nextDate, "yyyy-MM-dd"));
    setCalendarView(startOfMonth(nextDate));
  };
  const handleShortWeekText = (locale = "en_GB", date) => {
    // first two letters of weekday
    return format(date, "EEEEEE");
  };
  const handleCalendarViewChange = ({ activeStartDate, value, view }) => {
    setCalendarView(startOfMonth(activeStartDate));
  };

  useEffect(() => {
    localStorage.setItem("ezCurrency", JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("ezSavingMode", savingMode);
  }, [savingMode]);

  useEffect(() => {
    localStorage.setItem("ezReversed", reversed);
  }, [reversed]);

  return (
    <ChakraProvider theme={theme}>
      <Box height='100vh' textAlign='center' fontSize='xl'>
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
          <VStack spacing={4}>
            {/* would i want min/max date to be this year or nah */}
            <DatePicker
              id='pick-selected-date'
              selectedDate={selectedDate}
              onChange={handleDatePicker}
              formatShortWeekday={handleShortWeekText}
              onActiveStartDateChange={handleCalendarViewChange}
              activeStartDate={calendarView}
            />
            <Button
              size='lg'
              variant='outline'
              aria-label='Set selected back to today'
              leftIcon={<MdToday />}
              disabled={
                isSameMonth(calendarView, parseISO(selectedDate)) &&
                isToday(parseISO(selectedDate))
              }
              onClick={() => handleDatePicker(new Date())}
            >
              Back to Today
            </Button>
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
