import { DataGrid } from "devextreme-react";
import {
	Editing,
	HeaderFilter,
	Pager,
	Paging,
	Scrolling,
	SearchPanel,
} from "devextreme-react/cjs/data-grid";
import "./dx.fluent.chakra.css";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import userManagementService from "./../../services/userManagementService";
import { useToast } from "@chakra-ui/react";

const columns = [
	{ dataField: "userId", caption: "ID", width: 80, allowEditing: false },
	{ dataField: "email", caption: "Email", width: 300, allowEditing: false },
	{ dataField: "isAdmin", caption: "Is Admin", width: 250, allowEditing: true },
	{
		dataField: "apiCount",
		caption: "Total API Usage",
		width: 200,
		allowEditing: false,
	},
];

export default React.forwardRef((props, ref) => {
	const { currentUserId } = useAuth();
	const toast = useToast();
	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		userManagementService
			.getAllUsers({ adminId: currentUserId })
			.then(
				(res) => {
					setUsers(res.users);
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

	const handleOnRowRemoved = React.useCallback((e) => {
		let { data } = e;
		data = { ...data, adminId: currentUserId };
		userManagementService
			.deleteUser(data)
			.then(
				(res) => {
					setUsers((prev) => prev.filter((user) => user.userId !== data.userId));				
				},
				(reject) => {
					toast({
						title: "Error",
						description: reject?.message,
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
	}, []);

	const handleOnRowUpdated = React.useCallback((e) => {
		let { data } = e;
		data = { ...data, adminId: currentUserId };
		userManagementService
			.updateRole(data)
			.then(
				(res) => {
					setUsers((prev) => prev.map((user) => user.userId === data.userId ? data : user));
				},
				(reject) => {
					toast({
						title: "Error",
						description: reject?.message,
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
	}, []);

	return (
		<DataGrid
			ref={ref}
			dataSource={users}
			columns={columns}
			height={"500px"}
			onRowRemoved={handleOnRowRemoved}
			onRowUpdated={handleOnRowUpdated}
			showBorders={true}
			rowAlternationEnabled={true}
		>
			<Scrolling mode="virtual" rowRenderingMode="virtual" />
			<HeaderFilter visible={true} allowSearch={true} />
			<SearchPanel visible={true} />
			<Pager visible={true} />
			<Paging defaultPageSize={10} pageSize={[10, 50, 100]} />
			<Editing allowUpdating={true} allowDeleting={true} />
		</DataGrid>
	);
});
