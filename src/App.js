import React from "react";
// import CoinContainer from "./Components/CoinContComp/CoinContainer";
// import ExchContainer from "./Components/ExchContComp/ExchContainer";
// import MyCoins from "./Components/MyCoins";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import PlantsContainer from "./components/plants_container";
// import UserNavbar from "./Components/UserNavBar";
// import SignUp from "./Components/SignUp";
// import LogIn from "./Components/LogIn";
// import LogOut from "./Components/LogOut";
// import "./App.css";

class App extends React.Component {
 state = {
   currentUser: null
 }

 setUser = (user) => {
   if (user && user.message) {
    alert(user.message)
  } else if (user) {
    this.setState({
      currentUser: user
   },()=> {
     localStorage.user_id = user[0].id
     this.props.history.push('/my_coins')
   })
 } else {
   this.setState({
     currentUser: user
  },()=> this.props.history.push('/coins'))
  }
  console.log(this.state)
 }

render() {
  return (
    <div className="App">
    <NavBar/>
    <Switch>
    <Route exact path="/" render={(routerProps)=> <PlantsContainer setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path="/plants" render={(routerProps)=> <PlantsContainer setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path="/flowers" render={(routerProps)=> <PlantsContainer api={"http://localhost:3000/api/v1/flowers"}setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    </Switch>
    </div>
  );
 }
}

export default App;
