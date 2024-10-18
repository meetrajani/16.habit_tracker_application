import React, { useEffect, useState } from "react";
import axios from "../Api/axios";
import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Admin = () => {
  useEffect(() => {
    Fdata();
  }, []);

  const [data, setdata] = useState([]);
  const Fdata = () => {
    axios.get("http://localhost:3001/alldata").then((res) => {
      const userData = res.data.filter((user) => user.userRole === "User");
      setdata(userData);
    });
  };

  //   delete

  const DeleteData = (id) => {
    axios.delete(`http://localhost:3001/alldata/${id}`).then((res) => {
      const delet = data.filter((e) => e.id !== id);
      setdata(delet);
      toast.success("User deleted successfully!");
    });
  };

  //   editdata

  const [Edata, setEdata] = useState([]);

  const Editdata = (index) => {
    const edit = data[index];
    setEdata(edit);
  };

  const change = (e) => {
    setEdata({ ...Edata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (values, id) => {
    if (!id) {
      console.error("User ID is undefined. Cannot update data.");
      return;
    }

    axios
      .put(`http://localhost:3001/food/${id}`, Edata, values)
      .then((res) => {
        console.log("Successfully submitted", res.data);
        Fdata();
        toast.success("Data updated successfully!");
      })
      .catch((error) => {
        console.log("Error submitting data", error);
      });
  };

  return (
    <div>
      <div className="container mt-3">
        <ToastContainer />
        <div className="d-flex justify-content-between mb-4">
          <h1>Admin</h1>
          <div><Link className="btn btn-secondary fs-5 px-4" to={"/"}>Sing out</Link></div>
        </div>
        <div className="row">
          {data.map((e, index) => {
            return (
              <div className="col-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">User Name :- {e.firstName}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      Email :- {e.email}
                    </h6>
                    <p className="card-text">{e.habits.map((e,index)=>{
                      return(
                        <span key={index}>{index+1} :- {e.name} , </span>
                      )
                    })}</p>
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => Editdata(index)}
                      >
                        Edit
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Edit Data
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <Formik
                                initialValues={{
                                  firstName: Edata.firstName || "",
                                  lastName: Edata.lastName || "",
                                  email: Edata.email || "",
                                  password: Edata.password || "",
                                  confirmPassword: Edata.confirmPassword || "",
                                  userRole: Edata.userRole || "",
                                  task: Edata.task || "",
                                }}
                                onSubmit={(values) =>
                                  handleSubmit(values, Edata.id)
                                }
                              >
                                <main className="form-signin m-auto d-flex justify-content-center">
                                  <Form className="w-100">
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={Edata.firstName || ""}
                                        onChange={change}
                                      />
                                      <label>First Name</label>
                                    </div>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={Edata.lastName || ""}
                                        onChange={change}
                                      />
                                      <label>Last Name</label>
                                    </div>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={Edata.email || ""}
                                        onChange={change}
                                      />
                                      <label>Email</label>
                                    </div>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={Edata.password || ""}
                                        onChange={change}
                                      />
                                      <label>Password</label>
                                    </div>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={Edata.confirmPassword || ""}
                                        onChange={change}
                                      />
                                      <label>Confirm Password</label>
                                    </div>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={Edata.confirmPassword || ""}
                                        onChange={change}
                                      />
                                      <label>Confirm Password</label>
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="form-label"
                                      >
                                        Task
                                      </label>
                                      <textarea
                                        className="form-control"
                                        value={Edata?.habits?.map((e, index) => `${index + 1}. ${e.name}`).join('\n') || ''}
                                        name="task"
                                        onChange={change}
                                        rows={3}
                                      />
                                    </div>

                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                      >
                                        Save changes
                                      </button>
                                    </div>
                                  </Form>
                                </main>
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => DeleteData(e.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
