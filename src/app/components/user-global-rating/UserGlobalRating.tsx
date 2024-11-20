import { getUserGlobalRating } from "@/services/axios-api-methods/axiosGet";
import { useEffect, useState } from "react";
import PageError from "../users-page-error/PageError";
import { Rating } from "@mui/material";
import styles from "./userGlobalRating.module.css";
import { useTranslations } from "next-intl";

const UserGlobalRating = ({ userId }: { userId: number }) => {
  const t = useTranslations("UserGlobalRating");
  const [cumulativeRating, setCumulativeRating] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGlobalRating = async () => {
      try {
        const result = await getUserGlobalRating(userId);

        const average =
          result.rating.reduce(
            (sum: number, item: { average_rating: number }) =>
              sum + item.average_rating,
            0
          ) / result.rating.length;

        setCumulativeRating(average);
      } catch {
        setError(t("fetchError"));
      }
    };

    fetchGlobalRating();
  }, [userId, t]);

  if (error) return <PageError errorTitle={error} />;

  return (
    <div className={styles.ratingWrapper}>
      <p>{t("title")}</p>

      {cumulativeRating ? (
        <Rating value={Math.ceil(cumulativeRating / 20)} readOnly />
      ) : (
        t("noQuizzes")
      )}
    </div>
  );
};

export default UserGlobalRating;
