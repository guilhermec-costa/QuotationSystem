import { Separator } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { memo } from "react";

const StatusItem = ({
    columnFilters,
    setColumnFilters,
    status,
    columnId
}) => {
    const handleCheckboxChanged = (isMarked, status) => {
        setColumnFilters(prevFilters => {
            const statusFilter = prevFilters.find(filter => filter.id === columnId);
            if (!statusFilter) {
                return [...prevFilters, { id: columnId, value: [status] }];
            }
            const newStatusValues = isMarked
                ? [...statusFilter.value, status]
                : statusFilter.value.filter(item => item !== status);
            return prevFilters.map(filter =>
                filter.id === columnId
                    ? { ...filter, value: newStatusValues }
                    : filter
            );
        });
    };

    const isChecked = columnFilters.some(filter =>
        filter.id === columnId && filter.value.includes(status)
    );

    return (
        <div className="flex items-center space-x-3 p-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-secondary">
            <Checkbox
                id={columnId}
                onCheckedChange={(e) => handleCheckboxChanged(e, status)}
                checked={isChecked}
                className="text-primary-foreground"
            />
            <Badge>
            <label
                htmlFor={columnId}
                className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200 ease-in-out"
            >
                {status}
            </label>
            </Badge>
        </div>
    );
}

export default memo(StatusItem);
