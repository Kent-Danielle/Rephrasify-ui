import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/LoginPage';


function App() {
  return (
    <div id="main-container">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
