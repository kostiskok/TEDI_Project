
import React, { Component } from 'react'

class Example2 extends Component {

    myElement(names){
        return names.map(name =>
            
            <div key = {name}>
                {`${name}`}
            </div>
            
        )
    }

    render() {
        return (
            <div>

                {this.myElement(this.props.names)}

            </div>
        )
    }
}

export default Example2