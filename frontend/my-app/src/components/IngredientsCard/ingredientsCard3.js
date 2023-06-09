import * as React from "react";
import { Card, CardContent, Button } from '@mui/material/';
import Typography from '@mui/material/Typography';
import { Table, TableRow, Grid } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";


const IngredientsCard3 = () => { 
    const handleChangeButton = (e) => {
        if (localStorage.getItem(e.currentTarget.value) == 'true') {
            localStorage.setItem(e.currentTarget.value, 'false');
        } else {
            localStorage.setItem(e.currentTarget.value, 'true');
        }
        console.log(localStorage.getItem(e.currentTarget.value));
    }
  return(
    <Card>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            Baking
        </Typography> 
        <Grid container spacing={1}>
          <Grid item>
            <Button variant='outlined' value = 'Flour' onClick={handleChangeButton}>Flour</Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' value = 'Sugar' onClick={handleChangeButton}>Sugar</Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' value = 'Oil' onClick={handleChangeButton}>Oil</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  );
};
export default IngredientsCard3;