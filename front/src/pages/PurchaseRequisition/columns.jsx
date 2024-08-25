import { Badge } from "@/components/ui/badge";
import ActionsCell from "./Components/ActionsCell";
import InputFilterDrawer from "./Components/InputFilterDrawer";

export const columns = [
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: (props) => {
            const timestamp = props.row.original.createdAt;
            const milliseconds = timestamp.seconds * 1000;
            const date = new Date(milliseconds);
            const formattedDate = date.toLocaleString();
            return (
                <div>{formattedDate || "-"}</div>
            )
        },
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
        accessorKey: "productName",
        header: "Product",
        cell: (props) => (
            <div>{props.getValue() || "-"}</div>
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
        accessorKey: "userName",
        header: "User",
        cell: (props) => (
            <div>{props.getValue() || "-"}</div>
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
        cell: ({ row }) => {
            return <Badge className="text-primary-foreground font-bold bg-primary" variant={"outline"}>{row.original.status || "-"}</Badge>
        },
        size: 80,
        minSize: 60,
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
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => {
            return <div>{row.original.quantity || "-"}</div>
        },
        size: 80,
        minSize: 60,
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
