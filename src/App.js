import React from "react";
// import CoinContainer from "./Components/CoinContComp/CoinContainer";
// import ExchContainer from "./Components/ExchContComp/ExchContainer";
// import MyCoins from "./Components/MyCoins";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import PlantsContainer from "./components/plants_container";
import PlantShowPage from "./components/plant_showpage";
// import UserNavbar from "./Components/UserNavBar";
// import SignUp from "./Components/SignUp";
// import LogIn from "./Components/LogIn";
// import LogOut from "./Components/LogOut";
// import "./App.css";

class App extends React.Component {
 state = {
   currentUser: null,
   currentPlantId: 0,
   currentPage: 1
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

 setCurrentPlantId = plantId => {
  this.setState({
    currentPlantId: plantId
  },()=> this.props.history.push(`/plants/${plantId}`))
 }

 setCurrentPage = pageNumer => {
  this.setState({
    currentPage: pageNumer
  },()=> this.props.history.push(`/plants/page=${pageNumer}`))
 }

render() {
  console.log(this.state)
  return (
    <div className="App">
    <NavBar/>
    <Switch>
    <Route exact path="/" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} setUser={this.setUser} {...this.state} {...routerProps}/>}/> 
    <Route exact path="/plants" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path="/flowers" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} api={"http://localhost:3000/api/v1/flowers"} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path="/food" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} food_api={"http://localhost:3000/api/v1/food"} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path={`/plants/page=${this.state.currentPage}`} render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path={`/plants/${this.state.currentPlantId}`} render={(routerProps)=> <PlantShowPage setCurrentPage={this.setCurrentPage} {...this.state} {...routerProps}/>}/>
    </Switch>
    </div>
  );
 }
}

export default App;
