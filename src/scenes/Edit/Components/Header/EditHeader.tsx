import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

import { dreamService } from "@/services/dream.service";
import { useDreams } from "@/store/store";

import { useNavigateHomePage } from "../../../../hooks/navigate";
import { useIsLoggedIn, useIsSaved } from "../../../../store/selectors";
import { Bar } from "../../../Components";
import Hide from "./Hide";

const HideOrShow = () => {
  const loggedIn = useIsLoggedIn();
  return loggedIn ? <Hide /> : <></>;
};

export function EditHeader() {
  const date = useDreams((state) => state.dream.date);
  const setDate = useDreams((state) => state.setDate);

  const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setDate(new Date(e.currentTarget.value));
    dreamService.saveDream();
  };

  const DateInput = (
    <Input
      type="date"
      value={date.toISOString().substring(0, 10)}
      onChange={onChangeDate}
      title="Datum"
    />
  );

  return (
    <Bar
      mainAction={<BackButton />}
      secondaryAction={[<SaveButton key={1} />, <HideOrShow key={2} />]}
      optionalMiddleAction={DateInput}
      position="top"
      showAuth
    />
  );
}

function SaveButton() {
  const isSaved = useIsSaved();

  const saveDream = () => {
    dreamService.saveDream();
  };

  const color = isSaved ? "success" : "error";
  return (
    <IconButton color={color} onClick={saveDream} title="Speichern">
      <SaveIcon />
    </IconButton>
  );
}

export function BackButton() {
  const navigate = useNavigateHomePage();
  const resetDream = useDreams((state) => state.resetDream);

  const handleClick = () => {
    navigate();
    resetDream();
  };

  return (
    <IconButton onClick={handleClick} title="Zurück">
      <ArrowBackIcon />
    </IconButton>
  );
}
