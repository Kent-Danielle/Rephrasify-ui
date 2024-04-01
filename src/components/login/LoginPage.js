import {
	Center,
	Flex,
	Heading,
	Hide,
	SlideFade,
	VStack,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./Login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const colors = theme.colors;

export const LOGIN_PAGE_STATE = {
	LOGIN: 0,
	REGISTER: 1,
	FORGET_PASSWORD: 2,
};

export default function Login() {
	const [pageState, setPageState] = React.useState(LOGIN_PAGE_STATE.LOGIN);

	return (
		<Flex
			id="login-container"
			backgroundColor={colors.teal[200]}
			alignSelf={"center"}
			w={{ base: "100%", md: "80%" }}
			h={"700"}
			borderRadius={"3rem"}
		>
			<Hide below="md">
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
			</Hide>

			<VStack
				w={{ base: "100%", md: "40%" }}
				backgroundColor={colors.white}
				borderTopRightRadius={{ base: "3rem", md: "2rem" }}
				borderBottomRightRadius={{ base: "3rem", md: "2rem" }}
			>
				{pageState === LOGIN_PAGE_STATE.LOGIN && (
					<LoginForm
						onRegisterClick={() => setPageState(LOGIN_PAGE_STATE.REGISTER)}
						onForgetClick={() => setPageState(LOGIN_PAGE_STATE.FORGET_PASSWORD)}
					/>
				)}
				{pageState === LOGIN_PAGE_STATE.REGISTER && (
					<RegisterForm
						onLoginClick={() => setPageState(LOGIN_PAGE_STATE.LOGIN)}
					/>
				)}
				{pageState === LOGIN_PAGE_STATE.FORGET_PASSWORD && (
					<ForgotPasswordForm
						onLoginClick={() => setPageState(LOGIN_PAGE_STATE.LOGIN)}
					/>
				)}
			</VStack>
		</Flex>
	);
}
