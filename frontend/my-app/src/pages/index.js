import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import { ConstructionOutlined, Login } from '@mui/icons-material';
import Image from "./images/1.jpg";
const styles = {
  paperContainer: {
      height: 1024,
      backgroundSize: 'cover',
      backgroundImage: `url(${Image})`,
      backgroundPosition: 'center',
  }
};

const Home = () => {
  return (
    <>
    <Paper style={styles.paperContainer}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',

        }}
      >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 60
        }}
      >
        <Typography variant="h3">
          The Easiest Recipe Generator
        </Typography>
        <Typography variant="subtitle1">
          Convenient. Free. Delicious.
        </Typography>
        <Button
          sx={{
            m: 5
          }}
          variant="contained"
          href="/recipe-explorer"
        >
          Find recipes
        </Button>
      </Box>
      </Box>
      </Paper>
    </>
)};

export default Home;
