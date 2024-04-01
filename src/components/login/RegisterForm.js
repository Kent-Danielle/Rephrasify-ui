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
	Input,
	Link,
	Select,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import usersService from "../../services/usersService";
export default React.forwardRef((props, ref) => {
	const { onLoginClick } = props;
	const { login } = useAuth();
	const navigate = useNavigate();
	const [questions, setQuestions] = React.useState([]);
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm();

	React.useEffect(() => {
		usersService.getSecurityQuestions().then(
			(response) => {
				setQuestions(response.questions);
			},
			(reject) => {
				setError("fetchQuestions", {
					type: "manual",
					message: reject?.message ?? "Failed to fetch security questions",
				});
			}
		);
	}, [setError]);

	const handleOnRegister = (data) => {
		usersService
			.registerUser(data)
			.then(
				(response) => {
					login(response);
					navigate("/home");
				},
				(reject) => {
					if (reject?.status === 409) {
						// Check for existing email
						setError("registerError", {
							type: "manual",
							message: reject?.message ?? "User already exists",
						});
					} else {
						setError("registerError", {
							type: "manual",
							message: reject?.message ?? "Failed to register user",
						});
					}
				}
			)
			.catch((error) => {
				setError("registerError", {
					type: "manual",
					message: error?.message ?? "Something went wrong. Please try again.",
				});
			});
	};

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
			<form id="login-form" onSubmit={handleSubmit(handleOnRegister)}>
				{errors.fetchQuestions && (
					<Alert status="error" mb="1rem" borderRadius={"0.5rem"}>
						<AlertIcon />
						<AlertTitle>{errors.fetchQuestions.message}</AlertTitle>
					</Alert>
				)}
				{errors.registerError && (
					<Alert status="error" mb="1rem" borderRadius={"0.5rem"}>
						<AlertIcon />
						<AlertTitle>{errors.registerError.message}</AlertTitle>
					</Alert>
				)}
				<FormControl marginBottom={"1rem"} isInvalid={errors.email}>
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
				<FormControl marginBottom={"1rem"} isInvalid={errors.password}>
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
				<FormControl marginBottom={"1rem"} isInvalid={errors.question}>
					<FormLabel>Security question</FormLabel>
					<Select
						type="text"
						{...register("questionId", {
							required: true,
							onChange: onChangeClearError,
						})}
					>
						{questions?.map((question) => (
							<option key={question.id} value={question.id}>
								{question.question}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl marginBottom={"1rem"} isInvalid={errors.answer}>
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
						<FormHelperText>Answer your chosen question</FormHelperText>
					)}
				</FormControl>
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					Register
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
