import React from 'react'
import { Box, Button, TextField } from '@mui/material/';
import { useNavigate }from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [resetcode, setResetCode] = React.useState('');
    const [newpassword, setNewPassword] = React.useState('');
    const [confirmnewpassword, setConfirmNewPassword] = React.useState('');

    const resetpassword = () => {
        fetch('http://localhost:8080/user/reset/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            reset_code: resetcode,
            password: newpassword,
            confirm_password: confirmnewpassword,
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
              navigate('/signin', { replace: true })
              return response.json();
            }
          })
          .then(data => {
            // set local storage of token and email
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
          })
          .catch((error) => {
            console.log('error: ' + error);
            localStorage.setItem('token', '');
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
           <Box m={1} pt={3}>
                <TextField label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)}/>
            </Box>
            <Box m={1} pt={3}>
                <TextField label="Reset Code" variant="outlined" value={resetcode} onChange={e => setResetCode(e.target.value)}/>
            </Box>
            <Box m={1} pt={3}>
                <TextField label="New Password" variant="outlined" value={newpassword} onChange={e => setNewPassword(e.target.value)}/>
            </Box>
            <Box m={1} pt={3}>
                <TextField label="Confirm New Password" variant="outlined" value={confirmnewpassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
            </Box>
            <Box m={2} pt={3}>
                <Button variant='contained' onClick={resetpassword}>Reset Password</Button>
            </Box>
        </div>
    );
};

export default ResetPassword;