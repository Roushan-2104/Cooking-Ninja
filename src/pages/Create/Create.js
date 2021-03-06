import './Create.css'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { projectFirestore } from '../../firebase/config'

export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [foodImage, setFoodImage] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientsInput = useRef(null)


    const goback = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const doc = ({ title,ingredients,cookingTime: cookingTime + ' minutes', foodImage,method })

        try {
            await projectFirestore.collection('recipes').add(doc)
            goback('/')
        } catch (err) {
            console.log(err)
        }

    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if(ing && !ingredients.includes(ing)){
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientsInput.current.focus()
    }


    return (
        <div className='create'>
            <h2 className='page-title'>
                Add a New Recipe
            </h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe Tile:</span>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                     />
                </label>
                <label>
                    <span>Image of Food:</span>
                    <input 
                        type='text'
                        onChange={(e) => setFoodImage(e.target.value)}
                        value={foodImage}
                        placeholder='Paste the Image URL here ....'
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients</span>
                    <div className='ingredients'>
                        <input type='text'
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientsInput}
                        />
                        <button className='add' onClick={handleAdd}>Add</button>
                    </div>
                </label>
                <p>Current Ingredients: {ingredients.map((i) => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                     />
                </label>
                <label>
                    <span>Cooking Time (minutes):</span>
                    <input
                        type='number'
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                     />
                </label>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}
