import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ListFilter } from "lucide-react";
import { useMemo } from "react";
import StatusItem from "./StatusItem";
import { Separator } from "@/components/ui";

const DropdownFilter = ({
    columnFilters,
    setColumnFilters,
    columnId,
    table
}) => {
    const currentFieldValue = columnFilters.find(filter => filter.id === columnId)?.value || "";
    const uniqueStatuses = useMemo(() => Array.from(new Set(table.options.data.map(product => product.status))), [table.options.data]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <ListFilter
                    className={`w-[20px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 ${currentFieldValue ? 'text-primary' : 'text-muted-foreground'}`}
                    data-is-filtered={!!currentFieldValue}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-card border border-border rounded-lg shadow-lg py-2 w-48"
                align="start"
                sideOffset={8}
            >
                <DropdownMenuLabel className="text-xs font-medium uppercase px-3 mb-1">
                    Status
                </DropdownMenuLabel>
                <Separator />
                <DropdownMenuSeparator className="my-1 mx-3" />
                {uniqueStatuses.map((status, i) =>
                    <StatusItem
                        status={status}
                        setColumnFilters={setColumnFilters}
                        columnFilters={columnFilters}
                        columnId={columnId}
                        key={i}
                        className="px-3 py-1.5 cursor-pointer duration-200 ease-in-out"
                    />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownFilter;
