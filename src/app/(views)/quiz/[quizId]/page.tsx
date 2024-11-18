"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./quizGame.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import Loading from "@/app/components/loading/Loading";
import PageError from "@/app/components/users-page-error/PageError";
import { fetchQuizById } from "@/state/quiz-by-id/quizByIdSlice";
import { Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { takeQuizAnswers } from "@/services/axios-api-methods/axiosPost";

const QuizGamePage = () => {
  const { quizId } = useParams();
  const dispatch = useAppDispatch();
  const [fetchError, setFetchError] = useState<string>("");
  const { quiz, loading, error } = useAppSelector((state) => state.quizById);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});

  useEffect(() => {
    try {
      const id = Number(quizId);
      if (typeof id === "number" && !isNaN(id)) {
        dispatch(fetchQuizById(id));
      } else {
        throw new Error("Quiz id is wrong!");
      }
    } catch (error) {
      setFetchError((error as Error).message);
    }
  }, [dispatch, quizId]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    console.log("Selected answers:", answers);
    try {
      const id = Number(quizId);

      const quizResult = await takeQuizAnswers({ answers: answers }, id);

      console.log("quizResult:", quizResult);
    } catch (error) {
      console.log(error);
    }
  };

  if (error || fetchError)
    return <PageError errorTitle={fetchError || "Failed to get quiz."} />;

  if (!quiz || loading) return <Loading />;

  return (
    <div className={classNames("container", styles.pageWrapper)}>
      <h4 className={styles.quizTitle}>
        {quiz.quiz_name} {quiz.quiz_title && ` [${quiz.quiz_title}]`}
      </h4>
      <p className={styles.quizDescription}>{quiz.quiz_description}</p>
      <p className={styles.quizAuthor}>
        Created by: {quiz.created_by.user_firstname}
        {quiz.created_by.user_lastname} ({quiz.created_by.user_email})
      </p>

      <div className={styles.questionsWrapper}>
        {quiz.questions_list.map((question) => (
          <div key={question.question_id} className={styles.questionBlock}>
            <p className={styles.questionText}>{question.question_text}</p>
            <RadioGroup
              name={`question-${question.question_id}`}
              value={answers[question.question_id] || ""}
              onChange={(e) =>
                handleAnswerChange(question.question_id, e.target.value)
              }
            >
              {question.question_answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer}
                  control={<Radio />}
                  label={answer}
                />
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        Submit Answers
      </Button>
    </div>
  );
};

export default QuizGamePage;
