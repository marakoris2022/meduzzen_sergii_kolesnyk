import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import AccordionCustom from "../accordion-custom/AccordionCustom";
import styles from "./createQuizForm.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CreateQuizProps } from "@/interface/interface";

export const QuestionInput = ({
  questionIndex,
  question,
  register,
  errors,
  setQuestions,
  removeQuestion,
}: {
  questionIndex: number;
  question: { answers: string[] };
  register: UseFormRegister<CreateQuizProps>;
  errors: FieldErrors<CreateQuizProps>;
  setQuestions: React.Dispatch<
    React.SetStateAction<Array<{ answers: string[] }>>
  >;
  removeQuestion: () => void;
}) => {
  const t = useTranslations("CreateQuizModalBody");

  return (
    <AccordionCustom title={`${t("question")} ${questionIndex + 1}`}>
      <div className={styles.accordionWrapper}>
        <TextField
          label={`${t("question")} ${questionIndex + 1}`}
          {...register(`questions_list.${questionIndex}.question_text`, {
            required: t("questionRequired"),
          })}
          fullWidth
          error={Boolean(
            errors?.questions_list?.[questionIndex]?.question_text
          )}
          helperText={
            errors?.questions_list?.[questionIndex]?.question_text?.message ||
            ""
          }
        />
        {question.answers.map((_, answerIndex) => (
          <TextField
            key={answerIndex}
            label={`${t("answerChoice")} ${answerIndex + 1}`}
            {...register(
              `questions_list.${questionIndex}.question_answers.${answerIndex}`,
              { required: t("answerRequired") }
            )}
            fullWidth
          />
        ))}
        <Button
          onClick={() => {
            setQuestions((prev) =>
              prev.map((q, i) =>
                i === questionIndex ? { ...q, answers: [...q.answers, ""] } : q
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
            {...register(
              `questions_list.${questionIndex}.question_correct_answer`,
              { valueAsNumber: true }
            )}
          >
            {question.answers.map((_, index) => (
              <MenuItem key={index} value={index}>
                {`${t("answer")} ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="error" onClick={removeQuestion}>
          {t("removeQuestion")}
        </Button>
      </div>
    </AccordionCustom>
  );
};
