import './RecipeList.css'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import TrashCan from '../assets/delete.svg'
import { projectFirestore } from '../firebase/config'

export default function RecipeList({recipes}) {
    const {mode} = useTheme()
    if (recipes.length === 0){
        return <div className='error'>No recipes to load.....</div>
    }

    const handleClick = (id) => {
        projectFirestore.collection('recipes').doc(id).delete()
        
    }
    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => (
                    <div className={`card ${mode}`} key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.cookingTime}</p>
                        <div>{recipe.method.substring(0,100)}</div>
                        <Link to={`recipe/${recipe.id}`}>Cook This</Link>
                        <img 
                            className='delete'
                            src={TrashCan}
                            onClick={() => handleClick(recipe.id)}
                            alt='delete'
                            style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                        />
                    </div>
                ))}
        </div>
    )
}
