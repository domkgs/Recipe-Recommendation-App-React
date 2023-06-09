import * as React from "react";
import Box from '@mui/material/Box';
import UserMenu from "../components/UserMenu";
import IngredientSet from "../components/IngredientSet";
import { Table, TableRow, TableCell, Grid } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import UserProfile from './useraccount';


const renderUserIngSetsCard = (user_IngSets, index) => {
  return <IngredientSet key = {index} ings={user_IngSets} />
}

const Useringredientsets = () => {
  const user_id = localStorage.getItem('userid');
  const [user_IngSets, setIngSets] = React.useState([]);

  const UserIngSets = () => {
    fetch('http://localhost:8080/ingredients/get/all/sets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: parseInt(localStorage.getItem('userid')),
    })
  })
    .then(response => {
      if (!response.ok) {
        response.json().then(data => {
        });
        throw new Error(response.status);
      } else {
        console.log('it is ok')
        return response.json();
      }
    })
    .then(data => {
      setIngSets(data.sets);
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
  };

  UserIngSets();
  var emptyCaseIngSet = [{
    'name': "Saved Ingredient Sets Go Here!",
    'ingredients': ["Saved","Ingredient","Sets","Go","Here!"]
  }];

  var exampleIngSet = [{
              'name': "string1",
              'ingredients': ["he","lo","mon"]
            },
            {
              'name': "string2",
              'ingredients': ["he","lo","mon"]
            },
            {
              'name': "string3",
              'ingredients': ["he","lo","mon"]
            },
            {
              'name': "string4",
              'ingredients': ["he","lo","mon"]
            }];
  console.log(user_IngSets);
  console.log("Checker");
  if (typeof user_IngSets === 'undefined' || user_IngSets.length === 0) {
    return (    
      <div>
        <Table sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none",}}}>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top', width: '300px' }}>
                <UserMenu /> 
            </TableCell>
            <Box sx={{ my: 2, mr: 4 }}>
              <Grid container 
                      justifyContent="flex-start" 
                      spacing={4}
                      direction="row">
                {emptyCaseIngSet.map(renderUserIngSetsCard)}
              </Grid>
            </Box>
          </TableRow>
        </Table>
      </div>
    )
  } else {
    return (    
      <div>
        <Table sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none",}}}>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top', width: '300px' }}>
                <UserMenu /> 
            </TableCell>
            <Box sx={{ my: 2, mr: 2 }}>
              <Grid container 
                      justifyContent="flex-start" 
                      spacing={4}
                      direction="row">
                {user_IngSets.map(renderUserIngSetsCard)}
              </Grid>
            </Box>
          </TableRow>
        </Table>
      </div>
    );
  }

};

export default Useringredientsets;