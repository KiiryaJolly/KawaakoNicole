import "./App.css";

// Class based component goes here
import React, { Component } from "react";
import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
// import PropTypes from "prop-types";
// import styled from "styled-components";



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      activeItem: {
        id: null,
        name: "",
        completed: false,
        deadline: undefined,
      },
      editing: false,
      
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.strikeThrough = this.strikeThrough.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentWillMount() {
    this.fetchTasks();
  }

  // Fetching tasks from the database
  fetchTasks() {
    fetch("http://127.0.0.1:8000/api/task-list/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          taskList: data, // So everytime state changes, it will rerender the page
        });
        // console.log(data);
      });
  }

  // Submitting the form data to the database
  handleText(e) {
    const name = e.target.value;
    // console.log(name);
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        name: name,
      },
    });
    // console.log("Active item: "+this.state.activeItem);
  }
  handleDate(e) {
    const deadline = e.target.value;
    // console.log(deadline);
    // const date = new Date(deadline)
    // console.log(date)
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        deadline: deadline,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    var url = "http://127.0.0.1:8000/api/task-create/";

    if (this.state.editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`;
      this.setState({
        editing: false,
      });
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(this.state.activeItem),
    })
      .then((res) => {
        this.fetchTasks();
        this.setState({
          activeItem: {
            id: null,
            name: "",
            completed: false,
            deadline: "",
          },
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  startEditing(task) {
    this.setState({
      activeItem: task,
      editing: true,
    });
  }

  strikeThrough(task) {
    task.completed = !task.completed;
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: task.completed,
        name: task.name,
        deadline: task.deadline,
      })
    }).then(() => {
      this.fetchTasks();
    });
  }

  handleSignup(e){
     e.preventDefault();

    var url = "http://127.0.0.1:8000/api/signup/";

  }

  render() {
    const tasks = this.state.taskList;
    const self = this;

    return (
      // <Routes>
      //   <Route exact path="/">
          <div className="">
            {/* Imput form  */}
            <Navbar />

            <div className="container w-50 mt-5">
              <h2 className="text-center"> TODOs </h2>
              {/* <Form handleSubmit={self.handleSubmit} handleDate={self.handleDate} handleText={self.handleText}/> */}
              <form
                action=""
                method=""
                className="form"
                onSubmit={this.handleSubmit}
              >
                <input
                  // value={inputText}
                  // onChange={inputTextHandler}
                  onChange={this.handleText}
                  type="text"
                  name="taskname"
                  id=""
                  value={this.state.activeItem.name}
                  className="form-control"
                  placeholder="Enter task here....."
                />
                <div className="row">
                  <div className="col-12">
                    <label for="" className="form-label mt-2 fs-bold fw-5 mb-0">
                      Expiry date
                    </label>
                    <input
                      onChange={this.handleDate}
                      type="date"
                      name="date"
                      value={this.state.activeItem.deadline}
                      id=""
                      placeholder="Enter the task expiry date here..."
                      className="form-control"
                    />
                  </div>
                </div>
                <button
                  // onClick={AddTaskHandler}
                  className="btn btn-primary mt-3"
                  type="submit"
                >
                  Add Task
                </button>
              </form>
            </div>

            {/* <Form
          // setInputText={setInputText}
          // tasks={tasks}
          // setTasks={setTasks}
          // inputText={inputText}
          handleChange={this.handleChange}
        /> */}
            {/* <TaskList /> */}
            <TaskList
              tasks={tasks}
              startEditing={self.startEditing}
              strikeThrough={self.strikeThrough}
              fetchTasks={self.fetchTasks}
            />
          </div>
      //   </Route>

      //   <Route exact path="/login" element={<Login />}></Route>
      // </Routes>
    );
  }
}



// Working  Code ends here








// import Form from "./components/Form";
// import TaskList from "./components/TaskList";

// import { useEffect, useState } from "react";

// function App() {
//   // State for the input text
//   const [inputText, setInputText] = useState("");
//   // State for the todo list items
//   // const [tasks, setTasks] = useState([]);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3002/tasks")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setTasks(data);
//       });
//   }, []);

//   return (
//     <div className="container">
//       <Form
//         setInputText={setInputText}
//         tasks={tasks}
//         setTasks={setTasks}
//         inputText={inputText}
//       />
//       <TaskList tasks={tasks} setTasks={setTasks} />
//     </div>
//   );
// }

// export default App;
