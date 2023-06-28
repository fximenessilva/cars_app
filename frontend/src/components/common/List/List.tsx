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
  setEdit: (values: any) => void;
  isEdit: boolean;
}

const List: FC<ListProps> = ({ list, columns, searchTerm, setEdit, isEdit }) =>
  list.length ? (
    <Table columns={columns} data={list} setEdit={setEdit} isEdit={isEdit} />
  ) : (
    <NotFoundData typeOfData="cars" searchTerm={searchTerm} />
  );

export default List;
