import { useEffect, useRef, useState } from "react";
import styles from "./profileCompanies.module.css";
import PageError from "../users-page-error/PageError";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Button } from "@mui/material";
import UniversalModal from "../universal-modal/UniversalModal";
import CreateCompanyBody from "../create-company-body/CreateCompanyBody";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import { useTranslations } from "next-intl";
import CompanyListCard from "../company-list-card/CompanyListCard";
import DeleteCompanyModalAction from "../delete-company-modal-action/DeleteCompanyModalAction";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditCompanyModalAction from "../edit-company-modal-action/EditCompanyModalAction";

const ProfileCompanies = ({ userId }: { userId: number }) => {
  const t = useTranslations("ProfileCompanies");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const activeCompanyId = useRef<null | number>(null);
  const { companies, error } = useAppSelector((state) => state.userCompanies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserCompanies(userId));
  }, [userId]);

  if (error) return <PageError errorTitle={t("cantFetch")} />;

  return (
    <>
      <UniversalModal open={isModal} handleClose={() => setIsModal(false)}>
        <CreateCompanyBody userId={userId} />
      </UniversalModal>

      <UniversalModal
        open={isModalDelete}
        title={t("deleteTitle")}
        description={t("deleteText")}
        handleClose={() => setIsModalDelete(false)}
      >
        <DeleteCompanyModalAction
          companyId={activeCompanyId.current}
          userId={userId}
          closeModal={async () => setIsModalDelete(false)}
        />
      </UniversalModal>

      <UniversalModal
        open={isModalEdit}
        handleClose={() => setIsModalEdit(false)}
      >
        <EditCompanyModalAction
          userId={userId}
          companyId={activeCompanyId.current}
        />
      </UniversalModal>

      {companies.length ? (
        <div className={styles.cardListWrapper}>
          {companies.map((company) => {
            return (
              <div
                key={company.company_id}
                className={styles.myCompanyCardWrapper}
              >
                <CompanyListCard company={company} />
                <div className={styles.myCompanyBtnWrapper}>
                  <Button
                    startIcon={<DeleteForeverIcon />}
                    variant="text"
                    color="error"
                    onClick={() => {
                      setIsModalDelete(true);
                      activeCompanyId.current = company.company_id;
                    }}
                  >
                    {t("delete")}
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
