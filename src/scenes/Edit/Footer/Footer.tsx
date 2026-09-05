import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";

import { Bar } from "@/scenes/Components";

import DreamRating, { DreamRatingProps } from "./DreamRating";
import FinalizeButton, { FinalizeButtonProps } from "./FinalizeButton";

export type FooterProps = DreamRatingProps &
  NextOrPreviousDreamProps &
  Omit<FinalizeButtonProps, "isRated">;

export const EditFooter = ({
  rating,
  setRating,
  onSave,
  navigateNext,
  navigatePrev,
  nextDisabled,
  prevDisabled,
  finalize,
  isFinalized,
}: FooterProps) => {
  const isRated = rating !== null;
  return (
    <Bar
      mainAction={<DreamRating rating={rating} setRating={setRating} onSave={onSave} />}
      secondaryAction={[
        <FinalizeButton
          key="finalize"
          finalize={finalize}
          isFinalized={isFinalized}
          isRated={isRated}
        />,
      ]}
      position="bottom"
      optionalMiddleAction={
        <NextOrPreviousDream
          nextDisabled={nextDisabled}
          prevDisabled={prevDisabled}
          navigateNext={navigateNext}
          navigatePrev={navigatePrev}
        />
      }
    />
  );
};

type NextOrPreviousDreamProps = {
  navigateNext: () => void;
  navigatePrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
};

const NextOrPreviousDream = ({
  navigateNext,
  navigatePrev,
  nextDisabled,
  prevDisabled,
}: NextOrPreviousDreamProps) => {
  //   const navigate = useNavigateToDream();
  //   const dreams = useDreams((state) => state.dreams);
  //   const currentDreamId = useDreams((state) => state.dream.id);
  //   const isSaved = useIsSaved();

  //   const [nextDreamIndex, setNextDreamIndex] = useState(-1);
  //   const [prevDreamIndex, setPrevDreamIndex] = useState(-1);

  //   useEffect(() => {
  //     const currentDreamIndex = dreams.findIndex((d) => d.id == currentDreamId);
  //     // oxlint-disable-next-line react/set-state-in-effect
  //     setNextDreamIndex(currentDreamIndex - 1);
  //     setPrevDreamIndex(currentDreamIndex < dreams.length - 1 ? currentDreamIndex + 1 : -1);
  //   }, [currentDreamId, dreams]);

  //   const onClick = (index: number) => {
  //     if (index == -1) return;
  //     const dreamId = dreams[index].id;
  //     navigate(dreamId);
  //   };

  return (
    <ButtonGroup>
      <IconButton title="Nächster Traum" disabled={nextDisabled} onClick={navigateNext}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton title="Vorheriger Traum" disabled={prevDisabled} onClick={navigatePrev}>
        <ArrowDownwardIcon />
      </IconButton>
    </ButtonGroup>
  );
};
