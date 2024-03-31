import React from "react";
import PageContainer from "../common/PageContainer";
import Header from "../common/Header";
import { useAuth } from "../../context/AuthContext";
import { Alert, AlertIcon, Flex, Heading, Text } from "@chakra-ui/react";
import ApiForm from "./ApiForm";
import "./LandingPage.css";

export default React.forwardRef((props, ref) => {
	const { currentUserEmail, apiCount, isOverTheLimit, updateApiCount } =
		useAuth();

	return (
		<PageContainer>
			<Flex mb={"1rem"} direction={{ base: "column", md: "row" }}>
				<Heading size={"sm"} mr={"3rem"} mb={"1rem"}>
					Email: {currentUserEmail}
				</Heading>
				<Heading size={"sm"}>API Count: {apiCount}</Heading>
			</Flex>
			<ApiForm />
		</PageContainer>
	);
});
