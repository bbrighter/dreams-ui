import Rating from "@mui/material/Rating";

export type DreamRatingProps = {
  rating: number | null;
  setRating: (v: number) => void;
  onSave: () => Promise<void>;
};

export default function DreamRating({ rating, setRating, onSave }: DreamRatingProps) {
  const onChange = (_: React.SyntheticEvent, v: number | null) => {
    console.log("MUI rating value:", v);
    if (v != null) {
      setRating(v);
      onSave();
    }
  };

  return <Rating title="Bewertung" value={rating} onChange={onChange} />;
}
