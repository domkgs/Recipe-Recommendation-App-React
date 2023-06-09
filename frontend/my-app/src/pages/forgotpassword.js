import React from 'react'
import { Box, Button, TextField, Paper, Typography } from '@mui/material/';
import { useNavigate }from "react-router-dom";
import Image from "./images/41.jpeg";
const styles = {
  paperContainer: {
      backgroundSize:'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
      height: 500,
      width: 1024,
  }
};

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');

    const getresetemail = () => {
        fetch('http://localhost:8080/user/forgot/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
          })
        })
          .then(response => {
            if (!response.ok) {
              response.json().then(data => {
                // sends alert message if response results in error
                alert(data.message);
              });
              throw new Error(response.status);
            } else {
              // navigate to listings page if response is successful
              console.log('it is ok')
              navigate('/resetpassword', { replace: true })
              return response.json();
            }
          })
          .catch((error) => {
            console.log('error: ' + error);
          });
      };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
          <Paper style={styles.paperContainer}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center">
              <Typography variant="h3">Forgot Password</Typography>
            </Box>
            <Box m={1} pt={3}
              display="flex"
              justifyContent="center"
              alignItems="center">
                <TextField label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)}/>
            </Box>
            <Box m={2} pt={3}
              display="flex"
              justifyContent="center"
              alignItems="center">
                <Button variant='contained' onClick={getresetemail}>Send Reset Link to my email</Button>
            </Box>
          </Paper>
        </div>
    );
};

export default ForgotPassword;