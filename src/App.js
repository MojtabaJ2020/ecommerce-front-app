import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; 
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import AuthSuccessHandler from './components/auth/AuthSuccessHandler'
import Navbar from './components/baners/Navbar';
import TokenRefreshManager from './components/auth/TokenRefreshManager';
import SendActivationTokenPage from './pages/SendActivationTokenPage';

function App() {
  return (
    <Router>
      <Navbar />
      <TokenRefreshManager />
      <Routes>
        <Route path="/auth-success" element={<AuthSuccessHandler />} />
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/send-activation-token" element={<SendActivationTokenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
