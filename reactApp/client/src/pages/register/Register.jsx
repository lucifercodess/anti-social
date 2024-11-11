import React, { useState } from "react";
import "./Register.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    if (profileImage) {
      formData.append("profilePhoto", profileImage); // Ensure this matches the backend field name
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.code === 1) {
        toast.success("Registration successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfileImage(null);
        console.log(data);
        navigate("/login"); 
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to register. Please try again!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
    console.log(file); // Check if the file is set correctly
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Profile Image Section */}
          <div className="image-upload">
            <label htmlFor="profile-image" className="upload-label">
              <i className="fas fa-camera"></i> Upload Profile Picture
            </label>
            <input
              type="file"
              id="profile-image"
              onChange={handleImageChange}
              accept="image/*"
            />
            {profileImage && (
              <div className="image-preview">
                <img src={profileImage} alt="Profile Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="btn">
            Sign Up
          </button>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
