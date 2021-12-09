import './Recipe.css'
import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

export default function Recipe() {
    const {mode} = useTheme()

    const {id} = useParams()
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        if(error){
            // history.goBack()
            setTimeout(() => {
                history('/')
            }, 2000);
        }
    },[error, history])

    useEffect(() => {
        setIsPending(true)
        
        const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc)=> {
            if(doc.exists){
                setIsPending(false)
                setData(doc.data())
            }else{
                setIsPending(false)
                setError('Could not find that recipe')
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })
        return () => unsub()
    }, [id])
    const handleClick = () => {
        projectFirestore.collection('recipes').doc(id).update({
            title:'Something Completely Different'
        })
    }

    return (
        <div className={`recipe ${mode}`}>
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
            {data && (
                <div>
                    <img src={data.foodImage} width='70%' alt={data.title} />
                    <h2 className='page-title'>{data.title}</h2>
                    <p>Takes {data.cookingTime} to cook.</p>
                    <ul>
                        {data.ingredients.map((ingredients) => (
                            <li key={ingredients}>{ingredients}</li>
                        ))}
                    </ul>
                    <p className="method">{data.method}</p>
                    <button className='btn' onClick={handleClick} >Update me </button>
                </div>
            )}
        </div>
    )
}
