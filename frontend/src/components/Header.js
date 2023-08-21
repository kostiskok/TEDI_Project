import React, {useState, useEffect} from "react";
import { useCookies } from "react-cookie";

import APIService from "../APIService";

function Header() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken, removeToken] = useCookies(['mytoken'])

    const [isLogged, setLogged] = useState(false)

    // Login
    const loginBtn = () => {
        APIService.loginUser({username, password})
        .then(resp => resp.token ? setToken('mytoken', resp.token) : console.log('No username with that password'))
        .catch(error => console.log(error))
    }

    // Logout
    const logoutBtn = () => {
        removeToken(['mytoken'])
    }

    // Change the var isLogged when the user logs
    useEffect(() => {
        if(token['mytoken']){
            setLogged(true)
        }
        else{
            setLogged(false)
        }
    }, [token])

  return(

    <div className="bg-primary">
        <nav className="nav nav-pills flex-column flex-sm-row align-items-center" style={{height: "60px"}}>
            <div className="d-flex justify-content-start">
                <a className="nav-link text-white " href="/">AirBnb</a>
            </div>
            <div className="d-flex justify-content-start flex-sm-fill">
                <a className="nav-link text-white flex-sm-fill" href="/rooms/">Rooms</a>
            </div>

    { isLogged 
        ? 
            <div className="d-flex justify-content-end">
                <a className="nav-link text-white" href="/profile/">My Profile</a>
                <button onClick={logoutBtn} className="btn btn-danger" id="logout">Logout</button>
            </div>
        :
            <div className="d-flex justify-content-end">
                <input type='text' className="form-control" id='username' placeholder="Username"
                value = {username} onChange={e => setUsername(e.target.value)}/>
                <input type='password' className="form-control" id='password' placeholder="Password"
                value = {password} onChange={e => setPassword(e.target.value)}/>
                <button onClick={loginBtn} className="btn btn-success" id="login">Login</button>
                <a className="nav-link text-white flex-sm-fill" href="/register/">Register</a>
            </div>
    }

        </nav>
    </div>

    );
}

export default Header;