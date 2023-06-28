import { FC, useMemo } from "react";

import { useAppContext } from "@contexts/AppContext";
import styles from "./table.module.scss";

interface TableProps {
  columns: string[];
  data: {
    name?: string;
    email?: string;
    brand?: string;
    favorite_cars?: string[];
    [key: string]: any;
  }[];
  setEdit: (values: any) => void;
  isEdit: boolean;
}

const Table: FC<TableProps> = ({ columns, data, setEdit }) => {
  const { darkMode } = useAppContext();
  const orderedData = useMemo(
    () =>
      data.sort(
        (a, b) =>
          (a.brand ?? "").localeCompare(b.brand ?? "") ||
          (a.name ?? "").localeCompare(b.name ?? "")
      ),
    [data]
  );

  return (
    <div className={styles.wrapper}>
      <table
        className={`${styles.table} ${darkMode ? styles.dark : styles.light}`}
        data-testid="table"
      >
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th className={styles.th} key={index}>
                {column.replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderedData.map((row, index) => (
            <tr key={index} className={styles.tr}>
              {columns.map((column, index) => {
                const isList = typeof row[column] === "object";
                const isLast = column === " ";

                return (
                  <td className={`${styles.td}`} key={index}>
                    {isLast && (
                      <span
                        onClick={() => setEdit({ values: row, edit: true })}
                        className={styles.edit}
                      >
                        Edit
                      </span>
                    )}
                    {!isList ? (
                      <div>{row[column]}</div>
                    ) : (
                      <ul>
                        {row[column].map((el: string, i: number) => (
                          <li key={`${el}-${i}`}>{el}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
