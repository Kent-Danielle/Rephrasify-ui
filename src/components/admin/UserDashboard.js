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

const columns = [
	{ dataField: "UserID", caption: "ID", width: 80, allowEditing: false },
	{ dataField: "Email", caption: "Email", width: 250, allowEditing: false },
	{ dataField: "IsAdmin", caption: "Is Admin", width: 250, allowEditing: true },
	{
		dataField: "CreatedAt",
		caption: "Created At",
		dataType: "date",
		width: 250,
		allowEditing: false,
	},
	{ dataField: "Usage", caption: "Usage", width: 100, allowEditing: false },
];

const rows = [
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 1, Email: "a", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 2, Email: "b", IsAdmin: false, CreatedAt: "01/01/2024", Usage: 1 },
	{ UserID: 3, Email: "c", IsAdmin: true, CreatedAt: "01/01/2024", Usage: 1 },
];

export default React.forwardRef((props, ref) => {
	const handleOnRowRemoved = React.useCallback((e) => {
		console.log("Row removed", e);
	}, []);

	const handleOnRowUpdated = React.useCallback((e) => {
		console.log("Row updated", e);
	}, []);

	return (
		<DataGrid
			ref={ref}
			dataSource={rows}
			columns={columns}
			height={"500px"}
			onRowRemoved={handleOnRowRemoved}
			onRowUpdated={handleOnRowRemoved}
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
