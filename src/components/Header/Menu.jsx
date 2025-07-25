import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            boxShadow: "0 0 0 2px #facc15",
            transition: "transform 0.3s ease-in-out",
            '&:hover': {
              transform: 'scale(1.1)'
            },
            borderRadius: 2
          }
        }}
      >
        <MenuItem onClick={() => handleNavigation("/dashboard")}>Dashboard</MenuItem>
        <MenuItem onClick={() => handleNavigation("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => handleNavigation("/logout")}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderMenu;
