import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Stack, Typography } from "@mui/material";

const ColoredCircle = ({ color }: { color: string }) => (
  <span
    style={{
      display: "inline-block",
      marginLeft: "5px",
      marginRight: "5px",
      marginBottom: "-2px",
      borderRadius: "50%",
      height: "6px",
      width: "6px",
      backgroundColor: color,
    }}
  ></span>
);

export default function BasicSelect() {
  const [available, setAvailable] = React.useState("available");

  const handleChange = (event: SelectChangeEvent) => {
    setAvailable(event.target.value as string);
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormControl fullWidth>
        <Select
          value={available}
          onChange={handleChange}
          IconComponent={() => <KeyboardArrowDownIcon sx={{ mr: 2 }} />}
          sx={{ borderRadius: "100px" }}
        >
          <MenuItem value="available">
            <Stack direction="row" alignItems="center">
              <ColoredCircle color="#22C55E" />
              <Typography variant="body1">Available</Typography>
            </Stack>
          </MenuItem>
          <MenuItem value="unavailable">
            <Stack direction="row" alignItems="center">
              <ColoredCircle color="#f5d133" />
              <Typography variant="body1">Unavailable</Typography>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
