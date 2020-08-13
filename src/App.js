import React from "react";
// import CoinContainer from "./Components/CoinContComp/CoinContainer";
// import ExchContainer from "./Components/ExchContComp/ExchContainer";
// import MyCoins from "./Components/MyCoins";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import PlantsContainer from "./components/plants_container";
import PlantShowPage from "./components/plant_showpage";
import SignUp from "./components/sign_up";
import UserNavbar from "./components/user_navbar";
import LogIn from "./components/log_in";
import LogOut from "./components/log_out";
import Info from "./components/info";
import Identifier from "./components/identifier";
import MyGarden from "./components/my_garden";

class App extends React.Component {
 state = {
   currentUser: null,
   currentPlantId: 0,
   currentPage: 1
 }

 componentDidMount(){
   const user_id = localStorage.user_id

   if (user_id) {
    fetch("http://localhost:3000/api/v1/auto_login", {
      headers: {
        "Authorization": user_id
      }
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors){
       alert(response.errors)
     } else {

        this.setUser(response)
       }
    })
  }

 }

 setUser = (user) => {
   console.log(user)
   if (user.errors) {
    alert(user.errors)
  } else if (user) {
    this.setState({
      currentUser: user
   },()=> {
     console.log(user)
     localStorage.user_id = user.user.id
     this.props.history.push('/my_garden')
   })
 } else {
   this.setState({
     currentUser: user
  },()=> this.props.history.push('/'))
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
  let navbar = <NavBar currentUser={this.state.currentUser} />;

if (this.state.currentUser) {
  navbar = <UserNavbar currentUser={this.state} setUser={this.setUser} />;
}
  console.log(this.state)
  return (
    <div className="App">
    {navbar}
    <Switch>
    <Route exact path="/" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path="/plants" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path="/flowers" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} api={"http://localhost:3000/api/v1/flowers"} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path="/food" render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} food_api={"http://localhost:3000/api/v1/food"} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path={`/plants/page=${this.state.currentPage}`} render={(routerProps)=> <PlantsContainer setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} setUser={this.setUser} {...this.state} {...routerProps}/>}/>
    <Route exact path={`/plants/${this.state.currentPlantId}`} render={(routerProps)=> <PlantShowPage setUser={this.setUser} setCurrentPage={this.setCurrentPage} {...this.state} {...routerProps}/>}/>
    <Route exact path="/signup" render={(routerProps)=> <SignUp setUser={this.setUser} {...routerProps}/>}/>
    <Route exact path="/login" render={(routerProps)=> <LogIn setUser={this.setUser} {...routerProps}/>}/>
    <Route exact path="/logout" render={(routerProps)=> <LogOut setUser={this.setUser} {...routerProps}/>}/>
    <Route exact path="/info" render={(routerProps)=> <Info {...routerProps}/>}/>
    <Route exact path="/identifier" render={(routerProps)=> <Identifier {...this.state} {...routerProps}/>}/>
    <Route exact path="/my_garden" render={(routerProps)=> <MyGarden setUser={this.setUser} setCurrentPage={this.setCurrentPage} setCurrentPlantId={this.setCurrentPlantId} {...this.state} {...routerProps}/>}/>
    </Switch>
    </div>
  );
 }
}

export default App;
