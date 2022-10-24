import { useState, useRef } from "react"
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {
  const [loginError, setLoginError] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const userNameBox = useRef()
  const passwordBox = useRef()

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.msg === "ok"){
          navigate("/Welcome")
        } else {
          setLoginError(true)
        }
      })
      .catch((data)=>{console.log("Error", data)});
  };



  return (
    <>
    <form method="post" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <label>
          Username:
          <input name="username" />
        </label>
        <label>
          Password:
          <input name="password" />
        </label>
        <button>Login</button>
      </fieldset>
    </form>
        {/* <p>Username Submitted: </p>
        <p>{userName}</p>
        <p>Password Submitted: </p>
        <p>{password}</p> */}
        {loginError && (<p>Login Failed</p>)}
    </>
  )
}

export default LoginForm