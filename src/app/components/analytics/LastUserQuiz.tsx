import { SummaryRatingAnalyticProps } from "@/interface/interface";
import { useTranslations } from "next-intl";

type Props = {
  memberId: number;
  companyAnalytics: SummaryRatingAnalyticProps;
};

const LastUserQuiz = ({ memberId, companyAnalytics }: Props) => {
  const t = useTranslations("AnalyticsChart");

  const memberAnalytics = companyAnalytics.rating.find(
    (item) => item.user_id === memberId
  );

  const lastPassTime = memberAnalytics
    ? memberAnalytics.rating[memberAnalytics.rating.length - 1]?.pass_at
    : null;

  return (
    <p>
      {lastPassTime
        ? `${t("lastTaken")}: ${new Date(lastPassTime).toLocaleString()}`
        : t("noQuizzes")}
    </p>
  );
};

export default LastUserQuiz;
