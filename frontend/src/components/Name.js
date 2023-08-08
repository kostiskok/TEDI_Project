import React, {Component} from 'react';

class Name extends Component {

    constructor(){
        super()
        this.state = {
            name:"Kostis"
        }
    }

    clickedme(){
        this.setState({
            // name: "Changed Text"
            name: this.state.name === "Kostis" ? "Yes" : "Kostis"
        })
    }

    render(){
        return(
            <div>
                <h1>{this.state.name}</h1>
                <button onClick={() => this.clickedme()} className='btn btn-success'>Change Text</button>
            </div>
        )
    }

}

export default Name;