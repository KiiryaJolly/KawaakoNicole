
import "./App.css";
import Form from "./components/Form";
import TaskList from "./components/TaskList";

import { useEffect, useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/tasks")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  return (
    <div className="container">
      <Form
        setInputText={setInputText}
        tasks={tasks}
        setTasks={setTasks}
        inputText={inputText}
      />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
export default App;
