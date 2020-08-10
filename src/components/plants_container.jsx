import React from 'react'
import PlantCard from "./plant_card";


let API = 'http://localhost:3000/api/v1/plants'
class PlantsContainer extends React.Component {
  state = {
    plants: [],
    currentPage: 1
  }

  componentDidMount() {
    fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      currentPage: this.state.currentPage
    }
  })
  .then(res => res.json())
  .then(data => {
     if (data.errors) {
       alert(data.errors)
    } else {
      console.log(data)
      this.setState({
        plants: data.data,
        currentPage: Number(data.currentPage)
      })
    }
   })

  }

componentDidUpdate(prevState) {
  if (prevState !== this.state){

 }
}

 handleClick = e => {
   if (e.target.innerText === "☚") {
     fetch(API, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       currentPage: this.state.currentPage - 1
     }
   })
   .then(res => res.json())
   .then(data => {
      if (data.errors) {
        alert(data.errors)
     } else {
       console.log(data)
       this.setState({
         plants: data.data,
         currentPage: Number(data.currentPage)
       })
     }
    })

   } else {

     fetch(API, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       currentPage: this.state.currentPage + 1
     }
   })
   .then(res => res.json())
   .then(data => {
      if (data.errors) {
        alert(data.errors)
     } else {
       console.log(data)
       this.setState({
         plants: data.data,
         currentPage: Number(data.currentPage)
       })
     }
    })

   }
 }
  render(){
     let backButton = ""

     this.state.currentPage > 1 ? backButton = <button onClick={this.handleClick}className="navButtons"> ☚ </button> : backButton = ""
     console.log(this.state)
    if (this.state.plants.data){
      return(
    <div className="cards">
        {backButton}
         {
           this.state.plants.data.map(plant => <PlantCard key={plant.id}{...plant}/>)
       }
       <button onClick={this.handleClick}className="navButtons"> ☛ </button>
    </div>
      )
    } else {
   return(
    <>
     <p>⌛...</p>
    </>
   )
 }
 }
}
export default PlantsContainer
