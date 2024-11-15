import {
  ActionProps,
  ButtonColor,
  CompanyActionsModalProps,
  CompanyIdProps,
  MemberBadgeAction,
  PATHS,
  UserItem,
} from "@/interface/interface";
import {
  blockUser,
  demoteFromAdmin,
  getCompanyMembersList,
  leaveCompany,
  promoteToAdmin,
} from "@/services/axios-api-methods/axiosGet";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import styles from "./companyActions.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "./ActionModalBody";
import { useTranslations } from "next-intl";
import ActionsMemberBadge from "./ActionsMemberBadge";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const CompanyMembersList = ({
  companyData,
  myStatus,
}: {
  companyData: CompanyIdProps;
  myStatus: string;
}) => {
  const t = useTranslations("CompanyActions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string>("");
  const [membersList, setMembersList] = useState<Array<UserItem & ActionProps>>(
    []
  );
  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);

  const fetchCompanyMembers = async (company_id: number) => {
    try {
      const members = await getCompanyMembersList(company_id);
      setMembersList(members);
    } catch {
      setRenderError(t("failedDataFetching"));
    }
  };

  useEffect(() => {
    fetchCompanyMembers(companyData.company_id);
  }, [companyData.company_id]);

  if (renderError) return <h3>{renderError}</h3>;

  async function handleExpel(action_id: number) {
    setModalBodyData({
      callback: () => leaveCompany(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("expel"),
      actionText: t("expelText"),
      triggerRenderUpdate: () => fetchCompanyMembers(companyData.company_id),
    });
    setIsModalOpen(true);
  }

  async function handleBlockMember(action_id: number) {
    setModalBodyData({
      callback: () => blockUser(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("block"),
      actionText: t("blockText"),
      triggerRenderUpdate: () => fetchCompanyMembers(companyData.company_id),
    });
    setIsModalOpen(true);
  }

  async function handlePromoteToAdmin(action_id: number) {
    setModalBodyData({
      callback: () => promoteToAdmin(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: "Promote",
      actionText: "Are you sure you want to promote this user to Admin?",
      triggerRenderUpdate: () => fetchCompanyMembers(companyData.company_id),
    });
    setIsModalOpen(true);
  }

  async function handleDemoteFromAdmin(action_id: number) {
    setModalBodyData({
      callback: () => demoteFromAdmin(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: "Demote",
      actionText: "Are you sure you want to demote this user to Member?",
      triggerRenderUpdate: () => fetchCompanyMembers(companyData.company_id),
    });
    setIsModalOpen(true);
  }

  function initActions(myStatus: string, member: UserItem & ActionProps) {
    const targetMemberStatus = member.action;

    const actionsOpenProfile = {
      callback: () => router.push(`${PATHS.USERS}/${member.user_id}`),
      color: ButtonColor.Primary,
      icon: <OpenInNewIcon />,
    };
    const actionsExpelMember = {
      callback: async () => await handleExpel(member.action_id),
      color: ButtonColor.Warning,
      icon: <MeetingRoomIcon />,
    };
    const actionsBlockMember = {
      callback: async () => await handleBlockMember(member.action_id),
      color: ButtonColor.Error,
      icon: <DoNotDisturbIcon />,
    };
    const actionsPromoteToAdmin = {
      callback: async () => await handlePromoteToAdmin(member.action_id),
      color: ButtonColor.Success,
      icon: <ArrowCircleUpIcon />,
    };
    const actionsDemoteFromAdmin = {
      callback: async () => await handleDemoteFromAdmin(member.action_id),
      color: ButtonColor.Warning,
      icon: <ArrowCircleDownIcon />,
    };

    let memberActions: MemberBadgeAction[] = [];

    if (myStatus === "owner") {
      if (targetMemberStatus === "owner")
        return (memberActions = [actionsOpenProfile]);

      memberActions = [
        actionsOpenProfile,
        actionsExpelMember,
        actionsBlockMember,
      ];

      if (targetMemberStatus === "member")
        memberActions.push(actionsPromoteToAdmin);
      if (targetMemberStatus === "admin")
        memberActions.push(actionsDemoteFromAdmin);
    }

    if (myStatus === "admin")
      memberActions = [actionsOpenProfile, actionsExpelMember];

    if (myStatus === "member")
      memberActions = [actionsOpenProfile, actionsExpelMember];

    return memberActions;
  }

  return (
    <>
      <UniversalModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        {modalBodyData && (
          <ActionModalBody
            callback={async () => await modalBodyData.callback()}
            onClose={() => modalBodyData.onClose()}
            actionName={modalBodyData.actionName}
            actionText={modalBodyData.actionText}
            triggerRenderUpdate={() => modalBodyData.triggerRenderUpdate()}
          />
        )}
      </UniversalModal>

      <p className={styles.infoText}>
        {t("membersTotal")}: {membersList.length}
      </p>
      <ul>
        {membersList.map((member) => (
          <ActionsMemberBadge
            key={member.user_id}
            member={member}
            actions={initActions(myStatus, member)}
          />
        ))}
      </ul>
    </>
  );
};

export default CompanyMembersList;
