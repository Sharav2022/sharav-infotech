import { useState } from "react";
import { handleValidation } from "../../../lib/common";
import classes from "./textfield.module.css";

const TextField = ({
  type = "text",
  required = false,
  label,
  placeholder,
  errorMessage,
  width = "100%",
  inputClass = "",
  name = "",
  value = "",
  disabled = false,
  changeHandler = () => {},
}) => {
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    changeHandler(event);
    setIsError(!handleValidation(event));
  };

  return (
    <div
      className={`${classes.container} ${inputClass}`}
      style={{ width: width }}
    >
      {label && <label className={classes.label}>{label}</label>}
      {type === "textarea" ? (
        <textarea
          className={classes.input}
          required={required}
          placeholder={placeholder}
          data-error={isError ? "true" : undefined}
          onChange={handleChange}
          name={name}
          value={value}
          disabled={disabled}
        ></textarea>
      ) : (
        <input
          type={type}
          className={classes.input}
          placeholder={placeholder}
          data-error={isError ? "true" : undefined}
          onChange={handleChange}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
        />
      )}
      {isError && <div className={classes.error}>{errorMessage}</div>}
    </div>
  );
};

export default TextField;
