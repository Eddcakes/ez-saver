import { parseISO } from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import "./DatePicker.css";

export function DatePicker({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) {
  return (
    <ReactDatePicker
      selected={parseISO(selectedDate)}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      {...props}
    />
  );
}
