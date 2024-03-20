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
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
export default React.forwardRef((props, ref) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	console.log(errors);

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
				<br />
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					Submit
				</Button>
			</form>

			<Text
                justifySelf={"end"}
            >
				Don't have an account?{" "}
				<Link color="teal.500" href="/register">
					Register now
				</Link>
			</Text>
		</Flex>
	);
});
