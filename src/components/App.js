import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import {v4 as uuidv4} from 'uuid';
import RecipeEdit from './RecipeEdit';
import SearchBar from './SearchBar';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [searchTerm, setSearchTerm] = useState("");
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleSearchChange
  }

 

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

function handleRecipeChange(id,recipe) {
  const newRecipes = [...recipes]
  const index = newRecipes.findIndex(r => r.id ===id)
  newRecipes[index] = recipe
  setRecipes(newRecipes)
}

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '.',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ],
      authors: [
        { id: uuidv4(), name: '' }
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    if(selectedRecipeId !=null && selectedRecipeId ===id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <SearchBar />
      <RecipeList recipes={recipes} searchTerm={searchTerm}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ],
    authors :  [
      {
        id : 1,
        name : "cochon"
      },
      {
        id : 2,
        name : "halouf"
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ],
    authors :  [
      {
        id : 1,
        name : "cochon"
      },
      {
        id : 2,
        name : "<span>{name}</span>"
      }
    ]
  }
]

export default App;
