import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, styled, TextField } from "@mui/material";
import { AxiosError } from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PageError from "../users-page-error/PageError";
import Loading from "../loading/Loading";
import { getCompanyById } from "@/services/axios-api-methods/axiosGet";
import {
  BaseCompanyFormProps,
  CompanyIdProps,
  FormCompanyProps,
  RequestCompanyProps,
  UpdateStatusType,
  ValidationProps,
} from "@/interface/interface";
import styles from "./editCompanyForm.module.css";
import {
  updateCompanyAvatar,
  updateCompanyData,
  updateCompanyVisible,
} from "@/services/axios-api-methods/axiosPut";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import {
  accepterFileTypes,
  linksValidation,
  nameValidation,
  phoneValidation,
  statusValidation,
  validateFile,
} from "@/constants/validationSchemas";
import { useTranslations } from "next-intl";
import CustomSwitch from "../custom-switch/CustomSwitch";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

type FromFieldProps = Array<{
  name: string;
  label: string;
  validation: ValidationProps;
}>;

const updateStatusInit: UpdateStatusType = {
  text: "",
  color: "green",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Props = {
  companyId: number;
  userId: number;
};

const EditCompanyForm = ({ companyId, userId }: Props) => {
  const t = useTranslations("EditCompanyForm");
  const dispatch = useAppDispatch();
  const [companyData, setCompanyData] = useState<null | CompanyIdProps>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const linksCount = useRef<number>(0);
  const [updateStatus, setUpdateStatus] =
    useState<UpdateStatusType>(updateStatusInit);
  const [fieldList, setFieldList] = useState<FromFieldProps>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [avatarError, setAvatarError] = useState<string>("");

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormCompanyProps>();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const isValidationFailed = validateFile(e.target.files[0], t);

      if (isValidationFailed) {
        setAvatarError(isValidationFailed);
        return;
      }

      const file = e.target.files[0];

      setSelectedFile(file);
      setAvatarError("");
    }
  }

  async function handleSubmitAvatar() {
    if (selectedFile) {
      try {
        await updateCompanyAvatar(selectedFile, companyId);
        dispatch(fetchUserCompanies(userId));
        setSelectedFile(null);
        setAvatarError("");
        setUpdateStatus({
          text: t("avatarSelected"),
          color: "green",
        });
      } catch (error) {
        setAvatarError((error as AxiosError).message);
      }
    } else setAvatarError(t("choose"));
  }

  async function submit(data: FormCompanyProps) {
    const {
      company_name,
      company_title,
      company_description,
      company_city,
      company_phone,
    } = data;

    try {
      const linksArray = Object.entries(data).reduce<string[]>(
        (acc, [key, value]) => {
          if (key.includes("company_link")) acc.push(value as string);
          return acc;
        },
        []
      );

      const requestData: RequestCompanyProps = {
        company_name,
        company_title,
        company_description,
        company_city,
        company_phone,
        company_links: linksArray,
      };

      await updateCompanyData(companyData!.company_id, requestData);
      await updateCompanyVisible(companyData!.company_id, !isVisible);
      dispatch(fetchUserCompanies(userId));
      setUpdateStatus({ text: t("dataUpdated"), color: "green" });
    } catch {
      setUpdateStatus({ text: t("updateFailed"), color: "red" });
    }
  }

  const fetchAndSetCompanyData = useCallback(async () => {
    try {
      const fetchedCompanyData = await getCompanyById(companyId);
      setCompanyData(fetchedCompanyData);

      const initialFields = [
        {
          name: "company_name",
          label: t("companyName"),
          validation: nameValidation,
        },
        {
          name: "company_title",
          label: t("companyTitle"),
          validation: nameValidation,
        },
        {
          name: "company_description",
          label: t("description"),
          validation: statusValidation,
        },
        {
          name: "company_city",
          label: t("city"),
          validation: statusValidation,
        },
        {
          name: "company_phone",
          label: t("phone"),
          validation: phoneValidation,
        },
      ];

      const linkFields =
        fetchedCompanyData.company_links?.map((_, index) => ({
          name: `company_link_${index + 1}`,
          label: t("link"),
          validation: linksValidation,
        })) || [];

      setFieldList([...initialFields, ...linkFields]);
      linksCount.current = fetchedCompanyData.company_links?.length || 0;

      initialFields.forEach((field) => {
        const keyName = field.name as keyof BaseCompanyFormProps;
        setValue(keyName, fetchedCompanyData[keyName]);
      });

      fetchedCompanyData.company_links?.forEach((value, index) => {
        const linkFieldName = `company_link_${index + 1}`;
        setValue(linkFieldName as keyof FormCompanyProps, value);
      });
    } catch (error) {
      setError(error as AxiosError);
    }
  }, [companyId, setValue, t]);

  useEffect(() => {
    fetchAndSetCompanyData();
  }, [fetchAndSetCompanyData]);

  function handleReset() {
    clearErrors();
    reset();
    setUpdateStatus({ ...updateStatus, text: "" });
  }

  function addLinkField() {
    linksCount.current += 1;
    setFieldList((state) => [
      ...state,
      {
        name: `company_link_${linksCount.current}`,
        label: t("link"),
        validation: linksValidation,
      },
    ]);
  }

  function removeLinkField() {
    if (linksCount.current > 0) {
      linksCount.current -= 1;
      setFieldList((state) => {
        unregister(state[state.length - 1].name as keyof FormCompanyProps);
        return state.slice(0, -1);
      });
    }
  }

  if (error) return <PageError errorTitle={t("fetchFailed")} />;

  if (!companyData) return <Loading />;

  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.generalBLockWrapper}
        onSubmit={handleSubmit(submit)}
      >
        <p className={styles.descriptionTitle}>{t("baseDescription")}</p>
        {fieldList.map(({ name, label, validation }) => (
          <TextField
            fullWidth
            key={name}
            error={!!errors[name as keyof FormCompanyProps]}
            {...register(name as keyof FormCompanyProps, validation(t))}
            label={label}
            helperText={errors[name as keyof FormCompanyProps]?.message || ""}
          />
        ))}
        <div className={styles.linksBtnWrapper}>
          <Button startIcon={<AddIcon />} size="small" onClick={addLinkField}>
            {t("add")}
          </Button>
          <Button
            startIcon={<RemoveIcon />}
            size="small"
            onClick={removeLinkField}
            color="warning"
          >
            {t("remove")}
          </Button>
        </div>
        {updateStatus.text && (
          <p
            className={styles.updateText}
            style={{ color: updateStatus.color }}
          >
            {updateStatus.text}
          </p>
        )}
        <p className={styles.descriptionTitle}>{t("visible")}</p>
        <div className={styles.switchWrapper}>
          <CustomSwitch
            handleSwitch={() => setIsVisible((state) => !state)}
            isActive={isVisible}
          />
        </div>
        <div className={styles.btnWrapper}>
          <Button type="submit" variant="outlined" color="success">
            {t("submit2")}
          </Button>
          <Button onClick={handleReset} variant="outlined" color="warning">
            {t("clear")}
          </Button>
        </div>
      </form>
      <p className={styles.descriptionTitle}>{t("changeAvatar")}</p>

      {selectedFile && (
        <p>
          {t("fileSelected")}
          {selectedFile.name}
        </p>
      )}

      {avatarError && <p className={styles.avatarErrorText}>{avatarError}</p>}

      <div className={styles.avatarBtnWrapper}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AccountBoxIcon />}
        >
          {t("select")}
          <VisuallyHiddenInput
            type="file"
            accept={accepterFileTypes}
            onChange={handleFileChange}
          />
        </Button>
        <Button onClick={handleSubmitAvatar} variant="outlined" color="success">
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default EditCompanyForm;
