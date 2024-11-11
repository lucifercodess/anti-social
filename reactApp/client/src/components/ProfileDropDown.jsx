import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import "./ProfileDropDown.css"; // Import CSS file for styling
const ProfileDropDown = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });

      if (response.ok) {
        logout();
        toast.success("Logged out successfully!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log("Failed to logout:", errorData);
        toast.error(errorData.msg || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.log("Network error:", error);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="profile-dropdown">
      <img
        src={user.profilePicture}
        alt="Profile"
        className="profile-image"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="dropdown-menu">
          <p className="dropdown-username">{user?.username}</p>
          <p className="dropdown-email">{user?.email}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
