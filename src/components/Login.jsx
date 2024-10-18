import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import TextField from "./TextField";
import axios from "../Api/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  // validation schema
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    userRole: Yup.string().required("Role is required"), 
  });

  const handleLogin = (values, { resetForm }) => {
    console.log("Form Values:", values); 
    
    axios
      .get("/alldata").then((res) => {
        const users = res.data;
        const foundUser = users.find((user) =>user.email === values.email && user.password === values.password && user.userRole === values.userRole);
  
        if (foundUser) {
          console.log("Login successful!");
        
          if (foundUser.userRole === "Admin") {
            navigate("/admin-dashboard");
            console.log("admin login");
            
          } else if (foundUser.userRole === "User") {
            navigate("/user-dashboard");
            console.log("user login");
            navigate(`/user-dashboard/${foundUser.id}`);
          }
        } else {
          console.log("Incorrect email, password, or role. Login failed!");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  
    resetForm();
  };  

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          userRole: "", 
        }}
        validationSchema={validate}
        onSubmit={handleLogin}
      >
        {(formik) => (
          <div>
            <>
              <div>
                <main className="form-signin m-auto d-flex justify-content-center">
                  <Form className="w-50 mt-5">
                    <h1 className="h3 mb-3 fw-normal">Please Log in</h1>

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
                        type="password"
                      />
                    </div>

                    <div className="form-check text-start my-3">
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
                    </div>

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

                    <button
                      className="btn btn-primary w-100 py-2"
                      type="submit"
                    >
                      Log In
                    </button>

                    <p className="mt-2 mb-5">
                      Go to the{" "}
                      <Link className="text-decoration-none" to="/signup">
                        Sign Up page
                      </Link>
                      .
                    </p>
                  </Form>
                </main>
              </div>
            </>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
