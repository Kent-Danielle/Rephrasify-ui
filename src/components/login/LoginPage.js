import {
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	SlideFade,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";

const colors = theme.colors;
export default function Login() {
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
				<LoginForm />
			</Center>
		</Flex>
	);
}
