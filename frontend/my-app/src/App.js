import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import RecipeExplorer from './pages/recipeexplorer';
import Recipecontribution from './pages/recipecontribution';
import UserRecipes from './pages/userrecipes';
import UserFavourites from './pages/userfavourites';
import UserIngredientSets from './pages/useringredientsets';
import UserMealPlans from './pages/usermealplans';
import MealPlanner from './pages/mealplanner';
import UserAccount from './pages/useraccount';
import UserUpdate from './pages/userupdate';
import signchecker from './pages/signchecker';
import SelectedRecipe from "./pages/RecipeDetails";
import UserMyProfile from "./pages/usermyprofile";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recipe-explorer" element={<RecipeExplorer />} />
        <Route path="/recipecontribution" element={<Recipecontribution />} />
        <Route path="/myrecipes" element={<UserRecipes />} />
        <Route path="/favourites" element={<UserFavourites />} />
        <Route path="/ingredientsets" element={<UserIngredientSets />} />
        <Route path="/ingredientsets" element={<UserIngredientSets />} />
        <Route path="/mealplans" element={<UserMealPlans />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
        <Route path="/useraccount" element={<UserAccount />} />
        <Route path="/userupdate" element={<UserUpdate />} />
        <Route path="/recipedetails/:id" element={<SelectedRecipe />} />
        <Route path="/usermyprofile" element={<UserMyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;


