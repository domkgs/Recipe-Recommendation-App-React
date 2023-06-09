import * as React from "react";
import { Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material/';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Table, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";

// CANDIED BACON
const RecipeCard3 = () => { 
  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9283752.jpg&w=595&h=595&c=sc&poi=face&q=60"
        />
      </CardActionArea>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            Candied Bacon
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
            <TableCell align='center'>15 min</TableCell>
            <TableCell align='center'>1/5</TableCell>
            <TableCell align='center'>210</TableCell>
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
export default RecipeCard3;