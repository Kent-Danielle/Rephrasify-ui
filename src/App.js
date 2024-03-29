import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/admin/AdminPage";
import LandingPage from "./components/landing/LandingPage";
import Login from "./components/login/LoginPage";

function App() {
	return (
		<div id="main-container">
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={true ? <Login /> : <Navigate to="/login" />} />
				<Route
					path="/home"
					element={true ? <LandingPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/admin"
					element={true ? <AdminPage /> : <Navigate to="/login" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
