import React, { useState } from "react";
import api from "./api";

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      setMsg(res.data.message || "Registered!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Name" onChange={onChange} />
      <input name="email" placeholder="Email" onChange={onChange} />
      <input name="password" placeholder="Password" type="password" onChange={onChange} />
      <button type="submit">Register</button>
      <div>{msg}</div>
    </form>
  );
}
