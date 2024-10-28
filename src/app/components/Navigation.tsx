"use client";

import { Box, Button, List, ListItem, Menu } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslations } from "next-intl";
import { PATHS } from "@/interface/interface";
import Link from "next/link";

function MenuLinkItem({ path, title }: { path: string; title: string }) {
  const pathname = usePathname();

  return (
    <ListItem>
      <Link
        // Need to move all to separate module.css !!!!!!!!!!!!!!
        // sx={{
        //   "&:hover": {
        //     color: "secondary.light",
        //   },
        // }}
        color={pathname === path ? "secondary" : "primary"}
        href={path}
      >
        {title}
      </Link>
    </ListItem>
  );
}

const Navigation = () => {
  const t = useTranslations("NavigationRoutes");

  const navigationRoutes = [
    { id: 0, name: t("main"), url: PATHS.MAIN },
    { id: 1, name: t("profile"), url: PATHS.PROFILE },
    { id: 2, name: t("users"), url: PATHS.USERS },
    { id: 3, name: t("companies"), url: PATHS.COMPANIES },
    { id: 4, name: t("about"), url: PATHS.ABOUT },
  ];

  const MenuItemsArr = navigationRoutes.sort(
    (curNavItem, nextNavItem) => curNavItem.id - nextNavItem.id
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ display: { xs: "none", md: "block", lg: "block" } }}
      >
        <List sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {MenuItemsArr.map((MenuItem) => (
            <MenuLinkItem
              key={MenuItem.id}
              path={MenuItem.url}
              title={MenuItem.name}
            />
          ))}
        </List>
      </Box>
      <Box
        component="nav"
        sx={{ display: { xs: "block", md: "none", lg: "none" } }}
      >
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <Button variant="outlined" {...bindTrigger(popupState)}>
                {popupState.isOpen ? <CloseIcon /> : <MenuIcon />}
              </Button>
              <Menu sx={{ mt: "8px" }} {...bindMenu(popupState)}>
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
