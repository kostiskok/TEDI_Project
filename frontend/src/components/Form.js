import React, { Component } from 'react'

export class Form extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         username:'',
         password:''
        //  posts:[]
      }
    }

    // componentDidMount(){
    //   fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(data => this.setState({posts:data}))
    // }

    usernameHandler = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

  render() {
    // const {posts} = this.state

    return (
      <div className='container'>

        <input type="text" value = {this.state.username} placeholder='Enter your username' className='form-control' onChange={this.usernameHandler}/>
        <input type="password" value = {this.state.password} placeholder='Enter your password' className='form-control' onChange={this.passwordHandler}/>
        <button className='btn btn-primary'>Click me</button>


        {/* {posts.map(post => 
          <p key={post.id}>{post.title}</p>
          )} */}

      </div>
    )
  }
}

export default Form