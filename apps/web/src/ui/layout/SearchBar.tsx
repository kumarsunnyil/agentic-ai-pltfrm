"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment, TextField } from "@mui/material";

export default function SearchBar() {
  return (
    <TextField
      size="small"
      placeholder="Search documents, agents, workflows..."
      sx={{
        width: 420,

        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          bgcolor: "background.default",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}