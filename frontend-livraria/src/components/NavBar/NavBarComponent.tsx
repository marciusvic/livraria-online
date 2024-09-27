import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Divider } from "@mui/material";
import tsmxlogo from "../../images/tsmxlogo.jpg";

import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export const NavBarComponent: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <AppBar position="static" className="comigo-blue-nav">
      <Toolbar className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img src={tsmxlogo} alt="Comigo Logo" className="h-10 mr-4" />
        </div>

        <Typography
          variant="subtitle1"
          className="flex-grow text-center text-white"
        >
          Atendimento ao Cliente
        </Typography>

        <Box display="flex" alignItems="center">
          <IconButton color="inherit">
            <RefreshIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem className="bg-white mx-2" />

          <IconButton color="inherit">
            <ApartmentIcon />
          </IconButton>

          <IconButton color="inherit">
            <DarkModeIcon />
          </IconButton>

          <IconButton edge="end" color="inherit" onClick={handleLogout}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
