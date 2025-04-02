import axios from "axios";

export const getFavourites = async (id) => {
    if (!id) {
      console.error("User ID is undefined, cannot fetch favourites.");
      return [];
    }
  
    try {
      const res = await axios.get(`http://localhost:5004/api/get-favourites/${id}`, {
        withCredentials: true,
      });
      return res.data.favourites; 
    } catch (error) {
      console.error("Error fetching favourites:", error);
      return [];
    }
  };
  