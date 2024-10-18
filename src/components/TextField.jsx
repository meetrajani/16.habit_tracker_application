import { ErrorMessage, useField } from "formik";
import React from "react";

const TextField = ({ label, ...props }) => {
  const [ field, meta ] = useField(props);

  return (
    <div className="form-floating">
      <input
        className={`"form-control"${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <label htmlFor={field.name}>{label}</label>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};

export default TextField;
