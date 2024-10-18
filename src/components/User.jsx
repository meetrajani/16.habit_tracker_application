import React, { useEffect, useState } from "react";
import axios from "../Api/axios";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";

const User = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null); // State to track which habit is being edited

  useEffect(() => {
    axios.get("/alldata").then((res) => {
      setData(res.data || []);
    });
  }, []);

  const filterdata = data.filter((item) => item.id === Number(id));

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    userRole: "",
    habits: [],
  });

  useEffect(() => {
    if (filterdata.length > 0) {
      setFormValues((prevValues) => {
        const newValues = {
          email: filterdata[0].email || "",
          password: filterdata[0].pass || "",
          userRole: filterdata[0].role || "",
          habits: filterdata[0].habits || [],
        };

        if (
          newValues.email !== prevValues.email ||
          newValues.password !== prevValues.password ||
          newValues.userRole !== prevValues.userRole ||
          JSON.stringify(newValues.habits) !== JSON.stringify(prevValues.habits)
        ) {
          return newValues;
        }
        return prevValues; 
      });
    }
  }, [filterdata]);

  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    goal: Yup.string().required("Goal is required"),
    start_date: Yup.string().required("Start date is required"),
    frequency: Yup.string().required("Frequency is required"),
  });

  const handleAddHabit = (values, { resetForm }) => {
    const newHabit = {
      id: uuidv4(),
      name: values.name,
      goal: values.goal,
      startDate: values.start_date,
      frequency: values.frequency,
      completed: false,
      progressType: "weekly",
      progress: 0,
    };

    const updatedUserData = {
      firstName: filterdata[0].firstName,
      lastName: filterdata[0].lastName,
      email: filterdata[0].email,
      password: filterdata[0].password,
      confirmPassword: filterdata[0].password,
      userRole: filterdata[0].userRole,
      id: filterdata[0].id,
      habits: [...filterdata[0].habits, newHabit],
    };

    axios
      .put(`/alldata/${id}`, updatedUserData)
      .then((res) => {
        console.log("Response:", res.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });

    resetForm();
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit); // Set the habit being edited
  };

  const handleUpdateHabit = (values, { resetForm }) => {
    const updatedHabits = formValues.habits.map((habit) =>
      habit.id === editingHabit.id
        ? { ...habit, ...values } // Update habit with new values
        : habit
    );

    const updatedUserData = {
      firstName: filterdata[0].firstName,
      lastName: filterdata[0].lastName,
      email: filterdata[0].email,
      password: filterdata[0].password,
      confirmPassword: filterdata[0].password,
      userRole: filterdata[0].userRole,
      id: filterdata[0].id,
      habits: updatedHabits,
    };

    axios
      .put(`/alldata/${id}`, updatedUserData)
      .then((res) => {
        console.log("Updated Response:", res.data);
        setEditingHabit(null); // Clear editing state
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    resetForm();
  };

  const handleDeleteHabit = (habitId) => {
    const updatedHabits = formValues.habits.filter((habit) => habit.id !== habitId);

    const updatedUserData = {
      firstName: filterdata[0].firstName,
      lastName: filterdata[0].lastName,
      email: filterdata[0].email,
      password: filterdata[0].password,
      confirmPassword: filterdata[0].password,
      userRole: filterdata[0].userRole,
      id: filterdata[0].id,
      habits: updatedHabits,
    };

    axios
      .put(`/alldata/${id}`, updatedUserData)
      .then((res) => {
        console.log("Deleted Response:", res.data);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div className="container text-center">
      <Formik
        enableReinitialize // Ensures form re-initializes when editingHabit changes
        initialValues={{
          name: editingHabit ? editingHabit.name : "",
          goal: editingHabit ? editingHabit.goal : "",
          start_date: editingHabit ? editingHabit.startDate : "",
          frequency: editingHabit ? editingHabit.frequency : "",
          completed: "",
          progressType: "weekly",
          progress: "",
        }}
        validationSchema={validate}
        onSubmit={editingHabit ? handleUpdateHabit : handleAddHabit}
      >
        {(formik) => (
          <Form>
            <div className="form-floating mb-4 d-flex justify-content-center">
              <div className="w-50">
                <TextField
                  className="form-control mb-3"
                  label="Name"
                  name="name"
                  type="text"
                />
                <TextField
                  className="form-control mb-3"
                  label="Goal"
                  name="goal"
                  type="text"
                />
                <TextField
                  className="form-control mb-3"
                  label="Start Date"
                  name="start_date"
                  type="date"
                />
                <TextField
                  className="form-control mb-3"
                  label="Frequency"
                  name="frequency"
                  type="text"
                />
                <button
                  className="btn btn-primary w-100 py-2"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {editingHabit ? "Update Habit" : "Add Habit"}
                </button>
                {editingHabit && (
                  <button
                    className="btn btn-secondary w-100 py-2 mt-2"
                    type="button"
                    onClick={() => setEditingHabit(null)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <h2>User Dashboard</h2>
      {filterdata.length > 0 ? (
        <div>
          <h3>
            Your Name: {filterdata[0].firstName} {filterdata[0].lastName}
          </h3>
          <h4>{filterdata[0].task || "No task"}</h4>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {formValues.habits.length > 0 && (
        <div>
          <h3>Habits</h3>
          <div>
            {formValues.habits.map((habit) => (
              <div key={habit.id}>
                <strong>Goal:</strong> {habit.goal}
                <strong> Start Date:</strong> {habit.startDate}
                <strong> Frequency:</strong> {habit.frequency}
                <strong> Progress:</strong> {habit.progress} times completed
                <button onClick={() => handleEditHabit(habit)}>Edit</button>
                <button onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
