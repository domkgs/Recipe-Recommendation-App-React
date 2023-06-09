import React from 'react';
import styled from 'styled-components';
import { useSpeechSynthesis } from "react-speech-kit";
import { useParams } from 'react-router-dom';
import { Stack, List, ListItem, Grid, Card, CardContent, CardActionArea, CardMedia, CardActions, TextField, Button, Typography, Box, Paper,CardHeader } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Image from "./images/41.jpeg";
const styles = {
  paperContainer: {
      backgroundSize:'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
  },
};


const formatRemainingTime = time => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds}`;
  };

const SelectedRecipe = () => {
  // initialised params to get id
  const params = useParams();
  // sets state variables
  const [details, setDetails] = React.useState({});
  const [ingredients, setIngredients] = React.useState([]);
  const [steps, setSteps] = React.useState([{instruction: ''}]);
  const [nutritionalfacts, setNutritionalFacts] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const { speak } = useSpeechSynthesis();
  const [open, setOpen] = React.useState(false);
  const [recipeassistantindex, setRecipeAssistantIndex] = React.useState(0);
  const [playpause, setPlayPause] = React.useState(false);
  const [timeini, setTimeIni] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  const renderTime = ({ remainingTime }) => {
    if ({ remainingTime } === 0) {
      return <div className="timer">Time's Up!...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Time</div>
        <div className="value">{formatRemainingTime(time)}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  React.useEffect(() => {
    if (isActive) {
      const timer =
        time > 0 && setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timer);
    } else if (!isActive && time !== 0) {
      clearInterval(time);
    }
  }, [time, isActive]);

  const handleClickOpen = () => {
    setOpen(true);
    speak({text: 'step' + String(recipeassistantindex+1) + steps[recipeassistantindex].instruction})
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggle = () => {
    setIsActive(!isActive);
  };


  const handleforward = async () => {
    if((recipeassistantindex + 1) !== steps.length) {
        setRecipeAssistantIndex(recipeassistantindex + 1);
    }
    reset();
  };

  const handlebackward = async () => {
    if((recipeassistantindex - 1) !== -1) {
        setRecipeAssistantIndex(recipeassistantindex - 1);
    }
    reset();

  };

  const setthetime = () => {
    setTime(timeini*60)
  };

  React.useEffect( () => {
    speak({text: 'step' + String(recipeassistantindex+1) + steps[recipeassistantindex].instruction})
  }, [recipeassistantindex]);

  const getrecipedetails = () => {
    fetch('http://localhost:8080/recipe/details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipe_id: parseInt(params.id),
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
      console.log(data);
      setDetails(data);
      setIngredients(data.ingredients)
      setSteps(data.steps)
      setNutritionalFacts(data.nutrition_facts)
      setTags(data.tags)
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
};

React.useEffect( () => {
    getrecipedetails();
  }, []);

  function handleClickRecipeAssistant() {

    for (let i = 0; i < steps.length; i++) {
      speak({text: 'step' + String(i+1) + steps[i].instruction})
    }
  }

  return (
    <Paper style={styles.paperContainer}>
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main',

        }}
      >
        <Box
            padding= {5}
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            color: 'primary.main'

            }}
        >
        <Typography variant="h3">
          {details.title}
        </Typography>

        </Box>
        <Stack display= 'flex' spacing={4} sx={{ width: "50%" }}>


        <Card variant="outlined" >
        <CardMedia
                      src= {details.image}
                      component="img"
                      height="600"

                    />
        </Card>

        <Card variant="outlined">
        <CardContent >
            <Typography gutterBottom variant="h4" component="div">
            Overview
            </Typography>
            <Grid container spacing={1}>
            <List>
                <ListItem>
                    <Typography gutterBottom variant="h6" component="div">
                      Difficulty: {details.difficulty+ '/5'}
                    </Typography>
                </ListItem>
                <ListItem >
                    <Typography gutterBottom variant="h6" component="div">
                      Time: {details.time + ' minutes'}
                    </Typography>
                </ListItem>

            </List>
            </Grid>
        </CardContent>
        </Card>

        <Card variant="outlined">
        <CardContent >
            <Typography gutterBottom variant="h4" component="div">
            Ingredients
            </Typography>
            <Grid container spacing={1}>
            <List>
            {ingredients.map((listing2, idx2) => {

                return (
                <ListItem key= {idx2}>
                    <Typography gutterBottom variant="h6" component="div">
                    {idx2+1 + ') ' + listing2.quantity + ' ' + listing2.units + ' ' + listing2.name}
                    </Typography>
                </ListItem>
                )
            })}
            </List>
            </Grid>
        </CardContent>
        </Card>
        <Card variant="outlined">

        <CardContent>
            <Typography gutterBottom variant="h4" component="div">
            Instructions
            </Typography>
            <Grid container spacing={1}>
            <List>
            {steps.map((listing2, idx2) => {

                return (
                <ListItem key= {idx2}>
                    <Typography gutterBottom variant="h6" component="div">
                    {idx2+1 + ') ' + listing2.instruction}
                    </Typography>
                </ListItem>
                )
            })}
            </List>
            <Button variant="contained" onClick={handleClickOpen}>Recipe Assistant</Button>

            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
                maxWidth='lg'
            >

                <DialogTitle sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    }}>Recipe Assistant</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                   {recipeassistantindex+1 + ') ' + steps[recipeassistantindex].instruction}
                  </DialogContentText>
                </DialogContent>
                <DialogContent
                 sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    }}>
                    <CountdownCircleTimer
                    isPlaying={playpause}
                    duration={time}
                    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                    onComplete={() => [true, 1000]}
                    >
                    {renderTime}
                    </CountdownCircleTimer>

                </DialogContent>
                <DialogContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    }}>
                   <TextField label="Time (minutes)" value= {timeini} type="number" variant="outlined" onChange={e => setTimeIni(e.target.value)}/>
                </DialogContent>
                <DialogContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    }}>
                   <Button variant="contained" sx={{ m: 2}} onClick={setthetime}>Set</Button>
                   <Button variant="contained" sx={{ m: 2}} onClick={toggle}>Play/Pause</Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handlebackward}>{'<'}</Button>
                    <Button onClick={handleforward}>{'>'}</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>

            </Dialog>

            </Grid>

        </CardContent>
        </Card>

        <Card variant="outlined">
        <CardContent >
            <Typography gutterBottom variant="h4" component="div">
            Nutritional Information
            </Typography>
            <Grid container spacing={1}>
            <List>
                <ListItem>
                    <Typography gutterBottom variant="h6" component="div">
                      Calories: {nutritionalfacts[0]}
                    </Typography>
                </ListItem>
                <ListItem >
                    <Typography gutterBottom variant="h6" component="div">
                      Fat: {nutritionalfacts[1]}
                    </Typography>
                </ListItem>

                <ListItem >
                    <Typography gutterBottom variant="h6" component="div">
                      Carbs: {nutritionalfacts[2]}
                    </Typography>
                </ListItem>

                <ListItem >
                    <Typography gutterBottom variant="h6" component="div">
                      Protein: {nutritionalfacts[3]}
                    </Typography>
                </ListItem>

            </List>
            </Grid>
        </CardContent>
        </Card>

        <Card variant="outlined">
        <CardContent >
            <Typography gutterBottom variant="h4" component="div">
            Tags
            </Typography>
            <Grid container spacing={1}>
            <List>
            {tags.map((listing2, idx2) => {

                return (
                <ListItem key= {idx2}>
                    <Typography gutterBottom variant="h6" component="div">
                    {listing2}
                    </Typography>
                </ListItem>
                )
            })}
            </List>
            </Grid>
        </CardContent>
        </Card>


        </Stack>
    </Box>
    </Paper>


  )
}

export default SelectedRecipe;
