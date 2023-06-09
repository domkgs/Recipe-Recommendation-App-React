import { Box, Grid, Button, Typography } from '@mui/material';
import React from 'react';
import RecipeCard from "./RecipeCard";
import RecipeCard2 from './RecipeCard2';
import FilterBar from "./FilterBar";


const RecipeList = () => {
  return (    
    <div>
        <Box sx={{ display: "flex", m: 5, justifyContent: "center"}}>
          <Typography variant="h4">X Recipes Found</Typography>
        </Box>
        <Box sx={{ display: "flex", m: 5, spacing: "1" }}>
          <Button sx={{ mr: 2 }} variant="outlined">View my pantry</Button>
          <FilterBar />
        </Box>
        <Box sx={{ m: 5 }}>
          <Grid container spacing={4}>
            <Grid item><RecipeCard /></Grid>
            <Grid item><RecipeCard2 /></Grid>

          </Grid>
        </Box>
    </div>
  );
};

export default RecipeList;