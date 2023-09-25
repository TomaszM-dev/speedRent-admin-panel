"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type RateColumn = {
  id: string;
  value: string;

  createdAt: string;
};

export const columns: ColumnDef<RateColumn>[] = [
  {
    accessorKey: "value",
    header: "Value",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
