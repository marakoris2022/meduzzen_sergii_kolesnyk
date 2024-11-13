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
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ReplyIcon from "@mui/icons-material/Reply";
import styles from "./companyActions.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "./ActionModalBody";
import { useTranslations } from "next-intl";

enum ButtonColor {
  Primary = "primary",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

const CompanyActions = ({ companyData }: { companyData: CompanyIdProps }) => {
  const t = useTranslations("CompanyActions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionModalBody, setActionModalBody] = useState<null | JSX.Element>(
    null
  );
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

  const fetchCompanyMembers = useCallback(async () => {
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
      setRenderError(t("failedDataFetching"));
    }
  }, [companyData.company_id, companyData.company_owner.user_id]);

  useEffect(() => {
    fetchCompanyMembers();
  }, [fetchCompanyMembers]);

  if (renderError) return <h3>{renderError}</h3>;

  async function handleJoinToCompany(company_id: number) {
    setActionModalBody(
      <ActionModalBody
        callback={async () => await requestJoinToCompany(company_id)}
        onClose={() => setIsModalOpen(false)}
        actionName={t("joinCompany")}
        actionText={t("joinText")}
        triggerRenderUpdate={() => fetchCompanyMembers()}
      />
    );
    setIsModalOpen(true);
  }

  async function handleActions(actionType: string, action_id: number) {
    switch (actionType) {
      case "decline":
        setActionModalBody(
          <ActionModalBody
            callback={() => declineAction(action_id)}
            onClose={() => setIsModalOpen(false)}
            actionName={t("decline")}
            actionText={t("declineText")}
            triggerRenderUpdate={() => fetchCompanyMembers()}
          />
        );
        break;
      case "expel":
        setActionModalBody(
          <ActionModalBody
            callback={() => leaveCompany(action_id)}
            onClose={() => setIsModalOpen(false)}
            actionName={t("expel")}
            actionText={t("expelText")}
            triggerRenderUpdate={() => fetchCompanyMembers()}
          />
        );
        break;
      case "acceptRequest":
        setActionModalBody(
          <ActionModalBody
            callback={() => acceptRequest(action_id)}
            onClose={() => setIsModalOpen(false)}
            actionName={t("acceptRequest")}
            actionText={t("acceptText")}
            triggerRenderUpdate={() => fetchCompanyMembers()}
          />
        );
        break;
      case "block":
        setActionModalBody(
          <ActionModalBody
            callback={() => blockUser(action_id)}
            onClose={() => setIsModalOpen(false)}
            actionName={t("block")}
            actionText={t("blockText")}
            triggerRenderUpdate={() => fetchCompanyMembers()}
          />
        );
        break;
      case "cancelBlock":
        setActionModalBody(
          <ActionModalBody
            callback={() => unblockUser(action_id)}
            onClose={() => setIsModalOpen(false)}
            actionName={t("unblock")}
            actionText={t("unblockText")}
            triggerRenderUpdate={() => fetchCompanyMembers()}
          />
        );
        break;
    }
    setIsModalOpen(true);
  }

  type Action = {
    callback: () => void;
    color: ButtonColor;
    icon: JSX.Element;
  };

  function MemberBadge({
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

  return (
    <>
      <UniversalModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        {actionModalBody}
      </UniversalModal>
      {isOwner ? (
        <div className={styles.adminPanelWrapper}>
          <h3 className={styles.adminPanelTitle}>{t("adminPanel")}</h3>
          <p className={styles.infoText}>
            {t("membersTotal")}: {companyLists.members.length}
          </p>
          <ul>
            {companyLists.members.map((member) => (
              <MemberBadge
                key={member.user_id}
                member={member}
                actions={[
                  {
                    callback: () =>
                      router.push(`${PATHS.USERS}/${member.user_id}`),
                    color: ButtonColor.Primary,
                    icon: <OpenInNewIcon />,
                  },
                  {
                    callback: async () =>
                      await handleActions("expel", member.action_id),
                    color: ButtonColor.Warning,
                    icon: <MeetingRoomIcon />,
                  },
                  {
                    callback: async () =>
                      await handleActions("block", member.action_id),
                    color: ButtonColor.Error,
                    icon: <DoNotDisturbIcon />,
                  },
                ]}
              />
            ))}
          </ul>
          <p className={styles.infoText}>
            {t("invitesTotal")}: {companyLists.invites.length}
          </p>
          <ul>
            {companyLists.invites.map((member: UserItem & ActionProps) => (
              <MemberBadge
                key={member.user_id}
                member={member}
                actions={[
                  {
                    callback: () =>
                      router.push(`${PATHS.USERS}/${member.user_id}`),
                    color: ButtonColor.Primary,
                    icon: <OpenInNewIcon />,
                  },
                  {
                    callback: async () =>
                      await handleActions("decline", member.action_id),
                    color: ButtonColor.Warning,
                    icon: <ClearIcon />,
                  },
                ]}
              />
            ))}
          </ul>
          <p className={styles.infoText}>
            {t("requestsTotal")}: {companyLists.requests.length}
          </p>
          <ul>
            {companyLists.requests.map((member) => (
              <MemberBadge
                key={member.user_id}
                member={member}
                actions={[
                  {
                    callback: () =>
                      router.push(`${PATHS.USERS}/${member.user_id}`),
                    color: ButtonColor.Primary,
                    icon: <OpenInNewIcon />,
                  },
                  {
                    callback: async () =>
                      await handleActions("acceptRequest", member.action_id),
                    color: ButtonColor.Success,
                    icon: <DoneOutlineIcon />,
                  },
                  {
                    callback: async () =>
                      await handleActions("decline", member.action_id),
                    color: ButtonColor.Warning,
                    icon: <ClearIcon />,
                  },
                ]}
              />
            ))}
          </ul>
          <p className={styles.infoText}>
            {t("blockedTotal")}: {companyLists.blocked.length}
          </p>
          <ul>
            {companyLists.blocked.map((member) => (
              <>
                <MemberBadge
                  key={member.user_id}
                  member={member}
                  actions={[
                    {
                      callback: () =>
                        router.push(`${PATHS.USERS}/${member.user_id}`),
                      color: ButtonColor.Primary,
                      icon: <OpenInNewIcon />,
                    },
                    {
                      callback: async () =>
                        await handleActions("cancelBlock", member.action_id),
                      color: ButtonColor.Success,
                      icon: <ReplyIcon />,
                    },
                  ]}
                />
              </>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.joinBtnWrapper}>
          <Button
            onClick={async () =>
              await handleJoinToCompany(companyData.company_id)
            }
            color="success"
            variant="outlined"
          >
            {t("joinCompany")}
          </Button>
        </div>
      )}
    </>
  );
};

export default CompanyActions;
