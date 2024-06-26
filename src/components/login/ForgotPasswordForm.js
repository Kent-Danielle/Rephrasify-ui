import {
	Alert,
	AlertIcon,
	AlertTitle,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Link,
	Show,
	SlideFade,
	Text,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usersService from "../../services/usersService";

const colors = theme.colors;
const PAGE_STATE = {
	EMAIL: 0,
	ANSWER: 1,
	PASSWORD: 2,
};
export default React.forwardRef((props, ref) => {
	const { onLoginClick } = props;
	const [pageState, setPageState] = React.useState(PAGE_STATE.EMAIL);
	const [securityQuestion, setSecurityQuestion] = React.useState("");
	const [changePasswordSuccess, setChangePasswordSuccess] = React.useState("");
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	const handleEmailSubmit = React.useCallback(
		(data) => {
			usersService
				.getUserSecurityQuestion(data)
				.then(
					(response) => {
						setSecurityQuestion(response.question);
						setPageState(PAGE_STATE.ANSWER);
					},
					(reject) => {
						setError("invalidInput", {
							type: "manual",
							message: reject?.message ?? "Email not found.",
						});
					}
				)
				.catch((error) => {
					setError("invalidInput", {
						type: "manual",
						message:
							error?.message ?? "Something went wrong. Please try again.",
					});
				});
		},
		[setError]
	);

	const handleAnswerSubmit = React.useCallback(
		(data) => {
			usersService
				.answerSecurityQuestion(data)
				.then(
					(response) => {
						setPageState(PAGE_STATE.PASSWORD);
					},
					(reject) => {
						setError("invalidInput", {
							type: "manual",
							message: reject?.message ?? "Incorrect answer.",
						});
					}
				)
				.catch((error) => {
					setError("invalidInput", {
						type: "manual",
						message:
							error?.message ?? "Something went wrong. Please try again.",
					});
				});
		},
		[setError]
	);

	const handlePasswordSubmit = React.useCallback(
		(data) => {
			usersService
				.changePassword(data)
				.then(
					(response) => {
						setChangePasswordSuccess(
							"Password changed successfully. Redirecting to login page."
						);
						setTimeout(() => {
							navigate("/");
						}, 2000);
					},
					(reject) => {
						setError("invalidInput", {
							type: "manual",
							message: reject?.message ?? "Failed to change password.",
						});
					}
				)
				.catch((error) => {
					setError("invalidInput", {
						type: "manual",
						message:
							error?.message ?? "Something went wrong. Please try again.",
					});
				});
		},
		[navigate, setError]
	);

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
		[pageState, handleEmailSubmit, handleAnswerSubmit, handlePasswordSubmit]
	);

	const onChangeClearError = React.useCallback(() => {
		clearErrors();
	}, [clearErrors]);

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
				{errors.invalidInput && (
					<Alert status="error" mb="1rem" borderRadius={"0.5rem"}>
						<AlertIcon />
						<AlertTitle>{errors.invalidInput.message}</AlertTitle>
					</Alert>
				)}
				{changePasswordSuccess && (
					<Alert status="success" mb="1rem" borderRadius={"0.5rem"}>
						<AlertIcon />
						<AlertTitle>{changePasswordSuccess}</AlertTitle>
					</Alert>
				)}
				{pageState === PAGE_STATE.EMAIL && (
					<>
						<FormControl isInvalid={errors.email}>
							<FormLabel>Email address</FormLabel>
							<Input
								defaultValue={""}
								type="email"
								{...register("email", {
									required: true,
									onChange: onChangeClearError,
								})}
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
							<Input value={securityQuestion} readOnly />
						</FormControl>
						<br />
						<FormControl isInvalid={errors.answer}>
							<FormLabel>Answer</FormLabel>
							<Input
								type="text"
								{...register("answer", {
									required: true,
									onChange: onChangeClearError,
								})}
							/>
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
								{...register("password", {
									required: true,
									onChange: onChangeClearError,
								})}
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
