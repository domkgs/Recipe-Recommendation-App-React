import React from 'react'
import signchecker from './signchecker'
import { Box, Button, TextField, Typography, Paper } from '@mui/material/';
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

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    console.log('email' + email);

    const login = () => {
        fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
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
              // navigate to listings page if response is successful
              console.log('it is ok')
              navigate('/useraccount', { replace: true })
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
    if (signchecker()) {
      return (
        // Go to user account when we are signed in
        navigate('/useraccount', { replace: true })
    )} else {
      return (
        <Paper style={styles.paperContainer}>
          <Box sx={{pt: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h3">Login</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{my:2}}>
                <TextField label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />

                </Box>
                <Box sx={{my:2}}>
                <TextField type= 'password' label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />

                </Box>
                <Button sx={{my:2}} fullWidth variant='contained' onClick = {login}>login</Button>
                <Button sx={{my:7}} fullWidth variant='contained' component={Link} to="/sign-up">Sign Up</Button>

              </Box>
              <Box m={1} pt={3}>
                <Link to="/forgotpassword" >
                  Forgot Password
                </Link>
              </Box>  
          </Box>
        </Paper>
    )
    }

}

export default SignIn;