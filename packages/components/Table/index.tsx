import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import EmptyTable from './EmptyTable';
interface ITablesProps {
  name: string;
  data: any[];
  columns: Array<ColumnDef<any>>;
}
const Table = ({ name, data, columns }: ITablesProps) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  return (
    // <TableContainer className='border overflow-hidden overflow-x-scroll'>
    <table className='w-full divide-y divide-muted-300 border border-muted-300 mt-6'>
      <thead className='font-semibold'>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='text-start p-3 font-medium text-sm'
                style={{
                  width: header.getSize(),
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='divide-y divide-muted-300'>
        {data?.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className='font-semibold'>
              <EmptyTable name={name} />
            </td>
          </tr>
        ) : (
          <>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className='p-3 text-sm align-middle' key={cell.id}>
                    <div className='flex'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
    // </TableContainer>
  );
};
export default Table;
