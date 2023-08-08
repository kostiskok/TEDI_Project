import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Form from './components/Form';

function Router() {

  return(

    <BrowserRouter>
      <Routes>
        <Route exact path = '/' element = {<App />}/>
        <Route exact path = '/login' element = {<Form />}/>
      </Routes>
    </BrowserRouter>

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
