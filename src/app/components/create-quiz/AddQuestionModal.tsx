import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "./addQuestionModal.module.css";
import { useTranslations } from "next-intl";
import { QuizItem } from "@/interface/interface";
import { addQuizQuestion } from "@/services/axios-api-methods/axiosPost";
import UniversalModal from "../universal-modal/UniversalModal";

type Props = {
  handleCloseModal: () => void;
  quizData: QuizItem | null;
  isOpen: boolean;
};

type QuestionsHookForm = {
  question_text: string;
  question_answers: {
    value: string;
  }[];
  question_correct_answer: number;
};

const AddQuestionModal = ({ handleCloseModal, quizData, isOpen }: Props) => {
  const t = useTranslations("AddQuestionModal");
  const [errorText, setErrorText] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionsHookForm>({
    defaultValues: {
      question_text: "",
      question_answers: [],
      question_correct_answer: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "question_answers",
  });

  if (!quizData) return null;

  const onSubmit = async (quizFormData: QuestionsHookForm) => {
    try {
      const question_answers = quizFormData.question_answers.reduce<string[]>(
        (acc, curAnswer) => {
          acc.push(curAnswer.value);
          return acc;
        },
        []
      );

      const requestData = { ...quizFormData, question_answers };

      await addQuizQuestion(requestData, quizData.quiz_id);
      handleCloseModal();
    } catch {
      setErrorText(t("submissionError"));
    }
  };

  return (
    <UniversalModal open={isOpen} handleClose={handleCloseModal}>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.formTitle}>{t("addQuestionFrom")}</h3>

        <TextField
          label={t("questionText")}
          {...register("question_text", {
            required: t("questionTextRequired"),
          })}
          fullWidth
          error={!!errors.question_text}
          helperText={errors.question_text ? errors.question_text.message : ""}
        />

        <div className={styles.answersWrapper}>
          <h4>{t("answersLabel")}</h4>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.answerRow}>
              <TextField
                label={`${t("answer")} ${index + 1}`}
                {...register(`question_answers.${index}.value`, {
                  required: t("answerRequired"),
                })}
                fullWidth
                error={!!errors.question_answers?.[index]}
                helperText={
                  errors.question_answers?.[index]
                    ? errors.question_answers[index]?.message
                    : ""
                }
              />
              <IconButton
                color="error"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Remove />
              </IconButton>
            </div>
          ))}
          <Button
            onClick={() => append({ value: "" })}
            variant="outlined"
            startIcon={<Add />}
          >
            {t("addAnswer")}
          </Button>
        </div>

        <TextField
          label={t("correctAnswerIndex")}
          type="number"
          {...register("question_correct_answer", {
            required: t("correctAnswerRequired"),
            valueAsNumber: true,
            validate: (value) =>
              value >= 0 && value < fields.length
                ? true
                : t("correctAnswerInvalid"),
          })}
          fullWidth
          error={!!errors.question_correct_answer}
          helperText={
            errors.question_correct_answer
              ? errors.question_correct_answer.message
              : ""
          }
        />

        {errorText && <p className={styles.errorText}>{errorText}</p>}

        <Button type="submit" variant="outlined" color="primary">
          {t("createQuizButton")}
        </Button>
      </form>
    </UniversalModal>
  );
};

export default AddQuestionModal;
