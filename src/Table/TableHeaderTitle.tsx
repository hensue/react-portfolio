import { FC, ReactNode } from "react";
import cx from "classnames";
import { TriangleDownIcon, TriangleUpIcon } from "../../../icons";
import { SortDirection } from "@tanstack/react-table";
import React from 'react';

interface ITableHeaderTitleProps {
  children: ReactNode;
  className?: string;
  isSorted?: false | SortDirection;
  onClick?: (event: unknown) => void;
}

const TableHeaderTitle: FC<ITableHeaderTitleProps> = ({
  children,
  className,
  isSorted,
  onClick,
}) => {
  return (
    <span
      className={cx(
        "relative select-none",
        { "cursor-pointer select-none": typeof isSorted !== "undefined" },
        className
      )}
      onClick={onClick}
    >
      {children}
      {isSorted && (
        <span className="absolute bottom-1/2 -right-4 translate-y-1/2">
          {isSorted === "desc" ? <TriangleDownIcon /> : <TriangleUpIcon />}
        </span>
      )}
    </span>
  );
};

export default TableHeaderTitle;
