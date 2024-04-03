import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import userManagementService from "../services/userManagementService";
import { useToast } from "@chakra-ui/react";

const AuthContext = React.createContext();

const initialState = {
	id: null,
	email: "",
	apiCount: 0,
	isAdmin: false,
};

const API_LIMIT = 20;

const AuthProvider = ({ children }) => {
	const toast = useToast();
	const [userInfo, setUserInfo, clearUserInfo] = useLocalStorage(
		initialState,
		"userInfo"
	);

	React.useEffect(() => {
		if (userInfo.id) {
			userManagementService.getUserById(userInfo.id).then((newUserInfo) => {
				console.log(newUserInfo)
				setUserInfo((prev) => {
					return {
						...prev,
						isAdmin: newUserInfo.isAdmin,
						apiCount: newUserInfo.apiCount,
					};
				});
			}).catch((error) => {
				toast({
					title: "Error: fetch user info failed",
					description: error?.message ?? "An error occurred",
					status: "error",
					duration: 9000,
					isClosable: true,
					position: "top",
				});
			});
		}
	}, [userInfo.id, setUserInfo]);

	const handleUserInfo = React.useCallback((data) => {
		setUserInfo(data);
	}, [setUserInfo]);

	const handleLogout = React.useCallback(() => {
		setUserInfo(initialState);
		clearUserInfo();
	}, [setUserInfo, clearUserInfo]);

	const updateApiCount = React.useCallback(() => {
		setUserInfo((prev) => {
			return {
				...prev,
				apiCount: prev.apiCount + 1,
			};
		});
	}, [setUserInfo]);

	const authManager = React.useMemo(() => {
		return {
			isAuthenticated: userInfo?.id !== null,
			currentUserId: userInfo?.id,
			currentUserEmail: userInfo?.email,
			isAdmin: userInfo?.isAdmin,
			isOverTheLimit: userInfo?.apiCount > API_LIMIT,
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
