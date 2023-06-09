import React from 'react'
import { Box, Button, TextField, Typography, Paper } from '@mui/material/';
import { useNavigate }from "react-router-dom";
import Image from "./images/41.jpeg";

const styles = {
  paperContainer: {
      backgroundSize:'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
      height: 1024, 
  }
};

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    console.log(confirmpassword);

    const register = () => {
        fetch('http://localhost:8080/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name:  firstname,
            email: email,
            password: password,
            last_name: lastname,
            confirm_password: confirmpassword,
          })
        })
          .then(response => {
            if (!response.ok) {
              response.json().then(data => {
                // sends alert message if response results in error
                alert(data.message)
              });
              throw new Error(response.status);
            } else {
              // navigate to listings page if response is successful
              navigate('/useraccount', { replace: true })
              console.log('it is ok')
              return response.json();
            }
          })
          .then(data => {
            // set local storage of token and email
            localStorage.setItem('token', data.token);
            localStorage.setItem('creatorID', data.user_id);
            localStorage.setItem('userid', data.user_id);
            localStorage.setItem('email', email);
          })
          .catch((error) => {
            console.log('error: ' + error);
            localStorage.setItem('token', '');
          });
      };

    return (
        <div>
          <Paper style={styles.paperContainer}>
            <Box sx={{ pt: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
              <Typography variant="h3">Sign Up</Typography>
              <Box m={1} pt={3}>
                  <TextField label="First Name" variant="outlined" value={firstname} onChange={e => setFirstName(e.target.value)}/>
              </Box>
              <Box m={1} pt={3}>
                  <TextField label="Last Name" variant="outlined" value={lastname} onChange={e => setLastName(e.target.value)}/>
              </Box>
              <Box m={1} pt={3}>
                  <TextField label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
              </Box>
              <Box m={1} pt={3}>
                  <TextField type= 'password' label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)}/>
              </Box>
              <Box m={1} pt={3}>
                  <TextField type= 'password' label="Confirm Password" variant="outlined" value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)}/>
              </Box>
              <Box m={2} pt={3}>
                  <Button variant='contained' onClick = {register}>Create Account</Button>
              </Box>
              </Box>
            </Paper>
        </div>
    )
}

export default SignUp;