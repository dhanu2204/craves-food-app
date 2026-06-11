import { useState } from "react"
import "./Login.css"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if(email === "" || password === ""){
      alert("Please enter your email and password")
      return;
    }

    const userCredintial={email:email,password:password}
    try{
      const API_URL = import.meta.env.VITE_API_URL || "https://craves-delivery-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/users/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          userCredintial
        ),
      });

      if (response.ok) {
        const text = await response.text();
        const user = text ? JSON.parse(text) : null;
        
        if (user) {
            localStorage.setItem("zslite_user", JSON.stringify(user));
            alert("Login Successful! Welcome " + user.name);
            navigate("/Home");
        } else {
            alert("Invalid Email or Password. Please try again.");
        }
      } else {
        alert("Server error. Please try again later.");
      }
}
    catch(error){
      console.log("Connection error:"+error);
      alert("Network connection , is the server running");
    }
}

  return (
    <div className="auth-main-wrapper">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Sign In</h2>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Enter your email"  
              value={email} 
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}  
            />
          </div>

          <div className="btn-div">
            <button type="submit" className="auth-btn">Sign In</button>
          </div>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/" className="auth-link">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login