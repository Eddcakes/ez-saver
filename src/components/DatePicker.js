import { useColorMode } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";

// use my own styles to fit around chakra light/dark mode
// https://github.com/wojtekmaj/react-calendar/issues/446
import "./DatePicker.css";

//calendarType="US" in order to start weeks with Sunday
export function DatePicker({ selectedDate, onChange, inputRef, ...props }) {
  const { colorMode } = useColorMode();
  return (
    <Calendar
      value={parseISO(selectedDate)}
      onChange={onChange}
      calendarType='US'
      className={`current-theme-${colorMode}`}
      {...props}
    />
  );
}
