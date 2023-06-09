import * as React from "react";
import { Typography, TextField, Button, Box, Tab } from "@mui/material";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { tableCellClasses } from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';
import { Select as Select2 } from '@mui/material';
import Select  from 'react-select';
import Slider from '@mui/material/Slider';
import { NavLink as Link}from "react-router-dom";

function signchecker() {  
  let token = localStorage.getItem('token');
  if (token == null || token == '') {
    return false;
  } else {
    return true;
  }
};

const ContributionTable = () => {
    const [ingredientselected, setIngredientSelected] = React.useState('');
    const [recipename, setRecipeName] = React.useState('');
    const [recipeservings, setRecipeServings] = React.useState('');
    const [recipetime, setRecipeTime] = React.useState(0);
    const [recipedifficulty, setRecipeDifficulty] = React.useState(1);
    const [recipeingredientamount, setRecipeIngredientAmount] = React.useState(0);
    const [recipeingredientunit, setRecipeIngredientUnit] = React.useState('');
    const [recipeinstruction, setRecipeInstruction] = React.useState('');
    const [recipeinstructiontime, setRecipeInstructionTime] = React.useState(0);
    const [recipekcal, setRecipeKcal] = React.useState(0);
    const [recipefat, setRecipeFat] = React.useState(0);
    const [recipesaturates, setRecipeSaturates] = React.useState(0);
    const [recipecarbs, setRecipeCarbs] = React.useState(0);
    const [recipesugars, setRecipeSugars] = React.useState(0);
    const [recipefibre, setRecipeFibre] = React.useState(0);
    const [recipeprotein, setRecipeProtein] = React.useState(0);
    const [recipetags, setRecipeTags] = React.useState('');
    const [recipetagscat, setRecipeTagsCat] = React.useState([]);
    const [ingredient, setIngredient] = React.useState([]);
    const [cuisines, setCuisine] = React.useState([]);
    const [mealtype, setMealType] = React.useState([]);
    const [diet, setDiet] = React.useState([]);
    const [time, setTime] = React.useState([]);
    const [seasonal, setSeasonal] = React.useState([]);
    const [method, setMethod] = React.useState([]);
    const [theIngredientArray, setTheIngredientArray] = React.useState([]);
    const [theInstructionArray, setTheInstructionArray] = React.useState([]);
    const [theTagsArray, setTheTagsArray] = React.useState([]);
    const [thumbnailfilename, setThumbnailfilename] = React.useState('');
    const [thumbnail, setThumbnail] = React.useState('');
    const [theIngredientsArray, setTheIngredientsArray] = React.useState([]);
    const [selectedValue2, setSelectedValue2] = React.useState('all_ingredients');
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [selectedTags, setSelectedTags] = React.useState([]);

    const options = [
      { value: cuisines, label: 'Cuisine' },
      { value: mealtype, label: 'Meal Type' },
      { value: diet, label: 'Diet' },
      { value: seasonal, label: 'Seasonal' },
      { value: method, label: 'Method' },
      { value: time, label: 'Time' },
    ]

    // Cont to store Base64 value
    const [base64url, setbase64url] = React.useState('');
    
    
    // Algorithm to convert file to Base64
    const getBase64 = file => {
      return new Promise(resolve => {
        let baseURL = '';
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          baseURL = reader.result;
          resolve(baseURL);
        };
      });
    };

    const handleChange2 = e => {
      setSelectedValue2(e.value);
    }

    
  

    const handleFileInputChange = (event) => {
      console.log(event.target.files[0]);
      setThumbnailfilename(event.target.files[0].name);
      getBase64(event.target.files[0])
        .then(result => {
          setbase64url(result);
          setThumbnail(result);
          console.log(base64url);
        })
        .catch(err => {
          console.log(err);
        });
    };

    console.log('name ' + recipename);
    console.log(parseInt(recipedifficulty));

  // Fetch for the listings list

  const myFunction = async () => {
    const r = await fetch('http://localhost:8080/ingredients/list');
    const data = await r.json();
    setIngredient(data.all_ingredients);
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
  },[]);


      const handleChange = (e) => {
          setIngredientSelected(e.target.value);
        };
      const handleChangeCat = (e) => {
        setRecipeTagsCat(e.target.value);
      };
      const handleChangeTags = (e) => {
        setRecipeTags(e.target.value);
      };

      const addIngredient = () => {
        var dict = {name: selectedValue2, quantity: parseFloat(recipeingredientamount), units:recipeingredientunit}
        setTheIngredientArray([...theIngredientArray, dict]);
        alert("Ingredient Succesfully Added");
      };

      const removeIngredient = () => {
        const copyArr = [...theIngredientArray];
        copyArr.splice(-1);
        setTheIngredientArray(copyArr);
        alert("Ingredient Succesfully Removed");
      };

      const removeInstruction = () => {
        const copyArr = [...theInstructionArray];
        copyArr.splice(-1);
        setTheInstructionArray(copyArr);
        alert("Instruction Succesfully Removed");
      };

      const addInstruction = () => {
        var dict = {instruction: recipeinstruction, time: parseFloat(recipeinstructiontime)}
        setTheInstructionArray([...theInstructionArray, dict]);
        alert("Instruction Succesfully Added");
      };

      const addTags = () => {
        setTheTagsArray([...theTagsArray, recipetags]);
        alert("Tag Succesfully Added");
      };

      React.useEffect(() => { 
        
        console.log(theIngredientArray);
        console.log(theTagsArray);
        setIngredientSelected('');
        setRecipeIngredientAmount(0);
        setRecipeIngredientUnit('');
        setRecipeInstruction('');
        setRecipeInstructionTime(0);
        setRecipeTags('');
    
    }, [theIngredientArray, theInstructionArray, theTagsArray]);

    React.useEffect(() => {
      let list = ingredient;
      var ingredients_list = [];
      for (let i = 0; i < list.length; i++) {
        var dict = {value: list[i], label: list[i]};
        ingredients_list.push(dict);
      }
      setTheIngredientsArray(ingredients_list);
      console.log(theIngredientsArray);
    },[ingredient]);

    const submitrecipe = () => {
        fetch('http://localhost:8080/recipe/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: recipename,
            creator_id: parseInt(localStorage.getItem('creatorID')),
            image: thumbnail,
            ingredients: theIngredientArray,
            steps: theInstructionArray,
            time: parseFloat(recipetime),
            servings: parseInt(recipeservings),
            difficulty: parseInt(recipedifficulty),
            nutrition_facts: [parseInt(recipekcal), parseInt(recipefat), parseInt(recipesaturates), parseInt(recipecarbs), parseInt(recipesugars), parseInt(recipefibre), parseInt(recipeprotein)],
            tags: theTagsArray,
          })
        })
          .then(response => {
            if (!response.ok) {
              response.json().then(data => {
                // sends alert message if response results in error
                alert(data.message);
              });
              throw new Error(response.status);
            } else {
              // navigate to listings page if response is successful
              console.log('it is ok')
              return response.json();
            }
          })
          .catch((error) => {
            console.log('error: ' + error);
          });
      };
  if (signchecker()) {
    return <>   
      <Box>
      <Table
        sx={{
            [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            }
        }}
      >
        <TableRow>
          
        </TableRow>
        <TableRow>
            <TableCell>
            <Typography variant="h5">Submit a Recipe</Typography>
            </TableCell>
        </TableRow>
        
        <TableRow>
            <TableCell>
            <Typography variant="body1">Recipe Title</Typography>
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" label="Title" variant="outlined" size="small" value={recipename} onChange={e => setRecipeName(e.target.value)}/>
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell>
            <Typography variant="body1">Recipe Image</Typography>
            </TableCell>
            <TableCell>
              <Box m={1} pt={3}>
                <input hidden
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleFileInputChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="raised" component="span">
                  Upload Thumbnail
                  </Button>
                </label>
                {thumbnailfilename}
              </Box>
            </TableCell>
        </TableRow>
        
        <TableRow>
            <TableCell>
            <Typography variant="body1">Recipe Facts</Typography>
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" label="Time" variant="outlined" size="small" value={recipetime} onChange={e => setRecipeTime(e.target.value)}/>
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" label="Servings" variant="outlined" size="small" value={recipeservings} onChange={e => setRecipeServings(e.target.value)}/>
            </TableCell>
            <TableCell>
            <InputLabel id="slider">Difficulty</InputLabel>
              <Slider
                  id="slider"
                  value={recipedifficulty}
                  onChange={e => setRecipeDifficulty(e.target.value)}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={5}
                  /> 
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell>
            <Typography variant="body1">Ingredients</Typography>
            </TableCell>
            <TableCell>
            <Select options={theIngredientsArray} onChange={handleChange2} />
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" label="Amount" variant="outlined" size="small" value={recipeingredientamount} onChange={e => setRecipeIngredientAmount(e.target.value)}/>
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" label="Unit" variant="outlined" size="small" value={recipeingredientunit} onChange={e => setRecipeIngredientUnit(e.target.value)}/>
            </TableCell>
            <TableCell padding="10px">
              <Button variant="contained" onClick={addIngredient} sx={{m: 1}}>Add</Button>
              <Button variant="contained" onClick={removeIngredient} sx={{m: 1}}>X</Button>
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell>
            <Typography variant="body1">Ingredients Added</Typography>
          </TableCell>
        {theIngredientArray.map((listing, idx) => {
        return (
          <Box display="flex" justifyContent="center" key={idx}>
            <Box>
              {[theIngredientArray.indexOf(listing) + 1 , '. ', listing.name, ' ',  listing.quantity, ' ', listing.units]}
            </Box>
          </Box>
        )
      })}
        </TableRow>
        <TableRow>
            <TableCell>
            <Typography variant="body1">Instructions</Typography>
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" variant="outlined" value={recipeinstruction} onChange={e => setRecipeInstruction(e.target.value)}/>
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" label="time (minutes)" variant="outlined" value={recipeinstructiontime} onChange={e => setRecipeInstructionTime(e.target.value)}/>
            </TableCell>
            <TableCell>
            <Button variant="contained" onClick={addInstruction} sx={{m: 1}}>Add</Button>
            <Button variant="contained" onClick={removeInstruction} sx={{m: 1}}>X</Button>
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell>
            <Typography variant="body1">Instructions Added</Typography>
          </TableCell>
        {theInstructionArray.map((listing, idx) => {
        return (
          <Box display="flex" justifyContent="center" key={idx}>
            <Box>
              {[theInstructionArray.indexOf(listing) + 1 , '. ', listing.instruction, ', ',  listing.time, ' minutes']}
            </Box>
          </Box>
        )
      })}
        </TableRow>

        <TableRow>
            <TableCell>
            <Typography variant="body1">Nutrition Facts</Typography>
            </TableCell>
            <TableCell>
            <TextField id="outlined-basic" label="kcal" variant="outlined" size="small" value={recipekcal} onChange={e => setRecipeKcal(e.target.value)}/>
            </TableCell>

        </TableRow>

        <TableRow>
          <TableCell />
          <TableCell>
            <TextField id="outlined-basic" label="fat" variant="outlined" size="small" value={recipefat} onChange={e => setRecipeFat(e.target.value)}/>
          </TableCell>
          <TableCell>
            <TextField id="outlined-basic" label="saturates" variant="outlined" size="small" value={recipesaturates} onChange={e => setRecipeSaturates(e.target.value)}/>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell />
          <TableCell>
            <TextField id="outlined-basic" label="carbs" variant="outlined" size="small" value={recipecarbs} onChange={e => setRecipeCarbs(e.target.value)}/>
          </TableCell>
          <TableCell>
            <TextField id="outlined-basic" label="sugars" variant="outlined" size="small" value={recipesugars} onChange={e => setRecipeSugars(e.target.value)}/>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell />
          <TableCell>
            <TextField id="outlined-basic" label="fibre" variant="outlined" size="small" value={recipefibre} onChange={e => setRecipeFibre(e.target.value)}/>
          </TableCell>
          <TableCell>
            <TextField id="outlined-basic" label="protein" variant="outlined" size="small" value={recipeprotein} onChange={e => setRecipeProtein(e.target.value)}/>
          </TableCell>
        </TableRow>

        <TableRow>
            <TableCell>
            <Typography variant="body1">Tags</Typography>
            </TableCell>
            <TableCell>
            <InputLabel id="cat">Category</InputLabel>
            <Select2
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

            </Select2>
            </TableCell>
            <TableCell>
            <InputLabel id="demo-simple-select">Tags</InputLabel>
            <Select2
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
            </Select2>
            </TableCell>
            <TableCell>
            <Button variant="contained" onClick={addTags}>Add</Button>
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell>
            <Typography variant="body1">Tags Added</Typography>
          </TableCell>
        {theTagsArray.map((listing, idx) => {
        return (
          <Box display="flex" justifyContent="center" key={idx}>
            <Box>
              {listing}
            </Box>
          </Box>
        )
      })}
        </TableRow>
      </Table>
      <Box sx={{ my: 6}}>
        <Button variant="contained" component={Link} to="/myrecipes" onClick={submitrecipe}>Submit Recipe</Button>
      </Box>
      </Box>
    </>;
    } else {
      return <>   
    <Box>
    <Table
      sx={{
          [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
          }
      }}
    >
      <TableRow>
        
      </TableRow>
      <TableRow>
          <TableCell>
          <Typography variant="h5">Submit a Recipe</Typography>
          </TableCell>
      </TableRow>
      
      <TableRow>
          <TableCell>
          <Typography variant="body1">Recipe Title</Typography>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" label="Title" variant="outlined" size="small" value={recipename} onChange={e => setRecipeName(e.target.value)}/>
          </TableCell>
      </TableRow>

      <TableRow>
          <TableCell>
          <Typography variant="body1">Recipe Image</Typography>
          </TableCell>
          <TableCell>
            <Box m={1} pt={3}>
              <input hidden
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileInputChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span">
                Upload Thumbnail
                </Button>
              </label>
              {thumbnailfilename}
            </Box>
          </TableCell>
      </TableRow>
      
      <TableRow>
          <TableCell>
          <Typography variant="body1">Recipe Facts</Typography>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" label="Time" variant="outlined" size="small" value={recipetime} onChange={e => setRecipeTime(e.target.value)}/>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" label="Servings" variant="outlined" size="small" value={recipeservings} onChange={e => setRecipeServings(e.target.value)}/>
          </TableCell>
          <TableCell>
          <InputLabel id="slider">Difficulty</InputLabel>
            <Slider
                id="slider"
                value={recipedifficulty}
                onChange={e => setRecipeDifficulty(e.target.value)}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                /> 
          </TableCell>
      </TableRow>

      <TableRow>
          <TableCell>
          <Typography variant="body1">Ingredients</Typography>
          </TableCell>
          <TableCell>
          <Select2
          style = {{minWidth: 220}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ingredientselected}
          label="Ingredient"
          size="small"
          onChange={handleChange}
        >
        {ingredient.map((listing, idx) => {
      // Loop to determine Average SVG rating for display for each Listing
      return (
        <MenuItem key={idx} value = {listing}>
          {listing}
        </MenuItem>
      )
       })}
         </Select2>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" label="Amount" variant="outlined" size="small" value={recipeingredientamount} onChange={e => setRecipeIngredientAmount(e.target.value)}/>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" label="Unit" variant="outlined" size="small" value={recipeingredientunit} onChange={e => setRecipeIngredientUnit(e.target.value)}/>
          </TableCell>
          <TableCell padding="10px">
            <Button variant="contained" onClick={addIngredient} sx={{m: 1}}>Add</Button>
            <Button variant="contained" onClick={removeIngredient} sx={{m: 1}}>X</Button>
          </TableCell>
      </TableRow>
      <TableRow>
      <TableCell>
          <Typography variant="body1">Ingredients Added</Typography>
        </TableCell>
      {theIngredientArray.map((listing, idx) => {
      return (
        <Box display="flex" justifyContent="center" key={idx}>
          <Box>
            {[theIngredientArray.indexOf(listing) + 1 , '. ', listing.name, ' ',  listing.quantity, ' ', listing.units]}
          </Box>
        </Box>
      )
    })}
      </TableRow>
      <TableRow>
          <TableCell>
          <Typography variant="body1">Instructions</Typography>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" variant="outlined" value={recipeinstruction} onChange={e => setRecipeInstruction(e.target.value)}/>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" label="time (minutes)" variant="outlined" value={recipeinstructiontime} onChange={e => setRecipeInstructionTime(e.target.value)}/>
          </TableCell>
          <TableCell>
          <Button variant="contained" onClick={addInstruction} sx={{m: 1}}>Add</Button>
          <Button variant="contained" onClick={removeInstruction} sx={{m: 1}}>X</Button>
          </TableCell>
      </TableRow>
      <TableRow>
      <TableCell>
          <Typography variant="body1">Instructions Added</Typography>
        </TableCell>
      {theInstructionArray.map((listing, idx) => {
      return (
        <Box display="flex" justifyContent="center" key={idx}>
          <Box>
            {[theInstructionArray.indexOf(listing) + 1 , '. ', listing.instruction, ', ',  listing.time, ' minutes']}
          </Box>
        </Box>
      )
    })}
      </TableRow>

      <TableRow>
          <TableCell>
          <Typography variant="body1">Nutrition Facts</Typography>
          </TableCell>
          <TableCell>
          <TextField id="outlined-basic" label="kcal" variant="outlined" size="small" value={recipekcal} onChange={e => setRecipeKcal(e.target.value)}/>
          </TableCell>

      </TableRow>

      <TableRow>
        <TableCell />
        <TableCell>
          <TextField id="outlined-basic" label="fat" variant="outlined" size="small" value={recipefat} onChange={e => setRecipeFat(e.target.value)}/>
        </TableCell>
        <TableCell>
          <TextField id="outlined-basic" label="saturates" variant="outlined" size="small" value={recipesaturates} onChange={e => setRecipeSaturates(e.target.value)}/>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell />
        <TableCell>
          <TextField id="outlined-basic" label="carbs" variant="outlined" size="small" value={recipecarbs} onChange={e => setRecipeCarbs(e.target.value)}/>
        </TableCell>
        <TableCell>
          <TextField id="outlined-basic" label="sugars" variant="outlined" size="small" value={recipesugars} onChange={e => setRecipeSugars(e.target.value)}/>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell />
        <TableCell>
          <TextField id="outlined-basic" label="fibre" variant="outlined" size="small" value={recipefibre} onChange={e => setRecipeFibre(e.target.value)}/>
        </TableCell>
        <TableCell>
          <TextField id="outlined-basic" label="protein" variant="outlined" size="small" value={recipeprotein} onChange={e => setRecipeProtein(e.target.value)}/>
        </TableCell>
      </TableRow>

      <TableRow>
          <TableCell>
          <Typography variant="body1">Tags</Typography>
          </TableCell>
          <TableCell>
          <InputLabel id="cat">Category</InputLabel>
          <Select2
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

          </Select2>
          </TableCell>
          <TableCell>
          <InputLabel id="demo-simple-select">Tags</InputLabel>
          <Select2
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
          </Select2>
          </TableCell>
          <TableCell>
          <Button variant="contained" onClick={addTags}>Add</Button>
          </TableCell>
      </TableRow>
      <TableRow>
      <TableCell>
          <Typography variant="body1">Tags Added</Typography>
        </TableCell>
      {theTagsArray.map((listing, idx) => {
      return (
        <Box display="flex" justifyContent="center" key={idx}>
          <Box>
            {listing}
          </Box>
        </Box>
      )
    })}
      </TableRow>
    </Table>
    <Box sx={{ my: 6}}>
      <Button variant="contained" component={Link} to="/myrecipes" onClick={submitrecipe}>Submit Recipe</Button>
    </Box>
    </Box>
  </>;
    }
  
};
  
export default ContributionTable;