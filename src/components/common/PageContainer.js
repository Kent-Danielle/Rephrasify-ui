import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";

export default React.forwardRef((props, ref) => {
	return (
		<VStack w={"100%"} h={"100%"}>
			<Header />

			<Box w={"100%"} h={"100%"} p="2rem">
				{props.children}
			</Box>
		</VStack>
	);
});
