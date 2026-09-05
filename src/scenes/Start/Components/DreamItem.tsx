import styled from "@emotion/styled";
import { Temporal } from "@js-temporal/polyfill";
import CloudIcon from "@mui/icons-material/Cloud";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

import { dreamsService } from "@/services/dreams.service";

const StyledListItem = styled(ListItem)`
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

type DreamListItemType = {
  id: number;
  date: Temporal.Instant;
  finalized: boolean;
  rating: number | null;
};

export function DreamItem(props: { dream: DreamListItemType }) {
  const navigate = useNavigate();

  const navigateTo = (dreamId: number) => {
    navigate("/dreams/" + dreamId);
  };

  const color = props.dream.finalized ? "inherit" : "warning";

  return (
    <StyledListItem
      onClick={() => navigateTo(props.dream.id)}
      secondaryAction={
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            dreamsService.deleteDream(props.dream.id);
          }}
          title="Löschen"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar data-testid="dream-icon">
        <CloudIcon color={color} />
      </ListItemAvatar>
      <ListItemText>
        {props.dream.date
          .toZonedDateTimeISO(Temporal.Now.timeZoneId())
          .toPlainDate()
          .toLocaleString("de-DE", { dateStyle: "medium" })}
      </ListItemText>
      <Rating
        title="Bewertung"
        value={props.dream.rating}
        readOnly
        size="small"
        sx={{ pr: 2, pl: 2 }}
      />
    </StyledListItem>
  );
}
