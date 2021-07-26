import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { format, getDayOfYear } from "date-fns";
import { render } from "./test-utils";
import App from "./App";

test("renders the app", () => {
  render(<App />);
  const themeButton = screen.getByRole("button", {
    name: /mode/i,
  });
  const settingsButton = screen.getByRole("button", {
    name: /mode/i,
  });
  expect(themeButton).toBeInTheDocument();
  expect(settingsButton).toBeInTheDocument();

  // long month MMMM
  const monthYear = format(new Date(), "MMMM yyyy");
  const calendarHeader = screen.getByText(monthYear);

  expect(calendarHeader).toBeInTheDocument();

  //back to today is disabled by default as we start with today
  const backToTodayButton = screen.getByRole("button", {
    name: /back to today/i,
  });
  expect(backToTodayButton).toBeDisabled();
});
jest.setTimeout(10000);
/*
 test("Open and close settings drawer", async () => {

  render(<App />);
  expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
  const settingsButton = screen.getByRole("button", {
    name: /settings/i,
  });
  expect(settingsButton).toBeInTheDocument();
  fireEvent.click(settingsButton);
  const drawerTitle = await screen.findByText(/settings/i);
  expect(drawerTitle).toBeInTheDocument();

  const closeButton = screen.getByRole("button", {
    name: /close/i,
  });
  expect(closeButton).toBeInTheDocument();
  fireEvent.click(closeButton);
  expect(await screen.findByText(/settings/i)).not.toBeInTheDocument();
}); 
*/

test("Default currency and switching currency", async () => {
  render(<App />);
  const defaultText = screen.getByText(/put away is £/i);
  expect(defaultText).toBeInTheDocument();
  const settingsButton = screen.getByRole("button", {
    name: /settings/i,
  });
  fireEvent.click(settingsButton);
  const drawerTitle = await screen.findByText(/settings/i);
  expect(drawerTitle).toBeInTheDocument();

  const startingPound = await screen.findByLabelText("£");
  const startingDollar = await screen.findByLabelText("$");
  const startingEuro = await screen.findByLabelText("€");
  expect(startingPound).toBeChecked();
  expect(startingDollar).not.toBeChecked();
  expect(startingEuro).not.toBeChecked();

  fireEvent.click(startingDollar);
  expect(await screen.findByLabelText("£")).not.toBeChecked();
  expect(await screen.findByLabelText("$")).toBeChecked();
  expect(await screen.findByLabelText("€")).not.toBeChecked();

  const noGbp = screen.queryByText(/put away is £/i);
  expect(noGbp).not.toBeInTheDocument();
  const textChangedCurrency = screen.queryByText(/put away is \$/i);
  expect(textChangedCurrency).toBeInTheDocument();
});

test("Switching between reversed mode", async () => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date("2021-01-01"));
  // default is days
  render(<App />);
  const defaultText = screen.getByText(/today is number 1/i);
  expect(defaultText).toBeInTheDocument();
  const defaultSaved = screen.queryByText(/put away is \$0.01/i);
  expect(defaultSaved).toBeInTheDocument();
  const settingsButton = screen.getByRole("button", {
    name: /settings/i,
  });
  fireEvent.click(settingsButton);
  const drawerTitle = await screen.findByText(/settings/i);
  expect(drawerTitle).toBeInTheDocument();
  // test the default gbp
  const reveresedSwitch = await screen.findByLabelText(
    "reverse size of deposits"
  );
  expect(reveresedSwitch).not.toBeChecked();
  fireEvent.click(reveresedSwitch);
  expect(
    await screen.findByLabelText("reverse size of deposits")
  ).toBeChecked();
  expect(screen.queryByText(/put away is \$3.65/i));
});

test("Switching saving mode", async () => {
  render(<App />);
  const defaultText = screen.getByText(/today is number/i);
  expect(defaultText).toBeInTheDocument();
  const settingsButton = screen.getByRole("button", {
    name: /settings/i,
  });
  fireEvent.click(settingsButton);
  const drawerTitle = await screen.findByText(/settings/i);
  expect(drawerTitle).toBeInTheDocument();
  /* test the default gbp */
  const dayRadio = await screen.findByLabelText(/per day/i);
  const weekRadio = await screen.findByLabelText(/per week/i);
  expect(dayRadio).toBeChecked();
  expect(weekRadio).not.toBeChecked();

  fireEvent.click(weekRadio);
  expect(await screen.findByLabelText(/per day/i)).not.toBeChecked();
  expect(await screen.findByLabelText(/per week/i)).toBeChecked();

  const noDayNumber = screen.queryByText(/today is number/i);
  expect(noDayNumber).toBeNull();
  const weekNumber = screen.queryByText(/it is week/i);
  expect(weekNumber).toBeInTheDocument();
});
