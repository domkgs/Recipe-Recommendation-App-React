import * as React from "react";
import UserMenu from "../components/UserMenu";
import ContributionTable from "../components/ContributionTable";
import Box from '@mui/material/Box';
import { Table, TableRow, TableCell, Paper } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import Image from "./images/41.jpeg";

const styles = {
  paperContainer: {
      backgroundSize: 'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'top right',
  }
};
const Recipecontribution = () => {
  return (
    <Paper style={styles.paperContainer}>
      <Table sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none",}}}>
        <TableRow>
          <TableCell style={{ verticalAlign: 'top', width: '300px'}}>
              <UserMenu />
          </TableCell>
          <Box>
            <TableCell>
              <ContributionTable />
            </TableCell>
          </Box>

        </TableRow>

      </Table>
      </Paper>


  );
};

export default Recipecontribution;
