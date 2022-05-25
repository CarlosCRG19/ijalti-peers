import React, { useState } from 'react';

import { useAPI } from '../../hooks';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const api = useAPI();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { idToken } = await api.company.login(credentials.email, credentials.password);

    localStorage.setItem('idToken', idToken);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
