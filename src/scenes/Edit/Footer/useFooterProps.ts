import { useNavigateToDream } from "@/hooks/navigate";
import { dreamService } from "@/services/dream.service";
import { useDreams } from "@/store/store";

import { FooterProps } from "./Footer";

export const useFooterProps = (): FooterProps => {
  const dream = useDreams((state) => state.dream);
  const setRating = useDreams((state) => state.setRating);
  const dreams = useDreams((state) => state.dreams);

  const isFinalized = dream.finalized;
  const rating = dream.rating;
  const currentDreamIndex = dreams.findIndex((d) => d.id === dream.id);
  const nextDisabled = currentDreamIndex <= 0;
  const prevDisabled = currentDreamIndex === dreams.length - 1 || currentDreamIndex === -1;

  const finalize = dreamService.finalize;
  const onSave = dreamService.saveDream;
  const navigate = useNavigateToDream();
  const navigateNext = () => navigate(dreams[currentDreamIndex - 1].id);
  const navigatePrev = () => navigate(dreams[currentDreamIndex + 1].id);

  return {
    finalize,
    isFinalized,
    rating,
    navigateNext,
    navigatePrev,
    nextDisabled,
    onSave,
    prevDisabled,
    setRating,
  };
};
