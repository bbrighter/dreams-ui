import TextField from "@mui/material/TextField";

type DreamDescriptionProps = {
  description: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const DreamDescription = ({ description, onChange }: DreamDescriptionProps) => {
  return (
    <TextField
      sx={{
        width: "100%",
        marginTop: "1rem",
        height: "80%",
      }}
      label="Beschreibung"
      multiline
      minRows={5}
      maxRows={18}
      value={description}
      onChange={onChange}
    />
  );
};
