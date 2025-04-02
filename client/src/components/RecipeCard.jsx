import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { IoIosHeart } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getFavourites } from '../helper';
import { setFavourites } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, image }) => {
  const {pathname} = useLocation();

  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const addToFavourites = async( favs ) => {
    const res = await axios.post(`http://localhost:5004/api/add-to-favourites/${user._id}`, favs, {withCredentials: true});
    const data = await res.data;

    if(data.success) {
      toast.success(data.message);
    }
  };

  const removeFromFavourites = async (favs) => {
    try {
      const res = await axios.post(
        `http://localhost:5004/api/remove-from-favourites/${user._id}`,
        favs,
        { withCredentials: true }
      );
      const data = res.data;
  
      if (data.success) {
        toast.success(data.message);
  
        // Fetch updated favourites list and update Redux state
        const updatedFavourites = await getFavourites(user._id);
        dispatch(setFavourites(updatedFavourites));
      }
    } catch (error) {
      toast.error("Failed to remove from favourites.");
      console.error(error);
    }
  };
  
  
  return (
    <div className='shadow-lg flex flex-col justify-between p-3 rounded-lg bg-white'>
      <div className='overflow-hidden'>
        <Link to={`/recipe-details/${id}`}>
          <img src={image} 
          alt={title}
          width={250}
          className='rounded-lg hover:scale-110 transition-all duration-500 ease-in-out' 
        />
        </Link>
      </div>
      <div className='flex mt-3 justify-between items-center'>
        <span>{title.slice(0,20)}{title.length > 20 ? "..." : null}</span>
        {pathname === '/favourites' ? (<MdDelete 
          className='cursor-pointer hover:text-red-500 hover:scale-125 transition-all duration-500 ease-in-out' 
          onClick={() => {removeFromFavourites({
            idMeal: id,
            strMeal: title,
            strMealThumb: image
          });
            getFavourites(user._id).then((res) => dispatch(setFavourites(res)));}
        }
        />) : (<IoIosHeart 
          className='cursor-pointer hover:text-red-500 hover:scale-125 transition-all duration-500 ease-in-out' 
          onClick={() => isAuth ? addToFavourites({
            idMeal: id,
            strMeal: title,
            strMealThumb: image
          }): toast.error("Please sign in to add to favourites")}
        />
      )}
      </div>
    </div>
  )
}

export default RecipeCard
