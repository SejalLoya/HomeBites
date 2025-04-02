import React from 'react'

const About = () => {
  return (
    <div className='mx-20 text-xl'>
      <div className='items-center flex flex-col justify-center my-5'>
      Welcome to HomeBites, your go-to recipe hub for delicious and easy-to-make meals! Whether you're craving a quick snack or planning a hearty dinner, HomeBites helps you discover the perfect recipe using ingredients you already have.
      </div>
      <div>
        <h1 className='text-bold text-2xl mt-20 mb-5'>How It Works</h1>
        <div>
          <div className='mt-5 '>Search by Ingredient</div> - Simply enter an ingredient, and HomeBites will suggest a variety of mouth-watering recipes to choose from.

          <div className='mt-5'>Explore Recipes</div> - Browse through a diverse collection of dishes, complete with step-by-step instructions and appetizing images.

          <div className='mt-5'>Save Your Favorites</div> - Found a recipe you love? Add it to your favorites list and access it anytime with ease.
        </div>
      </div>
      <div>
        <div className='mt-10'>Why HomeBites?</div>
          <div className='mt-2'>✔️ Quick & Easy Recipes - Find simple yet flavorful recipes in seconds.</div>
          <div className='mt-2'>✔️ Personalized Favorites - Keep track of your favorite meals effortlessly.</div>
          <div className='mt-2'>✔️ Ingredient-Based Search - Minimize waste and make the most of what's in your kitchen.</div>
      </div>
      <br />
Start exploring today and let HomeBites turn everyday ingredients into extraordinary meals!

    </div>
  )
}

export default About
