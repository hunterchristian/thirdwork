import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import AssistantIcon from "@mui/icons-material/Assistant";
import ChatIcon from "@mui/icons-material/Chat";
import RedeemIcon from "@mui/icons-material/Redeem";
import React, { useState } from "react";
import Drawer from "./Drawer";
import Link from "@mui/material/Link";
import queryParams from "../../../utils/queryParams";
import Select from "./Select";
import doesLoggedInUserExist from "../../../utils/doesLoggedInUserExist";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const currentPath = window.location.pathname;
const pagePaths = {
  home: "/",
  profile: "/freelancer-profile",
  library: "/resource-library",
  concierge: "/concierge",
  coffeeChats: "/coffee-chats",
  bounties: "/bounties",
};
const activePaths = {
  home: currentPath === "/",
  profile: currentPath === "/freelancer-profile",
  library: currentPath === "/resource-library",
  concierge: currentPath === "/concierge",
  coffeeChats: currentPath === "/coffee-chats",
  bounties: currentPath === "/bounties",
};
const getCurrentActiveLinkName = () => {
  const linkNames = Object.keys(activePaths);
  let currentActiveLinkName = "";
  linkNames.forEach((linkName) => {
    if (activePaths[linkName]) {
      currentActiveLinkName = linkName;
    }
  });

  return currentActiveLinkName;
};

const createLinkStyles = () => ({
  fontSize: "16px",
  color: "rgb(246,239,244)",
});

function getCookie(name) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}

function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export default function SideNav() {
  const theme = useTheme();
  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [activeLink, setActiveLink] = useState(getCurrentActiveLinkName());

  function handleLinkClick(linkName: string) {
    setActiveLink(linkName);
    window.location.href =
      pagePaths[linkName] +
      `?drawerOpen=${window.location.search === "?drawerOpen=true"}`;
  }

  const isLinkActive = (linkName: string) => activeLink === linkName;

  const createContainerStyles = (linkName: string) => ({
    background: isLinkActive(linkName)
      ? "linear-gradient(153.43deg, #EFB3C1 16.67%, #6564A9 100%)"
      : "linear-gradient(180deg, #D1D5DB 0%, #9CA3AF 100%)",
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mr: 1,
  });

  const NavLink = ({
    children,
    name,
  }: {
    children: JSX.Element;
    name: string;
  }) => (
    <ListItem
      sx={{
        cursor: "pointer",
        borderRadius: "8px",
        height: "40px",
        background: isLinkActive(name.toLowerCase()) ? "#F3F4F6" : "",
      }}
      onClick={handleLinkClick.bind(null, name.toLowerCase())}
    >
      <Box sx={createContainerStyles(name.toLowerCase())}>
        <ListItemIcon sx={{ minWidth: 0 }}>{children}</ListItemIcon>
      </Box>
      <ListItemText primary={name} />
    </ListItem>
  );

  const ComingSoon = ({
    children,
    name,
  }: {
    children: JSX.Element;
    name: string;
  }) => (
    <ListItem
      sx={{
        borderRadius: "8px",
        height: "40px",
        paddingRight: 0,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" alignItems="center">
        <Box
          sx={{
            background: "linear-gradient(180deg, #D1D5DB 0%, #9CA3AF 100%)",
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 1,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0 }}>{children}</ListItemIcon>
        </Box>
        <ListItemText primary={name} />
      </Stack>
      <Box
        sx={{
          background: "#F9FAFB",
          borderRadius: "4px",
          padding: "2px 8px",
          height: "fit-content",
          marginRight: "5px",
        }}
      >
        <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
          Coming soon!
        </Typography>
      </Box>
    </ListItem>
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  if (!isBiggerThanMobile) {
    return doesLoggedInUserExist() ? (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "white",
          px: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <img
            src="https://storage.googleapis.com/cottage-assets/thirdwork-logo.png"
            width="105px"
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}
          />
          <IconButton onClick={handleMenuClick} sx={{ px: 2, py: 1 }}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              style: { width: "265px", height: "80vh" },
            }}
          >
            <Stack justifyContent="space-between" sx={{ height: "100%" }}>
              <List>
                <NavLink name="Home">
                  <HomeIcon sx={createLinkStyles()} />
                </NavLink>
                <NavLink name="Profile">
                  <AccountCircleIcon sx={createLinkStyles()} />
                </NavLink>
                <NavLink name="Library">
                  <ImportContactsIcon sx={createLinkStyles()} />
                </NavLink>
                <NavLink name="Concierge">
                  <AssistantIcon sx={createLinkStyles()} />
                </NavLink>
                <NavLink name="Bounties">
                  <RedeemIcon sx={createLinkStyles()} />
                </NavLink>
                <ComingSoon name="Coffee Chats">
                  <LightbulbIcon sx={createLinkStyles()} />
                </ComingSoon>
                <ComingSoon name="Showcases">
                  <LightbulbIcon sx={createLinkStyles()} />
                </ComingSoon>
                <ComingSoon name="Benefits">
                  <LightbulbIcon sx={createLinkStyles()} />
                </ComingSoon>
              </List>
              <Stack>
                <Link
                  href="/account-settings"
                  sx={{ px: 2, py: 1, textDecoration: "none" }}
                >
                  Account Settings
                </Link>
                <Link
                  href="/work-preferences"
                  sx={{ px: 2, py: 1, textDecoration: "none" }}
                >
                  Work Preferences
                </Link>
                <Link
                  href="/signin"
                  onClick={() => deleteCookie("jwtToken")}
                  sx={{
                    px: 2,
                    pb: 2,
                    pt: 1,
                    textDecoration: "none",
                  }}
                >
                  Sign out
                </Link>
              </Stack>
            </Stack>
          </Menu>
        </Stack>
      </Box>
    ) : null;
  }

  return doesLoggedInUserExist() ? (
    <Drawer>
      <Stack justifyContent="space-between" sx={{ height: "100%" }}>
        <List>
          <NavLink name="Home">
            <HomeIcon sx={createLinkStyles()} />
          </NavLink>
          <NavLink name="Profile">
            <AccountCircleIcon sx={createLinkStyles()} />
          </NavLink>
          <NavLink name="Library">
            <ImportContactsIcon sx={createLinkStyles()} />
          </NavLink>
          <NavLink name="Concierge">
            <AssistantIcon sx={createLinkStyles()} />
          </NavLink>
          <NavLink name="Bounties">
            <RedeemIcon sx={createLinkStyles()} />
          </NavLink>
          <ComingSoon name="Coffee Chats">
            <LightbulbIcon sx={createLinkStyles()} />
          </ComingSoon>
          <ComingSoon name="Showcases">
            <LightbulbIcon sx={createLinkStyles()} />
          </ComingSoon>
          <ComingSoon name="Benefits">
            <LightbulbIcon sx={createLinkStyles()} />
          </ComingSoon>
        </List>
        <Stack>
          <Link
            href="/account-settings"
            sx={{ px: 2, py: 1, textDecoration: "none" }}
          >
            Account Settings
          </Link>
          <Link
            href="/work-preferences"
            sx={{ px: 2, py: 1, textDecoration: "none" }}
          >
            Work Preferences
          </Link>
          <Link
            href="/signin"
            onClick={() => deleteCookie("jwtToken")}
            sx={{
              px: 2,
              pb: 2,
              pt: 1,
              textDecoration: "none",
            }}
          >
            Sign out
          </Link>
        </Stack>
      </Stack>
    </Drawer>
  ) : null;
}
