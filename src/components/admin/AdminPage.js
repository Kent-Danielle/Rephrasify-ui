import { Flex, Heading, VStack } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import "devextreme/dist/css/dx.fluent.saas.light.css";
import React from "react";
import PageContainer from "../common/PageContainer";
import UserDashboard from "./UserDashboard";
import ApiDashboard from "./ApiDashboard";

const colors = theme.colors;

export default React.forwardRef((props, ref) => {
	const dashboardRef = React.useRef();
	const usageDashboardRef = React.useRef();

	return (
		<PageContainer>
			<Flex
				direction={"column"}
				height={"fit-content"}
			>
				<Heading color={colors.teal[800]} size={"lg"} mb={"2rem"}>
					User Dashboard
				</Heading>
				<UserDashboard ref={dashboardRef} />
				<Heading color={colors.teal[800]} size={"lg"} mb={"2rem"}>
					API Usage Dashboard
				</Heading>
				<ApiDashboard ref={usageDashboardRef} />
			</Flex>
		</PageContainer>
	);
});
