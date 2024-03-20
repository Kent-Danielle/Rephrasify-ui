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
	Select,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
export default React.forwardRef((props, ref) => {
    const { onLoginClick } = props;
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Flex
			direction={"column"}
			w={"100%"}
			alignItems={"center"}
			justifyContent={"space-evenly"}
			h="100%"
			padding={"4rem"}
		>
			<form id="login-form" onSubmit={handleSubmit(onSubmit)}>
				<FormControl marginBottom={"1rem"} isInvalid={errors.email}>
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
				<FormControl marginBottom={"1rem"} isInvalid={errors.password}>
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
				<FormControl marginBottom={"1rem"} isInvalid={errors.question}>
					<FormLabel>Security question</FormLabel>
					<Select
						type="text"
						{...register("question", { required: true })}
					>
						<option value="What is your favorite color?">What is your favorite color?</option>
						<option value="What is your favorite food?">What is your favorite food?</option>
					</Select>
				</FormControl>
				<FormControl marginBottom={"1rem"} isInvalid={errors.answer}>
					<FormLabel>Answer</FormLabel>
					<Input
						type="text"
						{...register("answer", { required: true })}
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
