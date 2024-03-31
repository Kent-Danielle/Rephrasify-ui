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
        console.log(data)
        setUserInfo(data);
    }, []);

    const handleLogout = React.useCallback(() => {
        setUserInfo(initialState);
        console.log("Logged out")
    }, []);

    const updateApiCount = React.useCallback(() => {
        console.log(userInfo.apiCount)
        if (userInfo.apiCount <= 0) {
            return;
        }
        setUserInfo((prev) => {
            return {
                ...prev,
                apiCount: prev.apiCount - 1, // TODO: Update this based on backend team's logic
            };
        });
    }, [userInfo]);


	const authManager = React.useMemo(() => {
		return {
			isAuthenticated: userInfo?.userId !== null,
            currentUserId: userInfo?.userId,
            currentUserEmail: userInfo?.email,
            isAdmin: userInfo?.isAdmin,
            isOverTheLimit: userInfo?.apiCount <= 0,
            apiCount: userInfo?.apiCount,
            login: handleUserInfo,
            logout: handleLogout,
            updateApiCount: updateApiCount,
		};
	}, [userInfo, handleUserInfo, handleLogout, updateApiCount]);

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
