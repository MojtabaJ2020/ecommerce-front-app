import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../api/axiosInstance';
import './../styles/SignUpPage.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword)
    {
        setErrorMessage("Password and confirm password are not same!");
        return;
    }
    // Prepare form data to send including the file upload.
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'USER'); // Default role or can be omitted if set server-side.
    if (picture) {
      formData.append('picture', picture);
    }

    try {
      const response = await api.post('/register', formData);

      console.log(response)

      // If registration is successful, the backend should send an activation email.
      setSuccessMessage("Registration successful! Please check your email for the activation link.");
      setErrorMessage('');
      // even can navigate to a specific page or clear the form.
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {!successMessage && 
      <>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username" class="required">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email" class="required">Email</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" class="required">Password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password" class="required">Confirm Password</label>
          <input 
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="picture">Profile Picture</label>
          <input 
            type="file"
            id="picture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="signup-btn">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </>
    }
    </div>
  );
};

export default SignUpPage;