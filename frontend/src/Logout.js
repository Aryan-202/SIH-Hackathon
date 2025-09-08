import React, { useContext } from "react";
import api from "./api";
import { AuthContext } from "./AuthContext";

export default function Logout() {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (err) {
      alert("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
