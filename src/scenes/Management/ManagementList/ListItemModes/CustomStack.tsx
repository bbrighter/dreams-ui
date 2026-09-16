import Stack, { StackProps } from "@mui/material/Stack";

type CustomStackProps = {
  left: React.ReactNode;
  actions: React.ReactNode;
  spacing?: number;
} & StackProps;

export const CustomStack = ({ left, actions, spacing = 1, ...stackProps }: CustomStackProps) => {
  return (
    <Stack
      direction="row"
      sx={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}
      {...stackProps}
    >
      {left}
      <Stack direction="row" spacing={spacing}>
        {actions}
      </Stack>
    </Stack>
  );
};
