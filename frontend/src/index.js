import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

import Register from './components/Register';
import Profile from './components/Profile';
import Header from './components/Header';
import Rooms from './components/Rooms';
import Room from './components/Room';
import AdminMenu from './components/AdminMenu';
import HostMenu from './components/HostMenu';
import HostCreate from './components/HostCreate';
import HostEdit from './components/HostEdit';
import Messages from './components/Messages';

function Router() {

  return(

    <CookiesProvider>

    <BrowserRouter>
      <Header/>

      <Routes>
        <Route exact path = '/' element = {<App />}/>
        <Route exact path = '/rooms/' element = {<Rooms />}/>
        <Route exact path = '/rooms/:id/' element = {<Room />}/>

        <Route exact path = '/register/' element = {<Register />}/>
        <Route exact path = '/profile/' element = {<Profile />}/>
        
        <Route exact path = '/admin/' element = {<AdminMenu />}/>
        
        <Route exact path = '/host/' element = {<HostMenu />}/>
        <Route exact path = '/host/create/' element = {<HostCreate />}/>
        <Route exact path = '/host/:id/' element = {<HostEdit />}/>
        <Route exact path = '/messages/:id/' element = {<Messages />}/>
      </Routes>
    </BrowserRouter>

    </CookiesProvider>

  )

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
