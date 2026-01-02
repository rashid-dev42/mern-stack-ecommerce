import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { pause } from "../../utility";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(<span>&nbsp;</span>);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonContent, setButtonContent] = useState("Sign In");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(<span>&nbsp;</span>);
    setShowToast(false);
    setButtonContent(<div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>);
    const signInData = { email, password };
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/sign-in`, signInData);
      if (res.data.success) {
        setButtonContent("Sign In");
        setSuccess(true);
        setMessage(res.data.message);
        setShowToast(true);
        const value = await pause(3000, false);
        localStorage.setItem("authToken", res.data.signInData.authToken);
        localStorage.setItem("userId", res.data.signInData.id);
        localStorage.setItem("imgPath", res.data.signInData.imgPath);
        localStorage.setItem("firstName", res.data.signInData.firstName);
        localStorage.setItem("lastName", res.data.signInData.lastName);
        localStorage.setItem("email", res.data.signInData.email);
        localStorage.setItem("role", res.data.signInData.role);
        setShowToast(value);
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setShowError(error.response.data.message);
        setButtonContent("Sign In");
        setSuccess(false);
        setMessage("Sorry! Sign in is unsuccessful.");
        setShowToast(true);
        const value = await pause(3000, false);
        setShowToast(value);
      }
    }
  };

  return (
    <div>
      {localStorage.getItem("email") ? <Navigate to="/"/> : <div className="container mb-5">
        <h1 className="mt-5 text-center">Welcome Back</h1>
        <h6 className="mt-2 mb-4 text-center text-secondary">Please sign in to continue</h6>
        <form onSubmit={handleSubmit} className="d-block w-100" autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="d-block fs-5">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border-secondary border-1 rounded-0 fs-5"
              required
            />
          </div>
          <div className="d-block fs-5 mb-3">
            <label htmlFor="password">Password</label>
            <div className="d-flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control border-secondary border-1 border-end-0 rounded-0 fs-5"
                required
              />
              {!showPassword && <button onClick={togglePassword} className="bg-light px-2 border-secondary border-1">
                <i className="bi bi-eye"></i>
              </button>}
              {showPassword && <button onClick={togglePassword} className="bg-light px-2 border-secondary border-1">
                <i className="bi bi-eye-slash"></i>
              </button>}
            </div>
          </div>
          <p className="text-danger text-center">{showError}</p>
          <div>
            <button type="submit" className="btn-h-1 d-block w-100 btn btn-primary fs-5">{buttonContent}</button>
          </div>
        </form>
        <h6 className="text-center mt-5">Do not have an account? <Link className="text-decoration-none border-bottom border-primary" to="/sign-up">Sign up</Link> now</h6>
        {showToast && <ToastMessage success={success} message={message} setShowToast={setShowToast}/>}
      </div>}
    </div>
  );
};

export default SignIn;