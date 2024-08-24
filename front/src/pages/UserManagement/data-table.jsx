import { useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { ArrowDownUp } from 'lucide-react';
import { ArrowUpWideNarrow } from 'lucide-react';
import { ArrowDownWideNarrow } from 'lucide-react';
import Pagination from '@/components/Pagination';
import ToggleUserStatusModal from './Components/ToggleUserStatusModal';

export function DataTable({
    data,
    columns
}) {
    const [selectedRow, setSelectedRow] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 9
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
            toggleUserStatusModal: (rowData) => {
                setSelectedRow(rowData);
            }
        }
    });

    return (
        <>
            <div className='w-[80%] rounded-md bg-secondary mt-3 mx-auto overflow-y-auto'>
                <Table className="w-[100%] mh-[25%] relative">
                    <TableHeader className="bg-secondary text-primary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const { searchable, FilterComponent, sortable } = header.column.columnDef.meta || { undefined, undefined, undefined };
                                    return (
                                        <TableHead key={header.id} className={`relative`} style={{ width: `${header.getSize()}px` }}>
                                            <div className="flex justify-between items-center text-lg">
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
                                    <TableCell key={cell.id} className="text-base">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination table={table} setPagination={setPagination} pagination={pagination} />
            </div>
            {Object.keys(selectedRow).length > 0 && (
                <ToggleUserStatusModal
                    row={selectedRow}
                    onConfirm={() => {
                        setSelectedRow({})
                    }}
                />
            )}
        </>
    );
}

