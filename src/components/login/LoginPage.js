import {
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	SlideFade,
	Fade,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const colors = theme.colors;
export default function Login() {
	const [isLoginState, setIsLoginState] = React.useState(true);

	const toggleLoginState = React.useCallback(() => {
		setIsLoginState(true);
	}, [setIsLoginState]);

	const toggleRegisterState = React.useCallback(() => {
		setIsLoginState(false);
	}, [setIsLoginState]);

	return (
		<Flex
			id="login-container"
			backgroundColor={colors.teal[200]}
			alignSelf={"center"}
			w={"80%"}
			h={"700"}
			borderRadius={"3rem"}
		>
			<Center w="60%" paddingBottom={"7rem"}>
				<SlideFade offsetY={200} in={true}>
					<Heading
						color={colors.teal[800]}
						size={"3xl"}
						marginBottom={"1rem"}
						textAlign={"center"}
					>
						Rephrasify
					</Heading>
					<Heading color={colors.teal[500]} size={"md"}>
						Elevate Your Expressions with AI
					</Heading>
				</SlideFade>
			</Center>
			<Center
				w="40%"
				backgroundColor={colors.white}
				borderTopRightRadius={"3rem"}
				borderBottomRightRadius={"3rem"}
			>
				{isLoginState ? (
					<LoginForm onRegisterClick={toggleRegisterState} />
				) : (
					<RegisterForm onLoginClick={toggleLoginState} />
				)}
			</Center>
		</Flex>
	);
}
