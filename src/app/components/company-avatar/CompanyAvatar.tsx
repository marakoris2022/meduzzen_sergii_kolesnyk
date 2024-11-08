import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import styles from "./avatar.module.css";

const CompanyAvatar = ({ avatarSrc }: { avatarSrc: string }) => {
  const t = useTranslations("Avatar");

  const companiesNoAvatarImgPath = "/companiesNoImg300.webp";

  return (
    <div className={styles.imgWrapper}>
      <Image
        fill
        sizes="100%"
        src={avatarSrc || companiesNoAvatarImgPath}
        alt={t("avatarAlt")}
      ></Image>
    </div>
  );
};

export default CompanyAvatar;
