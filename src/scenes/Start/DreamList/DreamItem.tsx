import styled from "@emotion/styled";
import { Temporal } from "@js-temporal/polyfill";
import CloudIcon from "@mui/icons-material/Cloud";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";

const StyledListItem = styled(ListItem)`
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

type DreamListItemProps = {
  id: number;
  date: Temporal.Instant;
  finalized: boolean;
  rating: number | null;
  onClick: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
};

export function DreamItem({ id, date, finalized, rating, onClick, onDelete }: DreamListItemProps) {
  const color = finalized ? "inherit" : "warning";

  return (
    <StyledListItem
      onClick={() => onClick(id)}
      secondaryAction={
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
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
        {date
          .toZonedDateTimeISO(Temporal.Now.timeZoneId())
          .toPlainDate()
          .toLocaleString("de-DE", { dateStyle: "medium" })}
      </ListItemText>
      <Rating title="Bewertung" value={rating} readOnly size="small" sx={{ pr: 2, pl: 2 }} />
    </StyledListItem>
  );
}
