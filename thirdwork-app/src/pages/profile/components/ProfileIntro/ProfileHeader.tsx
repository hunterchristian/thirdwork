import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ProgressiveImage from "react-progressive-graceful-image";

import ProfileData from "./types/ProfileData";
import Tag from "./Tag";
import SkillList from "./SkillList";
import { Fade } from "@mui/material";
import queryParams from "../../../../utils/queryParams";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ProfileHeader({
  name, // e.g. "Gavin Neil"
  avatarUrl, // e.g. "https://storage.googleapis.com/cottage-assets/mock-avatar-image.png"
  username, // e.g. "@gavin"
  location, // e.g. "Ottawa, ON, Canada"
  hourlyRate, // e.g. "$85/hr"
  skills, // e.g. ["Product Management", "Copywriting", "Advisory", "Mentorship"]
  aboutMe,
}: ProfileData) {
  const isPublicProfile = !!queryParams.publicProfileID;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        flexWrap: "nowrap",
      }}
    >
      {/* Avatar */}
      <Grid item>
        <ProgressiveImage src={avatarUrl} placeholder="">
          {(src) => (
            <div
              style={{
                width: 128,
                height: 128,
              }}
            >
              <Fade in={!src} timeout={{ enter: 500 }}>
                <Avatar
                  alt="profile image"
                  src={src}
                  sx={{
                    width: 128,
                    height: 128,
                    display: !src ? "" : "none",
                  }}
                />
              </Fade>
              <Fade in={!!src} timeout={{ enter: 500 }}>
                <Avatar
                  alt="profile image"
                  src={src}
                  sx={{
                    width: 128,
                    height: 128,
                  }}
                />
              </Fade>
            </div>
          )}
        </ProgressiveImage>
      </Grid>

      {/* Text Content */}
      <Grid
        item
        xs={12}
        sm
        container
        sx={{
          padding: 0,
        }}
      >
        {/* Name and hourly rate */}
        <Grid
          item
          xs={12}
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {name}
          </Typography>
          {!isPublicProfile ? (
            <Typography
              component="h2"
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              ${hourlyRate} / hr
            </Typography>
          ) : null}
        </Grid>

        {/* Location */}
        <Grid
          item
          xs={12}
          container
          sx={{
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: "14px",
              flex: "auto",
            }}
          >
            @{username}
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "3px",
                background: "#9CA3AF",
                border: "1px solid #9CA3AF",
                borderRadius: "50%",
                margin: "auto 8px",
                marginBottom: "2.3px",
              }}
            ></span>
            <LocationOnOutlinedIcon
              sx={{
                fontSize: "13px",
                transform: "translateY(1px)",
              }}
            />
            {location}
          </Typography>
        </Grid>

        {/* Skill Tags */}
        <Grid item xs={12} sx={{}}>
          {/* {skills.split(',').map(skill => {
            return <Tag tagname={skill}/>
          })} */}
          {skills ? <SkillList skills={skills.split(",")} /> : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
