import { FC, useMemo } from "react";

import { useAppContext } from "@contexts/AppContext";
import { useUsersContext } from "@contexts/UsersContext";
import { useCarsContext } from "@contexts/CarsContext";
import styles from "./table.module.scss";

interface TableProps {
  columns: string[];
  data: {
    name?: string;
    email?: string;
    brand?: string;
    favorite_cars?: any[];
    [key: string]: any;
  }[];
  setEdit: (values: any) => void;
  isEdit: boolean;
  typeOfData: string;
  user?: any;
}

const Table: FC<TableProps> = ({
  columns,
  data,
  setEdit,
  typeOfData,
  user,
}) => {
  const { darkMode } = useAppContext();

  const { setFavorite } = useUsersContext();
  const { deleteCar } = useCarsContext();

  const isCarsTable = typeOfData === "car";

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
                    {isLast && user?.id && (
                      <div className={styles.actions}>
                        <span
                          onClick={() =>
                            setEdit({
                              values: {
                                ...row,
                                favorite_cars: row.favorite_cars?.map(
                                  ({ id, name, brand }) => ({
                                    value: id,
                                    label: `${brand} ${name}`,
                                  })
                                ),
                              },
                              edit: true,
                            })
                          }
                          className={styles.edit}
                        >
                          Edit
                        </span>
                        {isCarsTable && (
                          <>
                            <span
                              onClick={() =>
                                setFavorite(
                                  row.id,
                                  user,
                                  user.favorite_cars?.includes(row.id)
                                )
                              }
                              className={styles.favorite}
                            >
                              <i
                                className={`fa-${
                                  user.favorite_cars?.includes(row.id)
                                    ? "solid"
                                    : "regular"
                                } fa-star`}
                              />
                            </span>
                            <span
                              onClick={() => deleteCar(row.id)}
                              className={styles.delete}
                            >
                              <i className="fa-solid fa-trash" />
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    {!isList ? (
                      <div>{row[column]}</div>
                    ) : (
                      <ul>
                        {row[column].map(
                          (
                            el: { brand: string; name: string; id: number },
                            i: number
                          ) => (
                            <li className={styles.car} key={el.id}>
                              {el.brand} {el.name}
                            </li>
                          )
                        )}
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
