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

    return (
        <div className="items-top flex space-x-2">
            <Checkbox
                id={columnId}
                onCheckedChange={(e) => handleCheckboxChanged(e, status)}
                value={true}
            />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor={columnId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {status}
                </label>
            </div>
        </div>
    );
}

export default memo(StatusItem);
