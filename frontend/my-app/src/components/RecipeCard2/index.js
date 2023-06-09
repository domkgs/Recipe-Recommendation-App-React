import * as React from "react";
import { Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material/';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Table, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";

// SCRAMBLED EGGS
const RecipeCard2 = () => { 
  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://www.seriouseats.com/thmb/jgtHxvyO8SEA7VqBISFOPz2W8EM=/880x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__20150511-scrambled-eggs-vicky-wasik-17-c96b9d65e3bc4b1097aa15b84721b4b9.jpg"
        />
      </CardActionArea>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            Scrambled Eggs
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
            <TableCell align='center'>5 min</TableCell>
            <TableCell align='center'>2/5</TableCell>
            <TableCell align='center'>148</TableCell>
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
export default RecipeCard2;