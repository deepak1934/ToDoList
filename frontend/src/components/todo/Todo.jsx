import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import Update from "./update";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const [toUpdateArray, setToUpdateArray] = useState(null);
  const [userId, setUserId] = useState(sessionStorage.getItem("id")); // ✅ Use state for dynamic updates

  // Fetch tasks from backend
  const fetchTasks = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/v2/getTask/${userId}`
        );
        setArray(response.data.task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    } else {
      setArray([]); // ✅ Clear tasks when logged out
    }
  };

  // Fetch tasks on component mount and when userId changes
  useEffect(() => {
    fetchTasks();
  }, [userId]); // ✅ Rerun fetchTasks when userId updates

  // Listen for sessionStorage changes (Logout fix)
  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(sessionStorage.getItem("id")); // ✅ Update state when sessionStorage changes
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Add task
  const submit = async () => {
    if (!Inputs.title.trim() || !Inputs.body.trim()) {
      toast.error("Title and Body should not be empty");
      return;
    }

    if (!userId) {
      toast.error("Your task is not saved! Please sign up first");
      return;
    }

    try {
      await axios.post(`${window.location.origin}/api/v2/addTask`, {
        title: Inputs.title,
        body: Inputs.body,
        id: userId,
      });

      toast.success("Your Task Is Added");
      setInputs({ title: "", body: "" });
      fetchTasks(); // ✅ Refresh tasks immediately
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task
  const del = async (cardid) => {
    if (!userId) {
      toast.error("Please Sign Up First");
      return;
    }

    try {
      await axios.delete(`${window.location.origin}/api/v2/deleteTask/${cardid}`, {
        data: { id: userId },
      });

      toast.success("Your Task Is Deleted");
      fetchTasks(); // ✅ Refresh tasks immediately
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  // Open update modal
  const dis = () => {
    document.getElementById("todo-update").style.display = "block";
  };

  // Close update modal
  const closeUpdate = () => {
    document.getElementById("todo-update").style.display = "none";
  };

  // Set update data
  const update = (index) => {
    setToUpdateArray(Array[index]);
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={() =>
                (document.getElementById("textarea").style.display = "block")
              }
              name="title"
              value={Inputs.title}
              onChange={(e) =>
                setInputs({ ...Inputs, [e.target.name]: e.target.value })
              }
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              value={Inputs.body}
              className="p-2 todo-inputs"
              onChange={(e) =>
                setInputs({ ...Inputs, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        {/* Show tasks only when logged in */}
        {userId ? (
          Array.length > 0 ? (
            <div className="todo-body">
              <div className="container-fluid">
                <div className="row">
                  {Array.map((item, index) => (
                    <div
                      className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                      key={index}
                    > 
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        id={item._id}
                        delid={del}
                        display={dis}
                        UpdateId={index}
                        toBeUpdate={update}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h3 className="text-center">Make a Todo List</h3> // ✅ Changed message
          )
        ) : (
          <h3 className="text-center">No tasks found. Please log in.</h3>
        )}
      </div>

      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update
            display={closeUpdate}
            update={toUpdateArray}
            onTaskUpdate={fetchTasks}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
