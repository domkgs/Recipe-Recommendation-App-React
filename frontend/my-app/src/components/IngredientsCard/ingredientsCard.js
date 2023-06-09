import * as React from "react";
import { Card, CardContent, Button, Grid } from '@mui/material/';
import Typography from '@mui/material/Typography';
import { Table, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";


const IngredientsCard = ([list]) => {

  return(
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            Poultry
        </Typography> 
        <Grid container spacing={1}>
          <Grid item>
            <Button variant='outlined' value = 'Egg' >Egg</Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' value = 'Chicken' >Bacon</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  );
};
export default IngredientsCard;