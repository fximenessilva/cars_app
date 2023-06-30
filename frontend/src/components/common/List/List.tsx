import { useState, lazy, useMemo, ChangeEvent, FC } from "react";

import Table from "../Table";
import NotFoundData from "../NotFoundData";

interface ListProps {
  list: {
    name?: string;
    email?: string;
    favorite_cars?: any[];
    id?: number;
    brand?: string;
  }[];
  columns: string[];
  searchTerm: string;
  setEdit: (values: any) => void;
  isEdit: boolean;
  typeOfData: string;
  user?: any;
}

const List: FC<ListProps> = ({
  list,
  columns,
  searchTerm,
  setEdit,
  isEdit,
  typeOfData,
  user,
}) =>
  list.length ? (
    <Table
      columns={columns}
      data={list}
      typeOfData={typeOfData}
      setEdit={setEdit}
      isEdit={isEdit}
      user={user}
    />
  ) : (
    <NotFoundData typeOfData={typeOfData} searchTerm={searchTerm} />
  );

export default List;
