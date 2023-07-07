import React from "react";

function Task({ tasktext, completed, task, tasks, setTasks }) {
  // Function to strik through the text
  function completedHandler() {
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) {
          fetch("http://localhost:3002/tasks/" + task.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              completed: !item.completed,
              tasktext: tasktext,
            }),
          });
          return {
            ...item,
            completed: !item.completed,
          };
        }
        // setTasks()
        return item;
      })
    );
    // setTasks(tasks);
  }

  // Function to delete a task
  function deleteHandler(e) {
    // The task is filtered out of the tasks array and so if the id mathes that task is deleted

    // Works well coz it filters out an item
    // setTasks(tasks.filter((object) => object.id !== task.id));
    fetch("http://localhost:3002/tasks/" + task.id, { method: "DELETE" });

  
  }
  return (
    <div
      id="list"
      className="border-bottom shadow d-flex justify-content-between mt-1 bg-light px-3 py-1 w-100 rounded"
    >
      <li className={`${task.completed ? "completed succ" : ""} fs-4`}>
        {tasktext}
      </li>
      <div className="d-flex justify-content-around">
        <span
          className="me-1 bg-success p-2 rounded"
          onClick={completedHandler}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-check2-circle"></i>
        </span>
        <form>
          <button
            type="submit"
            onClick={deleteHandler}
            style={{ cursor: "pointer" }}
            className="me-1 bg-danger p-2 rounded"
            id={task.id}
          >
            <i className="bi bi-trash"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Task;
