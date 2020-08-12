import React from "react";

const LogOut = (props) => {
  props.setUser(null);
  localStorage.removeItem("user_id") 
  // console.log(props);
  return (
    <>
      <h1>You have logged out!</h1>
    </>
  );
};

export default LogOut;
