import * as React from "react";
import UserRecipeCard from "../components/UserRecipeCard";
import { Grid, Typography, Card, CardContent, CardMedia, CardActionArea, Box, IconButton, Paper } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { NavLink as Link } from "react-router-dom";
import { red } from '@mui/material/colors';
import Image from "./images/41.jpeg";
const styles = {
  paperContainer: {
      backgroundSize:'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
      height: 1024,
  }
};

const renderUserRecipeCard = (user_savedRecipes, index) => {
  return <UserRecipeCard key={index} recName={user_savedRecipes.title} recImg={user_savedRecipes.image} />
}

const UserMyProfile = () => {
  const user_id = localStorage.getItem('userid');
  const [user_savedRecipes, setSavedRecipes] = React.useState([]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper style={styles.paperContainer}>
        <Grid container
          justifyContent="center"
          rowSpacing={1}
          columnSpacing={1}
          alignItems="center"
          direction="row"
          sx={{ m: 2 }}>
          <Grid item xs={12}
            display="center"
            justifyContent="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center">
              <Typography variant="h3">My Profile</Typography>
            </Box>
          </Grid>
          <Grid item xs={5}
            display="center"
            justifyContent="center">
            <IconButton component={Link} to="/myrecipes" sx={{ color: red[500] }}>
              <MenuBookIcon sx={{ fontSize: 200 }} />
            </IconButton>
            <CardContent component={Link} to="/myrecipes">
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <Typography display="center"
                            justifyContent="center" 
                            variant="body1">My Recipes</Typography>
              </Box>
            </CardContent>
          </Grid>
          <Grid item xs={5}
            display="center"
            justifyContent="center">
            <IconButton component={Link} to="/favourites" sx={{ color: red[500] }}>
              <FavoriteIcon sx={{ fontSize: 200 }} />
            </IconButton>

            <CardContent component={Link} to="/favourites">
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <Typography align="center" variant="body1">My Favourites</Typography>
              </Box>
            </CardContent>
          </Grid>
          <Grid item xs={5}
            display="center"
            justifyContent="center">
            <IconButton component={Link} to="/ingredientsets" sx={{ color: red[500] }}>
              <RestaurantIcon sx={{ fontSize: 200 }} />
            </IconButton>

            <CardContent component={Link} to="/ingredientsets">
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <Typography align="center" variant="body1">My Ingredient Sets</Typography>
              </Box>
            </CardContent>
          </Grid>
          <Grid item xs={5}
            display="center"
            justifyContent="center">
            <IconButton component={Link} to="/mealplans" sx={{ color: red[500] }}>
              <DinnerDiningIcon sx={{ fontSize: 200 }} />
            </IconButton>

            <CardContent component={Link} to="/mealplans">
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <Typography align="center" variant="body1">My Meal Plans</Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
};

export default UserMyProfile;