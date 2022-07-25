import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import queryParams, { setQueryParam } from "../../../utils/queryParams";
import { Stack } from "@mui/material";

const drawerWidth = 265;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface OwnProps {
  children?: JSX.Element | JSX.Element[];
}

const ANIM_DELAY = 5000;

export default function PersistentDrawerLeft({ children }: OwnProps) {
  const theme = useTheme();
  //const [open, setOpen] = React.useState(queryParams.drawerOpen === "true");
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    if (window.location.pathname === "/" && !queryParams.drawerOpen) {
      setTimeout(() => {
        setOpen(true);
        setQueryParam("drawerOpen", "true");
        document.body.classList.add("sidenav-shown");
      }, ANIM_DELAY);
    }

    if (queryParams.drawerOpen) {
      document.body.classList.add("sidenav-shown");
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setQueryParam("drawerOpen", "true");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setQueryParam("drawerOpen", "false");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            ml: 2,
            mt: 1,
            ...(open && { display: "none" }),
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <img
              src="https://storage.googleapis.com/cottage-assets/thirdwork-logo.png"
              width="105px"
              style={{ cursor: "pointer" }}
              onClick={() =>
                (window.location.href = "/?drawerOpen=" + open.toString())
              }
            />
            {/* <IconButton onClick={handleDrawerClose}>
                <KeyboardDoubleArrowLeftIcon sx={{ fill: "black" }} />
              </IconButton> */}
          </Stack>
        </DrawerHeader>
        <Divider />
        {children}
      </Drawer>
    </Box>
  );
}
