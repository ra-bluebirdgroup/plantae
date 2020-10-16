import React from 'react'

class SignUp extends React.Component {

  state = {
    username: "",
    password: "",
    passwordConfirmation: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

  if (this.state.password === this.state.passwordConfirmation && this.state.username){
    fetch("https://theplantaeapi.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
       if(Array.isArray(data)){
         console.log(data)
         alert(data[0])
       } else {
         this.props.setUser(data)
       }
     })

  } else {
    alert("Passwords don't match! User name can't be empty!")
   }

  }

  render(){
    return (
      <div className="center-form">
       <h1>Sign up</h1>
        <form className="auth-form" onSubmit={this.handleSubmit}>
        <input name="username" value={this.state.username} type="username"  onChange={this.handleChange}placeholder="username"/>
        <input name="password" value={this.state.password} type="password"  onChange={this.handleChange}placeholder="password"/>
        <input name="passwordConfirmation" value={this.state.passwordConfirmation} type="password"  onChange={this.handleChange}placeholder="confirm password"/>
        <button className="SignUp" type="submit">Sign Up</button>
        </form>
      </div>
    )
  }

}

export default SignUp
