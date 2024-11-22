import { useTranslations } from "next-intl";
import styles from "./userAvatar.module.css";
import Image from "next/image";

const avatar = "/avatar_inco_1.webp";

const UserAvatar = ({ avatarSrc }: { avatarSrc: string }) => {
  const t = useTranslations("Avatar");

  return (
    <div className={styles.imgWrapper}>
      <Image
        fill
        sizes="100%"
        src={avatarSrc || avatar}
        alt={t("avatarAlt")}
      ></Image>
    </div>
  );
};

export default UserAvatar;
