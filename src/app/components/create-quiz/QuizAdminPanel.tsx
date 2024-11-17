import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import PageError from "../users-page-error/PageError";
import UniversalModal from "../universal-modal/UniversalModal";
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
      <UniversalModal
        open={isCreateQuizModal}
        handleClose={() => setIsCreateQuizModal(false)}
      >
        <CreateQuizForm
          handleCloseModal={() => setIsCreateQuizModal(false)}
          companyId={companyId}
        />
      </UniversalModal>

      <UniversalModal
        open={isDeleteQuizModal}
        handleClose={() => setIsDeleteQuizModal(false)}
      >
        <DeleteQuizModal
          handleClose={() => setIsDeleteQuizModal(false)}
          quizData={activeQuizData}
          companyId={companyId}
        />
      </UniversalModal>

      <UniversalModal
        open={isUpdateQuizModal}
        handleClose={() => setIsUpdateQuizModal(false)}
      >
        <UpdateQuizModal
          handleClose={() => setIsUpdateQuizModal(false)}
          quizData={activeQuizData}
          companyId={companyId}
        />
      </UniversalModal>

      <UniversalModal
        open={isAddQuestionModal}
        handleClose={() => setIsAddQuestionModal(false)}
      >
        <AddQuestionModal
          handleClose={() => setIsAddQuestionModal(false)}
          quizData={activeQuizData}
        />
      </UniversalModal>

      <div className={styles.createQuizWrapper}>
        <p className={styles.quizQuantity}>
          {t("quizCount", { count: quizList.length })}
        </p>
        {Boolean(quizList.length) && (
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
