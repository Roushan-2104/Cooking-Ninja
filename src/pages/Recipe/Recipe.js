import './Recipe.css'
import {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

export default function Recipe() {
    const {id} = useParams()
    const url =`http://localhost:3000/recipes/${id}`
    const { data: recipe, isPending, error } = useFetch(url)
    const history = useNavigate()

    useEffect(() => {
        if(error){
            // history.goBack()
            setTimeout(() => {
                history('/')
            }, 2000);
        }
    },[error, history])

    return (
        <div>
           {isPending && 
                <div className='loading'>
                    <em><b>Loading ...</b></em>
                </div>
            }
            {error &&
                <div className='error'>
                    <b>Errorrrrrr !!!!</b>
                </div>
            }
            {recipe && (
                <div className='recipe'>
                    <img src={recipe.foodImage} width='70%' />
                    <h2 className='page-title'>{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map((ingredients) => (
                            <li key={ingredients}>{ingredients}</li>
                        ))}
                    </ul>
                    <p className="method">{recipe.method}</p>
                </div>
            )}
        </div>
    )
}
