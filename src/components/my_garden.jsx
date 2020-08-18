import React from 'react';
import PlantsContainer from "./plants_container";

class MyGarden extends React.Component {
 state = {
   my_plants: []
 }

 componentDidMount() {
   if (this.props.currentUser && this.props.currentUser.userplants.length > 0) {
     fetch("http://localhost:3000/api/v1/userplants", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         userplants: this.props.currentUser.userplants
       })
     })
     .then(res => res.json())
     .then(data => {
       console.log(data.data)
          this.setState({my_plants: data.data})
      })
   }
 }

 componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      fetch("http://localhost:3000/api/v1/userplants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          userplants: this.props.currentUser.userplants
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data)
           this.setState({my_plants: data.data})
       })
    }
 }

  render(){
    console.log(this.state)
    if (this.state.my_plants && this.state.my_plants.data) {
      // console.log(this.state)
    return(
      <>
       <div className="cards">
                <PlantsContainer
                currentUser={this.props.currentUser}
                {...this.props}
                my_plants={this.state.my_plants.data}/>
       </div>
       </>
    )
  } else if (this.props.currentUser){

    return(
      <>
        <h1>Welcome {this.props.currentUser.user.username}</h1>
        <h1>Tracked plants will be displayed here...</h1>
      </>
    )
  } else {
    return(
      <>
        <h1>Please Sign up, or Log in to start gathering your favorite plants!</h1>
      </>
    )
  }
 }
}
export default MyGarden;
