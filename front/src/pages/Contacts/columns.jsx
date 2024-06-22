import ActionsCell from "./Components/ActionsCell";
import DropdownFilter from "./Components/DropwdownFilter";
import InputFilterDrawer from "./Components/InputFilterDrawer";

export const columns = [
    {
        accessorKey: "id",
        header: "Id",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        size: 30,
        minSize: 30
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        enableColumnFilter: true,
        size: 60,
        minSize: 50,
        filterFn: "includesString",
        meta: {
            searchable: true,
            sortable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId }) => <InputFilterDrawer
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnId={columnId} />
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        enableColumnFilter: true,
        size: 50,
        minSize: 40,
        filterFn: "includesString",
        meta: {
            searchable: true,
            sortable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId }) => <InputFilterDrawer
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnId={columnId} />
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        enableColumnFilter: true,
        size: 60,
        minSize: 50,
        filterFn: "includesString",
        meta: {
            searchable: true,
            sortable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId }) => <InputFilterDrawer
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnId={columnId} />
        },
    },
    {
        accessorKey: "supplier",
        header: "Supplier",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        enableColumnFilter: true,
        size: 60,
        minSize: 50,
        filterFn: "includesString",
        meta: {
            searchable: true,
            sortable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId, table }) => <DropdownFilter
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnId={columnId}
                table={table}
            />
        },
        filterFn: (row, columnId, filterSuppliers) => {
            if (filterSuppliers.length === 0) return true;
            const rowSupplier = row.getValue(columnId);
            return filterSuppliers.includes(rowSupplier);
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        size: 20,
        cell: ActionsCell
    }
];
