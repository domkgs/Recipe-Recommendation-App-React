import React, { createRef, useState } from 'react';
import SplitPane, { Pane } from "react-split-pane";
import './splitpane.css'
import { Table, TableRow, TableHead, TableBody, IconButton, Paper } from '@mui/material';
import TableCell from "@mui/material/TableCell";
import signchecker from './signchecker'
import { Card, CardContent, CardActionArea, CardMedia, CardActions, TextField } from '@mui/material';
import { Box, Grid, Button, Typography, Stack  } from '@mui/material';
import Select  from 'react-select';
import html2canvas from 'html2canvas';
import RefreshIcon from '@mui/icons-material/Refresh';
import Pagination from '@mui/material/Pagination';
import Image from "./images/41.jpeg";
import { useNavigate } from 'react-router-dom';


const MealPlanner = () => {

  const [ingredient, setIngredient] = React.useState([]);
  const [theIngredientsArray, setTheIngredientsArray] = React.useState([]);
  const [theIngredientArray, setTheIngredientArray] = React.useState([]);
  const [theFiltersArray, setTheFiltersArray] = React.useState([]);
  const [theRecipeArray, setTheRecipeArray] = React.useState();
  const [theIngredientsArray2, setTheIngredientsArray2] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedValue2, setSelectedValue2] = React.useState('all_ingredients');
  const [recipetagscat, setRecipeTagsCat] = React.useState([]);
  const [recipetagscat2, setRecipeTagsCat2] = React.useState([]);
  const [ingredientsets, setIngredientSet] = React.useState([]);
  const [cuisines, setCuisine] = React.useState([]);
  const [mealtype, setMealType] = React.useState([]);
  const [diet, setDiet] = React.useState([]);
  const [time, setTime] = React.useState([]);
  const [seasonal, setSeasonal] = React.useState([]);
  const [method, setMethod] = React.useState([]);
  const [mealplanname, setMealPlanName] = React.useState('');
  const [newMeal, setNewMeal] = React.useState([]);
  const [newMealTime, setNewMealTime] = React.useState('');
  const [newMealCell, setNewMealCell] = React.useState(0);
  const [recipeIDs, setRecipeIDs] = React.useState([]);
  const [mealPlannerView, setMealPlannerView] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [pageMeal, setPageMeal] = React.useState([]);
  const [onlyRecipesArray, setOnlyRecipesArray] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [day, setDay] = React.useState([]);
  const [savedMealPlan, setSavedMealPlan] = React.useState([]);
  const navigate = useNavigate();
  const [ingredientsetname, setIngredientSetName] = React.useState('');


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

  const changeMealPlannerView = () => {
    mealPlannerView ? setMealPlannerView(false) : setMealPlannerView(true);
  };


  const exportAsPicture = () => {
    var data = document.getElementById('mealPlannerTable')

    html2canvas(data, { logging: true, letterRendering: 1,  allowTaint: false, useCORS: true
    }).then((canvas)=>{
        var image = canvas.toDataURL('image/png');
        return image
    }).then((image)=>{
        saveAs(image, 'mealplan.png')
    })
  }

  const saveAs = (blob, fileName) =>{
    var elem = window.document.createElement('a');
    elem.href = blob
    elem.download = fileName;
    elem.style = 'display:none;';
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
        elem.click();
    } else {
        elem.target = '_blank';
        elem.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
        }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
  }

  const generateMealPlan = async () => {

    await fetch('http://localhost:8080/meal_plan/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        ingredients: selectedValue.map(({value})=>value),
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
          return response.json();
        }
      })
      .then(data => {
        setTheRecipeArray(data);
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const saveMealPlan = async () => {

    await fetch('http://localhost:8080/meal_plan/own', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        name: "Meal Plan",
        creator_id: parseInt(localStorage.getItem('userid')),
        recipe_ids: theRecipeArray.recipe_ids
      })
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            alert(data.message);
          });
          throw new Error(response.status);
        } else {
          console.log('Meal plan saved')
          alert('Meal Plan Saved')
          return response.json();
        }
      })
      .then(data => {
        setSavedMealPlan(data);
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };


  const refreshTableCell = (e, id, day) => {
    setIndex(parseInt(id));
    setDay(day);
    fetch('http://localhost:8080/meal_plan/change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: selectedValue.map(({value})=>value),
        filters: selectedTags.map(({value})=>value),
        time: 'Breakfast', 
        cell_id: parseInt(id),
        recipe_ids: theRecipeArray.recipe_ids
      })
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            alert(data.message);
          });
          throw new Error(response.status);
        } else {
          console.log('Refresh meal success')
          return response.json();
        }
      })
      .then(data => {
        setNewMeal(data);
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
          return response.json();
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const getingredientset = () => {
    fetch('http://localhost:8080/ingredients/get/all/sets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
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

  const myFunction = async () => {
    const r = await fetch('http://localhost:8080/ingredients/list');
    const data = await r.json();
    setIngredient(Object.entries(data));

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
    myFunction();
    myFunction2();
    getingredientset();
  },[]);

  React.useEffect(() => {
    let list = recipetagscat;
    var ingredients_list = [];

    for (let i = 0; i < list.length; i++) {
      var dict = {value: list[i], label: list[i]};
      ingredients_list.push(dict);
    }
    setRecipeTagsCat2(ingredients_list);
  },[recipetagscat]);

  React.useEffect(() => {
    if (theRecipeArray != null) {
      console.log(theRecipeArray);
      const copy = JSON.parse(JSON.stringify(theRecipeArray));
      var arr = [];
      for (var day in copy) {
        if (day != 'recipe_ids') {
          for (var meal in copy[day]) {
            arr.push(copy[day][meal]);
          }
        }
      }
      setOnlyRecipesArray(arr);
      //console.log(onlyRecipesArray);
    }
  },[theRecipeArray]);

  React.useEffect(() => {
    console.log(theIngredientArray);
  },[theIngredientArray]);

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
    if (theRecipeArray != null && newMeal != []) {
      const newRecipeArray = JSON.parse(JSON.stringify(theRecipeArray));
      const temp = JSON.parse(JSON.stringify(newMeal.recipe));
      newRecipeArray[day][index] = temp;
      setTheRecipeArray(newRecipeArray);
    }
  },[newMeal]);

  React.useEffect(() => {
    setPageMeal(onlyRecipesArray[0]);
  },[onlyRecipesArray]);

  React.useEffect(() => {
    console.log(index);
  },[index]);

  React.useEffect(() => {
    console.log(day);
  },[day]);

  React.useEffect(() => {
    console.log(savedMealPlan);
  },[savedMealPlan]);

  const changePage = (event, value) => {
    setPage(value);
    setPageMeal(onlyRecipesArray[value - 1]);
  };
  
  return (
    <SplitPane split="vertical" minSize={200} defaultSize={400} maxSize={600}>
      <Pane style={{ height: '100%', overflowY: 'scroll'}}>
      <Box sx={{ display: "flex", m: 5, justifyContent: "center"}}>
          <Stack spacing={4} sx={{ width: "100%" }}>
          <TextField label="Meal Plan Name" id="outlined-basic" variant="outlined" value={mealplanname} onChange={e => setMealPlanName(e.target.value)}/>
          <Typography variant="h7">Ingredient Category</Typography>
          <Select defaultValue={{ label: "all_ingredients", value: 'all_ingredients' }} options={theIngredientsArray} onChange={handleChange2} />
          <Typography variant="h7">Ingredients</Typography>
          <Select isMulti value= {selectedValue} options={theIngredientsArray2} onChange={handleChange} />
          <Typography variant="h7">Filter Category</Typography>
          <Select  options={options} onChange={handleChangeCat} />
          <Typography variant="h7">Filters</Typography>
          <Select isMulti value= {selectedTags} options={recipetagscat2} onChange={handleChangeCat2} />
          <Button fullWidth variant="contained" onClick={generateMealPlan}>Generate Meal Plan</Button>
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

      
      <Pane style={{ height: '100%', overflowY: 'scroll'}}>

        { theRecipeArray == null ? (
          <Box sx={{display: 'flex', width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h4">Get started by choosing your ingredients</Typography>
          </Box>
        ) : mealPlannerView ? (
          <div>
              <Box sx={{ m: 10, display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" onClick={changeMealPlannerView}>View By Day</Button>
                <Button variant="outlined" onClick={exportAsPicture}>Download as Image</Button>
                <Button variant="outlined" onClick={saveMealPlan}>Save Meal Plan</Button>
              </Box>
              <Box sx={{ m:10 }}>
              <Table id='mealPlannerTable'>

                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">Breakfast</TableCell>
                    <TableCell align="center">Lunch</TableCell>
                    <TableCell align="center">Dinner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow>
                    <TableCell>
                      Day 1
                    </TableCell>
                    {theRecipeArray.day1.map((recipe, id) => (
                    <TableCell key={id} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Card sx={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <CardActionArea onClick={() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                          <CardMedia
                            component="img"
                            height="200"
                            src={recipe.image}

                          />
                        </CardActionArea>

                        <CardContent>
                        
                          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>       
                            <Typography sx={{mr:1}} variant="body1">{recipe.title}</Typography>
                            <IconButton onClick={e => refreshTableCell(e, id, 'day1')}>
                              <RefreshIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                    </Card>

                    </TableCell>
                    ))}
                  </TableRow>
                  
                  <TableRow>
                    <TableCell>
                      Day 2
                    </TableCell>
                    {theRecipeArray.day2.map((recipe, id) => (
                    <TableCell key={id} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Card sx={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <CardActionArea onClick={() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                          <CardMedia
                            component="img"
                            height="200"
                            src={recipe.image}
                            
                          />
                        </CardActionArea>

                        <CardContent>
                        
                          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>       
                            <Typography sx={{mr:1}} variant="body1">{recipe.title}</Typography>
                            <IconButton onClick={e => refreshTableCell(e, id, 'day2')}>
                              <RefreshIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                    </Card>
                  
                    </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Day 3
                    </TableCell>
                    {theRecipeArray.day3.map((recipe, id) => (
                    <TableCell key={id} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Card sx={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <CardActionArea onClick={() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                          <CardMedia
                            component="img"
                            height="200"
                            src={recipe.image}
                            
                          />
                        </CardActionArea>

                        <CardContent>
                        
                          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>       
                            <Typography sx={{mr:1}} variant="body1">{recipe.title}</Typography>
                            <IconButton onClick={e => refreshTableCell(e, id, 'day3')}>
                              <RefreshIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                    </Card>
                  
                    </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Day 4
                    </TableCell>
                    {theRecipeArray.day4.map((recipe, id) => (
                    <TableCell key={id} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Card sx={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <CardActionArea onClick={() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                          <CardMedia
                            component="img"
                            height="200"
                            src={recipe.image}
                            
                          />
                        </CardActionArea>

                        <CardContent>
                        
                          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>       
                            <Typography sx={{mr:1}} variant="body1">{recipe.title}</Typography>
                            <IconButton onClick={e => refreshTableCell(e, id, 'day4')}>
                              <RefreshIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                    </Card>
                  
                    </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Day 5
                    </TableCell>
                    {theRecipeArray.day5.map((recipe, id) => (
                    <TableCell key={id} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Card sx={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <CardActionArea onClick={() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                          <CardMedia
                            component="img"
                            height="200"
                            src={recipe.image}
                            
                          />
                        </CardActionArea>

                        <CardContent>
                        
                          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>       
                            <Typography sx={{mr:1}} variant="body1">{recipe.title}</Typography>
                            <IconButton onClick={e => refreshTableCell(e, id, 'day5')}>
                              <RefreshIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                    </Card>
                  
                    </TableCell>
                    ))}
                  </TableRow>
                  
                  <TableRow>
                    <TableCell>
                      Day 6
                    </TableCell>
                    {theRecipeArray.day6.map((recipe, id) => (
                    <TableCell key={id} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Card sx={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <CardActionArea onClick={() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                          <CardMedia
                            component="img"
                            height="200"
                            src={recipe.image}
                            
                          />
                        </CardActionArea>

                        <CardContent>
                        
                          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>       
                            <Typography sx={{mr:1}} variant="body1">{recipe.title}</Typography>
                            <IconButton onClick={e => refreshTableCell(e, id, 'day6')}>
                              <RefreshIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                    </Card>
                  
                    </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Day 7
                    </TableCell>
                    {theRecipeArray.day7.map((recipe, id) => (
                    <TableCell key={id} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Card sx={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <CardActionArea onClick={() => navigate('/recipedetails/' + recipe.recipe_id, { replace: true })}>
                          <CardMedia
                            component="img"
                            height="200"
                            src={recipe.image}
                            
                          />
                        </CardActionArea>

                        <CardContent>
                        
                          <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>       
                            <Typography sx={{mr:1}} variant="body1">{recipe.title}</Typography>
                            <IconButton onClick={e => refreshTableCell(e, id, 'day7')}>
                              <RefreshIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                    </Card>
                  
                    </TableCell>
                    ))}
                  </TableRow>

              </TableBody>
              </Table>
              </Box>
              </div>
        ) : (
          <div>
              <Box sx={{ m: 10, display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" onClick={changeMealPlannerView}>View By Week</Button>
                <Button variant="outlined" onClick={saveMealPlan}>Save Meal Plan</Button>
              </Box>
              <Box sx={{ m:10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={10} sx={{ justifyContent: 'center', alignItems: 'center' }}>

                    <Card sx={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}
                      onClick= {() => navigate('/recipedetails/' + pageMeal.recipe_id, { replace: true })}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="400"
                            src={pageMeal.image}

                          />
                        </CardActionArea>

                        <CardContent>

                          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <Typography variant="body1">{pageMeal.title}</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                  <Pagination count={21} page={page} onChange={changePage} />
                </Stack>

              </Box>
              </div>
        )}

        </Pane>
      
    </SplitPane>
  );
};

export default MealPlanner;
