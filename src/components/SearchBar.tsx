// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { TextField, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        mb: 3,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TextField
        placeholder="Search mutual funds..."
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: { py: 1.2 },
        }}
      />
    </Paper>
  );
}
