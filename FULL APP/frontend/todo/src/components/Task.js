import React from "react";

function Task({
  tasktext,
  completed,
  task,
  tasks,
  setTasks,
  startEditing,
  strikeThrough,
  fetchTasks,
}) {
  const deadline = undefined;

  // Function to delete a task
  function deleteHandler(e) {
    const url = `http://127.0.0.1:8000/api/task-delete/${task.id}/`;
    fetch(url, { method: "DELETE" })
    .then(() => {
      fetchTasks();
    });
  }

  const current = new Date();
  const d = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
  let id = `list-${task.id}`
  const date = new Date(d)
  // console.log(date)

  return (
    <div
      id={id}
      className={`${
        date > new Date(task.deadline) && task.completed === false
          ? "expired "
          : ""
      }border-bottom shadow d-flex justify-content-between mt-1 bg-light px-3 py-1 w-100 rounded`}
    >
      <div className={`${task.completed ? "completed succ" : ""} fs-4`}>
        
          <li>Name: {tasktext}</li>
        
        <p className="ms-5" style={{ marginLeft: 100 }}>
          Deadline: {task.deadline}
        </p>
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <div className="mt-2">
          {date > new Date(task.deadline) && task.completed === false ? (
            <span>
              <button className="me-1 btn btn-sm btn-success " disabled>
                <i className="bi bi-check2-circle"></i>
              </button>
              <button className="btn btn-outline-success btn-sm me-1">
                Edit
              </button>
            </span>
          ) : (
            <span>
              <button
                className="me-1 btn btn-sm btn-success "
                onClick={() => strikeThrough(task)}
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-check2-circle"></i>
              </button>
              <button
                onClick={() => startEditing(task)}
                className="btn btn-outline-success btn-sm me-1"
              >
                Edit
              </button>
            </span>
          )}

          <button
            className="btn btn-outline-danger btn-sm"
            id={task.id}
            onClick={deleteHandler}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
