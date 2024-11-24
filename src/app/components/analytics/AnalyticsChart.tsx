import { useEffect, useState } from "react";
import LineChart, { LineChartData } from "../charts/LineChart";
import { getRandomColor } from "@/utils/getRandomColor";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import PageError from "../users-page-error/PageError";
import { resolveMemberLabel } from "@/utils/resolveMemberLabel";
import {
  ActionProps,
  SummaryRatingAnalyticProps,
  UserItem,
} from "@/interface/interface";
import UserQuizChart from "./UserQuizChart";
import { Button, IconButton } from "@mui/material";
import styles from "./analyticsChart.module.css";
import { useTranslations } from "next-intl";
import { fetchSummaryRatingAnalytic } from "@/state/company-summary-analytics/companySummaryAnalyticsSlice";
import LastUserQuiz from "./LastUserQuiz";
import {
  getAllQuizAnswersForCompanyCSV,
  getUserAnswersFromCompanyCSV,
} from "@/services/axios-api-methods/axiosGet";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const AnalyticsChart = ({ companyId }: { companyId: number }) => {
  const t = useTranslations("AnalyticsChart");
  const dispatch = useAppDispatch();
  const { companyMembers } = useAppSelector((state) => state.companyById);
  const [fetchError, setFetchError] = useState<string>("");
  const { error, companyAnalytics } = useAppSelector(
    (state) => state.companySummaryAnalytics
  );
  const [chartData, setChartData] = useState<LineChartData>({
    datasets: [],
  });
  const [selectedUser, setSelectedUser] = useState<
    null | (UserItem & ActionProps)
  >(null);

  async function fetchAnalyticsData(
    companyId: number,
    companyMembers: (UserItem & ActionProps)[],
    companyAnalytics: SummaryRatingAnalyticProps | null
  ) {
    if (!companyAnalytics) {
      await dispatch(fetchSummaryRatingAnalytic(companyId));
    } else {
      const dataForChart: LineChartData = {
        datasets: companyAnalytics.rating.map((memberRating) => {
          return {
            label: resolveMemberLabel(memberRating.user_id, companyMembers),
            data: memberRating.rating.map((rating) => rating.average_rating),
            borderColor: getRandomColor(),
          };
        }),
      };

      setChartData(dataForChart);
    }
  }

  async function handleDownloadUserCSV(userId: number, companyId: number) {
    try {
      await getUserAnswersFromCompanyCSV(companyId, userId);
    } catch {
      setFetchError(t("failedFetchUserCSV"));
    }
  }

  async function handleDownloadAllUsersCSV(companyId: number) {
    try {
      await getAllQuizAnswersForCompanyCSV(companyId);
    } catch {
      setFetchError(t("failedUsersCSV"));
    }
  }

  useEffect(() => {
    fetchAnalyticsData(companyId, companyMembers, companyAnalytics);
  }, [companyId, companyMembers, companyAnalytics]);

  if (error || fetchError)
    return <PageError errorTitle={error || fetchError} />;

  return chartData.datasets.length > 0 ? (
    <div className={styles.analyticsWrapper}>
      <h3 className={styles.analyticsTitle}>{t("overallAnalytics")}</h3>
      <LineChart chartData={chartData} />
      {companyMembers.length > 0 && (
        <div className={styles.membersListWrapper}>
          <h3 className={styles.membersListTitle}>{t("membersList")}</h3>
          {companyMembers.map((member) => {
            return (
              <div key={member.user_id} className={styles.membersListItem}>
                <div className={styles.memberTakeTimeWrapper}>
                  <p>{member.user_email}</p>
                  {companyAnalytics && (
                    <LastUserQuiz
                      memberId={member.user_id}
                      companyAnalytics={companyAnalytics}
                    />
                  )}
                </div>
                <div>
                  <Button onClick={() => setSelectedUser(member)}>
                    {t("showAnalytics")}
                  </Button>
                  <IconButton
                    onClick={() =>
                      handleDownloadUserCSV(member.user_id, companyId)
                    }
                    size="small"
                    color="primary"
                  >
                    <FileDownloadIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
          <Button
            onClick={() => handleDownloadAllUsersCSV(companyId)}
            size="small"
            color="primary"
          >
            {t("downloadAllAnswers")}
          </Button>
        </div>
      )}
      {selectedUser && (
        <>
          <UserQuizChart
            companyId={companyId}
            userId={selectedUser.user_id}
            userEmail={selectedUser.user_email}
          />

          <Button color="error" onClick={() => setSelectedUser(null)}>
            {t("remove")}
          </Button>
        </>
      )}
    </div>
  ) : (
    <p className={styles.analyticsTitle}>{t("noData")}</p>
  );
};

export default AnalyticsChart;
