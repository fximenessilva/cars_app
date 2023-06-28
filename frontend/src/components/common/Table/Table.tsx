import { FC } from "react";

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
}

const Table: FC<TableProps> = ({ columns, data }) => {
  const { darkMode } = useAppContext();
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
          {data.map((row, index) => (
            <tr key={index} className={styles.tr}>
              {columns.map((column, index) => {
                const isList = typeof row[column] === "object";
                const isLast = column === " ";

                return (
                  <td className={`${styles.td}`} key={index}>
                    {isLast && <span className={styles.edit}>Edit</span>}
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
