import { ComponentMeta } from "@storybook/react";
// import { useExpandableRows } from "@project/hooks";
import React from 'react';

import {
  ColumnDef,
  SortingState,
  TableOptions,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

// import { toolkitCx } from "../../../constants/classnames";
// import Button from "../../atoms/Button";
// import Text from "../../atoms/Text";
import Table from "./Table";
import { ICols, columnsData, data } from "./mocks";

const Story = {
  title: "organisms/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

export const Basic = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return <Table tableOptions={tableOptions} withBorders />;
};

export const StickyHeader = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data: new Array(10).fill(data).flat(),
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      rounded
      scrollAreaProps={{
        primitiveProps: {
          scrollbar: {
            className: "rounded-tr-lg rounded-br-lg",
          },
          viewport: {
            className: "max-h-96 max-w-[550px] rounded-lg",
          },
        },
      }}
      headersClassName={''}
      tableOptions={tableOptions}
      title="With Sticky Header"
      titleProps={{
        size: "2xl",
        className:'',
        weight: ''
      }}
      withBorders 
      withStickyTableHeader
    />
  );
};

export const WithStickyLoadMore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfRows, setNumberOfRows] = useState(5);
  const columns = useMemo(() => columnsData, []);
  const tableData = new Array(10).fill(data).flat();
  const tableOptions: TableOptions<ICols> = {
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  const handleLoading = () =>
    setTimeout(() => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setNumberOfRows(numberOfRows + 1);
      }, 3000);
    });

  return (
    <Table
      scrollAreaProps={{
        primitiveProps: {
          scrollbar: {
            className: "rounded-tr-lg rounded-br-lg",
          },
          viewport: {
            className: "max-h-96 max-w-[550px] rounded-lg",
          },
        },
      }}
      isProcessingLoadMore={isLoading}
      loadMoreLabel="Load more"
      numberOfRows={numberOfRows}
      onLoadMore={handleLoading}
      showLoadMore={numberOfRows < tableData.length}
      tableOptions={tableOptions}
      title="Title"
      withBorders
      withLoadMore
      withStickyLoadMore
    />
  );
};

export const WithoutBorder = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return <Table withBorders={false} tableOptions={tableOptions} />;
};

export const Sorting = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  };

  return <Table isSortable tableOptions={tableOptions} withBorders />;
};

export const Expanding = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  // const { rowsState, toggleRow } = useExpandableRows({
  //   numberOfRows: data.length,
  // });

  const columns = useMemo<ColumnDef<ICols>[]>(
    () => [
      {
        header: "Col 1",
        accessorKey: "col1",
      },
      {
        header: "Col 2",
        accessorKey: "col2",
      },
      {
        header: "Col 3",
        accessorKey: "col3",
      },
      {
        id: "expander",
        header: "",
        cell: ({ row: { index } }) => {
          const  isExpanded  = true;
          return (
            <button className="m-auto">
              {isExpanded ? "Less" : "More"}
            </button>
          );
        },
      },
    ],
    []
  );

  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  };

  return (
    <Table
      tableOptions={tableOptions}
      expandableContentHeight={120}
      isExpandable
      isSortable
      rowsState={[]}
      withBorders
      expandableContent={(row) => {
        const { data1, data2 } = row;
        return (
          <div
            className={
              "bg-white-200 flex h-full items-center justify-between px-8 dark:bg-gray-600 dark:text-gray-200"
            }
          >
            <div>{data1}</div>
            <div>{data2}</div>
          </div>
        );
      }}
    />
  );
};

export const ExpandingOnClickingRow = () => {
  // const { rowsState, toggleRow } = useExpandableRows({
  //   numberOfRows: data.length,
  // });

  const columns = useMemo<ColumnDef<ICols>[]>(
    () => [
      {
        header: "Col 1",
        accessorKey: "col1",
      },
      {
        header: "Col 2",
        accessorKey: "col2",
      },
      {
        header: "Col 3",
        accessorKey: "col3",
      },
    ],
    []
  );

  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      tableOptions={tableOptions}
      expandableContentHeight={120}
      isExpandable
      rowsState={[]}
      withBorders
      onTableRowClick={(row) => {
        const index = data.findIndex(({ id }) => id === row.id);
        // toggleRow(index);
      }}
      expandableContent={(row) => {
        const { data1, data2 } = row;
        return (
          <div
            className={
              "bg-white-200 flex h-full items-center justify-between px-8 dark:bg-gray-600 dark:text-gray-200"
            }
          >
            <div>{data1}</div>
            <div>{data2}</div>
          </div>
        );
      }}
    />
  );
};

export const ExpandingWithCustomHeight = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  // const { rowsState, toggleRow } = useExpandableRows({
  //   numberOfRows: data.length,
  // });

  const columns = useMemo<ColumnDef<ICols>[]>(
    () => [
      {
        header: "Col 1",
        accessorKey: "col1",
      },
      {
        header: "Col 2",
        accessorKey: "col2",
      },
      {
        header: "Col 3",
        accessorKey: "col3",
      },
      {
        id: "expander",
        header: "",
        cell: ({ row: { index } }) => {
          const  isExpanded  = true;
          return (
            <button>
              {isExpanded ? "Less" : "More"}
            </button>
          );
        },
      },
    ],
    []
  );

  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  };

  return (
    <Table
      tableOptions={tableOptions}
      expandableContentHeight={(row) => row.contentHeight}
      isExpandable
      isSortable
      rowsState={[]}
      withBorders
      expandableContent={(row) => {
        const { data1, data2 } = row;
        return (
          <div
            className={
              "bg-white-200 flex h-full items-center justify-between px-8 dark:bg-gray-600 dark:text-gray-200"
            }
          >
            <div>{data1}</div>
            <div>{data2}</div>
          </div>
        );
      }}
    />
  );
};

export const Empty = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      emptyStateMessage={<p >No data.</p>}
      tableOptions={tableOptions}
      withBorders
    />
  );
};

export const Loading = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <div className="w-96">
      <Table tableOptions={tableOptions} isLoading withBorders />
    </div>
  );
};

export const WithIsLoadingNode = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <div className="w-96">
      <Table
        tableOptions={tableOptions}
        isLoading
        isLoadingNode="Processing your Yield Farming Order…"
        withBorders
      />
    </div>
  );
};

export const WithTitle = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return <Table tableOptions={tableOptions} title="Title" withBorders />;
};

export const WithLoader = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      emptyStateMessage={<p>No data.</p>}
      isLoading
      tableOptions={tableOptions}
      title="Title"
      withBorders
      withLoader
    />
  );
};

export const WithLoadMore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfRows, setNumberOfRows] = useState(1);
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  const handleLoading = () =>
    setTimeout(() => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setNumberOfRows(numberOfRows + 1);
      }, 3000);
    });

  return (
    <div className="flex w-full flex-col gap-4">
      <Table
        isProcessingLoadMore={isLoading}
        numberOfRows={numberOfRows}
        loadMoreLabel="Load more"
        onLoadMore={handleLoading}
        showLoadMore={numberOfRows < data.length}
        tableOptions={tableOptions}
        title="Title"
        withBorders
        withLoadMore
      />
      {numberOfRows === data.length && (
        <button >
          reset table
        </button>
      )}
    </div>
  );
};

export const WithTableRowClick = () => {
  const columns = useMemo(() => columnsData, []);
  const tableOptions: TableOptions<ICols> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  return (
    <Table
      tableOptions={tableOptions}
      title="Title"
      onTableRowClick={(row) => {
        console.log("row > ", row);
      }}
      withBorders
    />
  );
};

export default Story;
