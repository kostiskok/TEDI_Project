import React, {useState, useEffect} from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

import APIService from "../APIService";

function Register() {

    /*
    * When a user is already logged in, just redirect him to the main page
    **/
    const [token] = useCookies(['mytoken'])
    let navigate = useNavigate()
    useEffect(() => {
        if(token['mytoken']){
            navigate('/')
        }
      }, [token])

    // Form fields
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isRenter, setIsRenter] = useState(false)
    const [waitingHost, setWaitingHost] = useState(false)
    const [photo, setPhoto] = useState(null)

    // Boolean flags for warnings/errors in register
    const [pressedOnce, setPressedOnce] = useState(false)
    const [users, setUsers] = useState([])

    const [usernameLegit, setUsernameLegit] = useState(false)
    const [usernameFill, setUsernameFill] = useState(false)
    const [passwordFill, setPasswordFill] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const [firstNameFill, setFirstNameFill] = useState(false)
    const [lastNameFill, setLastNameFill] = useState(false)
    const [emailFill, setEmailFill] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [phoneFill, setPhoneFill] = useState(false)
    const [phoneValid, setPhoneValid] = useState(false)

    useEffect(() => {
        APIService.getUsers()
        .then(resp => setUsers(resp))
        .catch(error => console.log(error))
    }, [])

    // Check if username is used by another user
    useEffect(() => {
        let flag = false
        for (var user of users){
            if (username == user.username){
                flag = true;
            }
        }

        if (flag){
            setUsernameLegit(false)
        }
        else{
            setUsernameLegit(true)
        }
    }, [username])

    useEffect(() => {
        if (username === ''){
            setUsernameFill(false)
        }
        else{
            setUsernameFill(true)
        }
    }, [username])

    useEffect(() => {
        if (password === ''){
            setPasswordFill(false)
        }
        else{
            setPasswordFill(true)
        }
    }, [password])

    useEffect(() => {
        if (password === passwordConf && password !== ''){
            setPasswordsMatch(true)
        }
        else{
            setPasswordsMatch(false)
        }
    }, [password, passwordConf])

    useEffect(() => {
        if (firstName === ''){
            setFirstNameFill(false)
        }
        else{
            setFirstNameFill(true)
        }
    }, [firstName])

    useEffect(() => {
        if (lastName === ''){
            setLastNameFill(false)
        }
        else{
            setLastNameFill(true)
        }
    }, [lastName])

    useEffect(() => {
        if (email === ''){
            setEmailFill(false)
        }
        else{
            setEmailFill(true)
        }
    }, [email])

    useEffect(() => {
        var regExp = /\S+@\S+\.\S+/;
        if (regExp.test(email)){
            setEmailValid(true)
        }
        else{
            setEmailValid(false)
        }
    }, [email])

    useEffect(() => {
        if (phone === ''){
            setPhoneFill(false)
        }
        else{
            setPhoneFill(true)
        }
    }, [phone])

    useEffect(() => {
        var regExp = /\+\d{11}$/;
        if (regExp.test(phone)){
            setPhoneValid(true)
        }
        else{
            setPhoneValid(false)
        }
    }, [phone])

    const RegisterBtn = () => {

        setPressedOnce(true)
        
        if (usernameLegit && usernameFill && passwordFill && passwordsMatch && firstNameFill && 
            lastNameFill && emailFill && emailValid && phoneFill && phoneValid && (isRenter || waitingHost)){
            APIService.registerUser(
                username,
                password,
                photo,
                firstName,
                lastName,
                email,
                phone,
                isRenter,
                waitingHost
            )
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
            
            navigate('/')
        }

    }

    const warnings = () => {

        let usernameLegitWarning;
        let usernameWarning;
        let passwordWarning;
        let confirmWarning;
        let firstNameWarning;
        let lastNameWarning;
        let emailWarning;
        let emailValidWarning;
        let phoneWarning;
        let phoneValidWarning;
        let rolesWarning;

        if (pressedOnce){

            if (!usernameLegit){
                usernameLegitWarning = <div>! Username is being used by another user</div>;
            }
            if (!usernameFill){
                usernameWarning = <div>! Username is a required field</div>;
            }
            if (!passwordFill){
                passwordWarning = <div>! Password is a required field</div>;
            }
            if (!passwordsMatch){
                confirmWarning = <div>! Passwords do not match</div>;
            }
            if (!firstNameFill){
                firstNameWarning = <div>! First name is a required field</div>;
            }
            if (!lastNameFill){
                lastNameWarning = <div>! Last name is a required field</div>;
            }
            if (!emailFill){
                emailWarning = <div>! Email is a required field</div>;
            }
            if (!emailValid){
                emailValidWarning = <div>! This is not a valid email address</div>
            }
            if (!phoneFill){
                phoneWarning = <div>! Phone is a required field</div>;
            }
            if (!phoneValid){
                phoneValidWarning = <div>! This is not a valid phone number</div>;
            }
            if (!isRenter && !waitingHost){
                rolesWarning = <div>! No roles selected</div>
            }

        }

        return(
            <div className="text-danger mt-2">
                <b>
                    {usernameLegitWarning}
                    {usernameWarning}
                    {passwordWarning}
                    {confirmWarning}
                    {firstNameWarning}
                    {lastNameWarning}
                    {emailWarning}
                    {emailValidWarning}
                    {phoneWarning}
                    {phoneValidWarning}
                    {rolesWarning}
                </b>
            </div>
        )

    }

  return(
    <div className="container">

        <h1>Register</h1><hr/>

        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='username' className="form-label">Username</label>
            </div>
            <div className="col-sm-4">
                <input type='text' className="form-control" id='username' placeholder="Username"
                value = {username} onChange={e => setUsername(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='password' className="form-label">Password</label>
            </div>
            <div className="col-sm-4">
                <input type='password' className="form-control" id='password' placeholder="Password"
                value = {password} onChange={e => setPassword(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='password_conf' className="form-label">Confirm password</label>
            </div>
            <div className="col-sm-4">
                <input type='password' className="form-control" id='password_conf' placeholder="Confirm Password"
                value = {passwordConf} onChange={e => setPasswordConf(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='first_name' className="form-label">First Name</label>
            </div>
            <div className="col-sm-4">
                <input type='text' className="form-control" id='first_name' placeholder="First Name"
                value = {firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='last_name' className="form-label">Last Name</label>
            </div>
            <div className="col-sm-4">
                <input type='text' className="form-control" id='last_name' placeholder="Last Name"
                value = {lastName} onChange={e => setLastName(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='email' className="form-label">Email</label>
            </div>
            <div className="col-sm-4">
                <input type='email' className="form-control" id='email' placeholder="Email"
                value = {email} onChange={e => setEmail(e.target.value)}/>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-sm-2">
                <label htmlFor='phone' className="form-label">Phone Number</label>
            </div>
            <div className="col-sm-4">
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
        <div className="row mt-5">
            <div className="col-sm-2">
                <label htmlFor='photo' className="form-label">Avatar (Optional)</label>
            </div>
            <div className="col-sm-4">
                <input type='file' className="form-control" id='photo'
                onChange={(e) => setPhoto(e.target.files[0])}/>
            </div>
        </div>
        <br/>

        <button onClick={RegisterBtn} className="btn btn-primary">Register</button>
        {warnings()}

    </div>
  )
}

export default Register;
