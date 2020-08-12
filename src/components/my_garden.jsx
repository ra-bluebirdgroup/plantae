import React from 'react';
import PlantsContainer from "./plants_container";

class MyGarden extends React.Component {
 state = {
   my_plants: []
 }

 componentDidMount() {
  //  console.log(this.props.currentUser)
   if (this.props.currentUser && this.props.currentUser[1]) {
       let trefleId = this.props.currentUser[1].map(plant => plant.trefleId)
   fetch(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_API_KEY}&ids=${trefleId.join()}&interval=1d,30d&convert=USD`)
     .then(response => response.json())
     .then(data => {
        this.setState({my_plants: data})

     })
   }

 }

 componentDidUpdate(prevProps){

 }

  render(){
    console.log(this.props)
    if (this.props.currentUser && this.state.my_plants.length > 0) {
      // console.log(this.state)
    return(
      <>
       <h1>Welcome {this.props.currentUser[0].user_name}</h1>
       <h1>Your Plants:</h1>
       <div className="cards">
                <PlantsContainer
                currentUser={this.props.currentUser}
                setUser={this.props.setUser}
                my_plants={this.state.my_plants}/>
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
