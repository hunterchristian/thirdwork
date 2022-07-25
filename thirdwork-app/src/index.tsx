import React from "react";
import { StrictMode, useMemo, useReducer } from "react";
import ReactDOM from "react-dom";
import Profile from "./pages/profile";
import SideNav from "./pages/sidenav";
import Homepage from "./pages/homepage";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./theme";
import { AppContext, AppDataContext, initialState } from "./state/AppContext";
import appReducer from "./state/AppReducer";

const components: Record<string, () => JSX.Element | null> = {
  profile: Profile,
  sidenav: SideNav,
  homepage: Homepage,
};

function AppProviders({ children }: { children: JSX.Element }) {
  // @ts-ignore
  const [state, dispatch] = useReducer(appReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]) as AppContext;

  return (
    <AppDataContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </AppDataContext.Provider>
  );
}

function renderPage(pageName: string) {
  const rootElement = document.getElementById(pageName);
  if (!rootElement) {
    console.error(
      'Could not find <div id="' + pageName + '"></div> in document'
    );
    return;
  }

  const PageComponent = components[pageName];
  if (!PageComponent) {
    console.error("could not find component for pageName: " + pageName);
    return;
  }

  ReactDOM.render(
    <StrictMode>
      <AppProviders>
        <PageComponent />
      </AppProviders>
    </StrictMode>,
    rootElement
  );
}

window.Cottage = window.Cottage || {};
window.Cottage.renderPage = renderPage;

if (process.env.REACT_APP_TEST_ENV === "dev") {
  renderPage("profile");
}
