import ActionsEllipses from "@/components/ActionsEllipses";
import { useAuth } from "@/hooks/useAuth";
import { View, Pencil, Delete } from "lucide-react";

const ActionsCell = ({
    row, table
}) => {
    const { changePurchaseModalVisibility, purchaseSetterFn } = table.options.meta;
    const { getIsAdmin } = useAuth();
    return <ActionsEllipses actions={[
        {
            title: "Change Status",
            callback: function() {
                changePurchaseModalVisibility();
                purchaseSetterFn(row.original)
            },
            icon: <Pencil className="w-[18px] mr-3" />,
            disabled: !getIsAdmin() ? true : false
        },
    ]} />
}

export default ActionsCell;
