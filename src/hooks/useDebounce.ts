import {useState, useEffect} from 'react'

export const useDebounce = (value:any, delay=500) => {

    const [debounce, setDebounce] = useState(value)

    useEffect(()=>{

        const id = setTimeout(()=>{
            console.log("setting new timeout")
            setDebounce(value)
        },delay)

        return () =>{
            console.log("clearing time out")
            clearTimeout(id)
        }



    },[value, delay])


  return debounce
}