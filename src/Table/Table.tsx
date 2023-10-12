import { TableOptions, useReactTable } from "@tanstack/react-table";
import cx from "classnames";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import TableCellLoader from "./TableCellLoader";
import TableHeaders from "./TableHeaders";
import TableHeadersSortable from "./TableHeadersSortable";
import TableLoadMore from "./TableLoadMore";
import TableRow from "./TableRow";
import TableRowExpandable from "./TableRowExpandable";
import React from 'react';

import { IScrollAreaProps } from "components/molecules/ScrollArea/ScrollArea";
import { toolkitCx } from "../../../constants";
import Loader from "../../atoms/Loader";
import Text, { ITextProps } from "../../atoms/Text/Text";
import ScrollArea from "../../molecules/ScrollArea";
import { ITableCellProps } from "./TableCell";

type TLoadMoreProps =
  | {
      isProcessingLoadMore: boolean;
      loadMoreLabel?: string;
      numberOfRows: number;
      onLoadMore(): void;
      showLoadMore: boolean;
      withLoadMore?: true;
      withStickyLoadMore?: boolean;
    }
  | {
      isProcessingLoadMore?: never;
      loadMoreLabel?: never;
      numberOfRows?: never;
      onLoadMore?: never;
      showLoadMore?: never;
      withLoadMore?: false;
      withStickyLoadMore?: never;
    };

type TExpandingProps<TData> =
  | {
      expandableContent: (rowData: TData) => ReactNode;
      expandableContentHeight?: number | ((rowData: TData) => number);
      isExpandable?: true;
      rowsState: { isExpanded: boolean }[];
    }
  | {
      expandableContent?: never;
      expandableContentHeight?: never;
      isExpandable?: false;
      rowsState?: never;
    };

export interface ITableRowOriginal {
  id?: string;
  isHighlighted?: boolean;
}

export type TTableProps<TData> = TLoadMoreProps &
  TExpandingProps<TData> & {
    bodyClassName?: string;
    className?: string;
    containerClassName?: string;
    emptyStateMessage?: ReactNode;
    headersClassName?: string;
    isLoading?: boolean;
    isLoadingNode?: ReactNode;
    isSortable?: boolean;
    onTableRowClick?: (rowData: TData, rowIndex: number) => void;
    rounded?: boolean;
    scrollAreaProps?: [];
    tableCellClassName?: string;
    tableOptions: TableOptions<TData>;
    tableRowClassName?: string;
    textAlignment?: ITableCellProps["textAlignment"];
    title?: string;
    titleProps?: Pick<ITextProps, "size" | "weight" | "className">;
    withBorders?: boolean;
    withLoader?: boolean;
    withStickyTableHeader?: boolean;
    wrapperClassName?: string;
  };

/**
 * Table component to display tabular data with optional features like
 * sorting, expandable rows, and load more functionality.
 *
 * @template TData
 * @component
 * @param {TTableProps<TData>} props - The props for the Table component.
 * @param {string} [props.bodyClassName] - The className for the table body.
 * @param {string} [props.className] - The className for the table itself.
 * @param {string} [props.containerClassName] - The className for the table container.
 * @param {React.ReactNode} [props.emptyStateMessage] - The message to display when there's no data available.
 * @param {(rowData: TData) => React.ReactNode} [props.expandableContent] - A function to render the expandable content for a row.
 * @param {number | ((rowData: TData) => number)} [props.expandableContentHeight] - The height of the expandable content, either a number or a function returning a number.
 * @param {string} [props.headersClassName] - The className for the table headers.
 * @param {boolean} [props.isExpandable] - Whether the table rows should be expandable or not.
 * @param {boolean} [props.isLoading] - Whether the table is in a loading state.
 * @param {boolean} props.isProcessingLoadMore - Whether the "load more" functionality is being processed.
 * @param {boolean} [props.isSortable] - Whether the table columns should be sortable.
 * @param {ReactNode} [props.isLoadingNode] - The label to display when the table is in a loading state.
 * @param {boolean} [props.rounded] - Whether the table should be rounded.
 * @param {string} [props.tableCellClassName] - The className for the table cell.
 * @param {string} [props.loadMoreLabel] - The label for the "load more" button.
 * @param {number} props.numberOfRows - The number of rows to display when using the "load more" functionality.
 * @param {() => void} props.onLoadMore - The function to call when the "load more" button is clicked.
 * @param {(rowData: TData, rowIndex: number) => void} [props.onTableRowClick] - The function to call when a table row is clicked (not used with expandable rows).
 * @param {{ isExpanded: boolean }[]} [props.rowsState] - The state of each row, indicating whether it is expanded or not (for expandable rows).
 * @param {IScrollAreaProps} props.scrollAreaProps - The props for the wrapping `<ScrollArea />` component.
 * @param {boolean} props.showLoadMore - Whether to show the "load more" button.
 * @param {TableOptions<TData>} props.tableOptions - The table options, including data, columns, and sorting information.
 * @param {string} [props.tableRowClassName] - The className for the table rows.
 * @param {ITableCellProps["textAlignment"]} [props.textAlignment] - The text alignment for the table cells.
 * @param {string} [props.title] - The title of the table.
 * @param {Pick<IHeadingProps, "size" | "weight" | "className">} [props.titleProps] - The props for the title heading.
 * @param {boolean} [props.withBorders] - Whether the table should have borders or not.
 * @param {boolean} [props.withLoader] - Whether the table should have a loader or not.
 * @param {boolean} [props.withLoadMore] - Whether the table should have the "load more" functionality or not.
 * @param {boolean} [props.withStickyTableHeader] - Whether the table should have a sticky table header or not.
 * @param {boolean} [props.wrapperClassName] - The `className` for the component wrapper.
 * @param {boolean} [props.withStickyLoadMore] - Whether the "load more" button should be sticky or not.
 * @returns {React.Element} A rendered Table component.
 */
