import React, {useState, useEffect} from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

import APIService from "../APIService";

function Register() {

    /*
    * When a user is already logged in, just redirect him to the main page
    **/
    const [token, setToken] = useCookies(['mytoken'])
    let navigate = useNavigate()
    useEffect(() => {
        if(token['mytoken']){
            navigate('/')
        }
      }, [token])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isRenter, setIsRenter] = useState(false)
    const [isHost] = useState(false)
    const [waitingHost, setWaitingHost] = useState(false)

    const RegisterBtn = () => {

        APIService.registerUser({
            username,
            password,
            firstName,
            lastName,
            email,
            phone,
            isRenter,
            isHost,
            waitingHost
        })
        .then(resp => console.log(resp))
        .catch(error => console.log(error))

    }

  return(
    <div className="container">

        Register

        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='username' className="form-label">Username</label>
            </div>
            <div className="col-sm-3">
                <input type='text' className="form-control" id='username' placeholder="Username"
                value = {username} onChange={e => setUsername(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='password' className="form-label">Password</label>
            </div>
            <div className="col-sm-3">
                <input type='password' className="form-control" id='password' placeholder="Password"
                value = {password} onChange={e => setPassword(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='password_conf' className="form-label">Confirm password</label>
            </div>
            <div className="col-sm-3">
                <input type='password' className="form-control" id='password_conf' placeholder="Confirm Password"
                value = {passwordConf} onChange={e => setPasswordConf(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='first_name' className="form-label">First Name</label>
            </div>
            <div className="col-sm-3">
                <input type='text' className="form-control" id='first_name' placeholder="First Name"
                value = {firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='last_name' className="form-label">Last Name</label>
            </div>
            <div className="col-sm-3">
                <input type='text' className="form-control" id='last_name' placeholder="Last Name"
                value = {lastName} onChange={e => setLastName(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='email' className="form-label">Email</label>
            </div>
            <div className="col-sm-3">
                <input type='email' className="form-control" id='email' placeholder="Email"
                value = {email} onChange={e => setEmail(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='phone' className="form-label">Phone Number</label>
            </div>
            <div className="col-sm-3">
                <input type='tel' className="form-control" id='phone' placeholder="Phone"
                value = {phone} onChange={e => setPhone(e.target.value)}/>
                <small>Format: +12345678901</small>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="renter"
                value = {isRenter} onChange={() => setIsRenter(!isRenter)}/>
                <label className="form-check-label" htmlFor="renter">
                    I want to rent
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="host"
                value = {waitingHost} onChange={() => setWaitingHost(!waitingHost)}/>
                <label className="form-check-label" htmlFor="host">
                    I want to host
                </label>
            </div>
        </div>
        <br/>

        <button onClick={RegisterBtn} className="btn btn-primary">Register</button>
                
    </div>
  )
}

export default Register;
