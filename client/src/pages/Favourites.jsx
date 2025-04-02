import React, { useEffect } from 'react'
import { getFavourites } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import { setFavourites } from '../../redux/slices/authSlice';

const Favourites = () => {
  const favourites = useSelector((state) => state.auth.favourites);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?._id) {  
      getFavourites(user._id).then((res) => dispatch(setFavourites(res)));
    }
  }, [user]); 
  
  return (
    <div className='my-10'>
      <div className='lg:w-[70vw] my-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-center items-center gap-3'>
            {
            favourites.map((recipe) => (
          <RecipeCard 
            key={recipe.idMeal} 
            id={recipe.idMeal} 
            title={recipe.strMeal} 
            image={recipe.strMealThumb}
            />
          ))}
          </div> 
    </div>
  );
}

export default Favourites
