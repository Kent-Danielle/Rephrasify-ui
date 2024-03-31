import { Button, DataGrid } from "devextreme-react";
import {
	Editing,
	HeaderFilter,
	Pager,
	Paging,
	Scrolling,
	SearchPanel,
	Toolbar,
	Item,
	FilterRow,
} from "devextreme-react/data-grid";
import "./dx.fluent.chakra.css";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import userManagementService from "../../services/userManagementService";
import { useToast } from "@chakra-ui/react";

const columns = [
	{ dataField: "method", caption: "HTTP Method", width: 80, allowEditing: false },
	{ dataField: "endpoint", caption: "API Endpoint", width: 300, allowEditing: false },
	{ dataField: "usage", caption: "Call Count", width: 250, allowEditing: false },
];

const CALL_INTERVAL = 10000;

export default React.forwardRef((props, ref) => {
	const { currentUserId } = useAuth();
	const toast = useToast();
	const [usage, setUsage] = React.useState([]);

	const getData = React.useCallback(() => {
		userManagementService
		.getAllUsage({ adminId: currentUserId })
		.then(
			(res) => {
				setUsage(res.data);
			},
			(reject) => {
				toast({
					title: "Error",
					description: reject.message,
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
				description: error.message,
				status: "error",
				duration: 9000,
				isClosable: true,
				position: "top-right",
			});
		});
	}, [currentUserId]);

	React.useEffect(() => {
		getData(); // Initial on load call as it would otherwise take 10 seconds to load

		const refresh = setInterval(() => {
			getData();
		}, CALL_INTERVAL);

		return () => {
			clearInterval(refresh);
		};
	}, [currentUserId]);

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
