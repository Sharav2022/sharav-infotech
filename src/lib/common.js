export const isEnabled = (details) => {
  let ret = false;
  try {
    ret = Object.values(details).every((val) => val && val !== "");
    ret =
      ret &&
      Object.keys(details).every((key) => {
        if (key) {
          const regexp = new RegExp(ValidationPatterns[key] ?? /[\S\s]+[\S]*/);
          return regexp.test(details[key].trim());
        } else {
          return true;
        }
      });
  } catch (error) {}

  return ret;
};

export const ValidationPatterns = {
  firstName: /^[a-zA-Z ]{2,30}$/i,
  lastName: /^[a-zA-Z ]{2,30}$/i,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
  phone: /^[0-9]{8,10}$/i,
  message: /^(.){0,1000}$/i,
};

export const handleValidation = (event, isEmptyCheck = true) => {
  const name = event.target.name;
  const value = event.target.value;
  if (!isEmptyCheck && !value) {
    // here if we don't want to perform validation on empty values, just return true
    return true;
  }
  const regexp = new RegExp(ValidationPatterns[name] ?? /[\S\s]+[\S]*/);
  return regexp.test(value?.trim());
};
