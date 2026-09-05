import Button from "@mui/material/Button";
import { useState } from "react";

export type FinalizeButtonProps = {
  isFinalized: boolean;
  isRated: boolean;
  finalize: () => Promise<void>;
};

export default function FinalizeButton({ finalize, isRated, isFinalized }: FinalizeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    await finalize();
    setIsLoading(false);
  };

  return (
    <Button
      variant="contained"
      loading={isLoading}
      onClick={onClick}
      color="success"
      disabled={isFinalized || !isRated}
    >
      Redigieren
    </Button>
  );
}
