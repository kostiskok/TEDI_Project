import React, {Component} from 'react';

class MyClass extends Component{

    render() {
        return(
            <div>
                <h3 className="bg-primary text-white text-center">{this.props.test}</h3>
                <button className="btn btn-primary"onClick={this.props.myclick}>Don't Click</button>
            </div>
        )
    }

}

export default MyClass;