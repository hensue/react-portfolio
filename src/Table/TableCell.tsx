import { FC, HTMLProps } from "react";
import cx from "classnames";
import { toolkitCx } from "../../../constants";
import React from 'react';

export interface ITableCellProps extends HTMLProps<HTMLTableCellElement> {
  tag: "th" | "td";
  textAlignment?: "default" | "left" | "right" | "center";
}

const TableCell: FC<ITableCellProps> = ({
  className,
  children,
  tag: Tag,
  textAlignment = "default",
  ...props
}) => {
  return (
    <Tag
      {...props}
      className={cx(
        "whitespace-nowrap",
        {
          "text-right first-of-type:text-left": textAlignment === "default",
          "text-right": textAlignment === "right",
          "text-left": textAlignment === "left",
          "text-center": textAlignment === "center",
        },
        toolkitCx.layout.spacing.horizontal.md,
        toolkitCx.layout.spacing.vertical.md,
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default TableCell;
