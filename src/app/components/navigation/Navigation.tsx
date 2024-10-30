"use client";

import { Box, Button, List, ListItem, Menu } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslations } from "next-intl";
import { PATHS } from "@/interface/interface";
import Link from "next/link";
import styles from "./navigation.module.css";
import { useUserData } from "@/app/hooks/useUserData";

function MenuLinkItem({ path, title }: { path: string; title: string }) {
  const pathname = usePathname();

  return (
    <ListItem>
      <Link
        className={`${styles.navLink} ${
          pathname === path ? styles.active : ""
        }`}
        href={path}
      >
        {title}
      </Link>
    </ListItem>
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
        <MenuLinkItem path={PATHS.USERS} title={t("users")} />
        <MenuLinkItem path={PATHS.COMPANIES} title={t("companies")} />
        <MenuLinkItem path={PATHS.ABOUT} title={t("about")} />
      </>
    );
  }

  return (
    <>
      <Box component="nav" className={styles.menuWrapper}>
        <List className={styles.menuItems_row}>
          {userData ? <PrivateMenuList /> : <PublicMenuList />}
        </List>
      </Box>
      <Box component="nav" className={styles.dropDownMenuWrapper}>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <Button variant="outlined" {...bindTrigger(popupState)}>
                {popupState.isOpen ? <CloseIcon /> : <MenuIcon />}
              </Button>
              <Menu className="test" {...bindMenu(popupState)}>
                <List className={styles.menuItems_col}>
                  {userData ? <PrivateMenuList /> : <PublicMenuList />}
                </List>
              </Menu>
            </>
          )}
        </PopupState>
      </Box>
    </>
  );
};

export default Navigation;
