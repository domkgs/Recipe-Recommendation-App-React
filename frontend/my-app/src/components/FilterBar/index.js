import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Link, useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "alpha(theme.palette.common.white, 0.15)",
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
  

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'primary',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function FilterBar({childToParent}) {
  
  const [cuisines, setCuisine] = React.useState([]);
  const [mealtype, setMealType] = React.useState([]);
  const [diet, setDiet] = React.useState([]);
  const [time, setTime] = React.useState([]);
  const [seasonal, setSeasonal] = React.useState([]);
  const [method, setMethod] = React.useState([]);
  const [recipetagscat, setRecipeTagsCat] = React.useState([]);
  const [recipetags, setRecipeTags] = React.useState('');
  const [theTagsArray, setTheTagsArray] = React.useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };   
  const handleChangeCat = (e) => {
    setRecipeTagsCat(e.target.value);
  };
  const handleChangeTags = (e) => {
    setRecipeTags(e.target.value);
  };

  function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
  }

  const AddTags = () => {
    setTheTagsArray([...theTagsArray, recipetags]);
    childToParent(theTagsArray);
    alert("Tag Succesfully Added");
  };

  const myFunction2 = async () => {
    const r = await fetch('http://localhost:8080/tags/list');
    const data = await r.json();
    setCuisine(data.Cuisines);
    setDiet(data.Diet);
    setMealType(data.MealType);
    setSeasonal(data.Seasonal);
    setTime(data.Time);
    setMethod(data.Method);
  };

  React.useEffect(() => {
    myFunction2();
  },[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", m: 5, justifyContent: "center"}}>
        <Typography variant="h4">Filters Added</Typography>
      </Box>
      {theTagsArray.map((listing, idx) => {
        return (
            <Box display="flex" justifyContent="center" key={idx}>
              <Box>
                {listing}
              </Box>
            </Box>
          )
        })}
      <AppBar position='flex' style={{ background: '#E4E4E4' }}>
        <Toolbar>
          <Box>
              <InputLabel id="demo-simple-select-label">Filter Category</InputLabel>
              <Select
              style = {{minWidth: 220}}
              labelId="demo-simple-select-label"
              id="cat"
              value={recipetagscat}
              size="small"
              onChange={handleChangeCat}
              >
                <MenuItem value = {cuisines}>
                  Cuisine
                </MenuItem>
                <MenuItem value = {mealtype}>
                  Meal Type
                </MenuItem>
                <MenuItem value = {diet}>
                  Diet
                </MenuItem>
                <MenuItem value = {seasonal}>
                  Seasonal
                </MenuItem>
                <MenuItem value = {method}>
                  Method
                </MenuItem>
                <MenuItem value = {time}>
                  Time
                </MenuItem>

              </Select>
              <InputLabel id="demo-simple-select">Filters</InputLabel>
              <Select
                style = {{minWidth: 220}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={recipetags}
                label="Ingredient"
                size="small"
                onChange={handleChangeTags}
              >
                {recipetagscat.map((listing, idx) => {
                // Loop to determine Average SVG rating for display for each Listing
                return (
                  <MenuItem key={idx} value = {listing}>
                    {listing}
                  </MenuItem>
                )
                })}
              </Select>
              <Button variant="contained" onClick={AddTags}>Add</Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button', }}
              >

                
                {cuisines.map((listing, idx) => {
                // Loop to determine Average SVG rating for display for each Listing
                return (
                  <MenuItem key={idx} value = {listing}>
                    {listing}
                  </MenuItem>
                )
                })}
                {mealtype.map((listing, idx) => {
                // Loop to determine Average SVG rating for display for each Listing
                return (
                  <MenuItem key={idx} value = {listing}>
                    {listing}
                  </MenuItem>
                )
                })}
                {diet.map((listing, idx) => {
                // Loop to determine Average SVG rating for display for each Listing
                return (
                  <MenuItem key={idx} value = {listing}>
                    {listing}
                  </MenuItem>
                )
                })}
                {seasonal.map((listing, idx) => {
                // Loop to determine Average SVG rating for display for each Listing
                return (
                  <MenuItem key={idx} value = {listing}>
                    {listing}
                  </MenuItem>
                )
                })}
                {method.map((listing, idx) => {
                // Loop to determine Average SVG rating for display for each Listing
                return (
                  <MenuItem key={idx} value = {listing}>
                    {listing}
                  </MenuItem>
                )
                })}
              </Menu>
          </Box>
          <Box sx={{ marginLeft: "auto"}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}