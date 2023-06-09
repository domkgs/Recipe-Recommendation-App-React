import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import { CssBaseline } from "@mui/material";
import signchecker from '../../pages/signchecker';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Image from "./13.png";
//import KitchenRoundedIcon from '@mui/icons-material/KitchenRounded';
//<KitchenRoundedIcon sx={{ mr: 1 }} />

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // sets an update state function
  const [, updateState] = React.useState();
  const Update = React.useCallback(() => updateState({}), []);
  // gets token from local storage
  const token = localStorage.getItem('token');
  // sets email to empty string in local storage
  localStorage.setItem('email', '');
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const logout = () => {
    fetch('http://localhost:8080/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
      })
    })
      .then(r => r.json())
      .then(data => {
        localStorage.setItem('token', '');
        localStorage.setItem('creatorID', '');
        localStorage.setItem('userid', '');
        localStorage.setItem('email', '');
        localStorage.setItem('last_name','');
        localStorage.setItem('first_name','');
        localStorage.setItem('userDescription','');
        localStorage.setItem('tagLine','');
        localStorage.setItem('image','');
        localStorage.setItem('created_recipes','');


        navigate('/signin', { replace: true })
        console.log(data);
        console.log(token)
        console.log('you have logged out')
        Update();
        handleClose();
      });
  };

  if (signchecker()) {
    return (
      <AppBar position='sticky' color='default'>
        <Container>
          <Toolbar disableGutter="True">
          <Box>
            <Button href = "/"  alt="Logo" sx= {{ml: 2}}>
              <IconButton sx={{color:"#ff8c00"}}>
                <LocalDiningIcon />
                JAIDS
              </IconButton>
            </Button>
          </Box>
            <Box>
              <Button href="/recipe-explorer" sx={{ m: 2, color: 'black' }}>Recipe Explorer</Button>
              <Button href="/mealplanner" sx={{ m: 2, color: 'black' }}>Meal Planner</Button>
              <Button href="/recipecontribution" sx={{ m: 2, color: 'black' }}>Contribute</Button>
            </Box>
            <Box sx={{ marginLeft: "auto"}}>
              <Button
                  sx={{ m: 2, color: 'black' }}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
              >
                  Account
              </Button>
              <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ 'aria-labelledby': 'basic-button', }}
              >

                  <MenuItem component={Link} to="/useraccount" onClick={handleClose}>Profile</MenuItem>
                  <MenuItem component={Link} to="/usermyprofile" onClick={handleClose}>My account</MenuItem>
                  <MenuItem component={Link} to="/signin" onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
    )
  } else {
    return (
      <AppBar position='sticky' color='default'>
      <Box sx={{justifyContent: 'center', width: "200"}} >
        <Container maxWidth="100">
          <Toolbar disableGutter>
          <Box>
            <Button href = "/"  alt="Logo" sx= {{ml: 2}}>
              <IconButton sx={{color:"#ff8c00"}}>
                <LocalDiningIcon />
                JAIDS
              </IconButton>
            </Button>
          </Box>
            <Box>
              <Button href="/recipe-explorer" sx={{ ml: 20, color: 'black' }}>Recipe Explorer</Button>
              <Button href="/mealplanner" sx={{ m: 2, color: 'black' }}>Meal Planner</Button>
              <Button href="/recipecontribution" sx={{ m: 2, color: 'black' }}>Contribute</Button>
            </Box>
            <Box sx={{ marginLeft: "auto"}}>
              <Button
                  sx={{ m: 2, color: 'black' }}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
              >
                  Account
              </Button>
              <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ 'aria-labelledby': 'basic-button', }}
              >

                  <MenuItem component={Link} to="/signin" onClick={handleClose}>Profile</MenuItem>
                  <MenuItem component={Link} to="/signin" onClick={handleClose}>My account</MenuItem>
                  <MenuItem component={Link} to="/signin" onClick={logout}>Login</MenuItem>
              </Menu>
            </Box>
        </Toolbar>
      </Container>
      </Box>
    </AppBar>
    )
  }
};
export default NavBar;
