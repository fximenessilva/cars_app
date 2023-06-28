import { FC, ChangeEvent } from "react";

import TextInput from "../Form/TextInput";
import Dropdown from "../Form/Dropdown";
import styles from "./pageHead.module.scss";

interface PageHeadProps {
  title: string;
  onClick?: () => void;
  onTextChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  textValue: string;
  typeOfData: string;
  dropdownOptions: { value: number; label: string }[];
  dropdownHandler: (event: ChangeEvent) => void;
}

const PageHead: FC<PageHeadProps> = ({
  title,
  onClick,
  onTextChange,
  textValue,
  typeOfData,
  dropdownOptions,
  dropdownHandler,
}) => {
  const isCarsPage = typeOfData === "cars";
  return (
    <div className={styles["page-head-wrapper"]}>
      <h1 className={styles["page-ttl"]}>{title}</h1>
      <div className={styles["bottom-row"]}>
        <div className={styles.filters}>
          <TextInput
            placeholder={`Search ${typeOfData}...`}
            search
            onChange={onTextChange}
            value={textValue}
          />
          {isCarsPage && (
            <Dropdown
              options={dropdownOptions}
              handleChange={dropdownHandler}
            />
          )}
        </div>

        <i
          onClick={onClick}
          className={`fa-solid fa-plus add-icon ${styles["add-icon"]}`}
        />
      </div>
    </div>
  );
};

export default PageHead;
