import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/admin/AdminPage";
import LandingPage from "./components/landing/LandingPage";
import Login from "./components/login/LoginPage";
import { useAuth } from "./context/AuthContext";

function App() {
	const { isAuthenticated, isAdmin } = useAuth();

	return (
		<div id="main-container">
			<Routes>
				<Route
					path="/login"
					element={
						!isAuthenticated ? <Login /> : <Navigate to="/home" />
					}
				/>
				<Route
					path="/"
					element={isAuthenticated ? <Navigate to='/home' /> : <Navigate to="/login" />}
				/>
				<Route
					path="/home"
					element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/admin"
					element={isAdmin ? <AdminPage /> : <Navigate to="/" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
