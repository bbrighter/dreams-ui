import Button from "@mui/material/Button";

import { dreamsService } from "@/services/dreams.service";

import { useNavigateToDream } from "../../../hooks/navigate";

export const AddDreamButton = () => {
  const navigate = useNavigateToDream();

  const handleClick = async () => {
    const dreamId = await dreamsService.postDream();
    navigate(dreamId);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Neu
    </Button>
  );
};
