import React from 'react';
import signchecker from './signchecker';
import { Box, Button, TextField, Grid, Paper} from '@mui/material/';
import { positions } from '@mui/system';
import { NavLink as Link, useNavigate }from "react-router-dom";
import Image from "./images/41.jpeg";
const styles = {
  paperContainer: {
      backgroundSize:'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
      height: 1024,
  }
};
// Need to grab user account info

const UserAccount = () => {
   //const navigate = useNavigate();
  const [email, setEmail] = React.useState(' ');
  const [firstName, setFirstName] = React.useState(' ');
  const [lastName, setLastName] = React.useState(' ');
  const [tagLine, setTagline] = React.useState(' ');
  const [userDesc, setUserdesc] = React.useState(' ');
  const [pic, setPic] = React.useState(' ');
  const user_id = localStorage.getItem('userid');

  const UserProfile = () => {
    var user_url = "http://localhost:8080/user/profile?user_id=" + user_id;
    const getProfile = async () => {
      await fetch(user_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            response.json().then(data => {
              // sends alert message if response results in error
              alert(data.message);
              console.log(data);
            });
            throw new Error(response.status);
          } else {
            console.log('it is ok')
            return response.json();
          }
        })
        .then(data => {
          // set local storage of token and email  
          localStorage.setItem("first_name",data.first_name);
          localStorage.setItem("last_name",data.last_name);
          localStorage.setItem("tagLine", data.tag_line);
          localStorage.setItem("userDescription", data.description);
          localStorage.setItem("image",data.image);
          localStorage.setItem("email",data.email);
          localStorage.setItem('favourites',data.favourites);
          localStorage.setItem('created_recipes',data.created_recipes);
  
          setEmail(data.email);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setTagline(data.tag_line);
          setPic(data.image);
          setUserdesc(data.description);
        })
        .catch((error) => {
          console.log('error: ' + error);
          //localStorage.setItem('token', '');
        });
    }

    React.useEffect(() => {
      getProfile();
    },[]);
    
  };

  if (signchecker()) {
    UserProfile();
    var user_name = firstName + " " + lastName;
    if (tagLine == "") {
      setTagline(" ");
    }

    if (userDesc == "") {
      setUserdesc(" ");
    }
    if (pic === "null" || pic === "") {
      setPic("https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg");
    }
    console.log(pic);
    return (
      <div>
        <Paper style={styles.paperContainer}>
          <Grid container direction="column">
            <Grid item justifyContent="end" spacing = {1}>
              <Box style={{float: "right"}} sx={{ m: 2 }}>
                <Button display="block" variant='contained' component={Link} to="/userupdate">Update Profile</Button>
              </Box>
            </Grid>
            <Grid container justifyContent="center">
                <img src={pic}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: '50%'
                  }}
                />
            </Grid>
            <Grid item justifyContent="center">
              <h1 style={{textAlign: "center"}}>
                {user_name}
              </h1>
              <p style= {{textAlign: "center"}}>
                {tagLine}
              </p>
              <p style= {{textAlign: "center"}}>
                {userDesc}
              </p>
            </Grid>
          </Grid>
        </Paper>
      </div>
  )} else {
    return (
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}>
        <Paper style={styles.paperContainer}>
          <Grid container direction="column">
            <Grid item justifyContent="end" spacing = {1}>
              <Box style={{float: "right"}} sx={{ m: 2 }}>
                <Button display="block" variant='contained' component={Link} to="/login">Sign In</Button>
              </Box>
            </Grid>
            <Grid container justifyContent="center">
                <img src={pic}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: '50%'
                  }}
                />
            </Grid>
            <Grid item justifyContent="center">
              <h1 style={{textAlign: "center"}}>
                User Name
              </h1>
              <p style= {{textAlign: "center"}}>
                This is where your tagline would go if you were signed in!
              </p>
              <p style= {{textAlign: "center"}}>
                This is where your user description would go if you were signed in!
              </p>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

}

export default UserAccount;
