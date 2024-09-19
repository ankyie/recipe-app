'use client'
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Down from '../public/Down.svg'

export default function Home() {

  const ingredientInput = useRef(); //input value
  const recipeContainer = useRef();
  const sectionRef = useRef();

  const [recipeList, setRecipeList] = useState([])
  const [btnDisabled, setBtnDisabled] = useState(true)

  async function getRecipe() {
    // Spoonacular API URL
    const ingredients = ingredientInput.current.value.split(',').map(ingredient => ingredient.trim()).join(',');
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

    // Fetch recipes from Spoonacular API
    try {
      const response = await fetch(apiUrl);
      const recipes = await response.json();
      // Setting the recipes list
      setRecipeList(recipes);
      ingredientInput.current.value = "";

      setBtnDisabled(true);

      scrollToSection();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Failed to fetch recipes, please try again.');
    }
  }

  const scrollToSection = () => {
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  function HandleChange() {
    if (ingredientInput.current.value.trim()) {
      setBtnDisabled(false);
    }
    else {
      setBtnDisabled(true);
    }
  }

  function HandleShow(e, ID){
    let missing = document.getElementById(`${ID}`);
    if (e.currentTarget.children[1].classList.contains("flip")) {
      e.currentTarget.children[1].classList.remove('flip')
      missing.style.maxHeight = 0;
      e.currentTarget.children[0].innerHTML = "Show Missing"
    }
    else{
      e.currentTarget.children[1].classList.add('flip')
      missing.style.maxHeight = missing.scrollHeight + 'px';
      e.currentTarget.children[0].innerHTML = "Hide Missing"
    }
  }

  return (

    <div className="flex-1 sm:w-[640px] w-full p-2 mx-auto my-8">

      <main className="mb-8">
        <div className="finder text-center p-8 bg-green-500 flex flex-col gap-3 rounded-lg drop-shadow-xl">
          <h1 className="text-3xl font-bold">Recipe Finder</h1>
          <p className="text-black">Enter ingredients you have at home, separated by commas:</p>
          <input className="w-full px-5 py-2 rounded-lg active:drop-shadow-lg" type="text" id="ingredient-input" placeholder="e.g., chicken, rice, garlic" ref={ingredientInput} onChange={HandleChange}/>
          <div>
            <button className={`bg-[#ffff00] px-5 py-2 font-bold rounded-lg hover:bg-[#dede00] duration-200 drop-shadow-lg ${btnDisabled ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={btnDisabled} onClick={() => getRecipe()}>Find Recipes</button>
          </div>
        </div>
      </main>


      <section className="text-white" ref={sectionRef}>

        <h2 className="text-3xl font-bold mb-3">Recipes:</h2>
        <div className="recipe-listing" ref={recipeContainer}>
          {recipeList.length == 0 && <div className="text-sm text-gray-200">Your Recipes will appear here!</div>}
          {recipeList.map((reciProps) => (<div className="recipe-container glass p-4 rounded-lg mb-3" key={reciProps.id}>
            <div className="recipe-top flex gap-3 mb-2 min-h-28 max-[480px]:min-h-16">
              <div className="image">
                <img src={reciProps.image} className="rounded-lg min-[480px]:w-40 w-28" alt="recipe-img"/>
              </div>
              <div className="relative recipe-text flex-1 flex flex-col">
                <h3 className="font-bold text-xl max-[480px]:text-base h-fit">{reciProps.title}</h3>
                <p className="max-[480px]:text-sm flex-1">Missing Ingredients: {reciProps.missedIngredientCount}</p>
                <div className="recipe-btns flex justify-between w-full max-[480px]:flex-wrap-reverse h-fit">
                  <button className="show-btn flex min-[480px]:w-28 w-[6.3rem] justify-between max-[480px]:items-center" onClick={(e) => HandleShow(e, reciProps.id)}>
                    <span className="min-[480px]:text-sm text-xs font-semibold text-red-500">Show Missing</span>
                    <Image src={Down} alt="Show icon" className="duration-200 max-[480px]:scale-75"></Image>
                  </button>
                  <button className="min-[480px]:text-sm text-xs font-semibold text-green-500"><a href={`https://spoonacular.com/recipes/${reciProps.title.replace(/ /g, '-').toLowerCase()}-${reciProps.id}`} target="_blank">Read More</a></button>
                </div>
              </div>
            </div>
            <div className="recipe-bottom overflow-hidden duration-200 max-h-0" id={`${reciProps.id}`}>
              <h4 className="missing text-lg font-bold mb-2">Missing Ingredient(s):</h4>
              <div className="missing-ingredients flex gap-3 flex-wrap p-2">
                {reciProps.missedIngredients.length == 0 && <div className="text-sm text-gray-200">Hooray! you have all the ingredients</div>}
                {reciProps.missedIngredients.length != 0 && reciProps.missedIngredients.map((miss) => (<div className="missing-box flex flex-col gap-2 items-center sm:w-[23%] w-[48%] p-2 rounded-lg glass-sm" key={miss.id}>
                  <div className="missing-name break-words text-center text-xs">
                    <span>{miss.name}</span>
                  </div>
                  <div className="missing-image flex justify-center items-center">
                    <img src={miss.image} className="rounded-lg" alt={miss.name} />
                  </div>
                </div>))}
              </div>
            </div>
          </div>))}
        </div>

      </section>
    </div>
  );
}
