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
          data-error={errorMessage ? "true" : undefined}
          onChange={changeHandler}
          name={name}
          value={value}
          disabled={disabled}
        ></textarea>
      ) : (
        <input
          type={type}
          className={classes.input}
          placeholder={placeholder}
          data-error={errorMessage ? "true" : undefined}
          onChange={changeHandler}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
        />
      )}
      {errorMessage && <div className={classes.error}>{errorMessage}</div>}
    </div>
  );
};

export default TextField;
