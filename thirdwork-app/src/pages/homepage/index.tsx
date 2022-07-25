import {
  Container,
  Typography,
  Grid,
  ListItemAvatar,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  CardMedia,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import getLoggedInUserName from "../../utils/getLoggedInUserName";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import useDirectory from "../../hooks/useDirectory";
import useResources from "../../hooks/useResources";
import ProgressiveImage from "react-progressive-graceful-image";

const textEllipsisStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const Paper = ({
  children,
  sx,
}: {
  children?: JSX.Element | JSX.Element[];
  sx?: any;
}) => (
  <Box
    sx={{
      width: "100%",
      borderRadius: "12px",
      boxShadow:
        "0px 2px 10px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.1)",
      minHeight: "335px",
      ...sx,
    }}
  >
    {children}
  </Box>
);

const PaperCard = ({
  children,
  sx,
}: {
  children?: JSX.Element | JSX.Element[];
  sx?: any;
}) => (
  <Box
    sx={{
      width: "100%",
      borderRadius: "12px",
      boxShadow:
        "0px 2px 10px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.1)",
      minHeight: "160px",
      ...sx,
    }}
  >
    {children}
  </Box>
);

const ProfileInfo = ({
  name,
  position,
  isFoundingMember,
  avatarUrl,
}: {
  name: string;
  position: string;
  isFoundingMember: boolean;
  avatarUrl: string;
}) => (
  <Box
    sx={{
      p: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Stack direction="row" sx={{ width: "100%" }}>
      <Avatar sx={{ width: "70px", height: "70px" }} src={avatarUrl} />
      <Stack sx={{ pl: 2, pr: 2 }}>
        <Typography variant="h6">{name}</Typography>
        {isFoundingMember && (
          <Box
            sx={{
              background:
                "radial-gradient(100% 875% at 50% 0%, #4083F2 0%, #989CF5 100%)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "white", padding: "2px 6px", width: "fit-content" }}
            >
              Founding Member
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
    <Typography
      variant="body1"
      sx={{
        width: "100%",
        mt: 2,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#667085",
      }}
    >
      {position}
    </Typography>
  </Box>
);

const Link = ({
  href,
  children,
}: {
  href: string;
  children: JSX.Element | string;
}) => (
  <a href={href} target="_blank">
    {children}
  </a>
);

const ANIM_DELAY = 1000;

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const { directory, loading: directoryLoading } = useDirectory();
  const { resources, loading: resourcesLoading } = useResources();

  useEffect(() => {
    if (!directoryLoading && !resourcesLoading) {
      setLoading(false);
    }
  }, [directoryLoading, resourcesLoading]);

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        <Typist cursor={{ hideWhenDone: !loading }} key={loading}>
          {loading
            ? "v1 alpha club loading..."
            : `Hi${
                getLoggedInUserName() ? ` ${getLoggedInUserName()}` : ""
              }, welcome to Thirdwork! 🎉`}
        </Typist>
      </Typography>
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Fade
              in={true}
              style={{ transitionDelay: `${ANIM_DELAY + 200}ms` }}
              timeout={{ enter: 500 }}
            >
              <span>
                <Paper>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Founders corner 📣
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: ".85rem" }}>
                      If you’re reading this, you’re one of our founding
                      members! Thanks for helping beta-test our platform for
                      fractional work in web3. Here’s a few ways you can get
                      started:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mt: 2, fontSize: ".85rem" }}
                    >
                      <ul>
                        <li>
                          <Link href="https://calendly.com/gavin-xyz/thirdwork-call">
                            Schedule a call
                          </Link>{" "}
                          with our founder
                        </li>
                        <li>
                          Read the{" "}
                          <Link href="https://thirdwork.notion.site/Thirdwork-Letter-ef6aae182bb84b0e998decc1426199af">
                            letter from our founding team
                          </Link>
                        </li>
                        <li>
                          Contribute to our{" "}
                          <a href="/resource-library">resource library</a>
                        </li>
                        <li>
                          Check out our <a href="/bounties">active bounties</a>
                        </li>
                        <li>
                          Keep your <a href="/freelancer-profile">profile</a>{" "}
                          up-to-date!
                        </li>
                      </ul>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: ".85rem" }}>
                      Questions or thoughts? Email us at{" "}
                      <a href="mailto:founder@thirdwork.xyz">
                        founder@thirdwork.xyz
                      </a>
                    </Typography>
                  </Box>
                </Paper>
              </span>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade
              in={true}
              style={{ transitionDelay: `${ANIM_DELAY + 400}ms` }}
              timeout={{ enter: 500 }}
            >
              <span>
                <Paper>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      What we're reading 📖
                    </Typography>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      {resources?.slice(0, 2).map((r: any, i: number) => (
                        <>
                          <ListItem
                            alignItems="flex-start"
                            sx={{
                              paddingLeft: 0,
                              paddingRight: 0,
                              cursor: "pointer",
                            }}
                            onClick={() => window.open(r["Page URL"])}
                          >
                            <ListItemAvatar sx={{ mr: 2 }}>
                              <ProgressiveImage
                                src={r.Image[0].url}
                                placeholder=""
                              >
                                {(src) => (
                                  <div
                                    style={{
                                      height: 72,
                                      width: 121,
                                    }}
                                  >
                                    <Fade in={!src} timeout={{ enter: 500 }}>
                                      <Box
                                        sx={{
                                          border: "1px solid #E5E7EB",
                                          borderRadius: "8px",
                                          background: "#E5E7EB",
                                          display: !src ? "" : "none",
                                          height: 72,
                                          width: 121,
                                        }}
                                      />
                                    </Fade>
                                    <Fade in={!!src} timeout={{ enter: 500 }}>
                                      <CardMedia
                                        component="img"
                                        height="72"
                                        width="121"
                                        image={`${src}`}
                                        alt="Blog Image"
                                        sx={{
                                          border: "1px solid #E5E7EB",
                                          borderRadius: "8px",
                                          mr: 2,
                                        }}
                                      />
                                    </Fade>
                                  </div>
                                )}
                              </ProgressiveImage>
                            </ListItemAvatar>
                            <ListItemText
                              primary={r.Title}
                              primaryTypographyProps={{
                                style: textEllipsisStyle,
                              }}
                              secondary={<div>{r.Description}</div>}
                            />
                          </ListItem>
                          {i === 0 ? (
                            <Divider
                              variant="inset"
                              component="li"
                              sx={{ ml: 0, mt: 1 }}
                            />
                          ) : null}
                        </>
                      ))}
                    </List>
                  </Box>
                </Paper>
              </span>
            </Fade>
          </Grid>
          <Grid item xs={12}>
            <Fade
              in={true}
              style={{ transitionDelay: `${ANIM_DELAY + 450}ms` }}
              timeout={{ enter: 500 }}
            >
              <span>
                <Divider variant="inset" sx={{ ml: 0, p: 1 }} />
              </span>
            </Fade>
          </Grid>
          <Grid item xs={12}>
            <Fade
              in={true}
              style={{ transitionDelay: `${ANIM_DELAY + 500}ms` }}
              timeout={{ enter: 500 }}
            >
              <span>
                <Typography variant="h6" gutterBottom>
                  Thirdwork directory
                </Typography>
              </span>
            </Fade>
            <Fade
              in={true}
              style={{ transitionDelay: `${ANIM_DELAY + 550}ms` }}
              timeout={{ enter: 500 }}
            >
              <span>
                <Typography variant="body2" sx={{ color: "#6B7280", mb: 3 }}>
                  We’re building the premier fractional talent network in web3
                </Typography>
              </span>
            </Fade>
            <Grid container spacing={4} sx={{ mb: 4 }}>
              {directory
                ?.slice(0, 3)
                .filter(
                  (person) =>
                    !person["Freelancer Name"].includes(getLoggedInUserName())
                )
                .map((person, i) => (
                  <Grid item md={4}>
                    <Fade
                      in={true}
                      style={{
                        transitionDelay: `${ANIM_DELAY + (i * 100 + 600)}ms`,
                      }}
                      timeout={{ enter: 500 }}
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location.href = `/freelancer-profile?publicProfileID=${person.Users[0]}`)
                        }
                      >
                        <PaperCard>
                          <ProfileInfo
                            name={person["Freelancer Name"]}
                            position={person["Current company"]}
                            isFoundingMember={person["Is Founding Member?"]}
                            avatarUrl={person["Profile Picture"][0].url}
                          ></ProfileInfo>
                        </PaperCard>
                      </span>
                    </Fade>
                  </Grid>
                ))}
            </Grid>
            <Grid container spacing={4}>
              {directory?.slice(3, 7).map((person, i) => (
                <Grid item md={4}>
                  <Fade
                    in={true}
                    style={{
                      transitionDelay: `${ANIM_DELAY + (i * 100 + 900)}ms`,
                    }}
                    timeout={{ enter: 500 }}
                  >
                    <span>
                      <PaperCard>
                        <ProfileInfo
                          name={person["Freelancer Name"]}
                          position={person["Current company"]}
                          isFoundingMember={person["Is Founding Member?"]}
                          avatarUrl={person["Profile Picture"][0].url}
                        ></ProfileInfo>
                      </PaperCard>
                    </span>
                  </Fade>
                </Grid>
              ))}
            </Grid>
            <Fade
              in={true}
              style={{ transitionDelay: `${ANIM_DELAY + 1150}ms` }}
              timeout={{ enter: 500 }}
            >
              <span>
                <Typography variant="h4" sx={{ mt: 3 }}>
                  Full directory coming soon!
                </Typography>
              </span>
            </Fade>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
