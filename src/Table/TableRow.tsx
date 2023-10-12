import { flexRender, Row } from "@tanstack/react-table";
import cx from "classnames";
import React from 'react';

import TableCell, { ITableCellProps } from "./TableCell";

import { toolkitCx } from "../../../constants";
import { ITableRowOriginal } from "./Table";

interface ITableRowProps<DataType>
  extends Pick<ITableCellProps, "textAlignment"> {
  className?: string;
  onTableRowClick?: () => void;
  row: Row<DataType>;
  tableCellClassName?: string;
}

function TableRow<T>({
  className,
  onTableRowClick,
  row,
  tableCellClassName,
  textAlignment,
}: ITableRowProps<T>) {
  return (
    <tr
      className={cx(
        toolkitCx.layout.background.hoverable,
        toolkitCx.layout.transition.colors,
        className,
        {
          "!bg-primary/20 dark:!bg-primary/30": (
            row.original as ITableRowOriginal
          ).isHighlighted,
          "cursor-pointer": Boolean(onTableRowClick),
        }
      )}
      id={(row.original as ITableRowOriginal).id}
      onClick={onTableRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          className={tableCellClassName}
          key={cell.id}
          tag="td"
          textAlignment={textAlignment}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </tr>
  );
}

export default TableRow;
