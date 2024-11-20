import {
  ActionProps,
  MemberBadgeAction,
  UserItem,
} from "@/interface/interface";
import { IconButton } from "@mui/material";

function ActionsMemberBadge({
  member,
  actions,
}: {
  member: UserItem & ActionProps;
  actions: MemberBadgeAction[];
}) {
  return (
    <li>
      <span>{member.user_email}</span>
      <span> ({member.action})</span>
      {actions.map((action, index) => (
        <IconButton
          key={index}
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
