import ActionsEllipses from "@/components/ActionsEllipses";
import { useAuth } from "@/hooks/useAuth";
import { View, Pencil, Delete } from "lucide-react";

const ActionsCell = ({
    row, table
}) => {
    const { renderProductModal } = table.options.meta;
    const { getIsAdmin } = useAuth();
    return <ActionsEllipses actions={[
        {
            title: "Edit",
            callback: () => renderProductModal(row.original, row.index, "edit"),
            icon: <Pencil className="w-[18px] mr-3" />,
            disabled: !getIsAdmin() ? true : false
        },
        {
            title: "Delete",
            callback: () => renderProductModal(row.original, row.index, "delete"),
            icon: <Delete className="w-[18px] mr-3" />,
            disabled: !getIsAdmin() ? true : false
        },
        {
            title: "View",
            callback: () => renderProductModal(row.original, row.index, "view"),
            icon: <View className="w-[18px] mr-3" />,
            disabled: !getIsAdmin() ? true : false
        }
    ]} />
}

export default ActionsCell;
