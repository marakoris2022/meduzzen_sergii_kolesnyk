"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./quizGame.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import Loading from "@/app/components/loading/Loading";
import PageError from "@/app/components/users-page-error/PageError";
import { fetchQuizById } from "@/state/quiz-by-id/quizByIdSlice";
import { Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { takeQuizAnswers } from "@/services/axios-api-methods/axiosPost";
import UniversalModal from "@/app/components/universal-modal/UniversalModal";
import { useTranslations } from "next-intl";

const QuizGamePage = () => {
  const t = useTranslations("QuizGamePage");
  const { quizId } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [fetchError, setFetchError] = useState<string>("");
  const { quiz, loading, error } = useAppSelector((state) => state.quizById);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [errorText, setErrorText] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<number>(0);

  useEffect(() => {
    try {
      const id = Number(quizId);
      if (typeof id === "number" && !isNaN(id)) {
        dispatch(fetchQuizById(id));
      } else {
        throw new Error(t("fetchError"));
      }
    } catch (error) {
      setFetchError((error as Error).message);
    }
  }, [dispatch, quizId, t]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  if (error || fetchError)
    return <PageError errorTitle={fetchError || t("fetchFailed")} />;

  if (!quiz || loading) return <Loading />;

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quiz.questions_list.length) {
      setErrorText(t("errorSubmit"));
      return;
    }
    try {
      const id = Number(quizId);

      const { data } = await takeQuizAnswers({ answers }, id);

      setQuizResult(data.result.result_score);
      setErrorText("");
      setIsModal(true);
    } catch {
      setErrorText(t("errorGeneral"));
    }
  };

  return (
    <>
      <UniversalModal
        open={isModal}
        footerActions={
          <Button onClick={() => router.back()}>{t("buttonExit")}</Button>
        }
      >
        <div className={styles.modalWrapper}>
          <h3 className={styles.modalTitle}>{t("modalTitle")}</h3>
          <p className={styles.modalText}>
            {t("modalText")}
            {quizResult}/100.
          </p>
        </div>
      </UniversalModal>
      <div className={classNames("container", styles.pageWrapper)}>
        <h4 className={styles.quizTitle}>
          {quiz.quiz_name} {quiz.quiz_title && `[${quiz.quiz_title}]`}
        </h4>
        {quiz.quiz_description && (
          <p className={styles.quizDescription}>{quiz.quiz_description}</p>
        )}
        <p className={styles.quizAuthor}>
          {t("quizAuthor")} {quiz.created_by.user_firstname}
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
        {errorText && <p className={styles.errorText}>{errorText}</p>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          {t("buttonSubmit")}
        </Button>
      </div>
    </>
  );
};

export default QuizGamePage;
