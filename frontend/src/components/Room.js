import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import { useCookies } from "react-cookie";

function Room() {

    const { id } = useParams()

    const [token, setToken] = useCookies(['mytoken'])
    const [isLogged, setLogged] = useState(false)

    // Change the var isLogged when the user logs
    useEffect(() => {
        if(token['mytoken']){
            setLogged(true)
        }
        else{
        setLogged(false)
        }
    }, [token])

  return (
    <div>Room {id}</div>
  )
}

export default Room