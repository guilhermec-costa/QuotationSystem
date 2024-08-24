import ActionsCell from "./Components/ActionsCell";
import InputFilterDrawer from "@/components/InputFilterDrawer";

export const columns = [
    {
        accessorKey: "date",
        header: "Date",
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
        accessorKey: "productName",
        header: "Product",
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
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formattedPrice = new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
            }).format(price)
            return <div className="text-primary font-bold">{formattedPrice}</div>
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
