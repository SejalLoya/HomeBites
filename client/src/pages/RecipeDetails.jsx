import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const RecipeDetails = () => {
  const {id} = useParams();
  const [details, setDetails] = useState([]);
  const getRecipeDetails = async() => {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.data;
    setDetails(data.meals);
  };
  useEffect(() => {getRecipeDetails();},[])
  return (
    <div className='flex justify-center items-center'>
      {
        details.map((detail) => 
          <div className='w-[60vw] p-3 bg-white' key={detail.idMeal}>
            <div className='flex justify-center items-center'>
            <img src={detail.strMealThumb} width={250} className='rounded-full'/>
            <span className='text-3xl ml-4 font-bold'>{detail.strMeal}</span>
            </div>
            <div className='mx-10'>
              <h1 className='text-2xl font-bold my-4'>Recipe</h1>
              <p>
                {detail.strInstructions}
              </p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default RecipeDetails
