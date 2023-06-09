import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { NavLink as Link }from "react-router-dom";

const RemoveIngSet = (ingSetName) => {
  //const [user_IngSets, setIngSets] = React.useState([]);
  const user_id = localStorage.getItem('userid');

  fetch("http://localhost:8080/ingredients/remove/set", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: parseInt(localStorage.getItem('userid')),
      name: ingSetName,
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
        console.log('Response Good')
        return response.json();
      }
    })
    .catch((error) => {
      console.log('error: ' + error);
      //localStorage.setItem('token', '');
    });
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const renderIngSetsItems = (user_IngSets, index) => {
  return (<Grid item key = {index}>
            <Item>{user_IngSets}</Item>
          </Grid>
         )
}

const IngredientSet = (props) => {
  const user_IngSets = props.ings.ingredients;
  console.log(props.ings.name);
  // props.ingredients;
  return (
    <Grid item>
      <Stack 
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Item>
          <Box sx={{ width: 345 }}>
            <Box 
              sx=
              {{
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: 'center'
              }}
            >
              <Typography variant='h5'>
                {props.ings.name}
              </Typography>
              <IconButton onClick = {() => RemoveIngSet(props.ings.name)} component={Link} to="/ingredientsets">
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
              <Grid 
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >          
                {user_IngSets.map(renderIngSetsItems)}
              </Grid>
            </Box>
          </Box>
        </Item>
      </Stack>
    </Grid>
  );
};

export default IngredientSet;