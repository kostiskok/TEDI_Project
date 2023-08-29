import React, {useState, useEffect} from "react";
import './App.css';
// import ArticleList from './components/ArticleList';
// import Form from './components/Form';
import { useCookies } from 'react-cookie';

function App() {

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
    <div>
      {isLogged ? <div>in</div> : <div>out</div>}
        tests

        
    </div>
  );
}


export default App;
