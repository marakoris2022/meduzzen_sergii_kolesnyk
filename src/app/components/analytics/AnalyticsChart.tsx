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
import { Button } from "@mui/material";
import styles from "./analyticsChart.module.css";
import { last10Labels } from "@/constants/analyticsConstants";
import { useTranslations } from "next-intl";
import { fetchSummaryRatingAnalytic } from "@/state/company-summary-analytics/companySummaryAnalyticsSlice";
import LastUserQuiz from "./LastUserQuiz";

const AnalyticsChart = ({ companyId }: { companyId: number }) => {
  const t = useTranslations("AnalyticsChart");
  const dispatch = useAppDispatch();
  const { companyMembers } = useAppSelector((state) => state.companyById);
  const { error, companyAnalytics } = useAppSelector(
    (state) => state.companySummaryAnalytics
  );
  const [chartData, setChartData] = useState<LineChartData>({
    labels: [],
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
    await dispatch(fetchSummaryRatingAnalytic(companyId));

    if (companyAnalytics) {
      const dataForChart: LineChartData = {
        labels: last10Labels,
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

  useEffect(() => {
    fetchAnalyticsData(companyId, companyMembers, companyAnalytics);
  }, [companyId, companyMembers]);

  if (error) return <PageError errorTitle={error} />;

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
                <Button onClick={() => setSelectedUser(member)}>
                  {t("showAnalytics")}
                </Button>
              </div>
            );
          })}
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
