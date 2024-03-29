import { Button, Flex, Heading, Link, SlideFade } from "@chakra-ui/react";
import React from "react";
import { theme } from "@chakra-ui/theme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const colors = theme.colors;
export default React.forwardRef((props, ref) => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleLogout = React.useCallback(() => {
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
				<Link href="/home" mr={"2rem"}>
					Home
				</Link>
				<Link href="/admin" mr={"2rem"}>
					Admin
				</Link>
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
