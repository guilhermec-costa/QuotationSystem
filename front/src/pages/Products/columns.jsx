import ActionsCell from "./Components/ActionsCell";
import { Available, Unavailable } from "./Components/Availability";
import DropdownFilter from "./Components/DropwdownFilter";
import InputFilterDrawer from "./Components/InputFilterDrawer";

export const columns = [
    // {
    //     accessorKey: "id",
    //     header: "Id",
    //     cell: (props) => (
    //         <div>{props.getValue()}</div>
    //     ),
    //     size: 30,
    //     minSize: 30
    // },
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
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue, table }) => (
            <div>{getValue()}</div>
        ),
        meta: {
            searchable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId }) => <InputFilterDrawer
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnId={columnId} />
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        meta: {
            searchable: true,
        },
        meta: {
            searchable: false,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId }) => <InputFilterDrawer
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnId={columnId} />
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formattedPrice = new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
            }).format(price)
            return <div className="text-primary font-bold">{formattedPrice}</div>
        }
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell: (props) => (
            <div>{props.getValue()}</div>
        ),
        size: 20
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            row.original.status.toLowerCase() === "in stock" ? <Available status={row.original.status} /> : <Unavailable status={row.original.status} />
        ),
        size: 50,
        meta: {
            searchable: true,
            FilterComponent: ({ columnFilters, setColumnFilters, columnId, table }) => <DropdownFilter
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columnId={columnId}
                table={table}
            />
        },
        filterFn: (row, columnId, filterStatuses) => {
            if (filterStatuses.length === 0) return true;
            const rowStatus = row.getValue(columnId);
            return filterStatuses.includes(rowStatus);
        }
    },
    ,
    {
        accessorKey: "actions",
        header: "Actions",
        size: 20,
        cell: ActionsCell
    }
];
