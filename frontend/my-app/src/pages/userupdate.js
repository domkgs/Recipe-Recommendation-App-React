import React from 'react';
import signchecker from './signchecker';
import { Box, Button, TextField, Stack, TableCell, Paper, Typography } from '@mui/material/';
import { NavLink as Link, useNavigate }from "react-router-dom";
import UserProfile from './useraccount';
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

const UserUpdate = () => {
   //const navigate = useNavigate();
  const [email, setEmail] = React.useState(localStorage.getItem('email'));
  const [firstName, setFirstName] = React.useState(localStorage.getItem('first_name'));
  const [lastName, setLastName] = React.useState(localStorage.getItem('last_name'));
  const [tagLine, setTagline] = React.useState(localStorage.getItem('tagLine'));
  const [userDesc, setUserdesc] = React.useState(localStorage.getItem('userDescription'));
  const [pic, setPic] = React.useState(localStorage.getItem('image'));
  const user_id = localStorage.getItem('userid');

  const [thumbnailfilename, setThumbnailfilename] = React.useState('');
  const [base64url, setbase64url] = React.useState('');

  //const [userid, setuserid] = React.useState('');
  //GOTTA CHECK WHETHER WE HAVE SUER ID###########################################################
  //const [userName, setUsername] = React.useState('');
  //const [tagLine, setTagline] = React.useState(');

  console.log(user_id);
  const UpdateName = () => {
    var user_url = 'http://localhost:8080/user/set/name';

    fetch(user_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: parseInt(user_id),
        first_name: firstName,
        last_name: lastName
      })
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
      .catch((error) => {
        console.log('error: ' + error);
        //localStorage.setItem('token', '');
      });
  };

  const UpdateImage = () => {
      var user_url = 'http://localhost:8080/user/set/image' // + userid;
      console.log(user_url);
      fetch(user_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: parseInt(user_id),
          image: pic,//image
        })
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
        .catch((error) => {
          console.log('error: ' + error);
          //localStorage.setItem('token', '');
        });
  };

  const UpdateTagline = () => {
    fetch('http://localhost:8080/user/set/tag_line', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: parseInt(user_id),
        tag_line: tagLine,//tagline
      })
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
          console.log(tagLine)
          console.log('Tagline success');
          return response.json();
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
        //localStorage.setItem('token', '');
      });
  };
    
  const UpdateDescription = () => {
    fetch('http://localhost:8080/user/set/description', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: parseInt(user_id),
        description: userDesc, //description
      })
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
      .catch((error) => {
        console.log('error: ' + error);
        //localStorage.setItem('token', '');
      });
  };

  const UpdateUser = () => {
      UpdateName();
      UpdateTagline();
      console.log(tagLine);
      UpdateDescription();
      UpdateImage();
  };
// These are function for dealing with images
  const handleFileInputChange = (event) => {
    console.log(event.target.files[0]);
    setThumbnailfilename(event.target.files[0].name);
    getBase64(event.target.files[0])
      .then(result => {
        setPic(result);
        console.log(base64url);
      })
      .catch(err => {
        console.log(err);
      });
  };
    
  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = '';
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  if (signchecker()) {
    return (
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
      <Paper style={styles.paperContainer}>
        <Stack spacing = {2} m ={2}>
            <Box>
              <Typography variant="h3">Update Profile Information</Typography>
            </Box>
            <TextField
                id="firstName"
                label="First Name"
                defaultValue={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <TextField
                id="lastName"
                label="Last Name"
                defaultValue={lastName}
                onChange={e => setLastName(e.target.value)}
            />
            <TextField
                id="userTagline"
                label="Tagline"
                defaultValue={tagLine}
                onChange={e => setTagline(e.target.value)}
            />
            <TextField
                id="userDesc"
                label="User Description"
                defaultValue={userDesc}
                onChange={e => setUserdesc(e.target.value)}
            />
            <TableCell>
              <Box m={1} pt={1} textAlign='center'>
                <input hidden
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleFileInputChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="raised" component="span" onChange={handleFileInputChange}>
                    Upload Profile Picture
                  </Button>
                </label>
                {thumbnailfilename}
              </Box>
            </TableCell>

            <Box textAlign='center'>
                <Button display="block" variant='contained' onClick = {() => UpdateUser()} component={Link} to="/useraccount">Finish Making Changes</Button>
            </Box>
        </Stack>
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
          <Box m={1} pt={3}>
              <TextField label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
          </Box>
          <Box m={1} pt={3}>
              <Link to="/forgotpassword" >
                  Forgot Password
              </Link>
          </Box>
          <Box>
            <Button display="block" variant='contained' component={Link} to="/sign-up">Sign Up</Button>
          </Box>
      </div>
  )
  }
}

export default UserUpdate;
