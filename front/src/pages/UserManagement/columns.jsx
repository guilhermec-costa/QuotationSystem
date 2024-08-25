import { Badge } from "@/components/ui/badge";
import ActionsCell from "./Components/ActionsCell";
import InputFilterDrawer from "@/components/InputFilterDrawer";

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
        cell: (props) => {
            return props.getValue() === "Active" ?
                (
                    <Badge className="bg-primary">
                        {props.getValue()}
                    </Badge>
                ) :
                (
                    <Badge className="bg-destructive">
                        {props.getValue()}
                    </Badge>
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
        accessorKey: "actions",
        header: "Actions",
        size: 20,
        cell: ActionsCell
    }
];
