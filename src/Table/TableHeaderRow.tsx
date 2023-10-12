import { FC, HTMLProps } from "react";
import cx from "classnames";
import React from 'react';

const TableHeaderRow: FC<HTMLProps<HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <tr
      {...props}
      className={cx(
        "border-b border-b-gray-300 dark:border-b-gray-600",
        className
      )}
    >
      {children}
    </tr>
  );
};

export default TableHeaderRow;
