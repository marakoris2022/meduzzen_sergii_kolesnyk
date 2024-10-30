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
import { useEffect, useState } from "react";

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

type NavigationRoutesProps = {
  id: number;
  name: string;
  url: PATHS;
};

const Navigation = () => {
  const t = useTranslations("NavigationRoutes");

  const navigationRoutesPrivate = [
    { id: 0, name: t("main"), url: PATHS.MAIN },
    { id: 1, name: t("profile"), url: PATHS.PROFILE },
    { id: 2, name: t("users"), url: PATHS.USERS },
    { id: 3, name: t("companies"), url: PATHS.COMPANIES },
    { id: 4, name: t("about"), url: PATHS.ABOUT },
  ];
  const navigationRoutesPublic = [
    { id: 0, name: t("main"), url: PATHS.MAIN },
    { id: 1, name: t("signin"), url: PATHS.SIGNIN },
    { id: 2, name: t("signup"), url: PATHS.SIGNUP },
  ];

  const [menuData, setMenuData] = useState<NavigationRoutesProps[]>(
    navigationRoutesPublic
  );
  const { userData } = useUserData();

  useEffect(() => {
    if (userData) setMenuData(navigationRoutesPrivate);
    else setMenuData(navigationRoutesPublic);
  }, [userData]);

  const MenuItemsArr = menuData.sort(
    (curNavItem, nextNavItem) => curNavItem.id - nextNavItem.id
  );

  return (
    <>
      <Box component="nav" className={styles.menuWrapper}>
        <List className={styles.menuItems}>
          {MenuItemsArr.map((MenuItem) => (
            <MenuLinkItem
              key={MenuItem.id}
              path={MenuItem.url}
              title={MenuItem.name}
            />
          ))}
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
                {MenuItemsArr.map((MenuItem) => (
                  <MenuLinkItem
                    key={MenuItem.id}
                    path={MenuItem.url}
                    title={MenuItem.name}
                  />
                ))}
              </Menu>
            </>
          )}
        </PopupState>
      </Box>
    </>
  );
};

export default Navigation;
