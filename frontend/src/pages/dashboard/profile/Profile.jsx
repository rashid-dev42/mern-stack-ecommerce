import "./Profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setProfileImage(localStorage.getItem("imgPath"));
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const toggleCurrentPassword = () => {
    if (showCurrentPassword) {
      setShowCurrentPassword(false);
    } else {
      setShowCurrentPassword(true);
    }
  };

  const toggleNewPassword = () => {
    if (showNewPassword) {
      setShowNewPassword(false);
    } else {
      setShowNewPassword(true);
    }
  };

  const toggleConfirmPassword = () => {
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };

  const changePassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-fluid p-3 h-100 overflow-auto">
      <h3 className="pb-3 border-bottom border-dark">Profile</h3>
      <div className="Profile-info">
        <div className="Profile-image mt-5 mb-3">
          <img src={import.meta.env.VITE_API_BASE_URL + "/" +profileImage} alt=""/>
        </div>
        <div>
          <table className="w-100">
            <tbody>
              <tr>
                <td className="bg-dark border border-dark border-1 text-light px-3 py-2 fs-5">First Name</td>
                <td className="border border-dark border-1 px-3 py-2 fs-5">{firstName}</td>
              </tr>
              <tr>
                <td className="bg-dark border border-dark border-1 text-light px-3 py-2 fs-5">Last Name</td>
                <td className="border border-dark border-1 px-3 py-2 fs-5">{lastName}</td>
              </tr>
              <tr>
                <td className="bg-dark border border-dark border-1 text-light px-3 py-2 fs-5">Email</td>
                <td className="border border-dark border-1 px-3 py-2 fs-5">{email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button className="btn-h-1 btn btn-primary w-100 mb-2 fs-5">Edit Profile</button>
          <button className="btn-h-1 btn btn-danger w-100 fs-5">Delete Account</button>
        </div>

        {/* change password */}
        <div className="mt-5 pt-3 border-top border-dark">
          <h5 className="fw-bold text-center mb-1">Change Password</h5>
          <form onSubmit={changePassword} className="d-block w-100" autoComplete="off">
            <div className="d-block fs-5 mb-3">
              <label htmlFor="current-password">Current Password</label>
              <div className="d-flex mb-2">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="current-password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control border-secondary border-1 border-end-0 rounded-0 fs-5"
                  required
                />
                {!showCurrentPassword && <button onClick={toggleCurrentPassword} className="bg-light px-2 border-secondary border-1">
                  <i className="bi bi-eye"></i>
                </button>}
                {showCurrentPassword && <button onClick={toggleCurrentPassword} className="bg-light px-2 border-secondary border-1">
                  <i className="bi bi-eye-slash"></i>
                </button>}
              </div>
              <label htmlFor="new-password">New Password</label>
              <div className="d-flex mb-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="new-password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNPassword(e.target.value)}
                  className="form-control border-secondary border-1 border-end-0 rounded-0 fs-5"
                  required
                />
                {!showNewPassword && <button onClick={toggleNewPassword} className="bg-light px-2 border-secondary border-1">
                  <i className="bi bi-eye"></i>
                </button>}
                {showNewPassword && <button onClick={toggleNewPassword} className="bg-light px-2 border-secondary border-1">
                  <i className="bi bi-eye-slash"></i>
                </button>}
              </div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="d-flex mb-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm-password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control border-secondary border-1 border-end-0 rounded-0 fs-5"
                  required
                />
                {!showConfirmPassword && <button onClick={toggleConfirmPassword} className="bg-light px-2 border-secondary border-1">
                  <i className="bi bi-eye"></i>
                </button>}
                {showConfirmPassword && <button onClick={toggleConfirmPassword} className="bg-light px-2 border-secondary border-1">
                  <i className="bi bi-eye-slash"></i>
                </button>}
              </div>
            </div>
            <p className="text-danger text-center">{showError}</p>
            <div>
              <button type="submit" className="btn-h-1 d-block w-100 btn btn-primary fs-5">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;