function Table<T>({
  bodyClassName,
  className,
  containerClassName,
  emptyStateMessage = "No data available.",
  expandableContent,
  expandableContentHeight = 96,
  headersClassName,
  isExpandable = false,
  isLoading = false,
  isProcessingLoadMore,
  isSortable = false,
  isLoadingNode,
  loadMoreLabel = "Load more",
  numberOfRows,
  onLoadMore,
  onTableRowClick,
  rounded = false,
  rowsState = [],
  scrollAreaProps,
  showLoadMore,
  tableCellClassName,
  tableOptions,
  tableRowClassName,
  textAlignment = "default",
  title = "",
  titleProps,
  withBorders,
  withLoader = false,
  withLoadMore,
  withStickyLoadMore = false,
  withStickyTableHeader = false,
  wrapperClassName,
}: TTableProps<T>) {
  const table = useReactTable(tableOptions);
  const { getRowModel, getAllColumns } = table;
  const columns = getAllColumns();
  const { rows } = getRowModel();
  const renderedRows = useMemo(
    () => (withLoadMore ? rows.slice(0, numberOfRows) : rows),
    [numberOfRows, rows, withLoadMore]
  );
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const [titleContainerHeight, setTitleContainerHeight] = useState(0);

  const rowsContent = useMemo(
    () =>
      isLoading && !withLoader ? (
        <>
          {isLoadingNode && (
            <div
              className={cx(
                "absolute z-20 flex max-w-[75%] items-center justify-center rounded-lg text-center motion-safe:animate-pulse",
                toolkitCx.recipes.center.horizontal,
                toolkitCx.recipes.center.vertical,
                toolkitCx.layout.background.card,
                toolkitCx.layout.spacing.both.sm
              )}
            >
              {typeof isLoadingNode === "string" ? (
                <Text tag="p" size="xs">
                  {isLoadingNode}
                </Text>
              ) : (
                isLoadingNode
              )}
            </div>
          )}
          {[...Array(3).keys()].map((item) => (
            <tr
              className={cx({
                "opacity-50": Boolean(isLoadingNode),
              })}
              key={item}
            >
              {[...Array(columns.length).keys()].map((colum) => (
                <TableCellLoader key={colum} />
              ))}
            </tr>
          ))}
        </>
      ) : (
        renderedRows.map((row) => {
          if (isExpandable) {
            const { isExpanded = false } = rowsState[row.index] || {};
            return (
              <TableRowExpandable
                className={tableRowClassName}
                expandableContent={expandableContent?.(row.original)}
                expandableContentHeight={
                  typeof expandableContentHeight === "number"
                    ? expandableContentHeight
                    : expandableContentHeight(row.original)
                }
                isExpanded={isExpanded}
                key={row.id}
                row={row}
                textAlignment={textAlignment}
                {...(Boolean(onTableRowClick) && {
                  onTableRowClick: () =>
                    onTableRowClick?.(row.original, row.index),
                })}
              />
            );
          }
          return (
            <TableRow
              className={tableRowClassName}
              key={row.id}
              row={row}
              tableCellClassName={tableCellClassName}
              textAlignment={textAlignment}
              {...(Boolean(onTableRowClick) && {
                onTableRowClick: () =>
                  onTableRowClick?.(row.original, row.index),
              })}
            />
          );
        })
      ),
    [
      columns.length,
      expandableContent,
      expandableContentHeight,
      isExpandable,
      isLoading,
      renderedRows,
      rowsState,
      textAlignment,
      withLoader,
    ]
  );

  const renderEmptyState = () => {
    if (rows.length || (isLoading && !withLoader)) return null;

    return (
      <div className="flex h-full items-center justify-center py-10 text-center">
        {!rows.length && emptyStateMessage}
      </div>
    );
  };

  useEffect(() => {
    if (withStickyTableHeader && titleContainerRef?.current && title) {
      setTitleContainerHeight(titleContainerRef.current.clientHeight ?? 0);
    }
  }, [titleContainerRef?.current, title, withStickyTableHeader]);

  return (
    <div
      className={cx(wrapperClassName, {
        [`overflow-hidden rounded-lg ${toolkitCx.layout.border.default} ${toolkitCx.layout.border.weight.default}`]:
          rounded,
        [`${toolkitCx.layout.border.default} ${toolkitCx.layout.border.weight.default}`]:
          withBorders,
      })}
    >
      <ScrollArea
        {...scrollAreaProps}
        className={scrollAreaProps?.className}
        type="auto"
        primitiveProps={{
          ...scrollAreaProps?.primitiveProps,
          viewport: {
            ...scrollAreaProps?.primitiveProps?.viewport,
            className: cx(scrollAreaProps?.primitiveProps?.viewport?.className),
          },
          scrollbar: {
            ...scrollAreaProps?.primitiveProps?.scrollbar,
            className: cx(
              scrollAreaProps?.primitiveProps?.scrollbar?.className,
              {
                "z-10": withStickyTableHeader,
              }
            ),
            orientation: "horizontal",
          },
        }}
      >
        <section
          aria-label={title}
          role="contentinfo"
          className={cx(
            "grid w-full grid-rows-[max-content_1fr]",
            {
              "grid-rows-[max-content_max-content_1fr]": Boolean(title),
            },
            containerClassName
          )}
        >
          {title && (
            <Text
              ref={titleContainerRef}
              size={titleProps?.size ?? "2xl"}
              weight={titleProps?.weight ?? "bold"}
              tag="h1"
              {...titleProps}
              className={cx(
                "flex items-center justify-between",
                {
                  "sticky top-0 z-10": withStickyTableHeader,
                },
                toolkitCx.layout.spacing.vertical.md,
                toolkitCx.layout.spacing.left.md,
                toolkitCx.layout.spacing.right.xl,
                titleProps?.className
              )}
            >
              {title}
              {isLoading && withLoader && <Loader size="small" />}
            </Text>
          )}

          <table
            className={cx(
              "w-full border-separate",
              toolkitCx.layout.text.default,
              className
            )}
            style={{
              borderSpacing: 0,
            }}
          >
            {isSortable ? (
              <TableHeadersSortable
                className={cx(headersClassName, {
                  "sticky z-10": withStickyTableHeader,
                })}
                headerGroups={table.getHeaderGroups()}
                tableCellClassName={cx(tableCellClassName, {
                  "border-t border-t-gray-300 dark:border-t-gray-600": title,
                })}
                textAlignment={textAlignment}
                style={{
                  top: `${titleContainerHeight}px`,
                }}
              />
            ) : (
              <TableHeaders
                className={cx(headersClassName, {
                  "sticky z-10": withStickyTableHeader,
                  "top-0": withStickyTableHeader && !title,
                })}
                headerGroups={table.getHeaderGroups()}
                tableCellClassName={cx(tableCellClassName, {
                  "border-t border-t-gray-300 dark:border-t-gray-600": title,
                })}
                textAlignment={textAlignment}
                style={{
                  top: `${titleContainerHeight}px`,
                }}
              />
            )}

            <tbody className={cx("relative", bodyClassName)}>
              {rowsContent}
            </tbody>
            {showLoadMore && (
              <TableLoadMore
                colSpan={columns.length}
                isLoading={isProcessingLoadMore}
                label={loadMoreLabel}
                onLoadMore={onLoadMore}
                withStickyLoadMore={withStickyLoadMore}
              />
            )}
          </table>
          {renderEmptyState()}
        </section>
      </ScrollArea>
    </div>
  );
}

export default Table;
