import { useAppDispatch, useAppSelector } from "@/state/hooks";
import Loading from "../loading/Loading";
import PageError from "../users-page-error/PageError";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const CompanyQuizList = ({ companyId }: { companyId: number }) => {
  const t = useTranslations("CompanyQuizList");
  const dispatch = useAppDispatch();
  const { quizList, loading, error } = useAppSelector((state) => state.quizzes);

  useEffect(() => {
    if (!quizList.length) {
      dispatch(fetchQuizzesData(companyId));
    }
  }, [companyId, dispatch, quizList.length]);

  if (loading) return <Loading />;

  if (error) return <PageError errorTitle={t("fetchError")} />;

  return <div>{Boolean(quizList.length) && quizList.map(quiz => {
    return <p key={quiz.quiz_id}>{quiz.quiz_name}</p>
  })}</div>;
};

export default CompanyQuizList;
