import { fireEvent, screen } from "@testing-library/react";
import { format, isSameMonth, isToday, parseISO, startOfMonth } from "date-fns";

import { Today } from "./Today";
import { render } from "../test-utils";
import { currencyCode, mode } from "../App";

/* todo, get 1st week, last week, last week 53
  add reversed weekly */

const date1 = new Date("2021-01-01");
const date365 = new Date("2021-12-31");
// 2020 is a leap year and a 53 week year, this is not always the case
const date366 = new Date("2020-12-31");
// first monday in the year
const firstWeekOfYear = new Date("2021-01-04");
const first53WeekOfYear = new Date("2020-01-01");
const lastWeekOfYear = new Date("2021-12-31");
const last53WeekOfYear = new Date("2020-12-31");

test("Renders with today/defaults", () => {
  const todaysDate = format(new Date(), "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.day}
      reversed={false}
    />
  );
  const dayNoText = screen.getByText(/today is number/i);
  expect(dayNoText).toBeInTheDocument();
});

/* saving mode days, reversed false */

test("Renders with today first day and correct value", () => {
  const todaysDate = format(date1, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={date1}
      savingMode={mode.day}
      reversed={false}
    />
  );
  const firstDayText = screen.getByText(/today is number 1/i);
  expect(firstDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £0.01/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£0.01 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("Renders with today last day and correct value", () => {
  const todaysDate = format(date365, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.day}
      reversed={false}
    />
  );
  const lastDayText = screen.getByText(/today is number 365/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £3.65/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£667.95 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("[leap year]Renders with today last day and correct value", () => {
  const todaysDate = format(date366, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.day}
      reversed={false}
    />
  );
  const lastDayText = screen.getByText(/today is number 366/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £3.66/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£671.61 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

/* saving mode days, reversed true */

test("Renders with today first day and correct value, reversed saving", () => {
  const todaysDate = format(date1, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.day}
      reversed={true}
    />
  );
  const firstDayText = screen.getByText(/today is number 1/i);
  expect(firstDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £3.65/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£3.65 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("Renders with today last day and correct value, reversed saving", () => {
  const todaysDate = format(date365, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.day}
      reversed={true}
    />
  );
  const lastDayText = screen.getByText(/today is number 365/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £0.01/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£667.95 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("[leap year]Renders with today last day and correct value, reversed saving", () => {
  const todaysDate = format(date366, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.day}
      reversed={true}
    />
  );
  const lastDayText = screen.getByText(/today is number 366/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £0.01/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£671.61 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

/* saving mode weeks, reversed false */

test("Renders with today first day and correct value, weekly saving", () => {
  const todaysDate = format(firstWeekOfYear, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.week}
      reversed={false}
    />
  );
  const firstDayText = screen.getByText(/week 1/i);
  expect(firstDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £1.00/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£1.00 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("Renders with today last day and correct value, weekly saving", () => {
  const todaysDate = format(lastWeekOfYear, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.week}
      reversed={false}
    />
  );
  const lastDayText = screen.getByText(/week 52/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £52.00/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£1378.00 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("[53 week year]Renders with today last day and correct value, weekly saving", () => {
  const todaysDate = format(last53WeekOfYear, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.week}
      reversed={false}
    />
  );
  const lastDayText = screen.getByText(/week 53/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £53.00/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£1431.00 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

/* saving mode weeks, reversed true */

test("Renders with today first day and correct value, weekly saving, reversed saving", () => {
  const todaysDate = format(firstWeekOfYear, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.week}
      reversed={true}
    />
  );
  const firstDayText = screen.getByText(/week 1/i);
  expect(firstDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £52.00/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£52.00 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("[53 week year]Renders with today first day and correct value, weekly saving, reversed saving", () => {
  const todaysDate = format(first53WeekOfYear, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.week}
      reversed={true}
    />
  );
  const firstDayText = screen.getByText(/week 1/i);
  expect(firstDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £53.00/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£53.00 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("Renders with today last day and correct value, weekly saving, reversed saving", () => {
  const todaysDate = format(lastWeekOfYear, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.week}
      reversed={true}
    />
  );
  const lastDayText = screen.getByText(/week 52/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £1.00/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£1378.00 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});

test("[53 week year]Renders with today last day and correct value, weekly saving, reversed saving", () => {
  const todaysDate = format(last53WeekOfYear, "yyyy-MM-dd");
  render(
    <Today
      currencySymbol={currencyCode.gbp}
      selectedDate={todaysDate}
      savingMode={mode.week}
      reversed={true}
    />
  );
  const lastDayText = screen.getByText(/week 53/i);
  expect(lastDayText).toBeInTheDocument();
  const savingsValue = screen.getByText(/put away is £1.00/i);
  expect(savingsValue).toBeInTheDocument();
  const totalSaved = screen.getByText(/£1431.00 saved so far/i);
  expect(totalSaved).toBeInTheDocument();
});
