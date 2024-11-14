import { useEffect, useRef, useState } from "react";
import styles from "./profileCompanies.module.css";
import PageError from "../users-page-error/PageError";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Button } from "@mui/material";
import UniversalModal from "../universal-modal/UniversalModal";
import CreateCompanyForm from "../create-company-form/CreateCompanyForm";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import { useTranslations } from "next-intl";
import CompanyListCard from "../company-list-card/CompanyListCard";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditCompanyForm from "../edit-company-form/EditCompanyForm";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ConfirmCompanyDeletion from "../confirm-company-deletion/ConfirmCompanyDeletion";
import { leaveCompany } from "@/services/axios-api-methods/axiosGet";

const ProfileCompanies = ({ userId }: { userId: number }) => {
  const t = useTranslations("ProfileCompanies");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [isModalLeave, setIsModalLeave] = useState<boolean>(false);
  const [leaveError, setLeaveError] = useState<string>("");
  const activeCompanyId = useRef<number>(0);
  const activeCompanyActionId = useRef<number>(0);
  const { companies, error } = useAppSelector((state) => state.userCompanies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!companies.length) dispatch(fetchUserCompanies(userId));
  }, [userId, companies, dispatch]);

  if (error) return <PageError errorTitle={t("cantFetch")} />;

  async function handleLeaveCompany(actionId: number) {
    try {
      await leaveCompany(actionId);
      setIsModalLeave(false);
      dispatch(fetchUserCompanies(userId));
    } catch {
      setLeaveError(t("failToLeave"));
    }
  }

  return (
    <>
      <UniversalModal open={isModal} handleClose={() => setIsModal(false)}>
        <CreateCompanyForm userId={userId} />
      </UniversalModal>

      <UniversalModal
        open={isModalDelete}
        title={t("deleteTitle")}
        description={t("deleteText")}
        handleClose={() => setIsModalDelete(false)}
      >
        <ConfirmCompanyDeletion
          companyId={activeCompanyId.current}
          userId={userId}
          closeModal={async () => setIsModalDelete(false)}
        />
      </UniversalModal>

      <UniversalModal
        open={isModalEdit}
        handleClose={() => setIsModalEdit(false)}
      >
        <EditCompanyForm userId={userId} companyId={activeCompanyId.current} />
      </UniversalModal>

      <UniversalModal
        open={isModalLeave}
        handleClose={() => setIsModalLeave(false)}
      >
        <div className={styles.leaveModalWrapper}>
          <p>{t("leaveText")}</p>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleLeaveCompany(activeCompanyActionId.current);
            }}
          >
            {t("leaveConfirm")}
          </Button>
          {leaveError && <p className={styles.leaveError}>{leaveError}</p>}
        </div>
      </UniversalModal>

      {companies.length ? (
        <div className={styles.cardListWrapper}>
          {companies.map((company) => {
            return (
              <div
                key={company.company_id}
                className={styles.myCompanyCardWrapper}
              >
                <div className={styles.companyVisibleWrapper}>
                  {company.is_visible ? (
                    <VisibilityOutlinedIcon color="success" />
                  ) : (
                    <VisibilityOffOutlinedIcon color="warning" />
                  )}
                </div>
                <CompanyListCard company={company} />
                <div className={styles.myCompanyBtnWrapper}>
                  {company.action === "owner" ? (
                    <>
                      <Button
                        startIcon={<DeleteForeverIcon />}
                        variant="text"
                        color="error"
                        onClick={() => {
                          setIsModalDelete(true);
                          activeCompanyId.current = company.company_id;
                        }}
                      >
                        {t("deleteCompany")}
                      </Button>
                      <Button
                        endIcon={<SettingsOutlinedIcon />}
                        color="warning"
                        variant="outlined"
                        onClick={() => {
                          setIsModalEdit(true);
                          activeCompanyId.current = company.company_id;
                        }}
                      >
                        {t("edit")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      endIcon={<SettingsOutlinedIcon />}
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setIsModalLeave(true);
                        activeCompanyActionId.current = company.action_id;
                      }}
                    >
                      {t("leaveBtn")}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={styles.emptyListNotice}>{t("noCompanies")}</p>
      )}
      <div className={styles.crateBtnWrapper}>
        <Button
          startIcon={<PlaylistAddIcon />}
          variant="outlined"
          color="success"
          onClick={() => setIsModal(true)}
        >
          {t("add")}
        </Button>
      </div>
    </>
  );
};

export default ProfileCompanies;
