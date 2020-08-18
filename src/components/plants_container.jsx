import React from 'react'
import PlantCard from "./plant_card";



class PlantsContainer extends React.Component {
  state = {
    plants: [],
    currentPage: 1
  }

  getPlants = () => {
    console.log(this.props)
    let API = 'http://localhost:3000/api/v1/plants'
    if (this.props.api) {
      API = this.props.api
    } else if (this.props.food_api) {
      API = this.props.food_api
    }
    fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      currentPage: this.props.currentPage
    }
  })
  .then(res => res.json())
  .then(data => {
     if (data.errors) {
       alert(data.errors)
    } else {

      this.setState({
        plants: data.data.data,
        currentPage: Number(data.currentPage)
      })
    }
   })
  }
  componentDidMount() {
    if (this.props.my_plants){
      this.setState({plants: this.props.my_plants})
    } else {
      this.getPlants()
    }
  }

componentDidUpdate(prevProps) {
  if (prevProps !== this.props && !this.props.my_plants){
    this.getPlants()
 } else if (prevProps !== this.props && this.props.my_plants) {
    this.setState({plants: this.props.my_plants})
 }
}

 handleClick = e => {
   let API = 'http://localhost:3000/api/v1/plants'
   if (this.props.api) {
     API = this.props.api
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
  render(){
    let backButton = ""
    let forwardButton = ""
    let searchBar = ""

     this.state.currentPage > 1 ? backButton = <button onClick={this.handleClick}className="navButtons"> ☚ </button> : backButton = ""
      this.props.food_api && this.state.currentPage >= 7 ? forwardButton = "" : forwardButton = <button onClick={this.handleClick}className="navButtons"> ☛ </button>
     console.log(this.state)

     this.props.my_plants ? searchBar = "" : searchBar = <div className="search">
     <input
       type="text"
       name="filter"
     /><button className="searchButton"><b>search</b></button>
     </div>

     
    if (this.state.plants.length > 0 ){
      return(
    <>
    {searchBar}
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
   return(
    <>
     <p>⌛...</p>
    </>
   )
 }
 }
}
export default PlantsContainer
