import { ActionProps, ButtonColor, UserItem } from "@/interface/interface";
import { IconButton } from "@mui/material";

export type Action = {
  callback: () => void;
  color: ButtonColor;
  icon: JSX.Element;
};

function ActionsMemberBadge({
  member,
  actions,
}: {
  member: UserItem & ActionProps;
  actions: Action[];
}) {
  return (
    <li>
      <span>{member.user_email}</span>
      <span> ({member.action})</span>
      {actions.map((action) => (
        <IconButton
          key={action.color}
          onClick={action.callback}
          size="small"
          color={action.color}
        >
          {action.icon}
        </IconButton>
      ))}
    </li>
  );
}

export default ActionsMemberBadge;
