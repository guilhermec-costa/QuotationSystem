import { DataTable } from "./data-table";
import { columns } from "./columns";
import useProducts from "@/hooks/useProducts";
import { memo } from "react";

export default memo(function Products() {
    const { data } = useProducts();
    return (
        <DataTable columns={columns} dataset={data} />
    )
});


