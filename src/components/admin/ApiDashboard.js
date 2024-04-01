import { useToast } from "@chakra-ui/react";
import { Button, DataGrid } from "devextreme-react";
import {
	Editing,
	FilterRow,
	HeaderFilter,
	Item,
	Pager,
	Paging,
	Scrolling,
	Toolbar
} from "devextreme-react/data-grid";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import userManagementService from "../../services/userManagementService";
import "./dx.fluent.chakra.css";

const columns = [
	{ dataField: "verb", caption: "HTTP Method", width: 150, allowEditing: false },
	{ dataField: "endpoint", caption: "API Endpoint", width: 300, allowEditing: false },
	{ dataField: "usageCount", caption: "Call Count", width: 175, allowEditing: false },
];

const CALL_INTERVAL = 30000;

export default React.forwardRef((props, ref) => {
	const { currentUserId } = useAuth();
	const toast = useToast();
	const [usage, setUsage] = React.useState([]);

	const getData = React.useCallback(() => {
		userManagementService
		.getAllUsage(currentUserId)
		.then(
			(res) => {
				setUsage(res.data);
			},
			(reject) => {
				toast({
					title: "Error",
					description: reject?.message ?? "Failed to fetch usage data",
					status: "error",
					duration: 9000,
					isClosable: true,
					position: "top-right",
				});
			}
		)
		.catch((error) => {
			toast({
				title: "Error",
				description: error.message ?? "Failed to fetch usage data",
				status: "error",
				duration: 9000,
				isClosable: true,
				position: "top-right",
			});
		});
	}, [currentUserId, toast]);

	React.useEffect(() => {
		getData(); // Initial on load call as it would otherwise take 10 seconds to load

		const refresh = setInterval(() => {
			getData();
		}, CALL_INTERVAL);

		return () => {
			clearInterval(refresh);
		};
	}, [currentUserId, getData]);

	return (
		<DataGrid
			ref={ref}
			dataSource={usage}
			columns={columns}
			height={"500px"}
			showBorders={true}
			rowAlternationEnabled={true}
		>
			<Toolbar>
				<Item location="after">
					<Button
						text="Refresh Data"
						onClick={getData}
					/>
				</Item>
			</Toolbar>
			<Scrolling mode="virtual" rowRenderingMode="virtual" />
			<HeaderFilter visible={true} allowSearch={true} />
			<FilterRow visible={true} />
			<Pager visible={true} />
			<Paging defaultPageSize={10} pageSize={[10, 50, 100]} />
			<Editing allowUpdating={false} allowDeleting={false} allowAdding={false} />
		</DataGrid>
	);
});
