import AppBar from "@mui/material/AppBar";
import ButtonGroup from "@mui/material/ButtonGroup";
import Toolbar from "@mui/material/Toolbar";

export function Bar(props: {
  mainAction: React.ReactNode;
  secondaryAction?: Array<React.ReactNode>;
  optionalMiddleAction?: React.ReactNode;
  position: "top" | "bottom";
  showAuth?: boolean;
}) {
  let SecondaryActions = [<div key={0}></div>] as Array<React.ReactNode>;
  if (props.secondaryAction) {
    SecondaryActions = props.secondaryAction.map((v, i) => <div key={i}>{v}</div>);
  }

  const isTop = props.position == "top";

  return (
    <AppBar
      position="sticky"
      sx={{
        top: isTop ? 0 : "unset",
        bottom: isTop ? "unset" : 0,
      }}
      data-testid={`app-bar-${props.position}`}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {props.mainAction}
        {props.optionalMiddleAction}
        <ButtonGroup variant="outlined">{SecondaryActions}</ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
