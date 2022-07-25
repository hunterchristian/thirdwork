import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import useProfile from "../../hooks/useProfile";
import getLoggedInUserRecordID from "../../utils/getLoggedInUserRecordID";
import ProfileIntro from "./components/ProfileIntro";
import Projects from "./components/Projects";
import ProfileChecklist from "./components/ProfileChecklist";
import Fade from "@mui/material/Fade";
import Typist from "react-typist";
import IosShareIcon from "@mui/icons-material/IosShare";
import queryParams from "../../utils/queryParams";
import useMediaQuery from "@mui/material/useMediaQuery";
import setProfileData from "../../state/actions/setProfileData";
import { AppDataContext } from "../../state/AppContext";
import { profile } from "console";

const ANIM_DELAY = 500;

const Profile = () => {
  const isMobileWidth = useMediaQuery("(max-width:600px)");

  const userRecordId = queryParams.publicProfileID || getLoggedInUserRecordID();
  const isPublicProfile = !!queryParams.publicProfileID;

  const { data: initialProfileData, loading } = useProfile({
    userRecordId,
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const {
    state: { profileData },
    dispatch,
  } = useContext(AppDataContext);
  useEffect(() => {
    if (initialProfileData) {
      dispatch(setProfileData(initialProfileData));
    }
  }, [initialProfileData]);

  // Do  not show personal profile page to non-logged-in users
  if (
    !isPublicProfile &&
    !window.logged_in_user &&
    process.env.REACT_APP_TEST_ENV !== "dev"
  ) {
    return null;
  }

  if (loading || !profileData) {
    return (
      <Container sx={{ mt: 3, pb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Fade
              in={true}
              style={{ transitionDelay: `200ms` }}
              timeout={{ enter: 500 }}
            >
              <div>
                <Stack
                  direction="row"
                  sx={{ mt: 1 }}
                  justifyContent="space-between"
                >
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    <Typist>{"v1 alpha club loading..."}</Typist>
                  </Typography>
                </Stack>
              </div>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    );
  }

  const TOOLTIP_DISPLAY_TIME_PERIOD_MILLIS = 10000;
  const handleShareProfileClick = () => {
    setShowTooltip(true);

    navigator.clipboard.writeText(
      `https://app.thirdwork.xyz/freelancer-profile?publicProfileID=${getLoggedInUserRecordID()}`
    );

    setTimeout(() => setShowTooltip(false), TOOLTIP_DISPLAY_TIME_PERIOD_MILLIS);
  };

  return (
    <Container sx={{ mt: 3, pb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Fade
            in={!loading}
            style={{ transitionDelay: `${ANIM_DELAY + 200}ms` }}
            timeout={{ enter: 500 }}
          >
            <div>
              <Stack
                direction="row"
                sx={{ mt: 1 }}
                justifyContent="space-between"
              >
                <Typography variant="h5">Account</Typography>
                {!isPublicProfile && (
                  <Tooltip
                    title={
                      <Box sx={{ display: "relative" }}>
                        <Typography
                          variant="body1"
                          sx={{ textAlign: "center" }}
                        >
                          Public profile URL copied to clipboard!
                        </Typography>
                      </Box>
                    }
                    placement="bottom-end"
                    arrow
                    open={showTooltip}
                  >
                    <Button
                      variant="contained"
                      startIcon={<IosShareIcon />}
                      onClick={handleShareProfileClick}
                    >
                      Share Profile
                    </Button>
                  </Tooltip>
                )}
              </Stack>
            </div>
          </Fade>
        </Grid>
        <Grid item xs={isPublicProfile || isMobileWidth ? 12 : 10}>
          <Fade
            in={true}
            style={{ transitionDelay: `${ANIM_DELAY + 400}ms` }}
            timeout={{ enter: 500 }}
          >
            <div>
              <Box>
                {!loading && (
                  <ProfileIntro
                    profileData={profileData}
                    hideEditProfileButton={isPublicProfile}
                  />
                )}
              </Box>
            </div>
          </Fade>
          <Fade
            in={true}
            style={{ transitionDelay: `${ANIM_DELAY + 600}ms` }}
            timeout={{ enter: 500 }}
          >
            <div>
              <Box sx={{ mt: 6 }}>
                {!loading && (
                  <Projects
                    profileData={profileData}
                    hideNewProjectButton={isPublicProfile}
                  />
                )}
              </Box>
            </div>
          </Fade>
        </Grid>
        {!isPublicProfile && !isMobileWidth && (
          <Grid item xs={2}>
            <Fade
              in={true}
              style={{ transitionDelay: `${ANIM_DELAY + 800}ms` }}
              timeout={{ enter: 500 }}
            >
              <div>
                {!loading && <ProfileChecklist profileData={profileData} />}
              </div>
            </Fade>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Profile;
