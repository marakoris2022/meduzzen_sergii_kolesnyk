"use client";

import { themeConstants } from "../../../constants/themeConstants";
import Navigation from "../navigation/Navigation";
import LocaleSwitcher from "../local-switcher/LocaleSwitcher";
import LogoIcon from "../LogoIcon";
import Link from "next/link";
import { PATHS } from "@/interface/interface";
import styles from "./header.module.css";
import ExitButton from "../exit-button/ExitButton";
import { useUserData } from "@/app/hooks/useUserData";
import Notification from "../notification-ws/Notification";

const Header = () => {
  const { userData } = useUserData();
  return (
    <header className="container">
      <div
        className={styles.headerWrapper}
        style={{
          marginTop: themeConstants.headerMarginTop,
          height: themeConstants.headerHeight,
          backgroundColor: "menuGray.main",
          borderColor: "menuGray.light",
        }}
      >
        <Link href={PATHS.MAIN}>
          <LogoIcon />
        </Link>
        <LocaleSwitcher />
        <div className={styles.navigationWrapper}>
          {userData && <Notification />}
          <Navigation />
          {userData && <ExitButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
