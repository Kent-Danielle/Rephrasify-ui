import { Button, Flex, Heading, Link, SlideFade } from "@chakra-ui/react";
import React from "react";
import { theme } from "@chakra-ui/theme";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const colors = theme.colors;
export default React.forwardRef((props, ref) => {
	const navigate = useNavigate();
	const { logout, isAdmin } = useAuth();

	const handleLogout = React.useCallback(() => {
		console.log("Logging out");
		//TODO: Call logout api here; add it in usersservice.js
		logout();
		navigate("/login");
	}, []);

	return (
		<SlideFade offsetY={-100} in={true} style={{ width: "100%" }}>
			<Flex
				direction={"row"}
				justifyContent={"flex-start"}
				alignItems={"center"}
				backgroundColor={colors.teal[200]}
				w={"100%"}
				padding={"2rem"}
				boxShadow={"md"}
			>
				<Heading color={colors.teal[800]} size={"md"} mr={"3rem"}>
					Rephrasify
				</Heading>
				<NavLink style={{ marginRight: "2rem" }} to={"/home"}>
					Home
				</NavLink>
				{isAdmin && (
					<NavLink style={{ marginRight: "2rem" }} to={"/admin"}>
						Admin
					</NavLink>
				)}
				<Button
					colorScheme="teal"
					variant="outline"
					ml={"auto"}
					onClick={handleLogout}
				>
					Logout
				</Button>
			</Flex>
		</SlideFade>
	);
});
