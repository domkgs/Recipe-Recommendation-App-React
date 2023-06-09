import * as React from "react";
import Box from '@mui/material/Box';
import UserMenu from "../components/UserMenu";
import UserMealPlan from "../components/UserMealPlan";
import { Table, TableRow, TableCell } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

//const renderUserMealPlans = (user_mealPlans, index) => {
//  return <UserFavouritesCard key = {index} />
//}

const UserMealPlans = () => {
  const user_id = localStorage.getItem('userid');
  const [user_mealPlans, setMealPlans] = React.useState([]);

  const GetMealPlans = () => {
    var user_url = "http://localhost:8080/meal_plan/get_all";

    fetch(user_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        user_id: parseInt(localStorage.getItem('userid')),

      }
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            // sends alert message if response results in error
            alert(data.message);
            console.log(data);
          });
          throw new Error(response.status);
        } else {
          console.log('Response Good')
          return response.json();
        }
      })
      .then(data => {
        setMealPlans(data.meal_plans);
      })
      .catch((error) => {
        console.log('error: ' + error);
        //localStorage.setItem('token', '');
      });
  };
  GetMealPlans();
  if (user_mealPlans === 'undefined' || user_mealPlans.length === 0) {
    return (  
      <div>
        <Table sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none",}}}>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top', width: '300px' }}>
                <UserMenu /> 
            </TableCell>
            <Box sx={{ my: 2, mr: 4 }}>
              <TableCell style={{ width: '700px' }}>
                <UserMealPlan />
              </TableCell>
            </Box>
          </TableRow>
        </Table>
      </div>
    )
  } else {
    return (  
      <div>
        <Table sx={{[`& .${tableCellClasses.root}`]: {borderBottom: "none",}}}>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top', width: '300px' }}>
                <UserMenu /> 
            </TableCell>
            <Box sx={{ my: 2, mr: 4 }}>
              <TableCell style={{ width: '700px' }}>
                <UserMealPlan />
              </TableCell>
            </Box>
          </TableRow>
        </Table>
      </div>
    )
  }
};

export default UserMealPlans;