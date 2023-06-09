import React from 'react';
import SplitPane, { Pane } from "react-split-pane";
import './splitpane.css'
import { Table, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import signchecker from './signchecker'
import { Card, CardContent, CardActionArea, CardMedia, CardActions, TextField } from '@mui/material';
import { Box, Grid, Button, Typography, Stack, Paper } from '@mui/material';
import Select  from 'react-select';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Image from "./images/41.jpeg";
const styles = {
  paperContainerR: {
      backgroundSize: 'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
  }
};

const RecipeExplorer = () => {
  const [ingredient, setIngredient] = React.useState([]);
  const [theIngredientsArray, setTheIngredientsArray] = React.useState([]);
  const [theIngredientsArray2, setTheIngredientsArray2] = React.useState([]);
  const [theIngredientArray, setTheIngredientArray] = React.useState([]);
  const [closerecipes, setCloseRecipes] = React.useState([]);
  const [cuisines, setCuisine] = React.useState([]);
  const [mealtype, setMealType] = React.useState([]);
  const [diet, setDiet] = React.useState([]);
  const [time, setTime] = React.useState([]);
  const [seasonal, setSeasonal] = React.useState([]);
  const [method, setMethod] = React.useState([]);
  const [recipetagscat, setRecipeTagsCat] = React.useState([]);
  const [recipetagscat2, setRecipeTagsCat2] = React.useState([]);
  const [ingredientsetname, setIngredientSetName] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedValue2, setSelectedValue2] = React.useState('all_ingredients');
  const [ingredientsets, setIngredientSet] = React.useState([]);
  const navigate = useNavigate();


  const options = [
    { value: cuisines, label: 'Cuisine' },
    { value: mealtype, label: 'Meal Type' },
    { value: diet, label: 'Diet' },
    { value: seasonal, label: 'Seasonal' },
    { value: method, label: 'Method' },
    { value: time, label: 'Time' },
  ]

  const handleChange = e => {
    setSelectedValue(e);
  }

  const handleChangeCat2 = e => {
    setSelectedTags(e);
  }

  const handleChange2 = e => {
    setSelectedValue2(e.value);
  }

  const handleChangeCat = (e) => {
    setRecipeTagsCat(e.value);
  };

  const searchrecipe = () => {
    fetch('http://localhost:8080/recipe/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients_list: selectedValue.map(({value})=>value),
        filters: selectedTags.map(({value})=>value),
      })
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            alert(data.message);
          });
          throw new Error(response.status);
        } else {
          console.log('it is ok')
          alert('Recipe Successfully Searched');
          return response.json();
        }
      })
      .then(data => {
        setCloseRecipes(data.close_recipes);
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const saveingredientset = () => {
    fetch('http://localhost:8080/ingredients/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: ingredientsetname,
        user_id: parseInt(localStorage.getItem('userid')),
        ingredients_list: selectedValue.map(({value})=>value),

      })
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            alert(data.message);
          });
          throw new Error(response.status);
        } else {
          console.log('it is ok')
          alert('Ingredient Set Saved');
          getingredientset();
          return response.json();
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const getingredientset = async () => {
      await fetch('http://localhost:8080/ingredients/get/all/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: parseInt(localStorage.getItem('userid')),
      })
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
          });
          throw new Error(response.status);
        } else {
          console.log('it is ok')
          return response.json();
        }
      })
      .then(data => {
        setIngredientSet(data.sets);
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const savefavs = (recipeidentity) => {
    fetch('http://localhost:8080/user/favourites/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: parseInt(localStorage.getItem('creatorID')),
        recipe_id: parseInt(recipeidentity),
      })
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            console.log(parseInt(recipeidentity))
            alert(data.message);
          });
          throw new Error(response.status);
        } else {
          console.log('it is faved')
          alert('You have faved this recipe')
          return response.json();
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const handleClickFav = (e, value) => {
    e.preventDefault();
    savefavs(value);
  }

  function handleClick(e) {
    e.preventDefault();
    if (theIngredientArray.includes(e.target.value)) {
      setTheIngredientArray(theIngredientArray.filter(item => item !== e.target.value));
    } else {
      setTheIngredientArray([...theIngredientArray, e.target.value]);
    }
    console.log(e.target.value);
  }

  function handleClickIngredientSet(e, ingredients) {
    e.preventDefault();
    let list = ingredients;
    var ingredients_list = [];

    for (let i = 0; i < list.length; i++) {
      var dict = {value: list[i], label: list[i]};
      ingredients_list.push(dict);
    }
    console.log(ingredients_list);
    setSelectedValue(ingredients_list);
  }

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

  const myFunction = async () => {
    const r = await fetch('http://localhost:8080/ingredients/list');
    const data = await r.json();
    setIngredient(Object.entries(data));

  };

  React.useEffect(() => {
    myFunction();
    myFunction2();
    getingredientset();
  },[]);

  React.useEffect(() => {
    let list = ingredient;
    var ingredients_list = [];
    for (let i = 0; i < list.length; i++) {
      var dict = {value: list[i][0], label: list[i][0]};
      ingredients_list.push(dict);
    }
    setTheIngredientsArray(ingredients_list);
    console.log(theIngredientsArray);
    console.log(ingredientsets)
  },[ingredient, ingredientsets]);

  React.useEffect(() => {
    let list = ingredient;
    var ingredients_list = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i][0] == selectedValue2) {
        for (let j = 0; j < list[i][1].length; j++) {
          var dict = {value: list[i][1][j], label: list[i][1][j]};
          ingredients_list.push(dict);
        }
      }
    }

    setTheIngredientsArray2(ingredients_list);
    console.log(ingredients_list)
    console.log(selectedValue2);
  },[ingredient, selectedValue2]);

  React.useEffect(() => {
    let list = recipetagscat;
    var ingredients_list = [];

    for (let i = 0; i < list.length; i++) {
      var dict = {value: list[i], label: list[i]};
      ingredients_list.push(dict);
    }
    setRecipeTagsCat2(ingredients_list);
  },[recipetagscat]);

  return (
    <SplitPane split="vertical" minSize={200} defaultSize={400} maxSize={600}>
      <Pane style={{ height: "119vh", overflowY: 'scroll'}}>
        <Box sx={{ display: "flex", m: 5, justifyContent: "center"}}>
          <Stack spacing={4} sx={{ width: "100%" }}>
          <Typography variant="h7">Ingredient Category</Typography>
          <Select defaultValue={{ label: "all_ingredients", value: 'all_ingredients' }} options={theIngredientsArray} onChange={handleChange2} />
          <Typography variant="h7">Ingredients</Typography>
          <Select isMulti value= {selectedValue} options={theIngredientsArray2} onChange={handleChange} />
          <Typography variant="h7">Filter Category</Typography>
          <Select  options={options} onChange={handleChangeCat} />
          <Typography variant="h7">Filters</Typography>
          <Select isMulti value= {selectedTags} options={recipetagscat2} onChange={handleChangeCat2} />
          <Button fullWidth variant="contained" onClick={searchrecipe}>Find Recipes</Button>
          <Typography variant="h4">Ingredient Sets</Typography>
          {signchecker() ? (
           <Button sx={{ mr: 2 }} variant="outlined" onClick= {saveingredientset}>Save Ingredient Set</Button>
          ) : (
            <Button sx={{ mr: 2 }} variant="outlined">You are not logged in</Button>
          )}

          {signchecker() ? (
           <TextField label="Ingredient Set Name" id="outlined-basic" variant="outlined" value={ingredientsetname} onChange={e => setIngredientSetName(e.target.value)}/>
          ) : (
            null
          )}

            {ingredientsets.map((listing, idx) => {
            // Loop to determine Average SVG rating for display for each Listing
            return (
              <Card key={idx}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {listing.name}
                  </Typography>
                  <Grid container spacing={1}>
                    {listing.ingredients.map((listing2, idx2) => {

                      return (
                        <Grid item key= {idx2}>
                          <Typography gutterBottom variant="h7" component="div">
                            {listing2}
                          </Typography>
                        </Grid>
                      )
                    })}

                    <Button sx={{ mr: 1 }} variant="outlined" onClick={(event) => handleClickIngredientSet(event, listing.ingredients)}>Use Ingredient Set</Button>
                  </Grid>
                </CardContent>
              </Card>
            )
            })}
          </Stack>
        </Box>
      </Pane>
    <Paper style={styles.paperContainerR}>
    <Pane style={{ height: '119vh', overflowY: 'scroll'}}>
      <Box>
        <Box sx={{ display: "flex", m: 5, justifyContent: "center"}}>
          <Typography variant="h4">{closerecipes.length} Recipes Found</Typography>
        </Box>
        <Box sx={{ display: 'flex', m: 5 , justifyContent: 'center'}}>
          <Grid container spacing={4}>
            {closerecipes.map((recipe, i) => {
              return (
                <Grid item key={i}>
                <Card sx={{ width: 345, height: 500 }}>
                  <CardActionArea onClick= {() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                    <CardMedia
                      src= {recipe.image}
                      component="img"
                      height="200"
                    />
                  </CardActionArea>

                  <CardContent>
                  <Box sx = {{
                          display: 'flex',
                          width: '100%',

                      }}>
                      <Box sx = {{
                          typography : 'body1',
                          display: 'flex',
                          width: '80%',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'auto',
                      }}>

                      {recipe.title}
                      </Box>

                      <Box sx = {{
                          display: 'flex',
                          width: '10%',
                          ml: 3,
                          whiteSpace: 'nowrap',

                      }}>
                      <IconButton  onClick={e => handleClickFav(e, recipe.recipe_id)}>

                        <FavoriteIcon />
                      </IconButton>
                      </Box>
                    </Box>
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
                        <TableCell align='center'>{recipe.time} min</TableCell>
                        <TableCell align='center'>{recipe.difficulty}</TableCell>
                        <TableCell align='center'>{recipe.calories}</TableCell>
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
                  <Box sx={{ml: 2, mb: 2, width: "100%", display: "flex", alignItems: "center"}} >
                  <CardActions>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'left'}}>
                    <Typography >Missing ingredients</Typography>
                  </Box>
                  <Box >
                    <Grid container
                      spacing={1}
                      sx={{alignItems: 'center'}}>
                    {recipe.missing_ingredients.map((missing, idx) => {
                      // Loop to determine Average SVG rating for display for each Listing
                      return (

                        <Grid item key={idx}>
                          <Chip label={missing} variant="outlined"/>
                        </Grid>


                      )
                    })}
                    </Grid>
                   </Box>
                   </Box>
                  </CardActions>
                  </Box>
                  </Box>
                </Card>
                </Grid>

              )
            })}
          </Grid>
        </Box>
      </Box>
    </Pane>
    </Paper>
  </SplitPane>
  );
};

export default RecipeExplorer;
