import * as React from "react";
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material/';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
//"../../../../public/JaidsCookbook.png";
//onClick= {() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}

const UserRecipeCard = (props) => {
  var recipeImg = props.recImg;
  console.log("This is from UserRecipeCard");
  console.log(props.recImg);
  const navigate = useNavigate();
  if (recipeImg == "") {
    recipeImg = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
  }
  return(
    <Grid item>
      <Card sx={{ width: 345 }}>
        <CardActionArea onClick= {() => navigate('/recipedetails/' + props.recID, { replace: true })}>
          <CardMedia
            component="img"
            height="200"
            image={recipeImg}
          />
        </CardActionArea>

        <CardContent>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>       
            <Typography variant="body1">{props.recName}</Typography>
          </Box>
        </CardContent> 
      </Card>  
    </Grid>
  );
};
export default UserRecipeCard;