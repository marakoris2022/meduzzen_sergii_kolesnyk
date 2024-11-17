import { useAppDispatch, useAppSelector } from "@/state/hooks";
import Loading from "../loading/Loading";
import PageError from "../users-page-error/PageError";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { PATHS } from "@/interface/interface";

const CompanyQuizList = ({ companyId }: { companyId: number }) => {
  const t = useTranslations("CompanyQuizList");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { quizList, loading, error } = useAppSelector((state) => state.quizzes);

  useEffect(() => {
    if (!quizList.length) {
      dispatch(fetchQuizzesData(companyId));
    }
  }, [companyId, dispatch, quizList.length]);

  if (loading) return <Loading />;

  if (error) return <PageError errorTitle={t("fetchError")} />;

  return (
    <div>
      {Boolean(quizList.length) &&
        quizList.map((quiz) => {
          return (
            <div key={quiz.quiz_id}>
              <p>{quiz.quiz_name}</p>
              <Button
                onClick={() => router.push(`${PATHS.QUIZ}/${quiz.quiz_id}`)}
              >
                Play
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default CompanyQuizList;
