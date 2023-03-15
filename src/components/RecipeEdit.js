import React,{useContext} from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import RecipeAuthorEdit from './RecipeAuthorEdit'
import { RecipeContext } from './App'
import {v4 as uuidv4} from 'uuid';

export default function RecipeEdit({ recipe }) {
  const {handleRecipeChange, handleRecipeSelect} = useContext(RecipeContext)

function handleChange(changes) {
  handleRecipeChange(recipe.id,{...recipe,...changes})
}

function handleIngredientChange(id,ingredient) {
  const newIngredients = [...recipe.ingredients]
  const index = newIngredients.findIndex(r => r.id ===id)
  newIngredients[index] = ingredient
  handleChange({ingredients : newIngredients})
}

function handleIngredientAdd() {
  const newIngredient = {
    id: uuidv4(),
    name: '',
    servings: 1,
    amount: ''
  }
  handleChange({ingredients:[...recipe.ingredients, newIngredient]})
}
function handleIngredientDelete(id) {
  handleChange({
    ingredients : recipe.ingredients.filter(i => i.id !== id)
  })
}


  
function handleAuthorChange(id,author) {
    const newAuthors = [...recipe.authors]
    const index = newAuthors.findIndex(r => r.id ===id)
    newAuthors[index] = author
    handleChange({authors : newAuthors})
  }
  
function handleAuthorAdd() {
    const newAuthor = {
      id: uuidv4(),
      name: ''
    }
  handleChange({authors:[...recipe.authors, newAuthor]})
}
function handleAuthorDelete(id) {
  handleChange({
    authors : recipe.authors.filter(i => i.id !== id)
  })
}

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button className="btn recipe-edit__remove-button" onClick={() => handleRecipeSelect(undefined)}>&times;</button>
      </div>
      <div className="recipe-edit__details-grid">
        <label
          htmlFor="name"
          className="recipe-edit__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          onChange={e => handleChange({name : e.target.value})}
          className="recipe-edit__input" />
        <label
          htmlFor="cookTime"
          className="recipe-edit__label">
          Cook Time
        </label>
        <input
          type="text"
          name="cookTime"
          id="cookTime"
          value={recipe.cookTime}
          onChange={e => handleChange({cookTime : e.target.value})}
          className="recipe-edit__input" />
        <label
          htmlFor="servings"
          className="recipe-edit__label">
          Servings
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={recipe.servings}
          onChange={e => handleChange({servings : parseInt(e.target.value) || ''})}
          className="recipe-edit__input" />
        <label
          htmlFor="instructions"
          className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          name="instructions"
          className="recipe-edit__input"
          id="instructions" 
          value={recipe.instructions}
          onChange={e => handleChange({instructions : e.target.value})}
          />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
          />
        ))}
      </div>
      
      <div className="recipe-edit__add-ingredient-btn-container">
        <button className="btn btn--primary" onClick={() => handleIngredientAdd()}>Add Ingredient</button>
      </div>
      <br />
      <label className="recipe-edit__label">Authors</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div></div>
        {recipe.authors.map(author => (
          <RecipeAuthorEdit
            key={author.id}
            author={author}
            handleAuthorChange={handleAuthorChange}
            handleAuthortDelete={handleAuthorDelete}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button className="btn btn--primary" onClick={() => handleAuthorAdd()}>Add Author</button>
      </div>
    </div>
  )
}
