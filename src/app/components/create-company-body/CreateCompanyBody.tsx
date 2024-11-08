import { Button, TextField } from "@mui/material";
import { useState } from "react";
import CustomSwitch from "../custom-switch/CustomSwitch";
import styles from "./createCompanyBody.module.css";
import { createCompany } from "@/services/axios-api-methods/axiosPost";
import { UpdateStatusType } from "@/interface/interface";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import { useTranslations } from "next-intl";

function CreateCompanyBody({ userId }: { userId: number }) {
  const t = useTranslations("CreateCompanyBody");
  const [isVisible, setVisible] = useState<boolean>(true);
  const [companyName, setCompanyName] = useState<string>("");
  const [nameValidation, setNameValidation] = useState<string>("");
  const dispatch = useAppDispatch();
  const [noticeText, setNoticeText] = useState<UpdateStatusType>({
    text: t("newCompany"),
    color: "green",
  });

  async function handleSubmit() {
    if (companyName.length < 3 || companyName.length > 15) {
      setNameValidation(t("nameLength"));
      return;
    }
    try {
      await createCompany(companyName, !isVisible);
      dispatch(fetchUserCompanies(userId));
      setNoticeText({ text: t("create"), color: "green" });
    } catch {
      setNoticeText({ text: t("failed"), color: "red" });
    } finally {
      setCompanyName("");
      setNameValidation("");
    }
  }

  return (
    <div className={styles.wrapper}>
      <p style={{ color: noticeText.color }}>{noticeText.text}</p>
      <TextField
        className={styles.nameField}
        onChange={(e) => setCompanyName(e.target.value)}
        value={companyName}
        error={!!nameValidation}
        helperText={nameValidation}
        label={t("companyName")}
      />
      <div>
        <p>{t("visible")}</p>
        <CustomSwitch
          handleSwitch={() => setVisible((state) => !state)}
          isActive={isVisible}
        />
      </div>
      <Button
        className={styles.createBtn}
        onClick={handleSubmit}
        variant="outlined"
        color="success"
      >
        {t("createBtn")}
      </Button>
    </div>
  );
}

export default CreateCompanyBody;
