import React from "react";
import PageContainer from "../common/PageContainer";
import Header from "../common/Header";
import { useAuth } from "../../context/AuthContext";
import {
	Alert,
	AlertIcon,
	ButtonGroup,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	Text,
	Button,
	Textarea,
	Select,
	Box,
	AlertTitle,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ACTIONS = {
    PARAPHRASE: "Paraphrase this text",
	FIX_GRAMMAR: "Fix the grammar",
	IMPROVE_COHERENCE: "Make this text more coherent",
	IMPROVE_READABILITY: "Rewrite to make this easier to understand",
	FORMALLY: "Write this more formally",
	NEUTRALLY: "Write this more neutrally",
	CASUALLY: "Write this more casually",
};

export default React.forwardRef((props, ref) => {
	const { currentUserId, isOverTheLimit, updateApiCount } =
		useAuth();
    const [paraphrasedText, setParaphrasedText] = React.useState("");
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm();

	const handleOnSubmit = React.useCallback((data) => {
		data = { ...data, userId: currentUserId }
        // TODO: Implement API call to paraphrase text; use aiService.js
        // *Note: data includes userId incase you need it for the API call
        // *If successful result, update Api count & setParaphrasedText()
        updateApiCount();
	}, [updateApiCount]);

	return (
		<Flex direction={{ base: "column", md: "row" }} height={"100%"}>
			<form id="api-form" onSubmit={handleSubmit(handleOnSubmit)}>
				<FormControl isInvalid={errors.text} mb="0.5rem">
					<Select
						defaultValue={Object.keys(ACTIONS)[0]}
						type="text"
						placeholder="Select action"
						{...register("action", { required: "Action is required" })}
					>
						{Object.keys(ACTIONS).map((key) => (
							<option key={key} value={ACTIONS[key]}>
								{ACTIONS[key]}
							</option>
						))}
					</Select>
                    {errors.action && (
                        <FormErrorMessage>Input is required</FormErrorMessage>
                    )}
				</FormControl>
				<FormControl isInvalid={errors.text}>
					<Textarea
						resize={"vertical"}
						width={"100%"}
						rows={10}
						placeholder="Enter text here"
						{...register("text", { required: "Text is required" })}
					/>
					{errors.text && (
						<FormErrorMessage>Input is required</FormErrorMessage>
					)}
				</FormControl>
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					Process!
				</Button>
			</form>
			<Box w="100%">
				{isOverTheLimit && (
					<Alert
						status="warning"
						mb="0.5rem"
						borderRadius={"0.5rem"}
						pb="0.5rem"
						pt="0.5rem"
					>
						<AlertTitle fontSize={"0.9rem"}>
							You have exceeded the API limit.
						</AlertTitle>
					</Alert>
				)}
				<FormControl>
					<Textarea
						resize={"vertical"}
						rows={isOverTheLimit ? 10 : 12}
						readOnly
                        value={paraphrasedText}
					/>
					{errors.text && (
						<FormErrorMessage>Input is required</FormErrorMessage>
					)}
				</FormControl>
			</Box>
		</Flex>
	);
});
