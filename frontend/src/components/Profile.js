import React, {useState, useEffect} from "react";
import { useCookies } from "react-cookie";

function Profile() {

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
    <div>Profile</div>
  )
}

export default Profile