import {
  ActionProps,
  ButtonColor,
  CompanyActionsModalProps,
  CompanyIdProps,
  PATHS,
  UserItem,
} from "@/interface/interface";
import {
  getCompanyMembersList,
  leaveCompany,
  unblockUser,
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

const CompanyMembersList = ({
  companyData,
}: {
  companyData: CompanyIdProps;
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
      callback: () => unblockUser(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("unblock"),
      actionText: t("blockText"),
      triggerRenderUpdate: () => fetchCompanyMembers(companyData.company_id),
    });
    setIsModalOpen(true);
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
            actions={[
              {
                callback: () => router.push(`${PATHS.USERS}/${member.user_id}`),
                color: ButtonColor.Primary,
                icon: <OpenInNewIcon />,
              },
              {
                callback: async () => await handleExpel(member.action_id),
                color: ButtonColor.Warning,
                icon: <MeetingRoomIcon />,
              },
              {
                callback: async () => await handleBlockMember(member.action_id),
                color: ButtonColor.Error,
                icon: <DoNotDisturbIcon />,
              },
            ]}
          />
        ))}
      </ul>
    </>
  );
};

export default CompanyMembersList;
