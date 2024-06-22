import { Button, Separator } from "@/components/ui";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import { memo } from "react";

const ActionsEllipses = ({
    actions
}) => {
    return (
        <DropdownMenu className="outline-none">
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Separator />
                {actions.map((action, i) =>
                    <DropdownMenuItem key={i} className="hover:cursor-pointer" onClick={action.callback}>{action.icon}{action.title}</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(ActionsEllipses);
