import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import axios from "axios";
import {PuffLoader} from 'react-spinners';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getRecipes = async(text) => {
    setLoading(true);
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
    const data = await res.data;
    setRecipes(data.meals);
    if(data === null || data === undefined) {
      console.log("No data found");
    } else {
      setRecipes(data.meals);
    }
    setLoading(false);
  };

  const getInitialRecipes = async() => {
    setLoading(true);
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`);
    const data = await res.data;
    if(data === null || data === undefined) {
      console.log("No data found");
    } else {
      setRecipes(data.meals);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInitialRecipes();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <input type='text' 
        name="search"
        id="search" 
        placeholder='Enter the ingredient' 
        className='outline-none border-gray-300 border px-5 py-3 rounded-xl w-[60vw] shadow-md bg-white focus:border-gray-600'
        onChange={(e)=> getRecipes(e.target.value)}
        />
      </div>
      <div>
        {loading ? (<PuffLoader color="#f56565" size={150} />):
          (recipes === undefined || recipes === null || recipes.length === 0) ? <h1>No recipes to show</h1> :
          (<div className='lg:w-[70vw] my-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-center items-center gap-3'>
            {
            recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.idMeal} 
            id={recipe.idMeal} 
            title={recipe.strMeal} 
            image={recipe.strMealThumb}
            />
          ))}
          </div>
        )}
        </div>
    </div>
  )
}

export default Home
