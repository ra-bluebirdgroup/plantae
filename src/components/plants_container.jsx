import React from 'react'
import PlantCard from "./plant_card";



class PlantsContainer extends React.Component {
  state = {
    plants: [],
    currentPage: 1,
    searchTerm: ""
  }

  getPlants = e => {
    let API = 'https://theplantaeapi.herokuapp.com/api/v1/plants'
    if (e || this.props.api) {
      API = "https://theplantaeapi.herokuapp.com/api/v1/flowers"
    } else if (this.props.food_api) {
      API = this.props.food_api
    }
    fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      currentPage: this.props.currentPage,
      searchTerm: this.state.searchTerm
    }
  })
  .then(res => res.json())
  .then(data => {
     if (data.errors) {
       alert(data.errors)
    } else if (data.data){

      this.setState({
        plants: data.data.data,
        currentPage: Number(data.currentPage),
        searchTerm: ""
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
   let API = 'https://localhost:3000/v1/plants'
   if (this.props.api) {
     API = "https://localhost:3000/api/v1/flowers"
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
     [event.target.name]: event.target.value
   })
 }

  render(){
    let backButton = ""
    let forwardButton = ""
    let searchBar = ""

     this.state.currentPage > 1 ? backButton = <button onClick={this.handleClick}className="navButtons"> ☚ </button> : backButton = ""
      this.props.food_api && this.state.currentPage >= 7 ? forwardButton = "" : forwardButton = <button onClick={this.handleClick}className="navButtons"> ☛ </button>
     console.log(this.state)

     this.props.my_plants ? searchBar = "" : searchBar = <div className="search"> ;

     <input
       type="text"
       name="searchTerm"
       onChange={this.handleChange}
       value={this.state.searchTerm}
     /><button onClick={this.getPlants} name="searchButton" className="searchButton"><b>search</b></button>
     </div>

    if (this.state.plants && this.state.plants.length > 0 ){
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
