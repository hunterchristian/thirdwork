import React, { useState } from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import Modal from "./Modal";
import ProfileData from "../../types/ProfileData";
import EditProfile from "./components/EditProfile";

interface OwnProps {
  profileData: ProfileData;
  hideEditProfileButton: boolean;
}

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

// OwnProps is a standard name for the type of data that can be passed to a React component
// In this case, our React component takes only one piece of data named "profileData" that
// is of type ProfileData. This just means that the profileData object is expected to contain
// all of the fields that we have listed in the ProfileData interface.
export default function ProfileIntro({
  profileData: initialProfileData,
  hideEditProfileButton,
}: OwnProps) {
  const [modal, setModal] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Paper>
      <Modal modal={modal} closeModal={closeModal}>
        <EditProfile
          profileData={profileData}
          onDiscard={closeModal}
          onComplete={({
            newAvatarUrl,
            name,
            location,
            skills,
            aboutMe,
            hourlyRate,
            username,
          }) => {
            if (newAvatarUrl) {
              setProfileData({
                ...profileData,
                avatarUrl: newAvatarUrl,
                name,
                location,
                skills,
                aboutMe,
                hourlyRate,
                username,
              });
            } else {
              setProfileData({
                ...profileData,
                name,
                location,
                skills,
                aboutMe,
                hourlyRate,
                username,
              });
            }

            closeModal();
          }}
        />
      </Modal>
      <Box sx={{ p: 2 }}>
        <Header
          openModal={openModal}
          hideEditProfileButton={hideEditProfileButton}
        />
        <Divider
          sx={{
            margin: "24px 0",
          }}
        />
        <ProfileHeader {...profileData} />
        <Divider
          sx={{
            margin: "24px 0",
          }}
        />
        {/* About me */}
        <Box>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            About me
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              color: "#374151",
            }}
          >
            {profileData.aboutMe}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
