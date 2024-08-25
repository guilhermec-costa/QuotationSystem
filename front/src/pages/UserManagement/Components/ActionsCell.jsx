import ActionsEllipses from "@/components/ActionsEllipses";
import { useAuth } from "@/hooks/useAuth";
import { View, ShieldX, ShieldCheck } from "lucide-react";

const ActionsCell = ({
    row, table
}) => {
    const { toggleUserStatusModal } = table.options.meta;
    const { getIsAdmin } = useAuth();
    return <ActionsEllipses actions={[
        {
            title: row.original.status === "Active" ? "Inactivate" : "Activate",
            icon: row.original.status === "Active" ? <ShieldX className="w-[18px] mr-3" /> : <ShieldCheck className="w-[18px] mr-3" />,
            callback: () => toggleUserStatusModal(row.original),
            disabled: !getIsAdmin() ? true : false
        },
    ]} />
}

export default ActionsCell;
