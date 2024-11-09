import { Button } from "@mui/material";
import styles from "./deleteCompanyModalAction.module.css";
import { deleteCompany } from "@/services/axios-api-methods/axiosDelete";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import { useState } from "react";
import { useTranslations } from "next-intl";

type DeleteCompanyModalActionProps = {
  companyId: number | null;
  userId: number;
  closeModal: () => void;
};

function DeleteCompanyModalAction({
  companyId,
  userId,
  closeModal,
}: DeleteCompanyModalActionProps) {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const t = useTranslations("ProfileCompanies");

  async function handleDeleteCompany() {
    if (companyId) {
      try {
        await deleteCompany(companyId);
        dispatch(fetchUserCompanies(userId));
        closeModal();
      } catch {
        setError(t("delFailed"));
      }
    }
  }

  return (
    <div className={styles.btnWrapper}>
      <p className={styles.errorText}>{error}</p>
      <Button variant="outlined" color="error" onClick={handleDeleteCompany}>
        {t("delete2")}
      </Button>
    </div>
  );
}

export default DeleteCompanyModalAction;
