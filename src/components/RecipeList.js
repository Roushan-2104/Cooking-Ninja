import './RecipeList.css'
import { Link } from 'react-router-dom'

export default function RecipeList({recipes}) {
    if (recipes.length === 0){
        return <div className='error'>No recipes to load.....</div>
    }
    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => (
                    <div className='card' key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.cookingTime}</p>
                        <div>{recipe.method.substring(0,100)}</div>
                        <Link to={`recipe/${recipe.id}`}>Cook This</Link>
                    </div>
                ))}
        </div>
    )
}
