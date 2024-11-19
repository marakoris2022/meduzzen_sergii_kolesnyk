import { useForm, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import styles from "./createQuizForm.module.css";
import AccordionCustom from "../accordion-custom/AccordionCustom";
import { useState } from "react";
import { CreateQuizProps } from "@/interface/interface";
import { useTranslations } from "next-intl";
import { createQuiz } from "@/services/axios-api-methods/axiosPost";
import { useAppDispatch } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import UniversalModal from "../universal-modal/UniversalModal";

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

    for (let i = 0; i < formData.questions_list.length; i++) {
      if (
        formData.questions_list[i].question_answers.length < minAnswersQuantity
      ) {
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

  return (
    <UniversalModal open={isOpen} handleClose={handleCloseModal}>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <h3>{t("createQuizForm")}</h3>
        <TextField
          label={t("quizName")}
          {...register("quiz_name", { required: t("quizNameRequired") })}
          fullWidth
          error={!!errors.quiz_name}
          helperText={errors.quiz_name ? errors.quiz_name.message : ""}
        />

        <TextField
          label={t("quizFrequency")}
          type="number"
          slotProps={{ htmlInput: { min: 1, max: 10 } }}
          {...register("quiz_frequency", {
            valueAsNumber: true,
          })}
          fullWidth
        />

        {fields.map((item, questionIndex) => (
          <AccordionCustom
            key={item.id}
            title={`${t("question")} ${questionIndex + 1}`}
          >
            <div className={styles.accordionWrapper}>
              <TextField
                label={`${t("question")} ${questionIndex + 1}`}
                {...register(`questions_list.${questionIndex}.question_text`, {
                  required: t("questionRequired"),
                })}
                fullWidth
                error={
                  errors.questions_list
                    ? Boolean(errors.questions_list[questionIndex])
                    : false
                }
                helperText={
                  errors.questions_list
                    ? errors.questions_list[questionIndex]?.message
                    : ""
                }
              />

              {questions[questionIndex].answers.map((_, answer) => (
                <TextField
                  key={answer}
                  label={`${t("answerChoice")} ${answer + 1}`}
                  {...register(
                    `questions_list.${questionIndex}.question_answers.${answer}`,
                    {
                      required: t("answerRequired"),
                    }
                  )}
                  fullWidth
                />
              ))}

              <Button
                onClick={() => {
                  setQuestions((prevState) =>
                    prevState.map((question, index) =>
                      index === questionIndex
                        ? { ...question, answers: [...question.answers, ""] }
                        : question
                    )
                  );
                }}
              >
                {t("addAnswer")}
              </Button>

              <FormControl fullWidth>
                <InputLabel>{t("correctAnswer")}</InputLabel>
                <Select
                  defaultValue={0}
                  label={t("correctAnswer")}
                  {...register(
                    `questions_list.${questionIndex}.question_correct_answer`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                >
                  {questions[questionIndex].answers.map((_, index) => (
                    <MenuItem key={index} value={index}>
                      {`${t("answer")} ${index + 1}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  remove(questionIndex);
                  setQuestions((prevQuestions) =>
                    prevQuestions.filter((_, index) => index !== questionIndex)
                  );
                }}
              >
                {t("removeQuestion")}
              </Button>
            </div>
          </AccordionCustom>
        ))}

        <Button
          variant="text"
          color="warning"
          onClick={() => {
            setQuestions((state) => [...state, { answers: [""] }]);
            append({
              question_text: "",
              question_answers: [""],
              question_correct_answer: 0,
            });
          }}
        >
          {t("addQuestion")}
        </Button>

        {submitError && <p className={styles.submitError}>{submitError}</p>}

        <Button color="success" type="submit" variant="outlined">
          {t("submitQuiz")}
        </Button>
      </form>
    </UniversalModal>
  );
};

export default CreateQuizModalBody;
