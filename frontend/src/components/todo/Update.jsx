import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = ({ display, update, onTaskUpdate }) => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });

  // Update form fields when props change
  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title || "",
        body: update.body || "",
      });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (!update || !update._id) {
      toast.error("Update ID is missing");
      return;
    }

    try {
      await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`, Inputs);
      toast.success("Task updated successfully!");
      display();
      onTaskUpdate(); // ✅ Refresh tasks immediately
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={Inputs.title}
        name="title"
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={Inputs.body}
        name="body"
        onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          Update
        </button>
        <button className="btn btn-danger my-4 mx-3" onClick={display}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
