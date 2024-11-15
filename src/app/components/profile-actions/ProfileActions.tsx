import { useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./profileActions.module.css";
import {
  CompanyActionsModalProps,
  CompanyPropsInList,
  PATHS,
} from "@/interface/interface";
import {
  acceptInvite,
  declineAction,
  fetchInviteList,
  fetchRequestsList,
} from "@/services/axios-api-methods/axiosGet";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "../company-actions/ActionModalBody";
import PageError from "../users-page-error/PageError";
import { useTranslations } from "next-intl";

const ProfileActions = ({ userId }: { userId: number }) => {
  const t = useTranslations("ProfileActions");
  const [inviteList, setInviteList] = useState<CompanyPropsInList[]>([]);
  const [requestList, setRequestList] = useState<CompanyPropsInList[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);
  const router = useRouter();

  const fetchUserActions = async (userId: number) => {
    try {
      const fetchedInvites = await fetchInviteList(userId);
      const fetchedRequests = await fetchRequestsList(userId);
      setInviteList(fetchedInvites);
      setRequestList(fetchedRequests);
    } catch {
      setError(t("failedFetchActions"));
    }
  };

  useEffect(() => {
    fetchUserActions(userId);
  }, [userId]);

  async function handleDecline(actionId: number) {
    setModalBodyData({
      callback: async () => await declineAction(actionId),
      onClose: () => setIsModal(false),
      actionName: t("refuse"),
      actionText: t("refuseText"),
      triggerRenderUpdate: () => fetchUserActions(userId),
    });
    setIsModal(true);
  }

  async function handleAcceptInvite(actionId: number) {
    setModalBodyData({
      callback: () => acceptInvite(actionId),
      onClose: () => setIsModal(false),
      actionName: t("accept"),
      actionText: t("acceptText"),
      triggerRenderUpdate: () => fetchUserActions(userId),
    });
    setIsModal(true);
  }

  if (error) return <PageError errorTitle={error} />;

  return (
    <>
      <UniversalModal open={isModal} handleClose={() => setIsModal(false)}>
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
      <div className={styles.userActionsWrapper}>
        <div className={styles.actionsWrapper}>
          <h3>
            {t("youInvited")}: {inviteList.length} {t("times")}.
          </h3>
          {Boolean(!inviteList.length) && (
            <p className={styles.actionNotice}>{t("noInvites")}</p>
          )}
          {inviteList.map((company) => (
            <div className={styles.actions} key={company.company_id}>
              <p>{company.company_name}</p>
              <IconButton
                onClick={() =>
                  router.push(`${PATHS.USERS}/${company.company_id}`)
                }
                size="small"
                color="info"
              >
                <OpenInNewIcon />
              </IconButton>
              <IconButton
                onClick={() => handleAcceptInvite(company.action_id)}
                size="small"
                color="success"
              >
                <DoneOutlineIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDecline(company.action_id)}
                size="small"
                color="warning"
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
        </div>
        <div>
          <h3>
            {t("haveSent")}: {requestList.length} {t("requests")}.
          </h3>
          {requestList.length === 0 && (
            <p className={styles.actionNotice}>{t("noRequests")}</p>
          )}
          {requestList.map((company) => (
            <div className={styles.actions} key={company.company_id}>
              <p>{company.company_name}</p>
              <IconButton
                onClick={() =>
                  router.push(`${PATHS.COMPANIES}/${company.company_id}`)
                }
                size="small"
                color="info"
              >
                <OpenInNewIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDecline(company.action_id)}
                size="small"
                color="warning"
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileActions;
