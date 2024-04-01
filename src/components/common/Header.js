import { Button, Flex, Heading, SlideFade } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import usersService from "../../services/usersService";

const colors = theme.colors;
export default React.forwardRef((props, ref) => {
	const navigate = useNavigate();
	const { logout, isAdmin } = useAuth();

	const handleLogout = React.useCallback(() => {
		usersService.logoutUser();
		logout();
		navigate("/login");
	}, [logout, navigate]);

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
				{isAdmin ? (
					<NavLink style={{ marginRight: "2rem" }} to={"/admin"}>
						Admin
					</NavLink>
				) : <></>}
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
