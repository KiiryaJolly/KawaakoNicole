import React from "react";

function Form({ inputText, setInputText }) {
 
  function inputTextHandler(e) {
    const task = e.target.value;
    setInputText(task);
  }
 
  function AddTaskHandler(e) {
     const task_to_add = { tasktext: inputText, completed: false };
    fetch(" http://localhost:3002/tasks", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(task_to_add),
    });

    setInputText("");
  }

  return (
    <div className="container w-50 mt-5">
      <h2 className="text-center">NICOLE TODO </h2>
      <form className="form">
        <input
          value={inputText}
          onChange={inputTextHandler}
          type="text"
          className="form-control"
          placeholder="Enter task here....."
        />
        <button
          onClick={AddTaskHandler}
          className="btn btn-success mt-3"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Form;
