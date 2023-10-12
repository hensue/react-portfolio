import { ReactNode } from "react";
import { flexRender, Row } from "@tanstack/react-table";
import cx from "classnames";
import React from 'react';

import TableCell, { ITableCellProps } from "./TableCell";

import { toolkitCx } from "../../../constants";
import { ITableRowOriginal } from "./Table";

interface ITableRowExpandibleProps<DataType>
  extends Pick<ITableCellProps, "textAlignment"> {
  className?: string;
  expandableContent: ReactNode;
  expandableContentHeight: number;
  isExpanded: boolean;
  onTableRowClick?: () => void;
  row: Row<DataType>;
}

function TableRowExpandible<T>({
  className,
  expandableContent,
  expandableContentHeight,
  isExpanded,
  onTableRowClick,
  row,
  textAlignment,
}: ITableRowExpandibleProps<T>) {
  return (
    <tr
      className={cx(
        "relative",
        toolkitCx.layout.background.hoverable,
        toolkitCx.layout.transition.colors,
        className,
        {
          "!bg-primary/20 dark:!bg-primary/30": (
            row.original as ITableRowOriginal
          ).isHighlighted,
        }
      )}
      id={(row.original as ITableRowOriginal).id}
    >
      {row.getVisibleCells().map((cell, i) => (
        <TableCell
          className={cx(toolkitCx.layout.transition.all)}
          key={cell.id}
          style={{
            paddingBottom: isExpanded
              ? `${16 + expandableContentHeight}px`
              : `${16}px`,
          }}
          tag="td"
          textAlignment={textAlignment}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
          {i === 0 && (
            <>
              {onTableRowClick && (
                <div
                  className={cx("absolute inset-0", {
                    "cursor-pointer": Boolean(onTableRowClick),
                  })}
                  onClick={onTableRowClick}
                />
              )}
              <div
                className={cx(
                  "absolute left-0 right-0 bottom-0 overflow-hidden",
                  toolkitCx.layout.background.card,
                  toolkitCx.layout.transition.all
                )}
                style={{
                  height: isExpanded ? `${expandableContentHeight}px` : 0,
                }}
              >
                {expandableContent}
              </div>
            </>
          )}
        </TableCell>
      ))}
    </tr>
  );
}

export default TableRowExpandible;
