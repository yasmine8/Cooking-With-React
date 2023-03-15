import React, { useContext }  from 'react'
//import App from './App'
import { RecipeContext } from './App'

export default function SearchBar() {
    const { handleSearchChange } = useContext(RecipeContext)
  return (
    <div>
      <input type="text" placeholder="Search for a country" 
          onChange={handleSearchChange}
      />
      
    </div>
  )
}
