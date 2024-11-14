import {
  ActionProps,
  ButtonColor,
  CompanyActionsModalProps,
  CompanyIdProps,
  PATHS,
  UserItem,
} from "@/interface/interface";
import {
  acceptRequest,
  declineAction,
  getCompanyRequestsList,
} from "@/services/axios-api-methods/axiosGet";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./companyActions.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "./ActionModalBody";
import { useTranslations } from "next-intl";
import ActionsMemberBadge from "./ActionsMemberBadge";

const CompanyRequestsList = ({
  companyData,
}: {
  companyData: CompanyIdProps;
}) => {
  const t = useTranslations("CompanyActions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [renderError, setRenderError] = useState<string>("");

  const [requestsList, setRequestsList] = useState<
    Array<UserItem & ActionProps>
  >([]);

  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);

  const fetchCompanyMembers = async (company_id: number) => {
    try {
      const requests = await getCompanyRequestsList(company_id);
      setRequestsList(requests);
    } catch {
      setRenderError(t("failedDataFetching"));
    }
  };

  useEffect(() => {
    fetchCompanyMembers(companyData.company_id);
  }, [companyData.company_id]);

  if (renderError) return <h3>{renderError}</h3>;

  async function handleDecline(action_id: number) {
    setModalBodyData({
      callback: () => declineAction(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("decline"),
      actionText: t("declineText"),
      triggerRenderUpdate: () => fetchCompanyMembers(companyData.company_id),
    });
    setIsModalOpen(true);
  }

  async function handleAcceptRequest(action_id: number) {
    setModalBodyData({
      callback: () => acceptRequest(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("acceptRequest"),
      actionText: t("acceptText"),
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
        {t("requestsTotal")}: {requestsList.length}
      </p>
      <ul>
        {requestsList.map((member) => (
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
                callback: async () =>
                  await handleAcceptRequest(member.action_id),
                color: ButtonColor.Success,
                icon: <DoneOutlineIcon />,
              },
              {
                callback: async () => await handleDecline(member.action_id),
                color: ButtonColor.Warning,
                icon: <ClearIcon />,
              },
            ]}
          />
        ))}
      </ul>
    </>
  );
};

export default CompanyRequestsList;
