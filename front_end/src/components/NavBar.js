import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
    
    const navigate = useNavigate();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleLogin = () => {
        handleClose();
        navigate('authenticate/user_login');
    };

    const handleRegister = () => {
        handleClose();
        navigate('authenticate/user_register');
    };
    const handleAskQuestion = () => {
        handleClose();
        navigate('users/ask_question');
    };

    const handleViewQuestion = () => {
        handleClose();
        navigate('users/view_question');
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
              <Typography variant="h6"  className={classes.title}>
                  Touch React Forum
            </Typography>
            <div>
                <Button
                onClick={() => navigate('/')}
                color="inherit"
            >
                Home
            </Button>
            <MenuIcon
                onClick={handleMenu}
                color="inherit"
            >
                Account
            </MenuIcon>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                <MenuItem onClick={handleRegister}>Register</MenuItem>
                <MenuItem onClick={handleAskQuestion}>Ask a Question</MenuItem>
                <MenuItem onClick={handleViewQuestion}>View Questions</MenuItem>
            </Menu>
            </div>          
                </Toolbar>
            </AppBar>
        
    </div>
  );
}
