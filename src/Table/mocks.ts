import { ColumnDef } from "@tanstack/react-table";

export interface ICols {
  col1: string;
  col2: string;
  col3: string;
  contentHeight: number;
  data1: string;
  data2: string;
  id: string;
  isHighlighted?: boolean;
}

export const data = [
  {
    col1: "Lorem",
    col2: "ipsum",
    col3: "dolor",
    contentHeight: 120,
    data1: "perspiciatis",
    data2: "reprehenderit",
    id: "foo",
    isHighlighted: true,
  },
  {
    col1: "sit",
    col2: "amet",
    col3: "consectetur",
    contentHeight: 200,
    data1: "molestiae",
    data2: "reiciendis",
    id: "bar",
  },
  {
    col1: "adipisicing",
    col2: "Dolorum",
    col3: "elit",
    contentHeight: 120,
    data1: "deleniti",
    data2: "consectetur",
    id: "foobar",
  },
];

export const columnsData: ColumnDef<ICols>[] = [
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
];
