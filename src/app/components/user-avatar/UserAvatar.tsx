import { useTranslations } from "next-intl";
import styles from "./userAvatar.module.css";
import Image from "next/image";

const avatars = [
  "/avatar_inco_1.webp",
  "/avatar_inco_2.webp",
  "/avatar_inco_3.webp",
  "/avatar_inco_4.webp",
  "/avatar_inco_5.webp",
  "/avatar_inco_6.webp",
];

const UserAvatar = ({ avatarSrc }: { avatarSrc: string }) => {
  const t = useTranslations("Avatar");

  const randomIndex = Math.floor(Math.random() * avatars.length);
  const randomAvatar = avatars[randomIndex];

  return (
    <div className={styles.imgWrapper}>
      <Image
        fill
        sizes="100%"
        src={avatarSrc || randomAvatar}
        alt={t("avatarAlt")}
      ></Image>
    </div>
  );
};

export default UserAvatar;
