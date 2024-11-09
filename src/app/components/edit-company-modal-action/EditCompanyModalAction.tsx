import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
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
} from "@/interface/interface";
import styles from "./editCompanyModalAction.module.css";
import { updateCompanyData } from "@/services/axios-api-methods/axiosPut";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import {
  linksValidation,
  nameValidation,
  phoneValidation,
  statusValidation,
} from "@/constants/validationSchemas";
import { useTranslations } from "next-intl";

type EditCompanyModalActionProps = {
  companyId: number | null;
  userId: number;
};

type FromFieldProps = Array<{
  name: string;
  label: string;
  validation: any;
}>;

const updateStatusInit: UpdateStatusType = {
  text: "",
  color: "green",
};

const EditCompanyModalAction = ({
  companyId,
  userId,
}: EditCompanyModalActionProps) => {
  const t = useTranslations("EditCompanyModalAction");
  const dispatch = useAppDispatch();
  const [companyData, setCompanyData] = useState<null | CompanyIdProps>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const linksCount = useRef<number>(0);
  const [updateStatus, setUpdateStatus] =
    useState<UpdateStatusType>(updateStatusInit);
  const [fieldList, setFieldList] = useState<FromFieldProps>([]);

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormCompanyProps>();

  useEffect(() => {
    if (companyId) {
      getCompanyById(companyId)
        .then((data) => {
          setCompanyData(data);

          const initialFields = [
            {
              name: "company_name",
              label: "Company Name",
              validation: nameValidation,
            },
            {
              name: "company_title",
              label: "Company Title",
              validation: nameValidation,
            },
            {
              name: "company_description",
              label: "Description",
              validation: statusValidation,
            },
            {
              name: "company_city",
              label: "City",
              validation: statusValidation,
            },
            {
              name: "company_phone",
              label: "Phone",
              validation: phoneValidation,
            },
          ];

          data.company_links?.forEach((value, index) => {
            const linkFieldName = `company_link_${index + 1}`;
            initialFields.push({
              name: linkFieldName,
              label: "Link",
              validation: linksValidation,
            });
            setValue(linkFieldName as keyof FormCompanyProps, value);
          });

          initialFields.forEach((field) => {
            const keyName = field.name as keyof BaseCompanyFormProps;
            setValue(keyName, data[keyName]);
          });

          setFieldList(initialFields);
          linksCount.current = data.company_links?.length || 0;
        })
        .catch((error) => setError(error as AxiosError));
    }
  }, [companyId, setValue]);

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

      await updateCompanyData(requestData, companyData!.company_id);
      dispatch(fetchUserCompanies(userId));
      setUpdateStatus({ text: "Data updated successfully!", color: "green" });
    } catch {
      setUpdateStatus({ text: "Failed to update data.", color: "red" });
    }
  }

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
        label: "Link",
        validation: { required: "This field is required" },
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

  if (error) {
    console.log(error);
    return <PageError errorTitle="Failed to fetch company data" />;
  }
  if (!companyData) return <Loading />;

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(submit)}>
      <p className={styles.descriptionTitle}>Base Description</p>
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
          Add Link
        </Button>
        <Button
          startIcon={<RemoveIcon />}
          size="small"
          onClick={removeLinkField}
          color="warning"
        >
          Remove Link
        </Button>
      </div>
      {updateStatus.text && (
        <p className={styles.updateText} style={{ color: updateStatus.color }}>
          {updateStatus.text}
        </p>
      )}
      <div className={styles.btnWrapper}>
        <Button type="submit" variant="outlined" color="success">
          Submit
        </Button>
        <Button onClick={handleReset} variant="outlined" color="warning">
          Clear
        </Button>
      </div>
    </form>
  );
};

export default EditCompanyModalAction;
