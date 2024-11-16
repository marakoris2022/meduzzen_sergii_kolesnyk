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

const CreateQuizModalBody = () => {
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

  const onSubmit = (data: CreateQuizProps) => {
    console.log("Form Data:", data);
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <h3>Create Quiz Form</h3>
      <TextField
        label="Quiz name"
        {...register("quiz_name", { required: "Quiz name is required." })}
        fullWidth
        error={!!errors.quiz_name}
        helperText={errors.quiz_name ? errors.quiz_name.message : ""}
      />
      <TextField
        label="Quiz Frequency (days)"
        type="number"
        slotProps={{ htmlInput: { min: 1, max: 10 } }}
        {...register("quiz_frequency", {
          valueAsNumber: true,
        })}
        fullWidth
      />

      {fields.map((item, questionIndex) => (
        <AccordionCustom key={item.id} title={`Question ${questionIndex + 1}`}>
          <>
            <div className={styles.accordionWrapper}>
              <TextField
                label={`Question ${questionIndex + 1}`}
                {...register(`questions_list.${questionIndex}.question_text`, {
                  required: "Question is required.",
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

              {questions[questionIndex].answers.map((_, answer) => {
                return (
                  <TextField
                    key={answer}
                    label={`Answer Choice ${answer + 1}`}
                    {...register(
                      `questions_list.${questionIndex}.question_answers.${answer}`,
                      {
                        required: "Answer is required.",
                      }
                    )}
                    fullWidth
                  />
                );
              })}

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
                Add Answer
              </Button>

              <FormControl fullWidth>
                <InputLabel>Correct Answer</InputLabel>
                <Select
                  defaultValue={0}
                  label="Correct Answer"
                  {...register(
                    `questions_list.${questionIndex}.question_correct_answer`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                >
                  {questions[questionIndex].answers.map((_, index) => (
                    <MenuItem key={index} value={index}>
                      {index + 1}
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
                Remove Question
              </Button>
            </div>
          </>
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
        Add Question
      </Button>

      <Button color="success" type="submit" variant="outlined">
        Submit Quiz
      </Button>
    </form>
  );
};

export default CreateQuizModalBody;
