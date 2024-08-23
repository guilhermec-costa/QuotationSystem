import ActionsEllipses from "@/components/ActionsEllipses";
import { View, Pencil, Delete } from "lucide-react";

const ActionsCell = ({
    getValue, row, column, table
}) => {
    const { renderProductModal } = table.options.meta;
    return <ActionsEllipses actions={[
        {
            title: "Edit",
            callback: () => renderProductModal(row.original, row.index, "edit"),
            icon: <Pencil className="w-[18px] mr-3" />
        },
        {
            title: "Delete",
            callback: () => renderProductModal(row.original, row.index, "delete"),
            icon: <Delete className="w-[18px] mr-3" />
        },
        {
            title: "View",
            callback: () => renderProductModal(row.original, row.index, "view"),
            icon: <View className="w-[18px] mr-3" />
        }
    ]} />
}

export default ActionsCell;
