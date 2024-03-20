import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/LoginPage';


function App() {
  return (
    <div id="main-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={true ? <Login /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
