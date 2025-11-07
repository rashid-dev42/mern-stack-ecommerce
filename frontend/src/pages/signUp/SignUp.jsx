import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { pause } from "../../utility";
import ToastMessage from "../../components/toastMessage/ToastMessage";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(<span>&nbsp;</span>);
  const [lastName, setLastName] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(<span>&nbsp;</span>);
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(<span>&nbsp;</span>);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(<span>&nbsp;</span>)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonContent, setButtonContent] = useState("Sign Up");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  let firstNameError = false;
  let lastNameError = false;
  let emailError = false;
  let passwordError = false;
  let confirmPasswordError = false;

  const validateName = (order) => {
    let inputData = "";
    if (order === "first") {
      inputData = document.getElementById("firstName").value;
      setFirstName(inputData);
    } else {
      inputData = document.getElementById("lastName").value;
      setLastName(inputData);
    }

    if (!/^[a-zA-Z\s]+$/.test(inputData)) {
      if (order === "first") {
        setFirstNameErrorMessage("Name can contain only letters, spaces and hyphens.");
        firstNameError = true;
      } else {
        setLastNameErrorMessage("Name can contain only letters, spaces and hyphens.");
        lastNameError = true;
      }
    } else if (inputData.length < 2 || inputData.length > 50) {
      if (order === "first") {
        setFirstNameErrorMessage("Name can container minimum 2 and maximum 50 characters.");
        firstNameError = true;
      } else {
        setLastNameErrorMessage("Name can contain minimum 2 and maximum 50 characters.");
        lastNameError = true;
      }
    } else {
      if (order === "first") {
        setFirstNameErrorMessage(<span>&nbsp;</span>);
        firstNameError = false;
      } else {
        setLastNameErrorMessage(<span>&nbsp;</span>);
        lastNameError = false;
      }
    }
  };

  const validateEmail = () => {
    const inputData = document.getElementById("email").value;
    setEmail(inputData);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputData)) {
      setEmailErrorMessage("Email is invalid");
      emailError = true;
    } else {
      setEmailErrorMessage(<span>&nbsp;</span>);
      emailError = false;
    }
  };

  const validatePassword = () => {
    const inputData = document.getElementById("password").value;
    setPassword(inputData);
    const errors = [];

    if (!/[a-z]/.test(inputData)) {
      errors.push("Password must contain at least 1 lowercase letter.");
    }
    if (!/[A-Z]/.test(inputData)) {
      errors.push("Password must contain at least 1 uppercase letter.");
    }
    if (!/[0-9]/.test(inputData)) {
      errors.push("Password must contain at least 1 number.");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(inputData)) {
      errors.push("Password must contain at least 1 special character.");
    }
    if (inputData.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    setPasswordErrors([...errors]);

    if (errors.length > 0) {
      passwordError = true;
    } else {
      passwordError = false;
    }
  };

  const validateConfirmPassword = () => {
    const inputData = document.getElementById("confirmPassword").value;
    setConfirmPassword(inputData);
    if (inputData !== password) {
      setConfirmPasswordErrorMessage("Passwords do not match.");
      confirmPasswordError = true;
    } else {
      setConfirmPasswordErrorMessage(<span>&nbsp;</span>);
      confirmPasswordError = false;
    }
  }

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const toggleConfirmPassword = () => {
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonContent(<div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>);

    if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    try {
      const newUser = { firstName, lastName, email, password, confirmPassword };

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/sign-up`, newUser);
      if (res.data.success) {
        setSuccess(true);
        setMessage(res.data.message);
        setShowToast(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setButtonContent("Sign Up");
        const value = await pause(3000, false);
        setShowToast(value);
        navigate("/sign-in")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {localStorage.getItem("email") ? <Navigate to="/"/> : <div className="container mb-5">
        <h1 className="mt-5 text-center mb-4">Sign Up</h1>
        <form className="d-block w-100" onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-1">
            <label htmlFor="firstName" className="d-block fs-5">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={() => validateName("first")}
              className="form-control border-secondary border-1 rounded-0 fs-5"
              required
            />
            <p className="text-danger m-0">{firstNameErrorMessage}</p>
          </div>
          <div className="mb-1">
            <label htmlFor="lastName" className="d-block fs-5">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={() => validateName("Last")}
              className="form-control border-secondary border-1 rounded-0 fs-5"
              required
            />
            <p className="text-danger m-0">{lastNameErrorMessage}</p>
          </div>
          <div className="mb-1">
            <label htmlFor="email" className="d-block fs-5">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={validateEmail}
              className="form-control border-secondary border-1 rounded-0 fs-5"
              required
            />
            <p className="text-danger m-0">{emailErrorMessage}</p>
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="d-block fs-5">Password</label>
            <div className="d-flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={validatePassword}
                className="form-control border-secondary border-1 border-end-0 rounded-0 fs-5"
                required
              />
              {!showPassword && <button role="button" className="bg-white border-secondary border-1 px-2" onClick={togglePassword}>
                <i className="bi bi-eye"></i>
              </button>}
              {showPassword && <button role="button" className="bg-white border-secondary border-1 px-2" onClick={togglePassword}>
                <i className="bi bi-eye-slash"></i>
              </button>}
            </div>
            {passwordErrors.length === 0 && <p className="m-0">&nbsp;</p>}
            {passwordErrors.length > 0 && passwordErrors.map((passwordError, index) => <p key={index} className="text-danger m-0">{passwordError}</p>)}
          </div>
          <div className="mb-1">
            <label htmlFor="confirmPassword" className="d-block fs-5">Confirm Password</label>
            <div className="d-flex">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={validateConfirmPassword}
                className="form-control border-secondary border-1 border-end-0 rounded-0 fs-5"
                required
              />
              {!showConfirmPassword && <button role="button" className="bg-white border-secondary border-1 px-2" onClick={toggleConfirmPassword}>
                <i className="bi bi-eye"></i>
              </button>}
              {showConfirmPassword && <button role="button" className="bg-white border-secondary border-1 px-2" onClick={toggleConfirmPassword}>
                <i className="bi bi-eye-slash"></i>
              </button>}
            </div>
            <p className="text-danger m-0">{confirmPasswordErrorMessage}</p>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary btn-h-1 d-block w-100">{buttonContent}</button>
          </div>
        </form>
        <h6 className="text-center mt-5">Already have an account? <Link className="text-decoration-none border-bottom border-primary" to="/sign-in">Sign in</Link> now</h6>
        {showToast && <ToastMessage success={success} message={message} setShowToast={setShowToast}/>}
      </div>}
    </div>
  );
};

export default SignUp;