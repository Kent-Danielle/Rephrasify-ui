import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import PageContainer from "../common/PageContainer";
import ApiForm from "./ApiForm";
import "./LandingPage.css";

export default React.forwardRef((props, ref) => {
	const { currentUserEmail, apiCount } =
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
