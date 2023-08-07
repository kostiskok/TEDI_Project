import React from 'react';

function Hello(props){

    function Clickme(){
        alert("Button is clicked");
    }

    return(
        <div className="container">
            <h1>The app is {props.name}</h1>
            <button className="btn btn-success"onClick={Clickme}>CLICK ME</button>
        </div>
    )

}

export default Hello