import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

function HostEdit() {

    const [token, setToken] = useCookies(['mytoken'])
    const [status, setStatus] = useCookies(['status'])

    /*
    * If the user is not a host, redirect him to the home page
    **/
    let navigate = useNavigate()
    useEffect(() => {
        if (!status['status'] || !status['status'].isHost){
            navigate('/')
        }
    }, [status])

  return (
    <div>HostEdit</div>
  )
}

export default HostEdit