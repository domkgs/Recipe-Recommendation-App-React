import * as React from "react";
import { Card, CardContent, Button, Grid } from '@mui/material/';
import Typography from '@mui/material/Typography';



const IngredientsCard2 = () => { 
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
            Dairy
        </Typography> 
        <Grid container spacing={1}>
          <Grid item>
            <Button variant='outlined' value = 'Milk' onClick={handleChangeButton}>Milk</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    

  );
};
export default IngredientsCard2;