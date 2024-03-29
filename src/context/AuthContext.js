import React from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = React.useState({
        userId: null,
        email: "",
        apiCount: 0,
        isAdmin: false,
    });

    const handleUserInfo = React.useCallback((data) => {
        setUserInfo(data);
    }, [setUserInfo]);


	const authManager = React.useMemo(() => {
		return {
			isAuthenticated: userInfo.userId !== null,
            login: handleUserInfo,
		};
	}, [userInfo, handleUserInfo]);

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
