import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Grid,
  theme,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { Settings } from './components/Settings';
import { Today } from './components/Today';

export const currencyCode = {
  gbp: { symbol: '£', subunit: 'p', id: 1, name: 'gbp' },
  usd: { symbol: '$', subunit: '¢', id: 2, name: 'usd' },
  eur: { symbol: '€', subunit: 'c', id: 3, name: 'eur' },
};

export const mode = { day: 'day', week: 'week' };

dayjs.extend(isLeapYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);

function App() {
  //grab defaults from local storage
  const [selectedDayjs, setSelectedDayjs] = useState(dayjs());
  const [currency, setCurrency] = useState(currencyCode.gbp);
  const [savingMode, setSavingMode] = useState(mode.day);
  const [reversed, setReversed] = useState(false);

  const handleCurrencyChange = (newSymbol) => {
    setCurrency(currencyCode[`${newSymbol}`]);
  };

  const handleSavingMode = (newSavingMode) => setSavingMode(newSavingMode);

  const handleReversed = () => setReversed(!reversed);

  const handleDatePicker = (newDate) => setSelectedDayjs(newDate);

  return (
    <ChakraProvider theme={theme}>
      <Box height='100vh' textAlign='center' fontSize='xl'>
        <HStack spacing={8} justifyContent={'flex-end'} p={[4, 4, 4, 4]}>
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
            <Box h='10em' w='10em' bg='teal.500'>
              Calendar
              <Text>{selectedDayjs.format('YYYY-MM-DD')}</Text>
            </Box>
            <Today
              currencySymbol={currency}
              selectedDayjs={selectedDayjs}
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
