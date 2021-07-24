import { fireEvent, screen } from "@testing-library/react";

import { Settings } from "./Settings";
import { render } from "../test-utils";
import { currencyCode, mode } from "../App";

test("Renders settings page when clicking button", async () => {
  const mockCurrencyChange = jest.fn();
  const mockHandleSavingMode = jest.fn();
  const mockHandleReverse = jest.fn();

  render(
    <Settings
      handleCurrencyChange={mockCurrencyChange}
      currentCurrency={currencyCode.gbp}
      currentSavingMode={mode.day}
      handleSavingMode={mockHandleSavingMode}
      reversed={false}
      handleReversed={mockHandleReverse}
    />
  );
  const settingsButton = screen.getByRole("button");
  expect(settingsButton).toBeInTheDocument();

  fireEvent.click(settingsButton);

  const drawerTitle = await screen.findByText(/settings/i);
  expect(drawerTitle).toBeInTheDocument();
});

test("Calls appropriate handlers when changing settings", async () => {
  const mockCurrencyChange = jest.fn();
  const mockHandleSavingMode = jest.fn();
  const mockHandleReverse = jest.fn();

  render(
    <Settings
      handleCurrencyChange={mockCurrencyChange}
      currentCurrency={currencyCode.gbp}
      currentSavingMode={mode.day}
      handleSavingMode={mockHandleSavingMode}
      reversed={false}
      handleReversed={mockHandleReverse}
    />
  );
  const settingsButton = screen.getByRole("button");
  fireEvent.click(settingsButton);
  const startingPound = await screen.findByLabelText("£");
  const startingDollar = await screen.findByLabelText("$");
  const startingEuro = await screen.findByLabelText("€");
  expect(startingPound).toBeChecked();
  expect(startingDollar).not.toBeChecked();
  expect(startingEuro).not.toBeChecked();
  // because mocking the handle functions the radios will not change
  fireEvent.click(startingDollar);
  expect(mockCurrencyChange).toHaveBeenCalledTimes(1);
  // defaulting tests with gbp
  const starting1pDay = await screen.findByLabelText("1p per day");
  const starting1poundWeek = await screen.findByLabelText("£1 per week");
  expect(starting1pDay).toBeChecked();
  expect(starting1poundWeek).not.toBeChecked();
  fireEvent.click(starting1poundWeek);
  expect(mockHandleSavingMode).toHaveBeenCalledTimes(1);
  // defaults reversed false
  const reversed = await screen.findByLabelText("reverse size of deposits");
  expect(reversed).not.toBeChecked();
  fireEvent.click(reversed);
  expect(mockHandleReverse).toHaveBeenCalledTimes(1);
});
