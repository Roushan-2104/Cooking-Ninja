import { useState,useEffect} from "react"

const useFetch = (url,method= "GET") => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)  
    const [options, setOptions] = useState(null)
    
    const postDsta = (postData) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }

    useEffect(()=>{
        const controller = new AbortController()


        const fetchData = async (fetchOptions) => {
            setIsPending(true)


            try {
                const res = await fetch(url, {...fetchOptions,signal : controller.signal})
                if (!res.ok){
                    setIsPending(false)
                    setError(res.statusText)
              
                }
                else{
                    const json = await res.json()
                    setIsPending(false)

                    setData(json)
                    setError(null)
                }
                
            } catch (err) {
                if (err.name === "AbortError"){
                    console.log('the fetch was aborted')
                } else{
                    setIsPending(false)
                    setError('Could not fetch the data')
                    console.log(err.message)
                }
            }

        }
        if (method === "GET") {
            fetchData()
        }
        if (method === "POST" && options){
            fetchData(options)
        }

        return () => {
            controller.abort()
        }
    },[url, options, method])

    return { data, isPending, error, postDsta }
}

export default useFetch;