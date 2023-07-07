import React, { Component } from "react";
import TaskList from "./TaskList";

export default class Home extends Component {
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
    const name = e.target.value; //Getting the task name input from within the form
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        name: name,
      },
    });
    // console.log("Active item: "+this.state.activeItem);
  }
  handleDate(e) {
    const deadline = e.target.value; //Getting the task deadline date input from within the form
   
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
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: task.completed,
        name: task.name,
        deadline: task.deadline,
      }),
    }).then(() => {
      this.fetchTasks();
    });
  }

 

  render() {
     
    const tasks = this.state.taskList;
    const self = this;
    return (
      <div className="container w-50 mt-5">
        <div>
         
        {/* <h2 className="text-center"> TODOs for {loggedInUser}</h2> */}
          <form
            action=""
            method=""
            className="form bg-light rounded p-3 mb-3"
            onSubmit={this.handleSubmit}
          >
            <p className="text-center text-dark fs-5">TASK DETAILS</p>
            <label for="" className="form-label mt-2 fs-5 mb-0 mt-2">
              Task Name
            </label>
            <input
              onChange={this.handleText}
              type="text"
              name="taskname"
              id=""
              value={this.state.activeItem.name}
              className="form-control"
              placeholder="Enter task here name....."
              required
            />
            <div className="row">
              <div className="col-12">
                <label for="" className="form-label mt-2 fs-5 mb-0 mr-2">
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
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-primary mt-3" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>

        <TaskList
          tasks={tasks}
          startEditing={self.startEditing}
          strikeThrough={self.strikeThrough}
          fetchTasks={self.fetchTasks}
        />
      </div>
    );
  }
}
