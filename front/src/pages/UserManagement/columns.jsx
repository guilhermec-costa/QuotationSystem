import ActionsCell from "./Components/ActionsCell";
import InputFilterDrawer from "./Components/InputFilterDrawer";

export const columns = [
    {
        accessorKey: "email",
        header: "Email",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        size: 100,
        minSize: 80,
        meta: {
            searchable: true,
            sortable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId }) => (
                <InputFilterDrawer
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    columnId={columnId}
                />
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        size: 100,
        minSize: 80,
        meta: {
            searchable: true,
            sortable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId }) => (
                <InputFilterDrawer
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    columnId={columnId}
                />
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        size: 20,
        cell: ActionsCell
    }
];
