import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const UserMealPlan = () => {
  return (
    <Stack 
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <Item>
        <Box sx={{ m : 2 }}>
          <Box 
            sx=
            {{
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: 'center'
            }}
          >
            <Typography variant='h5'>
              Saved Meal Plan Name
            </Typography>
            <IconButton>
              <ClearIcon />
            </IconButton>
          </Box>
          
          <Box
            sx=
            {{
              display: "flex",
              mt: 2
            }}
          >
            Insert table here
          </Box>
        </Box>
      </Item>
    </Stack>
  );
};

export default UserMealPlan;