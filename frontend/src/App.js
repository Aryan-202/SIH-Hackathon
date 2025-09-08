import React, { useContext } from "react";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import AuthProvider, { AuthContext } from "./AuthContext";

function Main() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Auth Example</h1>
      {!user && (
        <>
          <Register />
          <Login />
        </>
      )}
      {user && (
        <>
          <div>Welcome, {user.name} ({user.email})</div>
          <Logout />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
