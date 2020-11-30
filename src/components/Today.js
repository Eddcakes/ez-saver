import { useState } from 'react';
import {
  VStack,
  Text,
  Button,
  IconButton,
  Grid,
  GridItem,
  Fade,
} from '@chakra-ui/react';
import { FaCheck, FaUndo } from 'react-icons/fa';

import { mode } from '../App';

export function Today({ currencySymbol, selectedDayjs, savingMode, reversed }) {
  const [added, setAdded] = useState(false);
  const dayNumber = selectedDayjs.dayOfYear();
  const selectedWeek = selectedDayjs.isoWeek();
  const weeksThisYear = selectedDayjs.isoWeeksInYear();
  const daysInYear = selectedDayjs.isLeapYear() ? 366 : 365;
  let todaysTotal;
  let todaysAmount;
  switch (savingMode) {
    case mode.day:
      todaysTotal = runningTotal(dayNumber, daysInYear, reversed) / 100;
      // /100 because doing 1p/c a day
      todaysAmount = todaysDeposit(dayNumber, daysInYear, reversed) / 100;
      break;
    case mode.week:
      todaysTotal = runningTotal(selectedWeek, weeksThisYear, reversed);
      todaysAmount = todaysDeposit(selectedWeek, weeksThisYear, reversed);
      break;
    default:
      todaysTotal = runningTotal(dayNumber, daysInYear, reversed) / 100;
      // /100 because doing 1p/c a day
      todaysAmount = todaysDeposit(dayNumber, daysInYear, reversed) / 100;
  }

  return (
    <VStack spacing={4}>
      <Text>Today is number {dayNumber}</Text>
      <Text>
        This is week {selectedWeek} total weeks {weeksThisYear}
      </Text>
      <Text>
        The amount to put away is {currencySymbol.symbol}
        {todaysAmount}
      </Text>
      <Grid
        gridTemplateColumns='1fr 2fr 1fr'
        gridTemplateRows='1fr'
        gridTemplateAreas='". complete undo"'
      >
        <GridItem gridArea='complete'>
          <Button
            size='lg'
            variant='outline'
            aria-label='Complete today'
            colorScheme='green'
            leftIcon={<FaCheck />}
            disabled={added}
            onClick={() => setAdded(true)}
          >
            Complete
          </Button>
        </GridItem>
        {added === true ? (
          <GridItem gridArea='undo' alignSelf='center'>
            <Fade in={added}>
              <IconButton
                size='md'
                fontSize='lg'
                aria-label={`Reset today's `}
                colorScheme='green'
                icon={<FaUndo />}
                onClick={() => setAdded(false)}
              />
            </Fade>
          </GridItem>
        ) : null}
      </Grid>
      <Text>
        You should have {currencySymbol.symbol}
        {todaysTotal.toFixed(2)} saved so far!
      </Text>
    </VStack>
  );
}

/* could have a progress bar / with target value ? */

/* current is the current day/week no, max is the max days or weeks in this year */
function runningTotal(current, max, reversed = false) {
  let sequence = [];
  if (!reversed) {
    for (let ii = current; ii > 0; ii--) {
      sequence.push(ii);
    }
  } else {
    for (let ii = max; max - current < ii; ii--) {
      sequence.push(ii);
    }
  }
  const total = sequence.reduce((acc, cur) => acc + cur, 0);
  return total;
}

function todaysDeposit(current, max, reversed = false) {
  let value;
  if (!reversed) {
    value = current.toFixed(2);
  } else {
    value = (max - current).toFixed(2);
  }
  return value;
}
