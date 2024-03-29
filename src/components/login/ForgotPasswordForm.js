import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Button,
	FormHelperText,
	Flex,
	VStack,
	Text,
	Link,
	Show,
	SlideFade,
	Heading,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { theme } from "@chakra-ui/theme";

const colors = theme.colors;
const PAGE_STATE = {
	EMAIL: 0,
	ANSWER: 1,
	PASSWORD: 2,
};
export default React.forwardRef((props, ref) => {
	const { onLoginClick } = props;
	const [pageState, setPageState] = React.useState(PAGE_STATE.EMAIL);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	const handleOnSubmit = React.useCallback(
		(data) => {
			switch (pageState) {
				case PAGE_STATE.EMAIL:
					handleEmailSubmit(data);
					break;
				case PAGE_STATE.ANSWER:
					handleAnswerSubmit(data);
					break;
				case PAGE_STATE.PASSWORD:
					handlePasswordSubmit(data);
					break;
				default:
					break;
			}
		},
		[pageState]
	);

	const handleEmailSubmit = React.useCallback(
		(data) => {
			console.log(data);
			setPageState(PAGE_STATE.ANSWER);
		},
		[pageState]
	);

	const handleAnswerSubmit = React.useCallback(
		(data) => {
			console.log(data);
			setPageState(PAGE_STATE.PASSWORD);
		},
		[pageState]
	);

	const handlePasswordSubmit = React.useCallback(
		(data) => {
			console.log(data);
			navigate("/home");
		},
		[pageState]
	);

	return (
		<Flex
			direction={"column"}
			w={"100%"}
			alignItems={"center"}
			justifyContent={"space-evenly"}
			h="100%"
			padding={"4rem"}
		>
			<Show below="md">
				<SlideFade offsetY={-200} in={true}>
					<Heading color={colors.teal[800]} size={"xl"} textAlign={"center"}>
						Rephrasify
					</Heading>
					<Heading color={colors.teal[500]} size={"sm"}>
						Elevate Your Expressions with AI
					</Heading>
				</SlideFade>
			</Show>
			<form id="login-form" onSubmit={handleSubmit(handleOnSubmit)}>
				{pageState === PAGE_STATE.EMAIL && (
					<>
						<FormControl isInvalid={errors.email}>
							<FormLabel>Email address</FormLabel>
							<Input
								defaultValue={""}
								type="email"
								{...register("email", { required: true })}
							/>
							{errors.email ? (
								<FormErrorMessage>Email is required</FormErrorMessage>
							) : (
								<FormHelperText>e.g. lorem@ipsum.com</FormHelperText>
							)}
						</FormControl>
					</>
				)}
				{pageState === PAGE_STATE.ANSWER && (
					<>
						<FormControl isInvalid={errors.email}>
							<FormLabel>Security Question</FormLabel>
							<Input value="Test" readOnly />
						</FormControl>
						<br />
						<FormControl isInvalid={errors.answer}>
							<FormLabel>Answer</FormLabel>
							<Input type="text" {...register("answer", { required: true })} />
							{errors.answer ? (
								<FormErrorMessage>Answer is required</FormErrorMessage>
							) : (
								<FormHelperText>Enter your answer</FormHelperText>
							)}
						</FormControl>
					</>
				)}
				{pageState === PAGE_STATE.PASSWORD && (
					<>
						<br />
						<FormControl isInvalid={errors.password}>
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								{...register("password", { required: true })}
							/>
							{errors.password ? (
								<FormErrorMessage>Password is required</FormErrorMessage>
							) : (
								<FormHelperText>Enter your password</FormHelperText>
							)}
						</FormControl>
					</>
				)}
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					Submit
				</Button>
			</form>

			<Text justifySelf={"end"}>
				Already a user?{" "}
				<Link color="teal.500" onClick={onLoginClick}>
					Login here
				</Link>
			</Text>
		</Flex>
	);
});
