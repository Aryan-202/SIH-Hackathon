import React, { useState, useContext } from "react";
import api from "./api";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      setUser(res.data.user);
      setMsg(res.data.message || "Logged in!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="email" placeholder="Email" onChange={onChange} />
      <input name="password" placeholder="Password" type="password" onChange={onChange} />
      <button type="submit">Login</button>
      <div>{msg}</div>
    </form>
  );
}
