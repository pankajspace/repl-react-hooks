import React, { useState, useContext, createContext } from "react";

// https://www.youtube.com/watch?v=5gUHfe-ETuo&t=0s

const loginContext = createContext(false);
const LoginStatus = () => {
  const {loggedIn} = useContext(loginContext);

  return (
    <div>
      Logged In Status: {loggedIn ? "YES": "NO"}
    </div>
  )
}
const LoginLogoutButton = () => {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  return (
    <div>
      {loggedIn ? <button onClick={() => setLoggedIn(false)} >Logout</button> : <button onClick={() => setLoggedIn(true)} >Login</button>}
    </div>
  )
}
export const UseContextApp1 = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <LoginStatus />
        <br />
        <LoginLogoutButton />
      </loginContext.Provider>
    </div>
  )
}

