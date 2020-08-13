import React from "react";
import tenor from "./tenor.gif";

class Identifier extends React.Component {
 state = {
   imagePath: "",
   indentifierResponse: []
 }

 componentDidUpdate(prevState) {
   if (prevState !== this.state){
   if (this.props.currentUser) {
     fetch("http://localhost:3000/api/v1/identifier", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         imagePath: this.state.imagePath
       })
     })
     .then(res => res.json())
     .then(data => {
       console.log(data.data)
          this.setState({indentifierResponse: data})
      })
   }
  }
 }

  render(){
    console.log(this.state)
    if (this.props.currentUser) {
      // console.log(this.state)
    return(
      <>
      <img
            src={tenor}
            alt={this.props.scientific_name}
            className="tenor"
          />
       <div className="identifier-form">
         <h1>Ask Wol</h1>
         <p>the plant identifiying owl</p>
         <form className="identifier-form" onSubmit={this.handleSubmit}>
         <h1>link to image</h1>
           <p>enter image url</p>
           <input
             name="image_url"
             value={this.state.image_url}
             type="image_url"
             onChange={this.handleChange}
             placeholder="image url"
           /><br/><br/>
           <button className="identify-button" type="submit">
             go
           </button>
          </form>
      <form className="identifier-form" onSubmit={this.handleSubmit}>
          <h1>upload image</h1>
          <p>browse and upload file</p>
           <input
             name="image_url"
             value={this.state.password}
             type="image_url"
             onChange={this.handleChange}
             placeholder="file path"
           />
           <button className="identify-button" type="submit">
             browse files
           </button>
           <br/><br/>
           <button className="identify-button" type="submit">
             go
           </button>
         </form>
         <br/><br/>

       </div>
       </>
    )
  } else {
    return(
      <>
        <h1>Please Sign up, or Log in to start identifiying plants!</h1>
      </>
    )
  }
 }
}
export default Identifier;
