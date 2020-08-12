import React from "react";

class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.log(data);
          alert(data.errors);
        } else {
          this.props.setUser(data);
        }
      });
  };

  render() {
    return (
      <div className="center-form">
        <h1>Log in</h1>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <input
            name="username"
            value={this.state.username}
            type="username"
            onChange={this.handleChange}
            placeholder="username"
          />
          <input
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.handleChange}
            placeholder="password"
          />
          <button className="login" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LogIn;
