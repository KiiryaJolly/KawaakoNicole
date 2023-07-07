import React from "react";
import Task from "./Task";
import Progress from "./Progress";

function TaskList({ tasks, setTasks, startEditing, strikeThrough, fetchTasks }) {
  let completed_task = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      completed_task = completed_task + 1;
    }
  }
  return (
    <div className="w-80 container">
      {/* This is for the progress bar */}
      <span className="me-3 fw-bold">Progress</span>
      <Progress max={tasks.length} value={completed_task} color={"red"} />

      <p className="text-center text-light p-2 bg-dark mt-3 rounded">
        My list of tasks
      </p>

      <div className="" id="item">
        {tasks
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((task) => (
            <Task
              // tasktext={task.tasktext}
              tasktext={task.name}
              completed={task.completed}
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              startEditing={startEditing}
               strikeThrough={strikeThrough} 
               fetchTasks={fetchTasks}
            />
          ))}
      </div>
    </div>
  );
}

export default TaskList;
