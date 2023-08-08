import React from 'react';

import logo from './logo.svg';
import './App.css';

import Hello from './components/Hello';
import MyClass from './components/MyClass';
import Name from './components/Name';
import Example from './components/Example';
import Example2 from './components/Example2';
import Form from './components/Form';
import MyFragment from './components/MyFragment';

// import ComponentA from './components/ComponentA';
import Counter from './components/Counter';
import CounterHook from './components/CounterHook';
import FetchData from './components/FetchData';
// import ComponentAHook from './components/ComponentAHook';
import UseReducer from './components/UseReducer';
import DataFetching from './components/DataFetching';

// export const MyContext = React.createContext()

function App() {

  function dontclick(){
    alert("Why did you click?");
  }

  return (
    <div className="container">

      {/* <Hello name = "Airbnb"/>
      <MyClass test="Airbnb" myclick={dontclick}/> */}
      {/* <Name/>
      <Example names={['abc', 'def', 'fgh', 'ijk']}/>
      <Example2 names={['abc1', 'def2', 'fgh3', 'ijk4']}/> */}
      {/* <Form/>
      <MyFragment /> */}

      {/* <MyContext.Provider value = "This is a value from context">
        <ComponentA />
      </MyContext.Provider> */}

      {/* <Counter /> */}
      {/* <CounterHook /> */}
      {/* <FetchData /> */}

      {/* <MyContext.Provider value = "This is context value with hooks">
        <ComponentAHook />
      </MyContext.Provider> */}

      {/* <UseReducer /> */}
      <DataFetching/>

    </div>
  );
}

export default App;
