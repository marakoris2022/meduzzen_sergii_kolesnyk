"use client";

import { Button, Menu } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslations } from "next-intl";
import { PATHS } from "@/interface/interface";
import Link from "next/link";
import styles from "./navigation.module.css";
import { useUserData } from "@/app/hooks/useUserData";
import classNames from "classnames";

function MenuLinkItem({ path, title }: { path: string; title: string }) {
  const pathname = usePathname();

  const linkClass = classNames(styles.navLink, {
    [styles.active]: pathname === path,
  });

  return (
    <li>
      <Link className={linkClass} href={path}>
        {title}
      </Link>
    </li>
  );
}

const Navigation = () => {
  const t = useTranslations("NavigationRoutes");
  const { userData } = useUserData();

  function PublicMenuList() {
    return (
      <>
        <MenuLinkItem path={PATHS.MAIN} title={t("main")} />
        <MenuLinkItem path={PATHS.SIGNIN} title={t("signin")} />
        <MenuLinkItem path={PATHS.SIGNUP} title={t("signup")} />
      </>
    );
  }

  function PrivateMenuList() {
    return (
      <>
        <MenuLinkItem path={PATHS.MAIN} title={t("main")} />
        <MenuLinkItem path={PATHS.PROFILE} title={t("profile")} />
        <MenuLinkItem path={`${PATHS.USERS}?page=1`} title={t("users")} />
        <MenuLinkItem
          path={`${PATHS.COMPANIES}?page=1`}
          title={t("companies")}
        />
        <MenuLinkItem path={PATHS.ABOUT} title={t("about")} />
      </>
    );
  }

  return (
    <>
      <nav className={styles.menuWrapper}>
        <ul className={styles.menuItems_row}>
          {userData ? <PrivateMenuList /> : <PublicMenuList />}
        </ul>
      </nav>

      <nav className={styles.dropDownMenuWrapper}>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <Button variant="outlined" {...bindTrigger(popupState)}>
                {popupState.isOpen ? <CloseIcon /> : <MenuIcon />}
              </Button>
              <Menu className="test" {...bindMenu(popupState)}>
                <ul className={styles.menuItems_col}>
                  {userData ? <PrivateMenuList /> : <PublicMenuList />}
                </ul>
              </Menu>
            </>
          )}
        </PopupState>
      </nav>
    </>
  );
};

export default Navigation;
