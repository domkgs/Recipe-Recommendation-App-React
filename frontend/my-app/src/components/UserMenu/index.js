import * as React from "react";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

const UserMenu = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "300px"}}>
      <List>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link} to="/recipecontribution"
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Submit a Recipe" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link} to="/myrecipes"
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="My Recipes" />
        </ListItemButton>
        
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link} to="/favourites"
        >
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favourites" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link} to="/ingredientsets"
        >
          <ListItemIcon>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Ingredient Sets" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link} to="/mealplans"
        >
          <ListItemIcon>
            <DinnerDiningIcon />
          </ListItemIcon>
          <ListItemText primary="Meal Plans" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default UserMenu;