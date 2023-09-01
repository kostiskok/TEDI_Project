import React, {useState, useEffect} from "react";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';

import APIService from "../APIService";

function Header() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [userid, setUserid, removeUserid] = useCookies(['userid'])
    const [status, setStatus, removeStatus] = useCookies(['status'])

    const [isLogged, setLogged] = useState(false)
    const [isAdmin, setAdmin] = useState(false)
    const [isHost, setHost] = useState(false)
    const [isRenter, setRenter] = useState(false)
    const [waitingHost, setWaitingHost] = useState(false)

    // Login
    const loginBtn = () => {
        APIService.loginUser({username, password})
        // .then(resp => resp.token ? setToken('mytoken', resp.token) : console.log('No username with that password'))
        .then(resp => resp.token 
            ? [setToken('mytoken', resp.token), setUserid('userid', resp.id)] 
            : console.log('No username with that password')
        )
        .catch(error => console.log(error))
    }

    // Logout
    const logoutBtn = () => {
        removeToken(['mytoken'])
        removeUserid(['userid'])
        removeStatus(['status'])
    }

    /*
    * When a user logs in:
    * 1. Change the setLogged variable to True -> for more straightforward use later
    * 2. Add another cookie, status, which informs us if the user is an Admin, Host or Renter
    **/
    useEffect(() => {
        if(token['mytoken']){
            setLogged(true)

            // APIService.userStatus(token['mytoken'])
            // .then(resp => resp[0] ? setStatus('status', resp[0]) : console.log('There was an error with the status retrieval'))
            // .catch(error => console.log(error))
            APIService.getUser(userid['userid'])
            .then(resp => resp ? setStatus('status', resp) : console.log('There was an error with the status retrieval'))
            .catch(error => console.log(error))
        }
        else{
            setLogged(false)
        }
    }, [token])

    // Set the status variables of the fields
    useEffect(() => {
        if(status['status']){
            setAdmin(status['status'].isAdmin)
            setHost(status['status'].isHost)
            setRenter(status['status'].isRenter)
            setWaitingHost(status['status'].waitingHost)
        }
        else{
            setAdmin(false)
            setHost(false)
            setRenter(false)
            setWaitingHost(false)
        }
    }, [status])

    const statusAdditionalLinks = () => {

        return (
            <div>
                {isAdmin 
                    ? <Link to="/admin/" className="nav-link text-white flex-sm-fill"><b>Admin Menu</b></Link>
                    : null
                }
                {isHost 
                    ? <Link to="/host/" className="nav-link text-white flex-sm-fill"><b>Host Menu</b></Link>
                    : null
                }
                {waitingHost 
                    ? <div className="nav-link text-white flex-sm-fill"><b>Awaiting Host Approval</b></div>
                    : null
                }
            </div>
        )
    }

  return(

    <div className="bg-primary mb-5">
        <nav className="nav nav-pills flex-column flex-sm-row align-items-center" style={{height: "60px"}}>
            <div className="d-flex justify-content-start">
                <Link to="/" className="nav-link text-white">Airbnb</Link>
            </div>
            <div className="d-flex justify-content-start flex-sm-fill">
                <Link to="/rooms/" className="nav-link text-white flex-sm-fill">Rooms</Link>
            </div>

    { isLogged 
        ?   
            <div className="d-flex justify-content-end">
                {statusAdditionalLinks()}
                <Link to="/profile/" className="nav-link text-white">My Profile</Link>
                <button onClick={logoutBtn} className="btn btn-danger" id="logout">Logout</button>
            </div>
        :
            <div className="d-flex justify-content-end">
                <input type='text' className="form-control" id='username' placeholder="Username"
                value = {username} onChange={e => setUsername(e.target.value)}/>
                <input type='password' className="form-control" id='password' placeholder="Password"
                value = {password} onChange={e => setPassword(e.target.value)}/>
                <button onClick={loginBtn} className="btn btn-success" id="login">Login</button>
                <Link to="/register/" className="nav-link text-white flex-sm-fill">Register</Link>
            </div>
    }

        </nav>
        
    </div>

    );
}

export default Header;
