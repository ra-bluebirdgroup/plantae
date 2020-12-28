import React from 'react'
import PlantCard from "./plant_card";

class PlantsContainer extends React.Component {
  state = {
    plants: [],
    currentPage: 1,
    searchTerm: ""
  }

  componentDidMount() {
    if (this.props.my_plants){
      this.setState({plants: this.props.my_plants})
    } else if (this.props.plants) {
      this.setState({plants: this.props.plants})
    } else{
      this.props.getPlants()
    }
  }

componentDidUpdate(prevProps) {
  if (prevProps !== this.props && !this.props.my_plants){
    this.props.getPlants()
    this.setState({plants: this.props.plants})
 } else if (prevProps !== this.props && this.props.my_plants) {
    this.setState({plants: this.props.my_plants})
 }
}

 handleClick = e => {
   let API = 'https://theplantaeapi.herokuapp.com/api/v1/plants'
   if (this.props.api) {
     API = "https://theplantaeapi.herokuapp.com/api/v1/flowers"
   } else if (this.props.food_api) {
     API = this.props.food_api
   }

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
         plants: data.data.data,
         currentPage: Number(data.currentPage)
       },()=> this.props.setCurrentPage(Number(data.currentPage)))
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
       },()=> this.props.setCurrentPage(Number(data.currentPage)))
     }
    })

   }
 }

 handleChange = (event) => {
   this.setState({
     searchTerm: event.target.value
   })
 }

  render(){
    let backButton = ""
    let forwardButton = ""

     this.state.currentPage > 1 ? backButton = <button onClick={this.handleClick}className="navButtons"> ☚ </button> : backButton = ""

     if (this.props.identifier || this.props.food_api|| this.props.my_plants) {
        forwardButton = ""
      } else {
        forwardButton = <button onClick={this.handleClick}className="navButtons"> ☛ </button>
      }

    if (this.props.plants){
      return(
    <>

    <div className="cards">
        {backButton}
         {
           this.state.plants.map(plant => <PlantCard key={plant.id} plant={plant} {...this.props}/>)
       }
       {forwardButton}
    </div>
    </>
      )
    } else if (this.state.plants && this.state.plants.length > 0) {
   return(
     <>

     <div className="cards">
         {backButton}
          {
            this.state.plants.map(plant => <PlantCard key={plant.id} {...plant} {...this.props}/>)
        }
        {forwardButton}
     </div>
     </>
   )
 } else {
  return (
     <>
      <p>loading...</p>
     </>
   )
  }
 }
}
export default PlantsContainer
