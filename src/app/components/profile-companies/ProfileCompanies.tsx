import { useEffect, useState } from "react";
import styles from "./profileCompanies.module.css";
import { getCompanyListByUserId } from "@/services/axios-api-methods/axiosGet";
import { CompanyPropsInList } from "@/interface/interface";
import { AxiosError } from "axios";
import PageError from "../users-page-error/PageError";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Button } from "@mui/material";
import UniversalModal from "../universal-modal/UniversalModal";
import CreateCompanyBody from "../create-company-body/CreateCompanyBody";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import { useTranslations } from "next-intl";

const ProfileCompanies = ({ userId }: { userId: number }) => {
  const t = useTranslations("ProfileCompanies");
  const [isModal, setIsModal] = useState<boolean>(false);
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
      <div>
        {companies.length ? (
          <div>
            {companies.map((company) => {
              return <p key={company.company_id}>{company.company_name}</p>;
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
      </div>
    </>
  );
};

export default ProfileCompanies;
