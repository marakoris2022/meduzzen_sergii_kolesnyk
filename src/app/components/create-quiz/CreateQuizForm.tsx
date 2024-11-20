import { useForm, useFieldArray } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import styles from "./createQuizForm.module.css";
import { CreateQuizProps } from "@/interface/interface";
import { useTranslations } from "next-intl";
import { createQuiz } from "@/services/axios-api-methods/axiosPost";
import { useAppDispatch } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import UniversalModal from "../universal-modal/UniversalModal";
import { QuestionInput } from "./QuestionInput";
import { useState } from "react";

const minQuestionsQuantity = 2;
const minAnswersQuantity = 2;

const CreateQuizModalBody = ({
  handleCloseModal,
  companyId,
  isOpen,
}: {
  handleCloseModal: () => void;
  companyId: number;
  isOpen: boolean;
}) => {
  const t = useTranslations("CreateQuizModalBody");
  const dispatch = useAppDispatch();
  const [submitError, setSubmitError] = useState<string>("");
  const [questions, setQuestions] = useState<Array<{ answers: string[] }>>([
    { answers: [""] },
  ]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuizProps>({
    defaultValues: {
      quiz_name: "",
      quiz_frequency: 1,
      questions_list: [
        {
          question_text: "",
          question_answers: [""],
          question_correct_answer: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions_list",
  });

  const onSubmit = async (formData: CreateQuizProps) => {
    if (formData.questions_list.length < minQuestionsQuantity) {
      setSubmitError(
        `${t("minimumQuestionsPart1")} ${minQuestionsQuantity} ${t(
          "minimumQuestionsPart2"
        )}`
      );
      return;
    }

    for (const question of formData.questions_list) {
      if (question.question_answers.length < minAnswersQuantity) {
        setSubmitError(
          `${t("minimumAnswersPart1")} ${minAnswersQuantity} ${t(
            "minimumAnswersPart2"
          )}`
        );
        return;
      }
    }

    try {
      await createQuiz(formData, companyId);
      setSubmitError("");
      await dispatch(fetchQuizzesData(companyId));
      handleCloseModal();
    } catch {
      setSubmitError(t("submissionFailed"));
    }
  };

  function handleRemoveQuestion(questionIndex: number) {
    remove(questionIndex);
    setQuestions((prev) => prev.filter((_, i) => i !== questionIndex));
  }

  return (
    <UniversalModal open={isOpen} handleClose={handleCloseModal}>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <h3>{t("createQuizForm")}</h3>
        <TextField
          label={t("quizName")}
          {...register("quiz_name", { required: t("quizNameRequired") })}
          fullWidth
          error={!!errors.quiz_name}
          helperText={errors.quiz_name?.message || ""}
        />
        <TextField
          label={t("quizFrequency")}
          type="number"
          {...register("quiz_frequency", { valueAsNumber: true })}
          fullWidth
        />
        {fields.map((item, questionIndex) => (
          <QuestionInput
            key={item.id}
            questionIndex={questionIndex}
            question={questions[questionIndex]}
            register={register}
            errors={errors}
            setQuestions={setQuestions}
            removeQuestion={() => handleRemoveQuestion(questionIndex)}
          />
        ))}
        <Button
          variant="text"
          onClick={() => {
            append({
              question_text: "",
              question_answers: [""],
              question_correct_answer: 0,
            });
            setQuestions((state) => [...state, { answers: [""] }]);
          }}
        >
          {t("addQuestion")}
        </Button>
        {submitError && <p className={styles.submitError}>{submitError}</p>}
        <Button color="success" type="submit">
          {t("submitQuiz")}
        </Button>
        <Button onClick={() => reset()}>{t("resetBtn")}</Button>
      </form>
    </UniversalModal>
  );
};

export default CreateQuizModalBody;
