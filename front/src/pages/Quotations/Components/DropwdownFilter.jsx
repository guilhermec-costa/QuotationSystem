import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ListFilter } from "lucide-react";
import { useMemo } from "react";
import StatusItem from "./StatusItem";

const DropdownFilter = ({
    columnFilters,
    setColumnFilters,
    columnId,
    table
}) => {
    const currentFieldValue = columnFilters.find(filter => filter.id === columnId)?.value || "";
    const uniqueStatuses = useMemo(() => Array.from(new Set(table.options.data.map(product => product.status))))

    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <ListFilter className="w-[20px] cursor-pointer data-[is-filtered=true]:text-card-foreground" data-is-filtered={!!currentFieldValue} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {uniqueStatuses.map((status, i) =>
                    <StatusItem status={status} setColumnFilters={setColumnFilters} columnFilters={columnFilters} columnId={columnId} key={i} />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownFilter;
