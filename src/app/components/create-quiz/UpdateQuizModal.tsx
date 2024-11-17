import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import styles from "./updateQuizModal.module.css";
import { ButtonColor, QuizItem, UpdateQuizProps } from "@/interface/interface";
import { useTranslations } from "next-intl";
import { updateQuizData } from "@/services/axios-api-methods/axiosPut";
import { useAppDispatch } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";

type Props = {
  quizData: QuizItem | null;
  handleClose: () => void;
  companyId: number;
};

const UpdateQuizModal = ({ quizData, handleClose, companyId }: Props) => {
  const t = useTranslations("UpdateQuizModal");
  const dispatch = useAppDispatch();
  const [errorText, setErrorText] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateQuizProps>({
    defaultValues: {
      quiz_name: quizData?.quiz_name || "",
      quiz_title: quizData?.quiz_title || "",
      quiz_description: quizData?.quiz_description || "",
      quiz_frequency: 1,
    },
  });

  if (!quizData) return null;

  const onSubmit = async (quizFormData: UpdateQuizProps) => {
    try {
      await updateQuizData(quizData.quiz_id, quizFormData);
      await dispatch(fetchQuizzesData(companyId));
      handleClose();
    } catch {
      setErrorText(t("submissionError"));
    }
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formTitle}>{t("createQuizForm")}</h3>

      <TextField
        label={t("quizName")}
        {...register("quiz_name", { required: t("quizNameRequired") })}
        fullWidth
        error={!!errors.quiz_name}
        helperText={errors.quiz_name ? errors.quiz_name.message : ""}
      />

      <TextField
        label={t("quizTitle")}
        {...register("quiz_title", { required: t("quizTitleRequired") })}
        fullWidth
        error={!!errors.quiz_title}
        helperText={errors.quiz_title ? errors.quiz_title.message : ""}
      />

      <TextField
        label={t("quizDescription")}
        {...register("quiz_description", {
          required: t("quizDescriptionRequired"),
        })}
        fullWidth
        multiline
        minRows={3}
        error={!!errors.quiz_description}
        helperText={
          errors.quiz_description ? errors.quiz_description.message : ""
        }
      />

      <TextField
        label={t("quizFrequency")}
        type="number"
        slotProps={{ htmlInput: { min: 1, max: 10 } }}
        {...register("quiz_frequency", {
          required: t("quizFrequencyRequired"),
          valueAsNumber: true,
          min: { value: 1, message: t("quizFrequencyMinError") },
        })}
        fullWidth
        error={!!errors.quiz_frequency}
        helperText={errors.quiz_frequency ? errors.quiz_frequency.message : ""}
      />

      {errorText && <p className={styles.errorText}>{errorText}</p>}

      <div className={styles.buttons}>
        <Button type="submit" variant="outlined" color={ButtonColor.Success}>
          {t("updateQuizButton")}
        </Button>
      </div>
    </form>
  );
};

export default UpdateQuizModal;
