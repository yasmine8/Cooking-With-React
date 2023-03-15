import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'

export default function RecipeList({ recipes , searchTerm}) {
  const { handleRecipeAdd } = useContext(RecipeContext)
  const filteredCountries = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div className="recipe-list">
      <div>
        
        {filteredCountries.map((recipe) => {
          return (
            <Recipe key={recipe.id} {...recipe} />
          );
        })}
        
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button
          className="btn btn--primary"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </button>
      </div>
    </div>
  )
}
