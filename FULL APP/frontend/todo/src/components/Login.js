import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  function handleUserName(e) {
    let username = e.target.value;
    setUsername(username);
  }
  function handlePassword(e) {
    let password = e.target.value;
    setPassword(password);
  }

  function handleLogin(e) {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };

    let url = "http://127.0.0.1:8000/api/login/";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setUsers(users);
      });
    users.map((user) => {
      if (user.username === username && user.password === password) {
        localStorage.setItem("usern", username);

        console.log(localStorage.getItem("usern"));
        // sessionStorage.setItem("uname", username);
        // setValidated(true);
        // console.log(validated);
        navigate("/");
      } else {
        var error = "Invalid login credentials";
        console.log("invalid credentials");
        navigate("/login");
      }
    });
  }
 // error ? <p>{error}</p> : ""
  return (
    <div className="container mt-5">
       
      <div className="d-flex justify-content-center align-items-center">
        <form
          action=""
          className="w-50 bg-light rounded p-4"
          onSubmit={handleLogin}
          method="post"
        >
          <p className="text-center h4">Login form</p>
          <div className="row">
            <div className="col col-12">
              <label className="form-label mb-0 mt-2" htmlFor="">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username..."
                onChange={handleUserName}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-12">
              <label className="form-label mb-0 mt-2" htmlFor="">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password..."
                onChange={handlePassword}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
