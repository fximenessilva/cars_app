import { useState, lazy, useMemo, ChangeEvent, FC } from "react";

import Table from "../Table";
import NotFoundData from "../NotFoundData";

interface ListProps {
  list: {
    name?: string;
    email?: string;
    favorite_cars?: string[];
    id?: number;
    brand?: string;
  }[];
  columns: string[];
  searchTerm: string;
}

const List: FC<ListProps> = ({ list, columns, searchTerm }) =>
  list.length ? (
    <Table columns={columns} data={list} />
  ) : (
    <NotFoundData typeOfData="cars" searchTerm={searchTerm} />
  );

export default List;
