import { useNavigateHomePage } from "@/hooks/navigate";
import { dreamService } from "@/services/dream.service";
import { useIsSaved } from "@/store/selectors";
import { useDreams } from "@/store/store";

export const useHeaderProps = () => {
  const date = useDreams((state) => state.dream.date);
  const description = useDreams((state) => state.dream.description);
  const onChangeDate = useDreams((state) => state.setDate);
  const isSaved = useIsSaved();
  const onSave = dreamService.saveDream;
  const navigateBack = useNavigateHomePage();

  return {
    date,
    description,
    isSaved,
    onChangeDate,
    onSave,
    navigateBack,
  };
};
