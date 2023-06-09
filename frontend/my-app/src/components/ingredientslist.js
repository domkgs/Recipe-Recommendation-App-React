import React from 'react';
import IngredientsCard from "./IngredientsCard/ingredientsCard";
import IngredientsCard2 from "./IngredientsCard/ingredientsCard2";
import IngredientsCard3 from "./IngredientsCard/ingredientsCard3";
import { Table, TableRow } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";
import { Box } from '@mui/material';

const IngredientsList = () => {
  return ( 
    <Box sx={{ display: "flex", m: 5, justifyContent: "center"}}>
      <Table>
        <TableRow>
          <IngredientsCard />
        </TableRow>
        <TableRow>
          <IngredientsCard2 />
        </TableRow>
        <TableRow>
          <IngredientsCard3 />
        </TableRow>
      </Table>
    </Box>
  );
};

export default IngredientsList;