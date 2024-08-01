import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CustomButton from './blocks/CustomButton';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Logo = styled('div')({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#FFFFFF', // Logo color
});

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <Logo>
            DEMO
          </Logo>
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
            <CustomButton component={Link} link="/" themeOption="primary">
              Dashboard
            </CustomButton>
            <CustomButton component={Link} link="/inventory" themeOption="primary">
              Inventory
            </CustomButton>
            <CustomButton component={Link} link="/dataentry" themeOption="primary">
              Data Entry
            </CustomButton>
            <CustomButton
              themeOption="primary"
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
            >
              Sales Channels
            </CustomButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/saleschannels/ebay">eBay</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/saleschannels/hibid">HiBid</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;