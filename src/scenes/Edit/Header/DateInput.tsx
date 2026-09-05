import { Temporal } from "@js-temporal/polyfill";
import Input from "@mui/material/Input";
import { ChangeEvent } from "react";

type DateInputProps = {
  date: Temporal.Instant;
  onChangeDate: (date: Temporal.Instant) => void;
};

export const DateInput = ({ date, onChangeDate }: DateInputProps) => {
  const onDateInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    if (!value) return;
    onChangeDate(Temporal.Instant.from(value));
  };

  return (
    <Input
      type="date"
      value={date.toString().substring(0, 10)}
      onChange={onDateInputChange}
      title="Datum"
    />
  );
};
