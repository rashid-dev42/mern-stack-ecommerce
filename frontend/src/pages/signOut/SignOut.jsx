import { Navigate } from "react-router-dom";

const SignOut = () => {
  if (localStorage.getItem("email")) {
    localStorage.clear();
  }

  return <Navigate to="/"/>
};

export default SignOut;