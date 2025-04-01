import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { signIn } from 'next-auth/client';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setErrors({ submit: 'Login failed. Please try again.' });
        } else {
          setSuccess(true);
        }
      } catch (error) {
        setErrors({ submit: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Login</h1>
        {success ? (
          <p>Login successful! Redirecting...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
            {errors.submit && <p>{errors.submit}</p>}
          </form>
        )}
        <div>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
