import React from 'react'

export default function RecipeAuthorEdit({author, handleAuthorChange,handleAuthorDelete}) {

  function handleChange(changes) {
    handleAuthorChange(author.id,{...author,...changes})
  }
  return (
    <>
      <input className="recipe-edit__input" type="text" value={author.name}
        onChange={(e) => handleChange({name : e.target.value})}
      />
      
      <button className="btn btn--danger" onClick={() => handleAuthorDelete(author.id)}>&times;</button>
    </>
  )
}
