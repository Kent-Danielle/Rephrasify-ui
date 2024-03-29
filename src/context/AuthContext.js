import React from "react";

const AuthContext = React.createContext();

const initialState = {
    userId: null,
    email: "",
    apiCount: 0,
    isAdmin: false,
};

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = React.useState(initialState);

    const handleUserInfo = React.useCallback((data) => {
        setUserInfo(data);
    }, [setUserInfo]);

    const handleLogout = React.useCallback(() => {
        setUserInfo(initialState);
        console.log("Logged out")
    }, [setUserInfo]);


	const authManager = React.useMemo(() => {
		return {
			isAuthenticated: userInfo?.userId !== null,
            isAdmin: userInfo?.isAdmin,
            login: handleUserInfo,
            logout: handleLogout,
		};
	}, [userInfo, handleUserInfo, handleLogout]);

	return (
		<AuthContext.Provider value={authManager}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
