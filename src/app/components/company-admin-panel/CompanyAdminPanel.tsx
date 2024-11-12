import {
  ActionProps,
  CompanyIdProps,
  PATHS,
  UserItem,
} from "@/interface/interface";
import {
  acceptRequest,
  blockUser,
  declineAction,
  getCompanyBlockedList,
  getCompanyInvitesList,
  getCompanyMembersList,
  getCompanyRequestsList,
  getMe,
  leaveCompany,
  requestJoinToCompany,
  unblockUser,
} from "@/services/axios-api-methods/axiosGet";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ReplyIcon from "@mui/icons-material/Reply";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./companyAdminPanel.module.css";

const CompanyAdminPanel = ({
  companyData,
}: {
  companyData: CompanyIdProps;
}) => {
  const router = useRouter();

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string>("");
  const [companyLists, setCompanyLists] = useState<{
    members: Array<UserItem & ActionProps>;
    invites: Array<UserItem & ActionProps>;
    requests: Array<UserItem & ActionProps>;
    blocked: Array<UserItem & ActionProps>;
  }>({
    members: [],
    invites: [],
    requests: [],
    blocked: [],
  });

  const fetchCurrentUserAndCompanyMembers = useCallback(async () => {
    try {
      const user = await getMe();

      if (user.user_id === companyData.company_owner.user_id) {
        const [members, invites, requests, blocked] = await Promise.all([
          getCompanyMembersList(companyData.company_id),
          getCompanyInvitesList(companyData.company_id),
          getCompanyRequestsList(companyData.company_id),
          getCompanyBlockedList(companyData.company_id),
        ]);

        setCompanyLists({ members, invites, requests, blocked });
        setIsOwner(true);
      }
    } catch {
      setRenderError("Admin panel is broken!");
    }
  }, [companyData.company_id, companyData.company_owner.user_id]);

  useEffect(() => {
    fetchCurrentUserAndCompanyMembers();
  }, [fetchCurrentUserAndCompanyMembers]);

  if (renderError) return <h3>{renderError}</h3>;

  async function handleAction(actionType: string, action_id: number) {
    try {
      switch (actionType) {
        case "decline":
          await declineAction(action_id);
          break;
        case "acceptRequest":
          await acceptRequest(action_id);
          break;
        case "leave":
          await leaveCompany(action_id);
          break;
        case "block":
          await blockUser(action_id);
          break;
        case "cancelBlock":
          await unblockUser(action_id);
          break;
      }
      await fetchCurrentUserAndCompanyMembers();
    } catch (error) {
      console.log(error);
    }
  }

  function MemberBadge({
    member,
    actions: { callback, color },
  }: {
    member: UserItem & ActionProps;
    actions: { callback: () => void; color: string }[];
  }) {
    return (
      <li key={member.user_id}>
        <span>{member.user_email}</span>
        <span> ({member.action})</span>
        <IconButton
          onClick={() => router.push(`${PATHS.USERS}/${member.user_id}`)}
          size="small"
          color="primary"
        >
          <OpenInNewIcon />
        </IconButton>
      </li>
    );
  }

  return isOwner ? (
    <div>
      <h3>Company Admin Panel</h3>
      <p>Members Total: {companyLists.members.length}</p>
      <ul>
        {companyLists.members.map((member) => (
          <>
            <MemberBadge key={member.user_id} member={member} />
            <IconButton
              onClick={async () =>
                await handleAction("leave", member.action_id)
              }
              size="small"
              color="warning"
            >
              <MeetingRoomIcon />
            </IconButton>
            <IconButton
              onClick={async () =>
                await handleAction("block", member.action_id)
              }
              size="small"
              color="error"
            >
              <DoNotDisturbIcon />
            </IconButton>
          </>
        ))}
      </ul>
      <p>Invites Total: {companyLists.invites.length}</p>
      <ul>
        {companyLists.invites.map((member: UserItem & ActionProps) => (
          <>
            <MemberBadge key={member.user_id} member={member} />
            <IconButton
              onClick={async () =>
                await handleAction("decline", member.action_id)
              }
              size="small"
              color="warning"
            >
              <ClearIcon />
            </IconButton>
          </>
        ))}
      </ul>
      <p>Requests Total: {companyLists.requests.length}</p>
      <ul>
        {companyLists.requests.map((member) => (
          <>
            <MemberBadge key={member.user_id} member={member} />
            <IconButton
              onClick={async () =>
                await handleAction("acceptRequest", member.action_id)
              }
              size="small"
              color="success"
            >
              <DoneOutlineIcon />
            </IconButton>
            <IconButton
              onClick={async () =>
                await handleAction("decline", member.action_id)
              }
              size="small"
              color="warning"
            >
              <ClearIcon />
            </IconButton>
          </>
        ))}
      </ul>
      <p>Blocked Total: {companyLists.blocked.length}</p>
      <ul>
        {companyLists.blocked.map((member) => (
          <>
            <MemberBadge key={member.user_id} member={member} />
            <IconButton
              onClick={async () =>
                await handleAction("cancelBlock", member.action_id)
              }
              size="small"
              color="success"
            >
              <ReplyIcon />
            </IconButton>
          </>
        ))}
      </ul>
    </div>
  ) : (
    <div className={styles.joinBtnWrapper}>
      <Button
        onClick={async () => await requestJoinToCompany(companyData.company_id)}
        color="success"
        variant="outlined"
      >
        Join Company
      </Button>
    </div>
  );
};

export default CompanyAdminPanel;
