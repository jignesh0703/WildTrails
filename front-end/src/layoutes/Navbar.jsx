import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const [focused, setFocused] = useState(false);
  const focusTimer = useRef(null);

  const handleMouseEnter = (menuLabel) => {
    setHoveredMenu(menuLabel);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <>
      {/* 🔹 TOP INFO BAR */}
      <AppBar>
        <Box
          sx={{
            bgcolor: "#0f2a2a",
            color: "#fff",
            py: 1,
            px: { xs: 2, sm: 4, md: 8, lg: 20 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography fontSize='13px' fontWeight='bold' sx={{ display: { xs: 'none', md: 'block' } }}>
            National Conservation Zoo &nbsp;&nbsp; 🕓 Opening times today: 10am – 3:30pm (Last entry at 2:30pm)
          </Typography>
          <TextField
            size="small"
            placeholder="Search..."
            onFocus={() => {
              focusTimer.current = setTimeout(() => {
                setFocused(true);
              }, 200);
            }}
            onBlur={() => {
              clearTimeout(focusTimer.current);
              setFocused(false);
            }}
            sx={{
              width: { xs: "140px", sm: "200px" },
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
              bgcolor: focused ? "#0e4545ff" : "#0f2a2a",
              "& .MuiOutlinedInput-input": {
                padding: "6px 10px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 'bold'
              },
              input: {
                color: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;