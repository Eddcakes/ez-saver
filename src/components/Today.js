import { useState } from "react";
import {
  VStack,
  Text,
  Button,
  IconButton,
  Grid,
  GridItem,
  Fade,
} from "@chakra-ui/react";
import {
  getDayOfYear,
  getDaysInYear,
  getISOWeeksInYear,
  getISOWeek,
} from "date-fns";
import { FaCheck, FaUndo } from "react-icons/fa";

import { mode } from "../App";

export function Today({ currencySymbol, selectedDate, savingMode, reversed }) {
  const [added, setAdded] = useState(false);
  const dayNumber = getDayOfYear(new Date(selectedDate)); //might have to be new Date(selectedDate)
  const selectedWeek = getISOWeek(new Date(selectedDate));
  const weeksThisYear = getISOWeeksInYear(new Date(selectedDate));
  const daysInYear = getDaysInYear(new Date(selectedDate));
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
    <VStack>
      {savingMode === mode.day ? (
        <Text>Today is number {dayNumber}</Text>
      ) : (
        <Text>
          It is week {selectedWeek} out of {weeksThisYear}
        </Text>
      )}
      <Text>
        The amount to put away is {currencySymbol.symbol}
        {todaysAmount.toFixed(2)}
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
    value = current;
  } else {
    value = max - (current - 1);
  }
  return value;
}
