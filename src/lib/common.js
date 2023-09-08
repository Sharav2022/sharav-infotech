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
