import React, { useEffect, useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login,user} = useUser()

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await response.json();

      if (data.code === 1) {
        toast.success("Login successful!");
        login(data.user);
        navigate("/");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to login. Please try again!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn">
            Login
          </button>
          <p className="register-link">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
