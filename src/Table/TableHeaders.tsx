import { flexRender, HeaderGroup } from "@tanstack/react-table";
import cx from "classnames";
import React from 'react';

import { HTMLAttributes } from "react";
import TableCell, { ITableCellProps } from "./TableCell";
import TableHeaderRow from "./TableHeaderRow";
import TableHeaderTitle from "./TableHeaderTitle";

interface ITableHeadersProps<DataType>
  extends Pick<ITableCellProps, "textAlignment">,
    HTMLAttributes<HTMLTableSectionElement> {
  headerGroups: HeaderGroup<DataType>[];
  tableCellClassName?: string;
}

function TableHeaders<T>({
  className,
  headerGroups,
  style,
  tableCellClassName,
  textAlignment,
}: ITableHeadersProps<T>) {
  return (
    <thead className={className} style={style}>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
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
              <TableHeaderTitle>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHeaderTitle>
            </TableCell>
          ))}
        </TableHeaderRow>
      ))}
    </thead>
  );
}

export default TableHeaders;
