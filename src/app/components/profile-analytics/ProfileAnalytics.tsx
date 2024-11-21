import { UserLastQuiz } from "@/interface/interface";
import {
  getUserLastQuizzes,
  getUserAnalyticForQuiz,
  getQuizById,
  getLastAnswersCSV,
} from "@/services/axios-api-methods/axiosGet";
import { useEffect, useState } from "react";
import LineChart, { LineChartData } from "../charts/LineChart";
import { getRandomColor } from "@/utils/getRandomColor";
import { Button } from "@mui/material";
import styles from "./profileAnalytics.module.css";
import { useTranslations } from "next-intl";

const ProfileAnalytics = ({ userId }: { userId: number }) => {
  const t = useTranslations("ProfileAnalytics");
  const [quizzes, setQuizzes] = useState<UserLastQuiz[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [chartData, setChartData] = useState<LineChartData>({
    datasets: [],
  });

  async function fetchUserQuizzes(userId: number) {
    try {
      const quizList = await getUserLastQuizzes(userId);
      setQuizzes(quizList);
    } catch {
      setError(t("failedToLoadQuizzes"));
    }
  }

  useEffect(() => {
    fetchUserQuizzes(userId);
  }, [userId]);

  async function fetchQuizName(quizId: number) {
    try {
      const quizData = await getQuizById(quizId);
      return quizData.quiz_name;
    } catch {
      return String(quizId);
    }
  }

  async function handleDownloadCSV(userId: number) {
    try {
      await getLastAnswersCSV(userId);
    } catch {
      setError("Failed to load data for CSV file.");
    }
  }

  async function fetchAnalytics(userId: number, quizId: number) {
    try {
      const userAnalyticData = await getUserAnalyticForQuiz(userId, quizId);
      const quizName = await fetchQuizName(quizId);
      const dataForChart: LineChartData = {
        datasets: [
          {
            label: quizName,
            data: userAnalyticData.rating.map(
              (rating) => rating.average_rating
            ),
            borderColor: getRandomColor(),
          },
        ],
      };

      setChartData(dataForChart);
    } catch {
      setError(t("failedToLoadAnalytics"));
    }
  }

  if (error) return <div>{error}</div>;

  return (
    <div>
      {quizzes.length === 0 ? (
        <p>{t("noQuizzesFound")}</p>
      ) : (
        <div className={styles.profileAnalyticsWrapper}>
          <ul className={styles.listWrapper}>
            {quizzes.map((quiz) => (
              <li className={styles.listItemWrapper} key={quiz.quiz_id}>
                <strong>{t("quizId")}</strong>: {quiz.quiz_id} -{" "}
                <strong>{t("lastAttempt")}</strong>:{" "}
                {new Date(quiz.last_quiz_pass_at).toLocaleString()}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fetchAnalytics(userId, quiz.quiz_id)}
                >
                  {t("showAnalytics")}
                </Button>
              </li>
            ))}
          </ul>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleDownloadCSV(userId)}
          >
            {t("downloadAnswers")}
          </Button>
          {chartData.datasets.length > 0 && <LineChart chartData={chartData} />}
        </div>
      )}
    </div>
  );
};

export default ProfileAnalytics;
