import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import PageError from "../users-page-error/PageError";
import CreateQuizForm from "./CreateQuizForm";
import styles from "./quizAdminPanel.module.css";
import DeleteQuizModal from "./DeleteQuizModal";
import { QuizItem } from "@/interface/interface";
import UpdateQuizModal from "./UpdateQuizModal";
import AddQuestionModal from "./AddQuestionModal";
import { useTranslations } from "next-intl";

const QuizAdminPanel = ({ companyId }: { companyId: number }) => {
  const t = useTranslations("QuizAdminPanel");
  const dispatch = useAppDispatch();
  const { quizList, loading, error } = useAppSelector((state) => state.quizzes);
  const [isCreateQuizModal, setIsCreateQuizModal] = useState<boolean>(false);
  const [isDeleteQuizModal, setIsDeleteQuizModal] = useState<boolean>(false);
  const [isUpdateQuizModal, setIsUpdateQuizModal] = useState<boolean>(false);
  const [isAddQuestionModal, setIsAddQuestionModal] = useState<boolean>(false);
  const [activeQuizData, setActiveQuizData] = useState<QuizItem | null>(null);

  useEffect(() => {
    if (!quizList.length) {
      dispatch(fetchQuizzesData(companyId));
    }
  }, [companyId, dispatch, quizList.length]);

  if (loading) return <Loading />;

  if (error) return <PageError errorTitle={t("fetchError")} />;

  return (
    <>
      <CreateQuizForm
        isOpen={isCreateQuizModal}
        handleCloseModal={() => setIsCreateQuizModal(false)}
        companyId={companyId}
      />

      <DeleteQuizModal
        isOpen={isDeleteQuizModal}
        handleCloseModal={() => setIsDeleteQuizModal(false)}
        quizData={activeQuizData}
        companyId={companyId}
      />

      <UpdateQuizModal
        isOpen={isUpdateQuizModal}
        handleCloseModal={() => setIsUpdateQuizModal(false)}
        quizData={activeQuizData}
        companyId={companyId}
      />

      <AddQuestionModal
        isOpen={isAddQuestionModal}
        handleCloseModal={() => setIsAddQuestionModal(false)}
        quizData={activeQuizData}
      />

      <div className={styles.createQuizWrapper}>
        <p className={styles.quizQuantity}>
          {t("quizCount", { count: quizList.length })}
        </p>
        {quizList.length > 0 && (
          <div>
            {quizList.map((quizItem) => {
              return (
                <div key={quizItem.quiz_id} className={styles.quizItemWrapper}>
                  <p>{quizItem.quiz_name}</p>
                  <div className={styles.quizBtnsWrapper}>
                    <Button
                      onClick={() => {
                        setIsAddQuestionModal(true);
                        setActiveQuizData(quizItem);
                      }}
                      color="success"
                      size="small"
                    >
                      {t("addQuestionButton")}
                    </Button>
                    <Button
                      onClick={() => {
                        setActiveQuizData(quizItem);
                        setIsUpdateQuizModal(true);
                      }}
                      color="warning"
                      size="small"
                    >
                      {t("updateQuizButton")}
                    </Button>
                    <Button
                      onClick={() => {
                        setActiveQuizData(quizItem);
                        setIsDeleteQuizModal(true);
                      }}
                      color="error"
                      size="small"
                    >
                      {t("deleteQuizButton")}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Button variant="outlined" onClick={() => setIsCreateQuizModal(true)}>
          {t("createQuizButton")}
        </Button>
      </div>
    </>
  );
};

export default QuizAdminPanel;
