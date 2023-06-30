import React, { FC, ChangeEvent } from "react";
import Select, { components } from "react-select";

import styles from "./dropdown.module.scss";

const NoOptionsMessage = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="custom-css-class">Text</span>
    </components.NoOptionsMessage>
  );
};

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  isMulti?: boolean;
  options?: Option[];
  className?: string;
  label?: string;
  name?: string;
  defaultValue?: Option | Option[];
  handleChange?: any;
  value?: Option | Option[] | null;
  error?: any;
}

const MultiSelect: FC<MultiSelectProps> = ({
  isMulti,
  options = [],
  className = "",
  label,
  name,
  defaultValue,
  handleChange,
  value,
  error,
}) => {
  const style = {
    control: (base: any) => ({
      ...base,
      boxShadow: "none",
      minHeight: "45px",
      border: "1px solid",
      borderColor: "rgba(51, 51, 51, 0.2) !important",
      fontFamily: "Open Sans",
      padding: "0px 4px",
      borderRadius: "8px",
      maxHeight: "140px",
      overflowY: "scroll",
      textAlign: "left",
      minWidth: "200px",
      textTransform: "capitalize",
      letterSpacing: "0.5px",
      "&:hover": {
        borderColor: "#e7ecef !important",
      },
    }),
    option: (base: any) => ({
      ...base,
      padding: "8px 16px",
      backgroundColor: "#fff",
      fontSize: "14px",
      color: "#051730 !important",
      textTransform: "capitalize",
      textAlign: "left",
      "&:hover": {
        backgroundColor: "#DCDEE0",
      },
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "8px",
      zIndex: 2,
    }),
    multiValue: (base: any) => ({
      ...base,
      borderRadius: "8px",
      padding: "0px 8px",
      fontSize: "14px",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      ":hover": {
        color: "#A3A4A8",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      borderRadius: "8px",
      padding: "0px 2px",
      fontSize: "14px",
    }),
    placeholder: (base: any) => ({
      ...base,
      padding: "0px 6px",
      fontSize: "14px",
    }),
  };

  return (
    <div className="multiselect-group">
      {label && <label className={styles.label}>{label}</label>}
      <Select
        components={{ NoOptionsMessage }}
        isSearchable={false}
        styles={style}
        defaultValue={defaultValue}
        className={className}
        name={name}
        isMulti={isMulti}
        options={options}
        onChange={handleChange}
        value={value}
        // menuIsOpen
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default MultiSelect;
