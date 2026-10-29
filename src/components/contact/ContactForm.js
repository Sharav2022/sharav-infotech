import { useState } from "react";
import {
  CONTACT_FIELDS,
  EMPTY_CONTACT,
  HONEYPOT_FIELD,
  INTEREST_OPTIONS,
  validateContact,
  validateContactField,
} from "../../lib/contact";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import classes from "./ContactForm.module.css";

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const update = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value.trim()) }));
    }
  };

  const blur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value.trim()) }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const trimmed = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()]));
    const found = validateContact(trimmed);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(CONTACT_FIELDS).map((k) => [k, true])));

    const firstInvalid = Object.keys(CONTACT_FIELDS).find((key) => found[key]);
    if (firstInvalid) {
      form.elements[firstInvalid]?.focus();
      return;
    }

    setStatus({ state: "sending", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...trimmed, [HONEYPOT_FIELD]: form.elements[HONEYPOT_FIELD].value }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || "Something went wrong.");
      }
      setValues(EMPTY_CONTACT);
      setTouched({});
      setStatus({ state: "sent", message: "" });
    } catch (error) {
      setStatus({ state: "error", message: error.message });
    }
  };

  if (status.state === "sent") {
    return (
      <div className={classes.success} role="status" tabIndex={-1} ref={(node) => node?.focus()}>
        <span className={classes.successIcon}>
          <Icon name="check" size={24} />
        </span>
        <h2>Thank you, your message is on its way.</h2>
        <p>We will review the details and reply to arrange a conversation.</p>
        <Button variant="secondary" icon={null} onClick={() => setStatus({ state: "idle", message: "" })}>
          Send another message
        </Button>
      </div>
    );
  }

  const field = (name, props = {}) => {
    const config = CONTACT_FIELDS[name];
    const error = touched[name] && errors[name];
    const describedBy = error ? `${name}-error` : undefined;
    const common = {
      id: name,
      name,
      value: values[name],
      onChange: update,
      onBlur: blur,
      maxLength: config.maxLength,
      required: config.required,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy,
      className: classes.input,
    };

    return (
      <div className={`${classes.field} ${props.wide ? classes.wide : ""}`}>
        <label htmlFor={name} className={classes.label}>
          {config.label}
          {!config.required && <span className={classes.optional}>Optional</span>}
        </label>
        {props.as === "textarea" ? (
          <textarea rows={6} {...common} placeholder={props.placeholder} />
        ) : props.as === "select" ? (
          <select {...common}>
            <option value="">Select an area</option>
            {INTEREST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input type={props.type || "text"} autoComplete={props.autoComplete} {...common} />
        )}
        {props.as === "textarea" && (
          <span className={classes.counter} aria-hidden="true">
            {values[name].length} / {config.maxLength}
          </span>
        )}
        {error && (
          <p id={`${name}-error`} className={classes.error}>
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className={classes.form} onSubmit={submit} noValidate aria-describedby="form-note">
      <div className={classes.grid}>
        {field("name", { autoComplete: "name" })}
        {field("email", { type: "email", autoComplete: "email" })}
        {field("phone", { type: "tel", autoComplete: "tel" })}
        {field("company", { autoComplete: "organization" })}
        {field("interest", { as: "select", wide: true })}
        {field("message", {
          as: "textarea",
          wide: true,
          placeholder: "What are you hoping to build, improve or solve? Timelines and constraints are helpful too.",
        })}
      </div>

      {/* Honeypot: visually hidden and skipped by assistive technology. */}
      <div className={classes.honeypot} aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.state === "error" && (
        <p className={classes.formError} role="alert">
          {status.message}
        </p>
      )}

      <div className={classes.footer}>
        <p id="form-note" className={classes.note}>
          We use these details only to respond to your enquiry. See our{" "}
          <a href="/privacy">privacy notice</a>.
        </p>
        <Button type="submit" size="lg" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
