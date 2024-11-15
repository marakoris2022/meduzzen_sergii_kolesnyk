import {
  ButtonColor,
  CompanyActionsModalProps,
  CompanyIdProps,
  PATHS,
} from "@/interface/interface";
import {
  acceptRequest,
  declineAction,
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
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  fetchCompanyMembers,
  fetchCompanyRequests,
} from "@/state/company-by-id/companyByIdSlice";

const CompanyRequestsList = ({
  companyData,
}: {
  companyData: CompanyIdProps;
}) => {
  const t = useTranslations("CompanyActions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { companyRequests, companyRequestsError } = useAppSelector(
    (state) => state.companyById
  );

  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);

  useEffect(() => {
    dispatch(fetchCompanyRequests(companyData.company_id));
  }, [companyData.company_id]);

  if (companyRequestsError) return <h3>{t("failedDataFetching")}</h3>;

  async function handleDecline(action_id: number) {
    setModalBodyData({
      callback: () => declineAction(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("decline"),
      actionText: t("declineText"),
      triggerRenderUpdate: async () => {
        await dispatch(fetchCompanyRequests(companyData.company_id));
      },
    });
    setIsModalOpen(true);
  }

  async function handleAcceptRequest(action_id: number) {
    setModalBodyData({
      callback: () => acceptRequest(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("acceptRequest"),
      actionText: t("acceptText"),
      triggerRenderUpdate: async () => {
        await dispatch(fetchCompanyRequests(companyData.company_id));
        await dispatch(fetchCompanyMembers(companyData.company_id));
      },
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
        {t("requestsTotal")}: {companyRequests.length}
      </p>
      <ul>
        {companyRequests.map((member) => (
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
