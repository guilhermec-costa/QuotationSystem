import ActionsCell from "./Components/ActionsCell";
import { Available, Unavailable } from "./Components/Availability";
import DropdownFilter from "./Components/DropwdownFilter";
import InputFilterDrawer from "@/components/InputFilterDrawer";
import { Badge } from "@/components/ui/badge";

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
        cell: (props) => (
            <div>{props.getValue() || "-"}</div>
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
        sortable: true,
        filterFn: "includesString",
        cell: ({ getValue, table }) => (
            <div>{getValue() || "-"}</div>
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
            sortable: true,
            searchable: true,
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
            return <div className="text-primary font-bold">{formattedPrice || "-"}</div>
        }
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        meta: {
            sortable: true,
            searchable: true,
        },
        cell: (props) => (
            <div>{props.getValue() || "-"}</div>
        ),
        size: 20
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            row.original.status.toLowerCase() === "in stock" ?
                <Badge className={"bg-primary"} variant={"outline"}>{row.original.status || "-"}</Badge> :
                <Badge className={"bg-destructive"}>{row.original.status || "-"}</Badge>
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
