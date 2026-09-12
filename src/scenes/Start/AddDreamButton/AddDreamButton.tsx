import Button from "@mui/material/Button";

type AddDreamButtonProps = {
  navigate: (id: number) => void;
  createDream: () => Promise<number>;
};

export const AddDreamButton = ({ navigate, createDream }: AddDreamButtonProps) => {
  const handleClick = async () => {
    const dreamId = await createDream();
    navigate(dreamId);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Neu
    </Button>
  );
};
