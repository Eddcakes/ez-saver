import React from "react";
import { screen } from "@testing-library/react";
import { format } from "date-fns";
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

// test settings page changes the selected
