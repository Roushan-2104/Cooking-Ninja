import './Home.css'
import useFetch from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'

export default function Home() {
    const { data: recipes, isPending, error } = useFetch('http://localhost:3000/recipes')
    return (
        <div className='home'>
            {isPending && 
                <div className='loading'>
                    <em><b>Loading !!</b></em>
                </div>
            }
            {error &&
                <div className='error'>
                    <em><b>Errorrrrrr !!!!</b></em>
                </div>
            }
            {recipes && <RecipeList recipes={recipes}/>}

        </div>
    )
}
