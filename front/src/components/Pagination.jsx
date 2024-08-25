import { useMemo } from "react";
import { Button } from "@/components/ui";

const Pagination = ({ table, setPagination, pagination }) => {
    const { pageIndex } = useMemo(() => table.getState().pagination, [table.getState().pagination]);
    const pageCount = useMemo(() => table.getPageCount(), [table.getPageCount()]);

    return (
        <div className="flex justify-center items-center sm:justify-end space-x-2 py-4 sm:mr-3 flex-wrap h-[60px]">
            <small>
                page {pageIndex + 1} of {pageCount}
            </small>
            <Button variant="outline" size="sm"
                onClick={table.firstPage} disabled={!table.getCanPreviousPage()}>{'<<'}
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={table.previousPage}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={table.nextPage}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
            <Button variant="outline" size="sm"
                onClick={table.lastPage} disabled={!table.getCanNextPage()}>{'>>'}
            </Button>
        </div>
    )
}

export default Pagination;
