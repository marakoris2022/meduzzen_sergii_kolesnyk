import { useUserData } from "@/app/hooks/useUserData";
import {
  cityValidation,
  linksValidation,
  nameValidation,
  phoneValidation,
  statusValidation,
} from "@/constants/validationSchemas";
import { useAppDispatch } from "@/state/hooks";
import { Button, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./generalEditPanel.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { updateUserGeneralData } from "@/services/axios-api-methods/axiosPut";
import { setUserData } from "@/state/user/userSlice";

type BaseUserProps = {
  user_firstname: string;
  user_lastname: string;
  user_status: string;
  user_city: string;
  user_phone: string;
};

type EditGeneralFromProps = BaseUserProps & {
  user_links: string[];
};

type FormProps = BaseUserProps & {
  user_links: string;
};

type UpdateStatusType = {
  text: string;
  color: "green" | "red";
};

type ValidationProps = (t: (key: string) => string) => {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: string) => string | true;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
};

const updateStatusInit: UpdateStatusType = {
  text: "",
  color: "green",
};

const General = () => {
  const t = useTranslations("EditProfileGeneral");
  const dispatch = useAppDispatch();
  const { userData } = useUserData();
  const linksCount = useRef<number>(0);
  const [fieldList, setFieldList] = useState<
    Array<{ name: string; label: string; validation: ValidationProps }>
  >([]);
  const [updateStatus, setUpdateStatus] =
    useState<UpdateStatusType>(updateStatusInit);

  const {
    register,
    unregister,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      user_city: userData?.user_city,
      user_firstname: userData?.user_firstname,
      user_lastname: userData?.user_lastname,
      user_status: userData?.user_status,
      user_phone: userData?.user_phone,
    },
  });

  useEffect(() => {
    if (userData) {
      const initialFields = [
        {
          name: "user_firstname",
          label: t("fName"),
          validation: nameValidation,
        },
        {
          name: "user_lastname",
          label: t("lName"),
          validation: nameValidation,
        },
        {
          name: "user_status",
          label: t("status"),
          validation: statusValidation,
        },
        { name: "user_city", label: t("city"), validation: cityValidation },
        { name: "user_phone", label: t("phone"), validation: phoneValidation },
      ];

      userData.user_links.forEach((value, index) => {
        const linkFieldName = `user_links_${index + 1}`;
        initialFields.push({
          name: linkFieldName,
          label: t("links"),
          validation: linksValidation,
        });
        setValue(linkFieldName as keyof FormProps, value);
      });

      setFieldList(initialFields);
      linksCount.current = userData.user_links.length;
    }
  }, [userData, setValue, linksCount, t]);

  async function submit(data: FormProps) {
    const {
      user_city,
      user_firstname,
      user_lastname,
      user_phone,
      user_status,
    } = data;

    try {
      const linksArray = Object.entries(data).reduce<string[]>(
        (acc, currVal) => {
          if (currVal[0].includes("user_links")) acc.push(currVal[1]);
          return acc;
        },
        []
      );

      const requestData: EditGeneralFromProps = {
        user_city,
        user_firstname,
        user_lastname,
        user_phone,
        user_status,
        user_links: linksArray,
      };

      await updateUserGeneralData(requestData, userData!.user_id);
      dispatch(setUserData({ ...userData, ...requestData }));
      setUpdateStatus({ text: t("updated"), color: "green" });
    } catch {
      setUpdateStatus({ text: t("wrong"), color: "red" });
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
        name: `user_links_${linksCount.current}`,
        label: t("links"),
        validation: linksValidation,
      },
    ]);
  }

  function removeLinkField() {
    if (linksCount.current > 0) {
      linksCount.current -= 1;
      setFieldList((state) => {
        unregister(state[state.length - 1].name as keyof FormProps);
        state.length = state.length - 1;
        return [...state];
      });
    }
  }

  return userData ? (
    <form className={styles.formWrapper} onSubmit={handleSubmit(submit)}>
      {fieldList.map(({ name, label, validation }) => (
        <TextField
          key={name}
          error={!!errors[name as keyof FormProps]}
          {...register(name as keyof FormProps, validation(t))}
          label={label}
          helperText={errors[name as keyof FormProps]?.message || ""}
        />
      ))}

      <div className={styles.linksBtnWrapper}>
        <Button startIcon={<AddIcon />} size="small" onClick={addLinkField}>
          {t("social")}
        </Button>
        <Button
          startIcon={<RemoveIcon />}
          size="small"
          onClick={removeLinkField}
          color="warning"
        >
          {t("social")}
        </Button>
      </div>
      <p className={styles.updateText} style={{ color: updateStatus.color }}>
        {updateStatus.text}
      </p>
      <div className={styles.btnWrapper}>
        <Button type="submit" variant="outlined" color="success">
          {t("submit")}
        </Button>
        <Button onClick={handleReset} variant="outlined" color="warning">
          {t("clear")}
        </Button>
      </div>
    </form>
  ) : null;
};

export default General;
