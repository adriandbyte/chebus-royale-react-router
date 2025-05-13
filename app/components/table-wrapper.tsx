import { type Table as TableType, flexRender } from "@tanstack/react-table";

import { getWidthClass } from "~/lib/utils";

type TableWrapperProps<T> = {
  tableInstance: TableType<T>;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  headerCellClassName?: string;
  emptyMessage?: string;
};

export function TableWrapper<T>({
  tableInstance,
  className = "w-full border-collapse",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "p-2 border-b",
  headerCellClassName = "p-2 border-b-2 text-left",
  emptyMessage = "No hay datos disponibles",
}: TableWrapperProps<T>) {
  const hasData = tableInstance.getRowModel().rows.length > 0;

  return (
    <div className="overflow-x-auto">
      <table className={className}>
        <thead className={headerClassName}>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`${headerCellClassName} ${
                    header.column.getSize() !== 150
                      ? getWidthClass(header.column.getSize())
                      : ""
                  }`}
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
        <tbody>
          {hasData ? (
            tableInstance.getRowModel().rows.map((row) => (
              <tr key={row.id} className={rowClassName}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={cellClassName}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableInstance.getAllColumns().length}
                className="text-center p-4"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export type TableWrapperInstance<T> = TableType<T>;
