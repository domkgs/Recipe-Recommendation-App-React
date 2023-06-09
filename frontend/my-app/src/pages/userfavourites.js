import * as React from "react";
import Box from '@mui/material/Box';
import UserMenu from "../components/UserMenu";
import UserFavouritesCard from "../components/UserFavouritesCard";
import { Grid, Table, TableRow, TableCell, Paper } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import UserProfile from './useraccount';
import { useNavigate } from "react-router";
import Image from "./images/41.jpeg";

const styles = {
  paperContainer: {
      backgroundSize: 'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
  }
};
const renderUserFavouritesCard = (user_favouritesRecipes, index) => {
  return <UserFavouritesCard key = {index} recID = {user_favouritesRecipes.recipe_id} recName = {user_favouritesRecipes.title} recImg = {user_favouritesRecipes.image} />
}

const Userfavourites = () => {
  const user_id = localStorage.getItem('userid');
  const [user_favouritedRecipes, setFavRecipes] = React.useState([]);
  const [someState, setSomeState] = React.useState("Initial Some State");
  const navigate = useNavigate();
  var user_url = "http://localhost:8080/user/favourites/get?user_id=" + user_id;
  if (user_id == "") {
    user_url = 'http://localhost:8080/user/favourites/get';
  }
  console.log(someState);

  const onChangeSomeState = (newSomeState) => {
    setSomeState(newSomeState);
  };

  const renderUserFavouritesCard = (user_favouritesRecipes, index) => {
    return <UserFavouritesCard key = {index} 
                               recID = {user_favouritesRecipes.recipe_id} 
                               recName = {user_favouritesRecipes.title} 
                               recImg = {user_favouritesRecipes.image} 
                               someState={someState}
                               onChangeSomeState={onChangeSomeState}
                               />
  }

  const UserFavouritedRecipes = async () => {
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
          console.log('Response Good')
          setSomeState("Initial Some State");
          return response.json();
        }
      })
      .then(data => {
        setFavRecipes(data.favourites);
      })
      .catch((error) => {
        console.log('error: ' + error);
        //localStorage.setItem('token', '');
      });

  };

  React.useEffect(() => {
    UserFavouritedRecipes();
  },[someState]);
  console.log("Checker");

  if (typeof user_favouritedRecipes === 'undefined' || user_favouritedRecipes.length === 0) {
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
                  <Grid item>
                    <UserFavouritesCard recName = "Favourited Recipes go here!" 
                                        recImg = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                                        />
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
                  {user_favouritedRecipes.map(renderUserFavouritesCard)}
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

export default Userfavourites;
