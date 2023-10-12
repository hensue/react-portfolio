import { flexRender, HeaderGroup } from "@tanstack/react-table";
import React from 'react';

import cx from "classnames";
import { HTMLAttributes } from "react";

import TableCell, { ITableCellProps } from "./TableCell";
import TableHeaderRow from "./TableHeaderRow";
import TableHeaderTitle from "./TableHeaderTitle";

interface ITableHeadersSortableProps<DataType>
  extends Pick<ITableCellProps, "textAlignment">,
    HTMLAttributes<HTMLTableSectionElement> {
  headerGroups: HeaderGroup<DataType>[];
  tableCellClassName?: string;
}

function TableHeadersSortable<T>({
  className,
  headerGroups,
  style,
  tableCellClassName,
  textAlignment,
}: ITableHeadersSortableProps<T>) {
  return (
    <thead className={className} style={style}>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableCell
                className={cx(
                  "border-b border-b-gray-300 dark:border-b-gray-600",
                  tableCellClassName
                )}
                colSpan={header.colSpan}
                key={header.id}
                tag="th"
                textAlignment={textAlignment}
              >
                {header.isPlaceholder ? null : (
                  <TableHeaderTitle
                    isSorted={header.column.getIsSorted()}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHeaderTitle>
                )}
              </TableCell>
            );
          })}
        </TableHeaderRow>
      ))}
    </thead>
  );
}

export default TableHeadersSortable;
