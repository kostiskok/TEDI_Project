import logo from './logo.svg';
import './App.css';

import Hello from './components/Hello';
import MyClass from './components/MyClass';
import Name from './components/Name';

function App() {

  function dontclick(){
    alert("Why did you click?");
  }

  return (
    <div className="container">
      {/* <Hello name = "Airbnb"/>
      <MyClass test="Airbnb" myclick={dontclick}/> */}
      <Name/>
    </div>
  );
}

export default App;
