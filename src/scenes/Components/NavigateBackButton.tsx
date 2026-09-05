import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

export type NavigateBackButtonProps = {
  navigateBack: () => void;
};

export const NavigateBackButton = ({ navigateBack }: NavigateBackButtonProps) => {
  return (
    <IconButton onClick={navigateBack} title="Zurück">
      <ArrowBackIcon />
    </IconButton>
  );
};
