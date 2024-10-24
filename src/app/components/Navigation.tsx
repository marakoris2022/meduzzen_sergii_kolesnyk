"use client";

import { Box, Button, Link, List, ListItem, Menu } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import React from "react";

enum MenuItem {
  Menu = "/",
  Profile = "/profile",
  Users = "/users",
  Companies = "/companies",
  About = "/about",
}

const MenuItemsArr: [string, string][] = Object.entries(
  Object.assign(MenuItem)
);

function MenuLinkItem({ path, title }: { path: string; title: string }) {
  const pathname = usePathname();
  return (
    <ListItem>
      <Link
        sx={{
          "&:hover": {
            color: "secondary.light",
          },
        }}
        color={pathname === path ? "secondary" : "primary"}
        href={path}
      >
        {title}
      </Link>
    </ListItem>
  );
}

const Navigation = () => {
  return (
    <>
      <Box
        component="nav"
        sx={{ display: { xs: "none", md: "block", lg: "block" } }}
      >
        <List sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {MenuItemsArr.map((MenuItem) => (
            <MenuLinkItem
              key={MenuItem[1]}
              path={MenuItem[1]}
              title={MenuItem[0]}
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
                    key={MenuItem[1]}
                    path={MenuItem[1]}
                    title={MenuItem[0]}
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
