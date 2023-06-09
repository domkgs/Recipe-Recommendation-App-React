import * as React from "react";
import Box from '@mui/material/Box';
import UserMenu from "../components/UserMenu";
import UserRecipeCard from "../components/UserRecipeCard";
import { Grid, Table, TableRow, TableCell, Paper } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import UserProfile from './useraccount';
import Image from "./images/41.jpeg";

const styles = {
  paperContainer: {
      height : 1024,
      backgroundSize: 'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
  }
};
const renderUserRecipeCard = (user_savedRecipes, index) => {
  return <UserRecipeCard key = {index} 
                         recName = {user_savedRecipes.title} 
                         recImg = {user_savedRecipes.image}
                         recID = {user_savedRecipes.recipe_id}  />
}

const Userrecipes = () => {
  const user_id = localStorage.getItem('userid');
  const [user_savedRecipes, setSavedRecipes] = React.useState([]);

  const UserSavedRecipes = () => {
    var user_url = "http://localhost:8080/user/get/created_recipes?user_id=" + user_id;

    if (user_id == "") {
      user_url = 'http://localhost:8080/user/get/created_recipes';
    }

    fetch(user_url, {
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
          console.log('Response Good');
          return response.json();
        }
      })
      .then(data => {
        setSavedRecipes(data.created_recipes);
      })
      .catch((error) => {
        console.log('error: ' + error);
        //localStorage.setItem('token', '');
      });
  };

  UserSavedRecipes();
  console.log("Checker");

  if ((typeof user_savedRecipes === 'undefined') || (user_savedRecipes.length === 0)) {
    console.log("Undefined Case")
    return (
      <div>
      <Paper style={styles.paperContainer}>
        <Table sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none",}}}>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top', width: '300px' }}>
                <UserMenu />
            </TableCell>
            <TableCell>
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="flex-start" spacing={4}>
                  <Grid item >
                    <UserRecipeCard recName = "Added Recipes go here!" recImg = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg" />
                  </Grid>
                </Grid>
              </Box>
            </TableCell>
          </TableRow>
        </Table>
        </Paper>
      </div>
    )
  } else {
    console.log("Defined Case");
    console.log(user_savedRecipes);
    return (
      <div>
      <Paper style={styles.paperContainer}>
        <Table sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none",}}}>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top', width: '300px' }}>
                <UserMenu />
            </TableCell>
            <TableCell>
              <Box sx={{ my: 2 }}>
                <Grid container
                      justifyContent="flex-start"
                      spacing={4}
                      direction="row">
                  {user_savedRecipes.map(renderUserRecipeCard)}
                </Grid>
              </Box>
            </TableCell>
          </TableRow>
        </Table>
      </Paper>
      </div>
    )
  }
};

export default Userrecipes;
