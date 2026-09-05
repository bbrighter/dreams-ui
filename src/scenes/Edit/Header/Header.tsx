import { Temporal } from "@js-temporal/polyfill";

import {
  NavigateBackButton,
  NavigateBackButtonProps,
} from "@/scenes/Components/NavigateBackButton";

import { Bar } from "../../Components";
import { DateInput } from "./DateInput";
import { SaveButton, SaveButtonProps } from "./SaveButton";

export type HeaderProps = SaveButtonProps &
  NavigateBackButtonProps & {
    date: Temporal.Instant;
    onChangeDate: (date: Temporal.Instant) => void;
  };

export const Header = ({
  date,
  onChangeDate,
  onSave,
  isSaved,
  navigateBack: navigateHome,
}: HeaderProps) => {
  return (
    <Bar
      mainAction={<NavigateBackButton navigateBack={navigateHome} />}
      secondaryAction={[<SaveButton key={1} onSave={onSave} isSaved={isSaved} />]}
      optionalMiddleAction={<DateInput date={date} onChangeDate={onChangeDate} />}
      position="top"
      showAuth
    />
  );
};
