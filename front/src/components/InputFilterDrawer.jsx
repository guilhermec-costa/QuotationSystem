import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
        );
    };

    return (
        <Popover className="relative">
            <PopoverTrigger asChild>
                <Search 
                    className="w-[16px] h-[16px] cursor-pointer text-gray-600 hover:text-primary transition-colors duration-200 ease-in-out data-[is-filtered=true]:text-primary" 
                    data-is-filtered={!!currentFieldValue} 
                />
            </PopoverTrigger>
            <PopoverContent 
                className="w-60 p-2 bg-white rounded-lg shadow-lg right-0 transform translate-x-1/2"
            >
                <Input 
                    placeholder={columnId[0].toUpperCase() + columnId.substr(1)} 
                    onChange={handleFiltering} 
                    value={currentFieldValue} 
                    className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 ease-in-out"
                />
            </PopoverContent>
        </Popover>
    );
};

export default InputFilterDrawer;