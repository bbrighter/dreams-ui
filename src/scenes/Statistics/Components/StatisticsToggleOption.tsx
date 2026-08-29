import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { CategoryType } from "../../../store/types/categories.types";

export function StatisticsToggleOption(props: {
  onChange: (e: React.MouseEvent<HTMLElement>, v: CategoryType) => void;
  value: CategoryType;
}) {
  const onChange = (e: React.MouseEvent<HTMLElement>, v: CategoryType) => {
    props.onChange(e, v);
  };

  return (
    <ToggleButtonGroup value={props.value} exclusive onChange={onChange}>
      <ToggleButton value="person">Personen</ToggleButton>
      <ToggleButton value="category">Kategorien</ToggleButton>
    </ToggleButtonGroup>
  );
}
