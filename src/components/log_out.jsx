import React from "react";

const LogOut = (props) => {
  props.setUser(null);
  localStorage.removeItem("user_id") 
  return (
    <>
      <h1>You have logged out!</h1>
    </>
  );
};

export default LogOut;
