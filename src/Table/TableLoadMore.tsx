import cx from "classnames";
import React from "react";

import { toolkitCx } from "../../../constants";
import Loader from "../../atoms/Loader";
import Text from "../../atoms/Text";

interface ITableLoadMoreProps {
  colSpan: number;
  isLoading?: boolean;
  label: string;
  onLoadMore?(): void;
  withStickyLoadMore?: boolean;
}

const TableLoadMore: React.FC<ITableLoadMoreProps> = ({
  colSpan,
  isLoading,
  label,
  onLoadMore,
  withStickyLoadMore,
}) => {
  return (
    <tfoot
      role="rowgroup"
      className={cx(
        "bottom-0 z-10 h-[3.5rem]",
        toolkitCx.layout.background.default,
        { sticky: withStickyLoadMore }
      )}
    >
      <tr role="row" {...(!isLoading && { onClick: () => onLoadMore?.() })}>
        <th
          tabIndex={-1}
          colSpan={colSpan}
          role="columnheader"
          className={cx(
            "border-t border-t-gray-300 dark:border-t-gray-600",
            "select-none",
            toolkitCx.layout.spacing.vertical.md,
            toolkitCx.layout.spacing.horizontal.lg,
            toolkitCx.layout.transition.colors,
            {
              "cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700":
                !isLoading,
            }
          )}
        >
          <div className="flex w-full justify-center text-center">
            {!isLoading && (
              <Text size="sm" tag="span">
                {label}
              </Text>
            )}
            {isLoading && <Loader size="small" />}
          </div>
        </th>
      </tr>
    </tfoot>
  );
};

export default TableLoadMore;
