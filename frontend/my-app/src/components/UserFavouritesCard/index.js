import * as React from "react";
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material/';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { NavLink as Link, useNavigate }from "react-router-dom";

const UserFavouritesCard = (props) => { 
  var recipeImg = props.recImg;
  const navigate = useNavigate();

  const RemoveFav = (props) => {
    const user_id = localStorage.getItem('userid');
    console.log("am i getting ingredients");
    fetch("http://localhost:8080/user/favourites/remove", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user_id: parseInt(localStorage.getItem('userid')),
          recipe_id: parseInt(props.recID),
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
        console.log('Response Good');
        return response.json();
      }
    })
    .catch((error) => {
      console.log('error: ' + error);
      //localStorage.setItem('token', '');
    });    
  };

  const handleChangeStateClick = () => {
    RemoveFav(props);
    props.onChangeSomeState("Some New State");
    navigate('/favourites', { replace: true })
  };

  if (recipeImg == "") {
    recipeImg = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
  }

  return(
    <Grid item>
      <Card sx={{ width: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={recipeImg}
            onClick= {() => navigate('/recipedetails/' + props.recID, { replace: true })}
          />
        </CardActionArea>

        <CardContent>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>       
            <Typography variant="body1">{props.recName}</Typography>
            <IconButton 
              onClick={handleChangeStateClick}
              value="Change state from Child"
              >
                <FavoriteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

};
export default UserFavouritesCard;