import { useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import ProductModal from './Components/ProductModal';
import { ArrowDownUp } from 'lucide-react';
import { ArrowUpWideNarrow } from 'lucide-react';
import { ArrowDownWideNarrow } from 'lucide-react';
import Pagination from './Components/Pagination';

export function DataTable({
    data,
    setData,
    columns
}) {
    const [selectedRow, setSelectedRow] = useState({});
    const [actionType, setActionType] = useState("");
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            pagination
        },
        columnResizeMode: "onChange",
        meta: {
            renderProductModal: (rowData, rowIndex, mode) => {
                setActionType(mode);
                setSelectedRow({ rowData, rowIndex });
            },

            closeConfirmationModal: () => {
                setSelectedRow({})
            }
        }
    });

    return (
        <>
            <div className='w-full rounded-md border bg-secondary mt-3'>
                <Table className="w-[100%] mh-[25%] relative">
                    <TableHeader className="bg-secondary text-primary rounded-md">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const { searchable, FilterComponent, sortable } = header.column.columnDef.meta || { undefined, undefined, undefined };
                                    return (
                                        <TableHead key={header.id} className={`relative`} style={{ width: `${header.getSize()}px` }}>
                                            <div className="flex justify-between items-center">
                                                {header.column.columnDef.header}
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""
                                                        }`}>
                                                </div>
                                                <div className='flex gap-4'>
                                                    {sortable && header.column.getIsSorted() === false && (
                                                        <ArrowDownUp
                                                            className="w-[16px] cursor-pointer data-[is-sorted=true]:text-primary" data-is-sorted={!!header.column.getIsSorted()}
                                                            onClick={header.column.getToggleSortingHandler()} />
                                                    )}

                                                    {sortable && header.column.getIsSorted() === "asc" && (
                                                        <ArrowUpWideNarrow
                                                            className="w-[16px] cursor-pointer data-[is-sorted=true]:text-primary" data-is-sorted={!!header.column.getIsSorted()}
                                                            onClick={header.column.getToggleSortingHandler()} />
                                                    )}

                                                    {sortable && header.column.getIsSorted() === "desc" && (
                                                        <ArrowDownWideNarrow
                                                            className="w-[16px] cursor-pointer data-[is-sorted=true]:text-primary" data-is-sorted={!!header.column.getIsSorted()}
                                                            onClick={header.column.getToggleSortingHandler()} />
                                                    )}

                                                    {searchable && typeof FilterComponent === "function" && (
                                                        FilterComponent({
                                                            columnFilters,
                                                            setColumnFilters,
                                                            columnId: header.column.columnDef.accessorKey,
                                                            table: table
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-card">
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} className="border border-sky-500">
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination table={table} setPagination={setPagination} pagination={pagination} />
            </div>
            {!isNaN(selectedRow.rowIndex) && (
                <ProductModal
                    mode={actionType}
                    rowData={selectedRow.rowData}
                    onOpenChange={table.options.meta.closeConfirmationModal}
                    onConfirm={() => {
                        table.options.meta.closeConfirmationModal();
                    }}
                />
            )}
        </>
    );
}

