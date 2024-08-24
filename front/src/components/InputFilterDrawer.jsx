import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const InputFilterDrawer = ({
    columnFilters,
    setColumnFilters,
    columnId,
}) => {
    const currentFieldValue = columnFilters.find(filter => filter.id === columnId)?.value || "";
    const handleFiltering = (e) => {
        setColumnFilters(
            prevFilters => prevFilters.filter(filter => filter.id !== columnId).concat({
                id: columnId,
                value: e.target.value
            })
        )
    }

    return (
        <Popover className="relative right-5">
            <PopoverTrigger asChild>
                <Search className="w-[14px] cursor-pointer data-[is-filtered=true]:text-primary" data-is-filtered={!!currentFieldValue} />
            </PopoverTrigger>
            <PopoverContent className="w-150 relative right-1/2">
                <Input placeholder={columnId[0].toUpperCase() + columnId.substr(1)} onChange={handleFiltering} value={currentFieldValue} />
            </PopoverContent>
        </Popover>
    )
}

export default InputFilterDrawer;
