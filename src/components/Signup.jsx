import React from "react";
import { Formik, Form } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import axios from "../Api/axios";
import { Link } from "react-router-dom";

const Signup = () => {
  // validate data
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("email is invalid").required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at leat 6 charaters")
      .required("`Password is Required`"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Password must be at leat 6 charaters"
      )
      .required("Password is Required"),
  });

  //submit data

  const handalSubmit = (values, { resetForm }) => {
    axios
      .post("/alldata", values)
      .then((res) => {
        console.log("Successfully submit", res.data);
        resetForm();
      })
      .catch((error) => {
        console.log("Error sobmitting data", error);
      });
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userRole: "",
        habits: [],
      }}
      validationSchema={validate}
      onSubmit={handalSubmit}
    >
      {(formik) => (
        <div>
          <main className="form-signin m-auto d-flex justify-content-center">
            <Form className="w-50 mt-5">
              <h1 className="h3 mb-3 fw-normal">SignUp</h1>
              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="First Name"
                  name="firstName"
                  type="text"
                />
              </div>
              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="Last Name"
                  name="lastName"
                  type="text"
                />
              </div>
              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="Email"
                  name="email"
                  type="email"
                />
              </div>
              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="Password"
                  name="password"
                  type="text"
                />
              </div>
              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="text"
                />
              </div>
              {/* <div className="form-check text-start my-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userRole"
                  value="Admin"
                  id="radioAdmin"
                  onChange={formik.handleChange}
                />
                <label className="form-check-label" htmlFor="radioAdmin">
                  Admin
                </label>
              </div> */}
              <div className="form-check text-start my-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userRole"
                  value="User"
                  id="radioUser"
                  onChange={formik.handleChange}
                />
                <label className="form-check-label" htmlFor="radioUser">
                  User
                </label>
              </div>

              {formik.errors.userRole && formik.touched.userRole && (
                <div style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.userRole}
                </div>
              )}
              <button className="btn btn-primary w-100 py-2" type="submit">
                Submit
              </button>
              <p>
                Go tu tha{" "}
                <Link className="text-decoration-none" to="/">
                  Login page .
                </Link>
              </p>
            </Form>
          </main>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
