import * as React from "react";
import { Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material/';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Table, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";

// PANCAKES
const RecipeCard = ({ title, time, difficulty, calories }) => { 
  
                  

    return (
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
        />
      </CardActionArea>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {title}
          <IconButton aria-label="favourite">
            <FavoriteBorderIcon />
          </IconButton> 
        </Typography> 
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            }
          }}
        >
          <TableRow>
            <TableCell align='center'>Time</TableCell>
            <TableCell align='center'>Difficulty</TableCell>
            <TableCell align='center'>Calories</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center'>{time} min</TableCell>
            <TableCell align='center'>{difficulty}</TableCell>
            <TableCell align='center'>{calories}</TableCell>
          </TableRow>
        </Table>
      </CardContent>
      <Box 
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100px",
          borderTop: 1,
          borderColor: "grey"
        }}  
      >   
      <CardActions>
        <Typography>
            You have all ingredients 
        </Typography>
      </CardActions>
      </Box>
    </Card>           
    );
};
export default RecipeCard;