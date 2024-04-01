import { useToast } from "@chakra-ui/react";
import { DataGrid } from "devextreme-react";
import {
	Editing,
	HeaderFilter,
	Pager,
	Paging,
	Scrolling,
	SearchPanel,
} from "devextreme-react/cjs/data-grid";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import userManagementService from "./../../services/userManagementService";
import "./dx.fluent.chakra.css";

const columns = [
	{ dataField: "id", caption: "ID", width: 80, allowEditing: false },
	{ dataField: "email", caption: "Email", width: 300, allowEditing: false },
	{ dataField: "isAdmin", caption: "Is Admin", dataType: 'boolean', width: 250, allowEditing: true },
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
			.getAllUsers(currentUserId)
			.then(
				(res) => {
					setUsers(res.users);
				},
				(reject) => {
					toast({
						title: "Error",
						description: reject?.message ?? "Failed to fetch user data",
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
					description: error?.message ?? "Failed to fetch user data",
					status: "error",
					duration: 9000,
					isClosable: true,
					position: "top-right",
				});
			});
	}, [currentUserId, toast]);

	const handleOnRowRemoved = React.useCallback((e) => {
		let { data } = e;
		data = { ...data, adminId: currentUserId };
		data.userId = data?.id;
		userManagementService
			.deleteUser(data)
			.then(
				(res) => {
					toast({
						title: `Success: User ${data.email} deleted`,
						description: res?.message,
						status: "success",
						duration: 9000,
						isClosable: true,
						position: "top-right",
					});
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
	}, [currentUserId, toast]);

	const handleOnRowUpdated = React.useCallback((e) => {
		let { data } = e;
		data = { ...data, adminId: currentUserId };
		data.isAdmin = data.isAdmin ? 1 : 0;
		data.userId = data?.id;
		userManagementService
			.updateRole(data)
			.then(
				(res) => {
					toast({
						title: `Success: User ${data.email} updated`,
						description: res?.message,
						status: "success",
						duration: 9000,
						isClosable: true,
						position: "top-right",
					});
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
	}, [currentUserId, toast]);

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
