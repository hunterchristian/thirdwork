import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Header({
  numProfileFieldsComplete,
  totalFields,
}: {
  numProfileFieldsComplete: number;
  totalFields: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: "14px",
              fontWeight: "500",
              color: "#111827",
        }}
      >
        Add to profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "8px",
          position: "relative",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{
            color: "#F5F5F5",
          }}
        />
        <CircularProgress
          size={20}
          sx={{
            color: "#6366F1",
            position: "absolute",
            top: 2,
            left: 2,
            zIndex: 1,
          }}
          variant="determinate"
          value={(numProfileFieldsComplete / totalFields) * 100}
        />
        <Typography
          variant="h6"
          sx={{
            display: "inline-block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#FFFFFF",
            borderRadius: "4px",
            background: "#6366F1",
            padding: "2px 5px",
            letterSpacing: "2px",
          }}
        >
          {numProfileFieldsComplete}/{totalFields}
        </Typography>
      </Box>
    </Box>
  );
}
